import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import SpaceBg from "./Extra/Space-bg";
import { magazineApi, PublicMagazine } from "./services/api/magazineApi";
import { getMediaUrl } from "./utils/urlUtils";
import { BookOpen } from "lucide-react";
import "./css/Articles.css";
import "./css/base.css";
import "./css/MagazineDetails.css";

export default function MagazineDetails() {
  const { slug } = useParams();
  const [magazine, setMagazine] = useState<PublicMagazine | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMagazine = async () => {
      if (!slug) return;
      try {
        setLoading(true);
        const data = await magazineApi.getMagazineBySlug(slug);
        setMagazine(data);
      } catch (err: any) {
        setError("Magazine Not Found");
      } finally {
        setLoading(false);
      }
    };

    fetchMagazine();
  }, [slug]);

  if (loading) {
    return (
      <main
        style={{
          minHeight: "100vh",
          padding: "120px 40px",
          background: "#030526",
          color: "white",
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <h2>Loading Magazine...</h2>
      </main>
    );
  }

  if (error || !magazine) {
    return (
      <main
        style={{
          minHeight: "100vh",
          padding: "120px 40px",
          background: "#030526",
          color: "white",
        }}
      >
        <h1>{error || "Magazine Not Found"}</h1>

        <Link
          to="/magazines"
          style={{
            color: "#60A5FA",
            textDecoration: "none",
          }}
        >
          ← Back to Magazines
        </Link>
      </main>
    );
  }

  const formatPublishDate = () => {
    if (magazine.publishedAt) {
      return new Date(magazine.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    }
    return "Unknown Date";
  };

  const formatIssue = () => {
    if (magazine.volume && magazine.issueNumber) return `Vol ${magazine.volume}, Issue ${magazine.issueNumber}`;
    if (magazine.volume) return `Volume ${magazine.volume}`;
    if (magazine.issueNumber) return `Issue ${magazine.issueNumber}`;
    return "Special Issue";
  };

  return (
    <main className="magazine-details-page">
      <SpaceBg />

      <section className="magazine-container">
        <Link
          to="/magazines"
          className="back-link"
        >
          ← Back to Magazines
        </Link>

        <h1 className="magazine-title">
          {magazine.title}
        </h1>

        <div className="magazine-meta">
          <span>{formatIssue()}</span>

          <span>•</span>

          <span>{formatPublishDate()}</span>
          
          {/* We don't have 'pages' in DB schema, so we can omit it or hardcode. */}
        </div>

        <img
          src={getMediaUrl(magazine.coverImage) || "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=800"}
          alt={magazine.title}
          className="magazine-cover"
        />

        <section className="magazine-content">
          <h2>About this Magazine</h2>

          <p>{magazine.description}</p>
        </section>

        <div className="magazine-actions">
          {magazine.pdfUrl ? (
            <Link to={`/magazines/${magazine.slug}/read`} className="magazine-read-link" style={{ textDecoration: 'none' }}>
              <button 
                className="gradient magazine-read-btn"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "10px",
                  padding: "16px 32px",
                  fontSize: "1.1rem",
                  fontWeight: "600",
                  borderRadius: "30px",
                  border: "none",
                  color: "white",
                  cursor: "pointer",
                  transition: "transform 0.3s ease",
                }}
              >
                <BookOpen size={20} /> Read Magazine
              </button>
            </Link>
          ) : (
            <button className="gradient" style={{ opacity: 0.5, cursor: 'not-allowed', padding: "16px 32px", borderRadius: "30px", border: "none", color: "white" }}>
              PDF NOT AVAILABLE
            </button>
          )}
        </div>
      </section>
    </main>
  );
}