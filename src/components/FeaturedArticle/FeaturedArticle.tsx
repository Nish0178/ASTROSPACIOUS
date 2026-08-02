import { motion } from "framer-motion";
import { Clock, Calendar, User, ArrowRight } from "lucide-react";
import "./FeaturedArticle.css";

interface FeaturedArticleProps {
  article: {
    id: number | string;
    title: string;
    description: string;
    category: string;
    image: string;
    author: string;
    date: string;
    readTime: string;
    slug: string;
  };
}

export default function FeaturedArticle({ article }: FeaturedArticleProps) {
  return (
    <motion.section 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8 }}
      className="featured-article-section"
    >
      <div className="featured-section-header">
        <h2>Featured Article</h2>
        <p>Handpicked stories exploring the latest discoveries, missions, and breakthroughs in space science.</p>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="featured-article-card"
      >
        <div className="featured-image-container">
          <img src={article.image} alt={article.title} className="featured-image" />
        </div>

        <div className="featured-content">
          <div className="featured-category-badge">{article.category}</div>
          
          <h3 className="featured-title">{article.title}</h3>
          <p className="featured-excerpt">{article.description}</p>
          
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="featured-metadata"
          >
            <span className="meta-item"><User size={14} /> {article.author}</span>
            <span className="meta-item"><Calendar size={14} /> {article.date}</span>
            <span className="meta-item"><Clock size={14} /> {article.readTime}</span>
          </motion.div>
          
          <button className="read-article-btn">
            Read Article <ArrowRight size={18} className="btn-icon" />
          </button>
        </div>
      </motion.div>
    </motion.section>
  );
}
