import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { articles } from "./data/articles";

export default function ArticleDetails() {
  const { slug } = useParams();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  const article = articles.find(
  (article) => article.slug === slug
);
  const relatedArticles = articles.filter(
  (item) => item.id !== article?.id
);

  if (!article) {
  return (
    <div
      style={{
        minHeight: "70vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        color: "white",
      }}
    >
      <h1>404 - Article Not Found</h1>

      <p>This article doesn't exist.</p>

      <Link
        to="/Articles"
        style={{
          marginTop: "20px",
          color: "#64B5F6",
          fontSize: "18px",
        }}
      >
        ← Back to Articles
      </Link>
    </div>
  );
}
  return (
    <div
  style={{
    width: "95%",
    maxWidth: "1400px",
    margin: "40px auto",
    padding: "20px",
    color: "white",
  }}
>
      <Link
        to="/Articles"
        style={{
          color: "#64B5F6",
          textDecoration: "none",
          fontSize: "18px",
        }}
      >
        ← Back to Articles
      </Link>

      <h1
        style={{
          fontSize: "42px",
          marginTop: "20px",
          marginBottom: "10px",
        }}
      >
        {article.title}
      </h1>

      <p
        style={{
          color: "#bbbbbb",
          marginBottom: "25px",
        }}
      >
        {article.author} • {article.date} • {article.readTime}
      </p>

      <img
  src={article.image}
  alt={article.title}
  style={{
    width: "100%",
    height: "400px",
    objectFit: "cover",
    borderRadius: "16px",
    marginBottom: "30px",
  }}
/>
      <p
  style={{
    fontSize: "22px",
    lineHeight: "1.9",
    color: "#dddddd",
    whiteSpace: "pre-line",
    maxWidth: "1000px",
    margin: "0 auto",
  }}
>
        {article.content}
      </p>
      <h2
  style={{
    marginTop: "60px",
    marginBottom: "25px",
  }}
>
  Related Articles
</h2>
<div
  style={{
    display: "flex",
    gap: "20px",
    flexWrap: "wrap",
  }}
>
  {relatedArticles.map((item) => (
    <Link
      key={item.id}
      to={`/articles/${item.slug}`}
      style={{
        textDecoration: "none",
        color: "white",
        width: "280px",
        borderRadius: "12px",
        overflow: "hidden",
        background: "#111827",
      }}
    >
      <img
        src={item.image}
        alt={item.title}
        style={{
          width: "100%",
          height: "170px",
          objectFit: "cover",
        }}
      />

      <div style={{ padding: "15px" }}>
        <h3>{item.title}</h3>

        <p
          style={{
            color: "#cccccc",
            fontSize: "15px",
          }}
        >
          {item.description}
        </p>
      </div>
    </Link>
  ))}
</div>
    </div>
  );
}