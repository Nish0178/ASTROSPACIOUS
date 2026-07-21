import { Link } from "react-router-dom";
import type { Article } from "../../types/article";
import useBookmarks from "../../hooks/useBookmarks";

interface ArticleCardProps {
  article: Article;
}

export default function ArticleCard({ article }: ArticleCardProps) {
  const { bookmarks, toggleBookmark } = useBookmarks();

  return (
    <div className="article-card glow glow-hover">
      <img src={article.image} alt={article.title} />

      <span className="article-category">
        {article.category}
      </span>

      <div className="article-content">
        <h3>{article.title}</h3>

        <p>{article.description}</p>

        <button
          className="bookmark-btn"
          onClick={() => toggleBookmark(article.id)}
        >
          {bookmarks.includes(article.id) ? "❤️" : "🤍"}
        </button>

        <Link
          to={`/articles/${article.slug}`}
          className="gradient"
        >
          Read More
        </Link>
      </div>
    </div>
  );
}