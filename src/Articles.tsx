import { useState } from "react";
import SpaceBg from "./Extra/Space-bg.tsx";
import "./css/base.css";
import "./css/Articles.css";
import { articles } from "./data/articles";
import ArticleCard from "./components/ArticleCard/ArticleCard";

export default function Articles() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const categories = [
  "All",
  ...new Set(articles.map((article) => article.category)),
];

  const filteredArticles = articles.filter((article) => {
  const query = search.toLowerCase();

  const matchesSearch =
    article.title.toLowerCase().includes(query) ||
    article.category.toLowerCase().includes(query) ||
    article.description.toLowerCase().includes(query);

  const matchesCategory =
    selectedCategory === "All" ||
    article.category === selectedCategory;

  return matchesSearch && matchesCategory;
});
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
        <div className="category-filter">
  {categories.map((category) => (
    <button
      key={category}
      className={
        selectedCategory === category
          ? "category-btn active"
          : "category-btn"
      }
      onClick={() => setSelectedCategory(category)}
    >
      {category}
    </button>
  ))}
</div>
      </section>

      <section className="articles-grid">
        {filteredArticles.map((article) => (
  <ArticleCard
    key={article.id}
    article={article}
  />
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