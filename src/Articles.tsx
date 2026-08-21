import { useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, X, ChevronDown } from "lucide-react";
import SpaceBg from "./Extra/Space-bg.tsx";
import { articleApi, PublicArticle } from "./services/api/articleApi";
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
  const [searchQuery, setSearchQuery] = useState("");
  const [articles, setArticles] = useState<PublicArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => {
  loadArticles();
}, []);

const loadArticles = async () => {
  try {
    setLoading(true);

    const response = await articleApi.getArticles();

    setArticles(response);

  } catch (err) {
    console.error(err);
    setError("Failed to load articles");
  } finally {
    setLoading(false);
  }
};

  // States for the new Search & Filter section
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortOption, setSortOption] = useState("Latest");

  // Handlers for hero buttons
  const scrollToFeatured = () => {
    document.getElementById("featured-article")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToFilters = () => {
    document.getElementById("search-filter")?.scrollIntoView({ behavior: "smooth" });
  };

  // Base published articles
  const publishedArticles = useMemo(() => {
    return articles.filter((article) => {
      const isPublished = !article.status || String(article.status).toLowerCase() === 'published';
      const isDeleted = article.isDeleted === true;
      return isPublished && !isDeleted;
    });
  }, [articles]);

  // Featured articles
  const featuredArticles = useMemo(() => {
    return publishedArticles.filter(a => a.featured);
  }, [publishedArticles]);


  // Filtering logic
  const filteredArticles = useMemo(() => {
    return publishedArticles.filter((article) => {
      const query = searchQuery.trim().toLowerCase();
      
      const searchableText = [
        article.title,
        article.slug,
        article.excerpt,
        article.author?.name,
        article.category?.name,
        ...(article.tags ?? [])
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      const matchesSearch = !query || searchableText.includes(query);

      const matchesCategory = 
        selectedCategory === "All" || 
        (article.category?.name && article.category.name.toLowerCase() === selectedCategory.toLowerCase());

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory, publishedArticles]);

  const sortedArticles = useMemo(() => {
    const sorted = [...filteredArticles];
    if (sortOption === "Oldest") {
      sorted.reverse();
    } else if (sortOption === "Reading Time") {
      sorted.sort((a, b) => a.readingTime - b.readingTime);
    } else if (sortOption === "Most Popular") {
      // Just a mock shuffle/sort based on title length or random to simulate popular
      sorted.sort((a, b) => b.title.length - a.title.length);
    }
    // "Latest" is default as mock data is chronological
    return sorted;
  }, [filteredArticles, sortOption]);

  // Latest articles (Filtered to last 3 days for the Homepage Latest Articles section)
  const latestArticles = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const cutoffDate = new Date(today);
    cutoffDate.setDate(today.getDate() - 2);

    return sortedArticles.filter(article => {
      if (!article.publishedAt) return false;
      const pubDate = new Date(article.publishedAt);
      if (isNaN(pubDate.getTime())) return false;
      return pubDate >= cutoffDate;
    });
  }, [sortedArticles]);

  if (loading) {
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: "22px",
      }}
    >
      Loading articles...
    </div>
  );
}
if (error) {
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "red",
        fontSize: "22px",
      }}
    >
      {error}
    </div>
  );
}
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
            <button className="cta-btn primary" onClick={scrollToFeatured}>Start Reading</button>
            <button className="cta-btn secondary" onClick={scrollToFilters}>Browse Categories</button>
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



      {/* New Premium Search & Filter Section */}
      <motion.section 
        id="search-filter"
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
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button className="clear-search-btn" onClick={() => setSearchQuery("")}>
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
              <option value="Reading Time">Reading Time</option>
              <option value="Oldest">Oldest</option>
            </select>
            <ChevronDown className="sort-icon" size={16} />
          </motion.div>
        </div>

        <div className="filter-results-text">
          Showing {sortedArticles.length} Articles
        </div>


      </motion.section>

      {featuredArticles.length > 0 && (
        <FeaturedArticle articles={featuredArticles} />
      )}

      {/* Main Articles Grid Section (Conditionally rendered title based on search) */}
      {searchQuery ? (
        <ArticlesGrid 
          articles={sortedArticles} 
          title="Search Results" 
          subtitle="Articles matching your search and category filters." 
        />
      ) : (
        <ArticlesGrid 
          articles={latestArticles} 
          title="Latest Articles" 
          subtitle="Discover our newest articles covering astronomy, space exploration, technology, cosmology, research, and scientific discoveries." 
        />
      )}

      {/* Engagement Section (Newsletter, CTA, Socials) */}
      <ArticlesEngagement />

    </main>
  );
}