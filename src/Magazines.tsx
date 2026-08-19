import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SpaceBg from "./Extra/Space-bg.tsx";
import { magazineApi, PublicMagazine } from "./services/api/magazineApi";
import "./css/base.css";
import "./css/Magazines.css";

export default function Magazines() {
  const [search, setSearch] = useState("");
  const [magazines, setMagazines] = useState<PublicMagazine[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  const formatEdition = (magazine: PublicMagazine) => {
    if (magazine.publishedAt) {
      const date = new Date(magazine.publishedAt);
      return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    }
    if (magazine.volume || magazine.issueNumber) {
      return `Vol ${magazine.volume || '?'} / Issue ${magazine.issueNumber || '?'}`;
    }
    return "Special Edition";
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
              <div className="magazine-card glow glow-hover" key={magazine.id}>
                <img src={magazine.coverImage || "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=800"} alt={magazine.title} />

                <span className="magazine-edition">
                  {formatEdition(magazine)}
                </span>

                <div className="magazine-content">
                  <h3>{magazine.title}</h3>

                  <p>{magazine.description}</p>

                  <Link to={`/magazines/${magazine.slug}`} style={{ textDecoration: 'none' }}>
                    <button className="gradient">
                      Read Magazine
                    </button>
                  </Link>
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