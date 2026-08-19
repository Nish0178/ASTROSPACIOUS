import { useState, useEffect, useCallback } from 'react';
import { adminMagazineApi, AdminMagazine } from '../../admin/services/adminMagazineApi';
import { Search, Eye, Edit2, Trash2, Loader2, AlertCircle, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Magazines() {
  const [magazines, setMagazines] = useState<AdminMagazine[]>([]);
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
  const [magazineToDelete, setMagazineToDelete] = useState<AdminMagazine | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
      setPage(1); // Reset page on new search
    }, 500);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  const fetchMagazines = useCallback(async () => {
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

      const res = await adminMagazineApi.getMagazines(params);
      setMagazines(res.data);
      setTotalPages(res.meta.totalPages);
      setTotalItems(res.meta.total);
      setError(null);
    } catch (err: any) {
      setError(err.message || "Failed to load magazines.");
    } finally {
      setLoading(false);
    }
  }, [page, sort, debouncedSearch, statusFilter, featuredFilter]);

  useEffect(() => {
    fetchMagazines();
  }, [fetchMagazines]);

  const handleDeleteConfirm = async () => {
    if (!magazineToDelete) return;
    setIsDeleting(true);
    try {
      await adminMagazineApi.deleteMagazine(magazineToDelete.id);
      setDeleteModalOpen(false);
      setMagazineToDelete(null);
      fetchMagazines(); // Refresh list
    } catch (err: any) {
      alert("Failed to archive magazine: " + err.message);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div>
      <div className="admin-page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h1 className="admin-page-title">Magazines Management</h1>
          <p className="admin-page-subtitle">Manage, publish, and edit all magazine issues.</p>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <Link to="/admin/magazines/create" className="admin-btn admin-btn-primary">
            + Create Magazine
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
              placeholder="Search by title or slug..." 
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
            <p>Loading magazines...</p>
          </div>
        ) : error ? (
          <div className="admin-blank-slate" style={{ height: '300px', border: 'none', color: '#ef4444' }}>
            <AlertCircle size={32} style={{ marginBottom: '16px' }} />
            <h3>Failed to load magazines</h3>
            <p>{error}</p>
          </div>
        ) : magazines.length === 0 ? (
          <div className="admin-blank-slate" style={{ height: '300px', border: 'none' }}>
            <h3>No magazines found</h3>
            <p>Try adjusting your filters or create a new magazine.</p>
          </div>
        ) : (
          <>
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Magazine</th>
                  <th>Volume / Issue</th>
                  <th>Status</th>
                  <th>Published</th>
                  <th style={{ textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {magazines.map((magazine) => (
                  <tr key={magazine.id}>
                    <td data-label="Magazine">
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        {magazine.coverImage ? (
                          <img 
                            src={magazine.coverImage} 
                            alt={magazine.title} 
                            style={{ width: '48px', height: '64px', borderRadius: '4px', objectFit: 'cover' }} 
                          />
                        ) : (
                          <div style={{ width: '48px', height: '64px', borderRadius: '4px', background: 'rgba(255,255,255,0.05)' }} />
                        )}
                        <div>
                          <div style={{ fontWeight: 600, color: '#f8fafc', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                            {magazine.title}
                            {magazine.featured && <Star size={14} color="#f59e0b" fill="#f59e0b" />}
                          </div>
                          <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>/{magazine.slug}</div>
                        </div>
                      </div>
                    </td>
                    <td data-label="Volume / Issue">
                      {magazine.volume ? `Vol. ${magazine.volume} ` : ''}
                      {magazine.issueNumber ? `Issue ${magazine.issueNumber}` : ''}
                      {!magazine.volume && !magazine.issueNumber && '-'}
                    </td>
                    <td data-label="Status">
                      {magazine.status === 'Published' ? (
                        <span className="admin-badge green">Published</span>
                      ) : magazine.status === 'Archived' ? (
                        <span className="admin-badge gray">Archived</span>
                      ) : (
                        <span className="admin-badge gray">Draft</span>
                      )}
                    </td>
                    <td data-label="Published">
                      {magazine.publishedAt 
                        ? new Date(magazine.publishedAt).toLocaleDateString()
                        : '-'}
                    </td>
                    <td data-label="Actions" className="actions-cell">
                      <div className="admin-row-actions" style={{ justifyContent: 'flex-end' }}>
                        <Link to={`/magazines/${magazine.slug}`} target="_blank" className="admin-icon-btn" title="View Public">
                          <Eye size={18} />
                        </Link>
                        <Link 
                          to={`/admin/magazines/edit/${magazine.id}`} 
                          state={{ magazine }}
                          className="admin-icon-btn" 
                          title="Edit Magazine"
                        >
                          <Edit2 size={18} />
                        </Link>
                        <button 
                          className="admin-icon-btn danger" 
                          title="Archive"
                          onClick={() => {
                            setMagazineToDelete(magazine);
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

      {/* Delete Confirmation Modal */}
      {deleteModalOpen && magazineToDelete && (
        <div className="admin-modal-overlay">
          <div className="admin-modal-content">
            <h3 className="admin-modal-title">Archive Magazine?</h3>
            <p className="admin-modal-body">
              Are you sure you want to archive <strong>"{magazineToDelete.title}"</strong>? 
              It will no longer be visible to the public.
            </p>
            <div className="admin-modal-actions">
              <button 
                className="admin-btn admin-btn-outline"
                onClick={() => {
                  setDeleteModalOpen(false);
                  setMagazineToDelete(null);
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
                {isDeleting ? "Archiving..." : "Archive"}
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
