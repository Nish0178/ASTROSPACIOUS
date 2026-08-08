import { useEffect, useState } from 'react';
import { FileText, BookOpen, Users, MessageSquare, Loader2, AlertCircle } from 'lucide-react';
import { adminApi, DashboardStats } from '../services/adminApi';

export default function Dashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    const fetchStats = async () => {
      try {
        const data = await adminApi.getDashboardStats();
        if (mounted) {
          setStats(data);
          setError(null);
        }
      } catch (err: any) {
        if (mounted) {
          setError(err.message || 'Failed to load dashboard statistics.');
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    fetchStats();

    return () => {
      mounted = false;
    };
  }, []);

  if (loading) {
    return (
      <div className="admin-loader-container">
        <Loader2 size={40} className="lucide-spin" />
        <p>Loading overview...</p>
      </div>
    );
  }

  if (error || !stats) {
    return (
      <div className="admin-blank-slate" style={{ border: '1px solid rgba(239, 68, 68, 0.3)', color: '#ef4444' }}>
        <AlertCircle size={40} style={{ marginBottom: '16px' }} />
        <h3>Failed to load dashboard</h3>
        <p style={{ color: '#f8fafc' }}>{error}</p>
      </div>
    );
  }

  const metrics = [
    { title: 'Total Articles', value: stats.totalArticles, icon: <FileText size={24} color="#3b82f6" /> },
    { title: 'Published Articles', value: stats.publishedArticles, icon: <FileText size={24} color="#10b981" /> },
    { title: 'Draft Articles', value: stats.draftArticles, icon: <FileText size={24} color="#f59e0b" /> },
    { title: 'Articles in Trash', value: stats.articlesInTrash || 0, icon: <FileText size={24} color="#64748b" /> },
    { title: 'Total Magazines', value: stats.totalMagazines, icon: <BookOpen size={24} color="#8b5cf6" /> },
    { title: 'Total Subscribers', value: stats.totalSubscribers, icon: <Users size={24} color="#ec4899" /> },
    { title: 'Contact Messages', value: stats.totalMessages, icon: <MessageSquare size={24} color="#f43f5e" /> },
  ];

  return (
    <div>
      <div className="admin-page-header">
        <h1 className="admin-page-title">Dashboard Overview</h1>
        <p className="admin-page-subtitle">Welcome back. Here's what's happening today.</p>
      </div>

      <div className="admin-dashboard-grid">
        {metrics.map((metric, i) => (
          <div key={i} className="admin-metric-card">
            <div className="admin-metric-header">
              <h3 className="admin-metric-title">{metric.title}</h3>
              <div className="admin-metric-icon-wrapper">
                {metric.icon}
              </div>
            </div>
            <p className="admin-metric-value">{metric.value.toLocaleString()}</p>
          </div>
        ))}
      </div>

      <div className="admin-blank-slate" style={{ height: '300px' }}>
        <h3>Recent Activity</h3>
        <p>Live analytics and activity charts will appear here.</p>
      </div>
      
      {/* Ensure the spin class is available for the loader */}
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
