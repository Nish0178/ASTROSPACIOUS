import { useState } from "react";
import SpaceBg from "./Extra/Space-bg.tsx";
import "./css/base.css";
import "./css/Magazines.css";

const magazines = [
  {
    id: 1,
    edition: "July 2026",
    title: "ASTRO Monthly",
    description:
      "Explore the latest discoveries, missions and astronomical events from around the universe.",
    image:
      "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=800",
  },
  {
    id: 2,
    edition: "August 2026",
    title: "Galaxy Explorer",
    description:
      "A special edition covering galaxies, nebulae and deep space exploration.",
    image:
      "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=800",
  },
  {
    id: 3,
    edition: "September 2026",
    title: "Cosmic Horizons",
    description:
      "Read about black holes, exoplanets and the future of space technology.",
    image:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800",
  },
];

export default function Magazines() {
  const [search, setSearch] = useState("");

  const filteredMagazines = magazines.filter((magazine) =>
    magazine.title.toLowerCase().includes(search.toLowerCase())
  );

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
        {filteredMagazines.map((magazine) => (
          <div className="magazine-card glow glow-hover" key={magazine.id}>
            <img src={magazine.image} alt={magazine.title} />

            <span className="magazine-edition">
              {magazine.edition}
            </span>

            <div className="magazine-content">
              <h3>{magazine.title}</h3>

              <p>{magazine.description}</p>

              <button className="gradient">
                Read Magazine
              </button>
            </div>
          </div>
        ))}

        {filteredMagazines.length === 0 && (
          <h2 className="no-results">
            📚 No magazines found.
          </h2>
        )}
      </section>
    </main>
  );
}