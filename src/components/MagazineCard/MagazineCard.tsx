import { Link } from "react-router-dom";
import type { Magazine } from "../../types/magazine";

interface Props {
  magazine: Magazine;
}

export default function MagazineCard({ magazine }: Props) {
  return (
    <div className="article-card glow glow-hover">
      <img
        src={magazine.cover}
        alt={magazine.title}
      />

      <div className="article-content">
        <h3>{magazine.title}</h3>

        <p>{magazine.description}</p>

        <small>
          {magazine.issue} • {magazine.pages} Pages
        </small>

        <Link
          to={`/magazines/${magazine.slug}`}
          className="gradient"
        >
          READ MAGAZINE
        </Link>
      </div>
    </div>
  );
}