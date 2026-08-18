import { useState, useEffect, useCallback } from 'react';
import { adminNewsletterApi, AdminSubscriber } from '../services/adminNewsletterApi';
import { Loader2, AlertCircle, Trash2 } from 'lucide-react';

export default function Subscribers() {
  const [subscribers, setSubscribers] = useState<AdminSubscriber[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  const fetchSubscribers = useCallback(async () => {
    setLoading(true);
    try {
      const res = await adminNewsletterApi.getSubscribers(page, 10);
      setSubscribers(res.data);
      setTotalPages(res.meta.totalPages);
      setTotalItems(res.meta.total);
      setError(null);
    } catch (err: any) {
      setError(err.message || "Failed to load subscribers.");
    } finally {
      setLoading(false);
    }
  }, [page]);

  useEffect(() => {
    fetchSubscribers();
  }, [fetchSubscribers]);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this subscriber?")) return;
    try {
      await adminNewsletterApi.deleteSubscriber(id);
      fetchSubscribers();
    } catch (err: any) {
      alert("Failed to delete subscriber: " + err.message);
    }
  };

  return (
    <div>
      <div className="admin-page-header">
        <h1 className="admin-page-title">Subscribers Management</h1>
      </div>
      
      <div className="admin-table-container">
        {loading ? (
          <div className="admin-loader-container" style={{ height: '300px' }}>
            <Loader2 size={32} className="lucide-spin" />
            <p>Loading subscribers...</p>
          </div>
        ) : error ? (
          <div className="admin-blank-slate" style={{ height: '300px', border: 'none', color: '#ef4444' }}>
            <AlertCircle size={32} style={{ marginBottom: '16px' }} />
            <h3>Failed to load subscribers</h3>
            <p>{error}</p>
          </div>
        ) : subscribers.length === 0 ? (
          <div className="admin-blank-slate" style={{ height: '300px', border: 'none' }}>
            <h3>No subscribers found</h3>
            <p>You do not have any newsletter subscribers yet.</p>
          </div>
        ) : (
          <>
            <table className="admin-table">
              <thead>
                <tr>
                  <th style={{ paddingLeft: '24px' }}>Email</th>
                  <th>Status</th>
                  <th>Subscribed On</th>
                  <th style={{ textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {subscribers.map((sub) => (
                  <tr key={sub.id}>
                    <td style={{ paddingLeft: '24px', fontWeight: 500 }}>{sub.email}</td>
                    <td>
                      {sub.verified ? (
                        <span className="admin-badge green">Verified</span>
                      ) : (
                        <span className="admin-badge gray">Unverified</span>
                      )}
                    </td>
                    <td>{new Date(sub.subscribedAt).toLocaleDateString()}</td>
                    <td style={{ textAlign: 'right' }}>
                      <button 
                        className="admin-icon-btn danger" 
                        title="Delete"
                        onClick={() => handleDelete(sub.id)}
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

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
