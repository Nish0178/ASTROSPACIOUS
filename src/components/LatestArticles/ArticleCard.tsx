import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Clock, Calendar, ArrowRight } from "lucide-react";
import type { PremiumArticle } from "./mockData";
import "./LatestArticles.css";

interface ArticleCardProps {
  article: PremiumArticle;
  index: number;
}

export function ArticleCard({ article, index }: ArticleCardProps) {
  return (
    <motion.article 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="latest-article-card"
    >
      <div className="card-image-wrapper">
        <img src={article.coverImage} alt={article.title} className="card-cover-image" />
        <span className="card-category-badge">{article.category}</span>
      </div>
      
      <div className="card-content">
        <div className="card-meta">
          <span className="meta-item"><Calendar size={14} /> {article.publishedDate}</span>
          <span className="meta-item"><Clock size={14} /> {article.readingTime}</span>
        </div>
        
        <h3 className="card-title">{article.title}</h3>
        <p className="card-excerpt">{article.excerpt}</p>
        
        <div className="card-footer">
          <div className="card-author">
            <img src={article.authorAvatar} alt={article.author} className="author-avatar" />
            <span className="author-name">{article.author}</span>
          </div>
          
          <Link to={`/articles/${article.slug}`} className="card-read-more">
            Read More <ArrowRight size={16} className="btn-icon" />
          </Link>
        </div>
      </div>
    </motion.article>
  );
}
