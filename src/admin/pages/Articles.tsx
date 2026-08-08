import { useState, useEffect, useCallback } from 'react';
import { adminArticleApi, AdminArticle } from '../services/adminArticleApi';
import { Search, Eye, Edit2, Copy, Trash2, Loader2, AlertCircle, Star, Archive } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Articles() {
  const [articles, setArticles] = useState<AdminArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Pagination & Filtering state
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [featuredFilter, setFeaturedFilter] = useState("All");
  const [sort, setSort] = useState<"Newest" | "Oldest">("Newest");

  // Modal State
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [articleToDelete, setArticleToDelete] = useState<AdminArticle | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Bulk Selection State
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isBulkTrashing, setIsBulkTrashing] = useState(false);

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
      setPage(1); // Reset page on new search
    }, 500);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  const fetchArticles = useCallback(async () => {
    setLoading(true);
    try {
      const params: any = {
        page,
        limit: 10,
        sort,
      };
      
      if (debouncedSearch) params.search = debouncedSearch;
      if (statusFilter !== "All") params.status = statusFilter;
      if (featuredFilter !== "All") params.featured = featuredFilter === "Featured" ? "true" : "false";

      const res = await adminArticleApi.getArticles(params);
      setArticles(res.data);
      setTotalPages(res.meta.totalPages);
      setTotalItems(res.meta.total);
      setError(null);
    } catch (err: any) {
      setError(err.message || "Failed to load articles.");
    } finally {
      setLoading(false);
    }
  }, [page, sort, debouncedSearch, statusFilter, featuredFilter]);

  useEffect(() => {
    fetchArticles();
  }, [fetchArticles]);

  const handleDeleteConfirm = async () => {
    if (!articleToDelete) return;
    setIsDeleting(true);
    try {
      await adminArticleApi.deleteArticle(articleToDelete.id);
      setDeleteModalOpen(false);
      setArticleToDelete(null);
      fetchArticles(); // Refresh list
    } catch (err: any) {
      alert("Failed to move article to trash: " + err.message);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleBulkTrash = async () => {
    if (selectedIds.length === 0) return;
    if (!confirm(`Are you sure you want to move ${selectedIds.length} articles to Trash?`)) return;
    
    setIsBulkTrashing(true);
    try {
      await adminArticleApi.bulkTrashArticles(selectedIds);
      setSelectedIds([]);
      fetchArticles();
    } catch (err: any) {
      alert("Failed to bulk trash: " + err.message);
    } finally {
      setIsBulkTrashing(false);
    }
  };

  const toggleSelectAll = () => {
    if (selectedIds.length === articles.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(articles.map(a => a.id));
    }
  };

  const toggleSelect = (id: string) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter(i => i !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  return (
    <div>
      <div className="admin-page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h1 className="admin-page-title">Articles Management</h1>
          <p className="admin-page-subtitle">Manage, publish, and edit all platform articles.</p>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <Link to="/admin/articles/trash" className="admin-btn admin-btn-outline">
            <Archive size={16} /> View Trash
          </Link>
          <Link to="/admin/articles/create" className="admin-btn admin-btn-primary">
            + Create Article
          </Link>
        </div>
      </div>

      <div className="admin-table-container">
        {/* Toolbar (Search & Filters) */}
        <div className="admin-table-toolbar">
          <div className="admin-table-search">
            <Search size={18} />
            <input 
              type="text" 
              placeholder="Search by title, slug, or author..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="admin-table-filters">
            <select value={statusFilter} onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}>
              <option value="All">All Statuses</option>
              <option value="Published">Published</option>
              <option value="Draft">Draft</option>
              <option value="Archived">Archived</option>
            </select>
            
            <select value={featuredFilter} onChange={(e) => { setFeaturedFilter(e.target.value); setPage(1); }}>
              <option value="All">All Types</option>
              <option value="Featured">Featured</option>
              <option value="Standard">Standard</option>
            </select>

            <select value={sort} onChange={(e) => { setSort(e.target.value as any); setPage(1); }}>
              <option value="Newest">Newest First</option>
              <option value="Oldest">Oldest First</option>
            </select>
          </div>
        </div>

        {/* Loading / Error / Empty States */}
        {loading ? (
          <div className="admin-loader-container" style={{ height: '300px' }}>
            <Loader2 size={32} className="lucide-spin" />
            <p>Loading articles...</p>
          </div>
        ) : error ? (
          <div className="admin-blank-slate" style={{ height: '300px', border: 'none', color: '#ef4444' }}>
            <AlertCircle size={32} style={{ marginBottom: '16px' }} />
            <h3>Failed to load articles</h3>
            <p>{error}</p>
          </div>
        ) : articles.length === 0 ? (
          <div className="admin-blank-slate" style={{ height: '300px', border: 'none' }}>
            <h3>No articles found</h3>
            <p>Try adjusting your filters or create a new article.</p>
          </div>
        ) : (
          <>
            <table className="admin-table">
              <thead>
                <tr>
                  <th style={{ width: '40px', paddingLeft: '24px' }}>
                    <input 
                      type="checkbox" 
                      className="admin-checkbox"
                      checked={articles.length > 0 && selectedIds.length === articles.length}
                      onChange={toggleSelectAll}
                    />
                  </th>
                  <th>Article</th>
                  <th>Category</th>
                  <th>Author</th>
                  <th>Status</th>
                  <th>Published</th>
                  <th style={{ textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {articles.map((article) => (
                  <tr key={article.id} className={selectedIds.includes(article.id) ? "selected" : ""}>
                    <td style={{ paddingLeft: '24px' }}>
                      <input 
                        type="checkbox" 
                        className="admin-checkbox"
                        checked={selectedIds.includes(article.id)}
                        onChange={() => toggleSelect(article.id)}
                      />
                    </td>
                    <td data-label="Article">
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        {article.coverImage ? (
                          <img 
                            src={article.coverImage} 
                            alt={article.title} 
                            style={{ width: '48px', height: '48px', borderRadius: '8px', objectFit: 'cover' }} 
                          />
                        ) : (
                          <div style={{ width: '48px', height: '48px', borderRadius: '8px', background: 'rgba(255,255,255,0.05)' }} />
                        )}
                        <div>
                          <div style={{ fontWeight: 600, color: '#f8fafc', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                            {article.title}
                            {article.featured && <Star size={14} color="#f59e0b" fill="#f59e0b" />}
                          </div>
                          <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>/{article.slug}</div>
                        </div>
                      </div>
                    </td>
                    <td data-label="Category">{article.category?.name || 'Uncategorized'}</td>
                    <td data-label="Author">{article.author?.name || 'System'}</td>
                    <td data-label="Status">
                      {article.status === 'Published' ? (
                        <span className="admin-badge green">Published</span>
                      ) : article.status === 'Archived' ? (
                        <span className="admin-badge gray">Archived</span>
                      ) : (
                        <span className="admin-badge gray">Draft</span>
                      )}
                    </td>
                    <td data-label="Published">
                      {article.publishedAt 
                        ? new Date(article.publishedAt).toLocaleDateString()
                        : '-'}
                    </td>
                    <td data-label="Actions" className="actions-cell">
                      <div className="admin-row-actions" style={{ justifyContent: 'flex-end' }}>
                        <Link to={`/articles/${article.slug}`} target="_blank" className="admin-icon-btn" title="View Public">
                          <Eye size={18} />
                        </Link>
                        <Link 
                          to={`/admin/articles/edit/${article.id}`} 
                          state={{ article }}
                          className="admin-icon-btn" 
                          title="Edit Article"
                        >
                          <Edit2 size={18} />
                        </Link>
                        <button className="admin-icon-btn" title="Duplicate">
                          <Copy size={18} />
                        </button>
                        <button 
                          className="admin-icon-btn danger" 
                          title="Delete"
                          onClick={() => {
                            setArticleToDelete(article);
                            setDeleteModalOpen(true);
                          }}
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination Controls */}
            <div className="admin-pagination">
              <div className="admin-pagination-info">
                Showing {((page - 1) * 10) + 1} to {Math.min(page * 10, totalItems)} of {totalItems} entries
              </div>
              <div className="admin-pagination-controls">
                <button 
                  className="admin-page-btn" 
                  disabled={page <= 1}
                  onClick={() => setPage(p => p - 1)}
                >
                  Previous
                </button>
                <button 
                  className="admin-page-btn" 
                  disabled={page >= totalPages}
                  onClick={() => setPage(p => p + 1)}
                >
                  Next
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Floating Bulk Actions Bar */}
      {selectedIds.length > 0 && (
        <div className="admin-bulk-actions-bar">
          <span>{selectedIds.length} article{selectedIds.length > 1 ? 's' : ''} selected</span>
          <div className="admin-bulk-actions-buttons">
            <button className="admin-btn admin-btn-danger" onClick={handleBulkTrash} disabled={isBulkTrashing}>
              {isBulkTrashing ? <Loader2 size={16} className="lucide-spin" /> : <Trash2 size={16} />}
              Move to Trash
            </button>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteModalOpen && articleToDelete && (
        <div className="admin-modal-overlay">
          <div className="admin-modal-content">
            <h3 className="admin-modal-title">Move to Trash?</h3>
            <p className="admin-modal-body">
              Are you sure you want to move <strong>"{articleToDelete.title}"</strong> to the Trash? 
              It will no longer be visible to the public, but you can restore it later.
            </p>
            <div className="admin-modal-actions">
              <button 
                className="admin-btn admin-btn-outline"
                onClick={() => {
                  setDeleteModalOpen(false);
                  setArticleToDelete(null);
                }}
                disabled={isDeleting}
              >
                Cancel
              </button>
              <button 
                className="admin-btn admin-btn-danger"
                onClick={handleDeleteConfirm}
                disabled={isDeleting}
              >
                {isDeleting ? "Moving..." : "Move to Trash"}
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Ensure the spin class is available */}
      <style>{`
        .lucide-spin {
          animation: lucide-spin 2s linear infinite;
        }
        @keyframes lucide-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
