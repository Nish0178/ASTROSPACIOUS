import { useEffect, useState } from 'react';
import { FileText, BookOpen, Users, MessageSquare, Loader2, AlertCircle } from 'lucide-react';
import { adminApi, DashboardStats } from '../services/adminApi';
import { adminArticleApi, AdminArticle } from '../services/adminArticleApi';
import { getMediaUrl } from '../../utils/urlUtils';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [latestArticles, setLatestArticles] = useState<AdminArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    const fetchStats = async () => {
      try {
        const [statsData, articlesData] = await Promise.all([
          adminApi.getDashboardStats(),
          adminArticleApi.getArticles({ limit: 100 })
        ]);
        if (mounted) {
          setStats(statsData);
          
          const seventyTwoHoursAgo = new Date();
          seventyTwoHoursAgo.setHours(seventyTwoHoursAgo.getHours() - 72);
          
          // adminArticleApi.getArticles returns the array directly in some implementations, 
          // or an object with .data in others. Let's handle both.
          const articlesArray = Array.isArray(articlesData) ? articlesData : (articlesData.data || []);
          
          const recent = articlesArray.filter((article: AdminArticle) => {
            const publishDate = article.publishedAt ? new Date(article.publishedAt) : new Date(article.createdAt);
            return publishDate >= seventyTwoHoursAgo && article.status === 'Published';
          });
          
          // Sort by newest first
          recent.sort((a, b) => {
            const dateA = a.publishedAt ? new Date(a.publishedAt) : new Date(a.createdAt);
            const dateB = b.publishedAt ? new Date(b.publishedAt) : new Date(b.createdAt);
            return dateB.getTime() - dateA.getTime();
          });
          
          setLatestArticles(recent);
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

      <div style={{ marginTop: '40px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#f8fafc', margin: 0 }}>Latest Articles (Last 3 Days)</h2>
          <Link to="/admin/articles" style={{ color: '#8b5cf6', textDecoration: 'none', fontSize: '0.875rem', fontWeight: '600' }}>
            View All
          </Link>
        </div>

        {latestArticles.length === 0 ? (
          <div className="admin-blank-slate" style={{ height: '200px' }}>
            <FileText size={40} style={{ marginBottom: '16px', color: '#94a3b8' }} />
            <h3>No recent articles</h3>
            <p>No articles published in the last 3 days.</p>
          </div>
        ) : (
          <div className="admin-dashboard-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))' }}>
            {latestArticles.map((article) => (
              <div key={article.id} className="admin-metric-card" style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                  {article.coverImage ? (
                    <img 
                      src={getMediaUrl(article.coverImage)} 
                      alt={article.title} 
                      style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '8px' }} 
                    />
                  ) : (
                    <div style={{ width: '80px', height: '80px', background: 'rgba(255,255,255,0.05)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <FileText size={24} color="#94a3b8" />
                    </div>
                  )}
                  <div style={{ flex: 1 }}>
                    <h4 style={{ margin: '0 0 4px 0', fontSize: '1rem', fontWeight: '600', color: '#f8fafc', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                      {article.title}
                    </h4>
                    <p style={{ margin: 0, fontSize: '0.75rem', color: '#94a3b8' }}>
                      {new Date(article.publishedAt || article.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                    </p>
                    <div style={{ marginTop: '8px' }}>
                      <span className={`admin-badge ${article.status === 'Published' ? 'green' : article.status === 'Draft' ? 'purple' : 'gray'}`}>
                        {article.status}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
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
