import { Link, useParams } from "react-router-dom";
import SpaceBg from "./Extra/Space-bg";
import { magazines } from "./data/magazines";
import "./css/Articles.css";
import "./css/base.css";
import "./css/MagazineDetails.css";

export default function MagazineDetails() {
  const { slug } = useParams();

  const magazine = magazines.find(
    (magazine) => magazine.slug === slug
  );

  if (!magazine) {
    return (
      <main
        style={{
          minHeight: "100vh",
          padding: "120px 40px",
          background: "#030526",
          color: "white",
        }}
      >
        <h1>Magazine Not Found</h1>

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
          <span>{magazine.issue}</span>

          <span>•</span>

          <span>{magazine.publishDate}</span>

          <span>•</span>

          <span>{magazine.pages} Pages</span>
        </div>

        <img
          src={magazine.cover}
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
          <button className="gradient">
            📖 READ ONLINE
          </button>

          <a
            href={magazine.pdf}
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
        </div>
      </section>
    </main>
  );
}