import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArticleCard } from "./ArticleCard";
import { SectionHeader } from "./SectionHeader";
import { mockPremiumArticles } from "./mockData";
import "./LatestArticles.css";

export function ArticlesGrid() {
  const [displayCount, setDisplayCount] = useState(6);
  
  const hasMore = displayCount < mockPremiumArticles.length;
  
  const handleLoadMore = () => {
    setDisplayCount(prev => prev + 3);
  };

  return (
    <section className="latest-articles-section">
      <SectionHeader 
        title="Latest Articles" 
        subtitle="Discover our newest articles covering astronomy, space exploration, technology, cosmology, research, and scientific discoveries."
      />
      
      <div className="latest-articles-grid">
        <AnimatePresence>
          {mockPremiumArticles.slice(0, displayCount).map((article, index) => (
            <ArticleCard key={article.id} article={article} index={index % 6} />
          ))}
        </AnimatePresence>
      </div>
      
      {mockPremiumArticles.length === 0 && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="latest-empty-state"
        >
          <img src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=600&auto=format&fit=crop" alt="No articles" />
          <h3>No articles available yet.</h3>
          <button className="back-home-btn" onClick={() => window.location.href = '/'}>Back to Home</button>
        </motion.div>
      )}

      {hasMore && mockPremiumArticles.length > 0 && (
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
