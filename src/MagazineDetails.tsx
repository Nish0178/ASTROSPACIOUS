import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import SpaceBg from "./Extra/Space-bg";
import { magazineApi, PublicMagazine } from "./services/api/magazineApi";
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
          src={magazine.coverImage || "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=800"}
          alt={magazine.title}
          className="article-image"
        />

        <section className="magazine-content">
          <h2>About this Magazine</h2>

          <p>{magazine.description}</p>
        </section>

        <div
          style={{
            display: "flex",
            gap: "20px",
            marginTop: "40px",
            flexWrap: "wrap",
          }}
        >
          {magazine.pdfUrl ? (
            <>
              <Link to={`/magazines/${magazine.slug}/read`} style={{ textDecoration: 'none' }}>
                <button className="gradient">
                  📖 READ ONLINE
                </button>
              </Link>

              <a
                href={magazine.pdfUrl}
                download
                className="gradient"
                style={{
                  textDecoration: "none",
                  padding: "14px 24px",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                ⬇ DOWNLOAD PDF
              </a>
            </>
          ) : (
            <button className="gradient" style={{ opacity: 0.5, cursor: 'not-allowed' }}>
              PDF NOT AVAILABLE
            </button>
          )}
        </div>
      </section>
    </main>
  );
}