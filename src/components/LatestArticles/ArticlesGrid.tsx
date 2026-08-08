import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArticleCard } from "./ArticleCard";
import { SectionHeader } from "./SectionHeader";
import type { PublicArticle } from "../../services/api/articleApi";
import "./LatestArticles.css";

interface ArticlesGridProps {
  articles: PublicArticle[];
  title?: string;
  subtitle?: string;
}

export function ArticlesGrid({ articles, title, subtitle }: ArticlesGridProps) {
  const [displayCount, setDisplayCount] = useState(6);
  
  const hasMore = displayCount < articles.length;
  
  const handleLoadMore = () => {
    setDisplayCount(prev => prev + 3);
  };

  return (
    <section className="latest-articles-section" id="latest-articles">
      <SectionHeader 
        title={title || "Latest Articles"} 
        subtitle={subtitle || "Discover our newest articles covering astronomy, space exploration, technology, cosmology, research, and scientific discoveries."}
      />
      
      <div className="latest-articles-grid">
        <AnimatePresence>
          {articles.slice(0, displayCount).map((article, index) => (
            <ArticleCard key={article.id} article={article} index={index % 6} />
          ))}
        </AnimatePresence>
      </div>
      
      {articles.length === 0 && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="latest-empty-state"
        >
          <img src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=600&auto=format&fit=crop" alt="No articles" />
          <h3>No articles found matching your criteria.</h3>
          <button className="back-home-btn" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Search Again</button>
        </motion.div>
      )}

      {hasMore && articles.length > 0 && (
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="load-more-container"
        >
          <button className="load-more-btn" onClick={handleLoadMore}>
            Load More
          </button>
        </motion.div>
      )}
    </section>
  );
}
