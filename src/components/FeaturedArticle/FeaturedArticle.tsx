import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, Calendar, User, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { PublicArticle } from "../../services/api/articleApi";
import "./FeaturedArticle.css";

interface FeaturedArticleProps {
  articles: PublicArticle[];
}

export default function FeaturedArticle({ articles }: FeaturedArticleProps) {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);

  // Optional auto-slide
  useEffect(() => {
    if (articles.length <= 1) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % articles.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [articles.length, currentIndex]); // Reset interval when index changes manually

  if (!articles || articles.length === 0) return null;

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + articles.length) % articles.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % articles.length);
  };

  const article = articles[currentIndex];

  return (
    <motion.section 
      id="featured-article"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8 }}
      className="featured-article-section"
    >
      <div className="featured-section-header">
        <h2>Featured Articles</h2>
        <p>Handpicked stories exploring the latest discoveries, missions, and breakthroughs in space science.</p>
      </div>

      <div className="featured-carousel-container">
        {articles.length > 1 && (
          <button className="carousel-control prev" onClick={handlePrevious} aria-label="Previous featured article">
            <ChevronLeft size={24} />
          </button>
        )}

        <div className="featured-carousel-viewport">
          <AnimatePresence mode="wait">
            <motion.div 
              key={article.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5 }}
              className="featured-article-card"
            >
              <div className="featured-image-container">
                <img src={article.coverImage || "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=800"} alt={article.title} className="featured-image" />
              </div>

              <div className="featured-content">
                <div className="featured-category-badge">{article.category.name}</div>
                
                <h3 className="featured-title">{article.title}</h3>
                <p className="featured-excerpt">{article.excerpt}</p>
                
                <div className="featured-metadata">
                  <span className="meta-item"><User size={14} /> {article.author.name}</span>
                  <span className="meta-item"><Calendar size={14} /> {new Date(article.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                  <span className="meta-item"><Clock size={14} /> {article.readingTime} min read</span>
                </div>
                
                <button className="read-article-btn" onClick={() => navigate(`/articles/${article.slug}`)}>
                  Read Article <ArrowRight size={18} className="btn-icon" />
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {articles.length > 1 && (
          <button className="carousel-control next" onClick={handleNext} aria-label="Next featured article">
            <ChevronRight size={24} />
          </button>
        )}
      </div>

      {articles.length > 1 && (
        <div className="carousel-dots">
          {articles.map((_, idx) => (
            <button 
              key={idx} 
              className={`carousel-dot ${idx === currentIndex ? 'active' : ''}`}
              onClick={() => setCurrentIndex(idx)}
              aria-label={`Go to featured article ${idx + 1}`}
            />
          ))}
        </div>
      )}
    </motion.section>
  );
}
