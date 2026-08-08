import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { Clock, Calendar, ArrowRight } from "lucide-react";
import type { PublicArticle } from "../../services/api/articleApi";
import "./LatestArticles.css";

interface ArticleCardProps {
  article: PublicArticle;
  index: number;
}

export function ArticleCard({ article, index }: ArticleCardProps) {
  const navigate = useNavigate();

  return (
    <motion.article 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="latest-article-card"
      onClick={() => navigate(`/articles/${article.slug}`)}
      style={{ cursor: 'pointer' }}
    >
      <div className="card-image-wrapper">
        <img src={article.coverImage || "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=800"} alt={article.title} className="card-cover-image" />
        <span className="card-category-badge">{article.category.name}</span>
      </div>
      
      <div className="card-content">
        <div className="card-meta">
          <span className="meta-item"><Calendar size={14} /> {new Date(article.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
          <span className="meta-item"><Clock size={14} /> {article.readingTime} min read</span>
        </div>
        
        <h3 className="card-title">{article.title}</h3>
        <p className="card-excerpt">{article.excerpt}</p>
        
        <div className="card-footer">
          <div className="card-author">
            <img src={article.author.photo || "https://randomuser.me/api/portraits/lego/1.jpg"} alt={article.author.name} className="author-avatar" />
            <span className="author-name">{article.author.name}</span>
          </div>
          
          <Link to={`/articles/${article.slug}`} className="card-read-more" onClick={(e) => e.stopPropagation()}>
            Read More <ArrowRight size={16} className="btn-icon" />
          </Link>
        </div>
      </div>
    </motion.article>
  );
}
