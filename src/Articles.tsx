import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, ChevronDown } from "lucide-react";
import SpaceBg from "./Extra/Space-bg.tsx";
import { articles } from "./data/articles";
import FeaturedArticle from "./components/FeaturedArticle/FeaturedArticle";
import { ArticlesGrid } from "./components/LatestArticles/ArticlesGrid";
import { ArticlesEngagement } from "./components/ArticlesEngagement/ArticlesEngagement";
import "./css/base.css";
import "./css/Articles.css";

const FILTER_CATEGORIES = [
  "All",
  "Astronomy",
  "Astrophysics",
  "Cosmology",
  "Space Missions",
  "Rocket Science",
  "ISRO",
  "NASA",
  "Black Holes",
  "Exoplanets",
  "Satellites",
  "Space Technology"
];

export default function Articles() {
  const [search, setSearch] = useState("");
  
  // States for the new Search & Filter section
  const [filterSearch, setFilterSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortOption, setSortOption] = useState("Latest");

  // Filtering logic
  const filteredArticles = useMemo(() => {
    return articles.filter((article) => {
      const query = filterSearch.toLowerCase();
      const matchesSearch = 
        article.title.toLowerCase().includes(query) ||
        article.category.toLowerCase().includes(query) ||
        article.description.toLowerCase().includes(query);

      const matchesCategory = 
        selectedCategory === "All" || 
        article.category.toLowerCase() === selectedCategory.toLowerCase();

      return matchesSearch && matchesCategory;
    });
  }, [filterSearch, selectedCategory]);

  const sortedArticles = useMemo(() => {
    const sorted = [...filteredArticles];
    if (sortOption === "Oldest") {
       sorted.reverse();
    }
    return sorted;
  }, [filteredArticles, sortOption]);

  return (
    <main className="articles-page">
      <SpaceBg />

      <section className="premium-articles-hero">
        <div className="hero-content">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="hero-title"
          >
            Explore the Universe <br /> Through <span className="gradient-text">Knowledge</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="hero-subtitle"
          >
            Dive into our curated collection of deep-space discoveries, 
            astrophysical theories, and the latest missions expanding human horizons.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="hero-ctas"
          >
            <button className="cta-btn primary">Start Reading</button>
            <button className="cta-btn secondary">Browse Categories</button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="search-container"
          >
            <div className="search-bar-wrapper">
              <Search className="search-icon" size={20} />
              <input
                type="text"
                placeholder="Search articles, topics, planets, missions..."
                className="premium-search-input"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="hero-illustration"
        >
          <motion.img
            animate={{ y: [-15, 15, -15] }}
            transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
            src="https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=2048&auto=format&fit=crop"
            alt="Space illustration"
            className="floating-img"
          />
        </motion.div>
      </section>

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="hero-statistics"
      >
        <div className="stat-item">
          <h3>500+</h3>
          <p>Articles</p>
        </div>
        <div className="stat-divider"></div>
        <div className="stat-item">
          <h3>12</h3>
          <p>Categories</p>
        </div>
        <div className="stat-divider"></div>
        <div className="stat-item">
          <h3>50k+</h3>
          <p>Readers</p>
        </div>
        <div className="stat-divider"></div>
        <div className="stat-item">
          <h3>New</h3>
          <p>Weekly Content</p>
        </div>
      </motion.section>

      {/* New Premium Search & Filter Section */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="search-filter-section"
      >
        <div className="filter-search-wrapper">
          <Search className="filter-search-icon" size={20} />
          <input
            type="text"
            placeholder="Search articles, topics, missions, planets..."
            className="filter-search-input"
            value={filterSearch}
            onChange={(e) => setFilterSearch(e.target.value)}
          />
          {filterSearch && (
            <button className="clear-search-btn" onClick={() => setFilterSearch("")}>
              <X size={18} />
            </button>
          )}
        </div>

        <div className="filter-controls">
          <div className="category-chips">
            {FILTER_CATEGORIES.map((cat, index) => (
              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.5 + index * 0.05 }}
                key={cat}
                className={`category-chip ${selectedCategory === cat ? "active" : ""}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </motion.button>
            ))}
          </div>

          <motion.div 
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             transition={{ duration: 0.5, delay: 0.8 }}
             className="sort-dropdown-wrapper"
          >
            <select 
              className="sort-dropdown"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
            >
              <option value="Latest">Latest</option>
              <option value="Most Popular">Most Popular</option>
              <option value="Featured">Featured</option>
              <option value="Oldest">Oldest</option>
            </select>
            <ChevronDown className="sort-icon" size={16} />
          </motion.div>
        </div>

        <div className="filter-results-text">
          Showing {sortedArticles.length} Articles
        </div>

        <AnimatePresence>
          {sortedArticles.length === 0 && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              className="empty-state"
            >
              <img 
                src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=600&auto=format&fit=crop" 
                alt="No articles found" 
                className="empty-state-img"
              />
              <h3>No articles found.</h3>
              <p>Try another keyword or category.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.section>

      {/* Featured Article Section */}
      <FeaturedArticle article={articles.find(a => a.featured) || articles[0]} />

      {/* Latest Articles Grid Section */}
      <ArticlesGrid />

      {/* Engagement Section (Newsletter, CTA, Socials) */}
      <ArticlesEngagement />

    </main>
  );
}