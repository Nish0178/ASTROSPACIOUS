import { useState } from "react";
import SpaceBg from "./Extra/Space-bg.tsx";
import "./css/base.css";
import "./css/Articles.css";

const articles = [
  {
  id: 1,
  category: "Solar System",
  title: "Journey Through the Solar System",
  description:
    "Explore the planets, moons and fascinating objects of our solar system.",
  image:
    "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=800",
},
  {
  id: 2,
  category: "Black Holes",
  title: "The Mystery of Black Holes",
  description:
    "Understand how black holes are formed and why they are so powerful.",
  image:
    "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=800",
},
  {
  id: 3,
  category: "Space Telescope",
  title: "James Webb Space Telescope",
  description:
    "Discover how the James Webb Space Telescope is transforming astronomy.",
  image:
    "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800",
},
];

export default function Articles() {
  const [search, setSearch] = useState("");

  const filteredArticles = articles.filter((article) =>
    article.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="articles-page">
      <SpaceBg />

      <section className="articles-hero">
        <h1 className="gradient-text">ARTICLES</h1>

        <p>
          Explore astronomy, astrophysics and the latest discoveries from the
          universe.
        </p>

        <input
          type="text"
          placeholder="Search articles..."
          className="article-search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </section>

      <section className="articles-grid">
        {filteredArticles.map((article) => (
          <div className="article-card glow glow-hover" key={article.id}>
    <img src={article.image} alt={article.title} />

    <span className="article-category">
        {article.category}
    </span>

    <div className="article-content">
              <h3>{article.title}</h3>

              <p>{article.description}</p>

              <button className="gradient">Read More</button>
            </div>
          </div>
        ))}

        {filteredArticles.length === 0 && (
          <h2
            style={{
              color: "white",
              textAlign: "center",
              gridColumn: "1 / -1",
              marginTop: "40px",
            }}
          >
            No articles found.
          </h2>
        )}
      </section>
    </main>
  );
}