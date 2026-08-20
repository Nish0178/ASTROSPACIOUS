import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import SpaceBg from "./Extra/Space-bg.tsx";
import { magazineApi, PublicMagazine } from "./services/api/magazineApi";
import { getMediaUrl } from "./utils/urlUtils";
import { ArrowRight, Calendar, BookOpen } from "lucide-react";
import "./css/base.css";
import "./components/LatestArticles/LatestArticles.css";
import "./css/Magazines.css";

export default function Magazines() {
  const [search, setSearch] = useState("");
  const [magazines, setMagazines] = useState<PublicMagazine[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMagazines = async () => {
      try {
        setLoading(true);
        const res = await magazineApi.getMagazines();
        setMagazines(res.data);
      } catch (err: any) {
        setError(err.message || "Failed to load magazines.");
      } finally {
        setLoading(false);
      }
    };

    fetchMagazines();
  }, []);

  const filteredMagazines = magazines.filter((magazine) =>
    magazine.title.toLowerCase().includes(search.toLowerCase()) || 
    magazine.description.toLowerCase().includes(search.toLowerCase())
  );

  const getMonthBadge = (magazine: PublicMagazine) => {
    if (magazine.publishedAt) {
      const date = new Date(magazine.publishedAt);
      return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    }
    return "Special Edition";
  };

  const getVolIssue = (magazine: PublicMagazine) => {
    if (magazine.volume && magazine.issueNumber) {
      return `Vol ${magazine.volume} / Issue ${magazine.issueNumber}`;
    }
    if (magazine.volume) return `Vol ${magazine.volume}`;
    if (magazine.issueNumber) return `Issue ${magazine.issueNumber}`;
    return "Standard Issue";
  };

  return (
    <main className="magazines-page">
      <SpaceBg />

      <section className="magazines-hero">
        <h1 className="gradient-text">MAGAZINES</h1>

        <p>
          Browse our latest magazine editions and explore the universe through
          detailed stories and discoveries.
        </p>

        <input
          type="text"
          placeholder="Search magazines..."
          className="magazine-search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </section>

      <section className="magazines-grid">
        {loading ? (
          <h2 className="no-results">Loading magazines...</h2>
        ) : error ? (
          <h2 className="no-results" style={{ color: '#ef4444' }}>{error}</h2>
        ) : (
          <>
            {filteredMagazines.map((magazine) => (
              <div 
                className="latest-article-card magazine-card-premium" 
                key={magazine.id}
                onClick={() => navigate(`/magazines/${magazine.slug}`)}
              >
                <div className="card-image-wrapper">
                  <img 
                    src={getMediaUrl(magazine.coverImage) || "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=800"} 
                    alt={magazine.title} 
                    className="card-cover-image" 
                  />
                  <span className="card-category-badge">
                    {getMonthBadge(magazine)}
                  </span>
                </div>

                <div className="card-content">
                  <div className="card-meta">
                    <span className="meta-item">
                      <BookOpen size={14} /> {getVolIssue(magazine)}
                    </span>
                    <span className="meta-item">
                      <Calendar size={14} /> 
                      {magazine.publishedAt 
                        ? new Date(magazine.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
                        : 'Coming Soon'}
                    </span>
                  </div>
                  
                  <h3 className="card-title">{magazine.title}</h3>
                  <p className="card-excerpt">{magazine.description}</p>
                  
                  <div className="card-footer" style={{ marginTop: 'auto', paddingTop: '15px' }}>
                    <Link 
                      to={`/magazines/${magazine.slug}`} 
                      className="card-read-more" 
                      onClick={(e) => e.stopPropagation()}
                      style={{ width: '100%', justifyContent: 'center' }}
                    >
                      Read Magazine <ArrowRight size={16} className="btn-icon" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}

            {filteredMagazines.length === 0 && (
              <h2 className="no-results">
                📚 No magazines found.
              </h2>
            )}
          </>
        )}
      </section>
    </main>
  );
}