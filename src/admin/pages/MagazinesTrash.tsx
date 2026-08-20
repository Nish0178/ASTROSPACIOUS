import { useState, useEffect, useCallback } from 'react';
import { adminMagazineApi, AdminMagazine } from '../services/adminMagazineApi';
import { Search, Loader2, AlertCircle, RotateCcw, Trash2, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function MagazinesTrash() {
  const [magazines, setMagazines] = useState<AdminMagazine[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Pagination & Filtering state
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [sort, setSort] = useState<"Newest" | "Oldest">("Newest");

  // Bulk Selection State
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isBulking, setIsBulking] = useState(false);

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

      const res = await adminMagazineApi.getTrashMagazines(params);
      setMagazines(res.data);
      setTotalPages(res.meta.totalPages);
      setTotalItems(res.meta.total);
      setError(null);
    } catch (err: any) {
      setError(err.message || "Failed to load deleted magazines.");
    } finally {
      setLoading(false);
    }
  }, [page, sort, debouncedSearch]);

  useEffect(() => {
    fetchMagazines();
  }, [fetchMagazines]);

  const handleRestore = async (id: string) => {
    try {
      await adminMagazineApi.restoreMagazine(id);
      fetchMagazines(); // Refresh list
    } catch (err: any) {
      alert("Failed to restore magazine: " + err.message);
    }
  };

  const handlePermanentDeleteConfirm = async () => {
    if (!magazineToDelete) return;
    setIsDeleting(true);
    try {
      await adminMagazineApi.permanentDeleteMagazine(magazineToDelete.id);
      setDeleteModalOpen(false);
      setMagazineToDelete(null);
      
      // If we permanently deleted the only item(s) on the page and we're not on page 1, go back
      if (magazines.length === 1 && page > 1) {
        setPage(p => p - 1);
      } else {
        fetchMagazines();
      }
    } catch (err: any) {
      alert("Failed to permanently delete magazine: " + err.message);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleBulkRestore = async () => {
    if (selectedIds.length === 0) return;
    if (!confirm(`Are you sure you want to restore ${selectedIds.length} magazines?`)) return;
    
    setIsBulking(true);
    try {
      await adminMagazineApi.bulkRestoreMagazines(selectedIds);
      setSelectedIds([]);
      fetchMagazines();
    } catch (err: any) {
      alert("Failed to bulk restore: " + err.message);
    } finally {
      setIsBulking(false);
    }
  };

  const handleBulkDelete = async () => {
    if (selectedIds.length === 0) return;
    if (!confirm(`WARNING: This action cannot be undone.\n\nAre you sure you want to PERMANENTLY delete ${selectedIds.length} magazines?`)) return;
    
    setIsBulking(true);
    try {
      await adminMagazineApi.bulkPermanentDeleteMagazines(selectedIds);
      setSelectedIds([]);
      fetchMagazines();
    } catch (err: any) {
      alert("Failed to bulk delete: " + err.message);
    } finally {
      setIsBulking(false);
    }
  };

  const toggleSelectAll = () => {
    if (selectedIds.length === magazines.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(magazines.map(m => m.id));
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
          <h1 className="admin-page-title" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Link to="/admin/magazines" className="admin-icon-btn"><ArrowLeft size={20} /></Link>
            Magazine Trash
          </h1>
          <p className="admin-page-subtitle">Manage deleted magazines. Items here can be restored or permanently deleted.</p>
        </div>
      </div>

      <div className="admin-table-container">
        {/* Toolbar (Search & Filters) */}
        <div className="admin-table-toolbar">
          <div className="admin-table-search">
            <Search size={18} />
            <input 
              type="text" 
              placeholder="Search trash by title or slug..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="admin-table-filters">
            <select value={sort} onChange={(e) => { setSort(e.target.value as any); setPage(1); }}>
              <option value="Newest">Recently Deleted</option>
              <option value="Oldest">Oldest Deleted</option>
            </select>
          </div>
        </div>

        {/* Loading / Error / Empty States */}
        {loading ? (
          <div className="admin-loader-container" style={{ height: '300px' }}>
            <Loader2 size={32} className="lucide-spin" />
            <p>Loading trash...</p>
          </div>
        ) : error ? (
          <div className="admin-blank-slate" style={{ height: '300px', border: 'none', color: '#ef4444' }}>
            <AlertCircle size={32} style={{ marginBottom: '16px' }} />
            <h3>Failed to load trash</h3>
            <p>{error}</p>
          </div>
        ) : magazines.length === 0 ? (
          <div className="admin-blank-slate" style={{ height: '300px', border: 'none' }}>
            <Trash2 size={48} color="#475569" style={{ marginBottom: '16px' }} />
            <h3>No deleted magazines</h3>
            <p>Your trash is empty.</p>
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
                      checked={magazines.length > 0 && selectedIds.length === magazines.length}
                      onChange={toggleSelectAll}
                    />
                  </th>
                  <th>Magazine</th>
                  <th>Volume / Issue</th>
                  <th>Status</th>
                  <th>Deleted Date</th>
                  <th>Deleted By</th>
                  <th style={{ textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {magazines.map((magazine) => (
                  <tr key={magazine.id} className={selectedIds.includes(magazine.id) ? "selected" : ""}>
                    <td style={{ paddingLeft: '24px' }}>
                      <input 
                        type="checkbox" 
                        className="admin-checkbox"
                        checked={selectedIds.includes(magazine.id)}
                        onChange={() => toggleSelect(magazine.id)}
                      />
                    </td>
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
                          <div style={{ fontWeight: 600, color: '#f8fafc', marginBottom: '4px' }}>
                            {magazine.title}
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
                      <span className="admin-badge danger" style={{ backgroundColor: '#fee2e2', color: '#b91c1c' }}>TRASH</span>
                    </td>
                    <td data-label="Deleted Date">
                      {/* @ts-ignore */}
                      {magazine.deletedAt ? new Date(magazine.deletedAt).toLocaleDateString() : 'Unknown'}
                    </td>
                    <td data-label="Deleted By">
                      {/* @ts-ignore */}
                      {magazine.deletedBy ? "Admin" : "System"}
                    </td>
                    <td data-label="Actions" className="actions-cell">
                      <div className="admin-row-actions" style={{ justifyContent: 'flex-end' }}>
                        <button 
                          className="admin-icon-btn" 
                          title="Restore"
                          onClick={() => handleRestore(magazine.id)}
                        >
                          <RotateCcw size={18} />
                        </button>
                        <button 
                          className="admin-icon-btn danger" 
                          title="Permanent Delete"
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

      {/* Floating Bulk Actions Bar */}
      {selectedIds.length > 0 && (
        <div className="admin-bulk-actions-bar">
          <span>{selectedIds.length} magazine{selectedIds.length > 1 ? 's' : ''} selected</span>
          <div className="admin-bulk-actions-buttons">
            <button className="admin-btn admin-btn-outline" onClick={handleBulkRestore} disabled={isBulking}>
              <RotateCcw size={16} /> Restore
            </button>
            <button className="admin-btn admin-btn-danger" onClick={handleBulkDelete} disabled={isBulking}>
              <Trash2 size={16} /> Permanently Delete
            </button>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteModalOpen && magazineToDelete && (
        <div className="admin-modal-overlay">
          <div className="admin-modal-content">
            <h3 className="admin-modal-title" style={{ color: '#ef4444' }}>Permanent Delete</h3>
            <p className="admin-modal-body">
              This action cannot be undone. Are you sure you want to permanently delete <strong>"{magazineToDelete.title}"</strong>? 
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
                onClick={handlePermanentDeleteConfirm}
                disabled={isDeleting}
              >
                {isDeleting ? "Deleting..." : "Yes, Delete Permanently"}
              </button>
            </div>
          </div>
        </div>
      )}
      
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
