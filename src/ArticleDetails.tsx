import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion, useScroll, useSpring } from "framer-motion";
import { 
  ArrowLeft, Calendar, Clock, Linkedin, Twitter, Facebook, 
  Link2, ChevronLeft, ChevronRight, Menu, X, Check
} from "lucide-react";
import { ArticleCard } from "./components/LatestArticles/ArticleCard";
import { articleApi, PublicArticle } from "./services/api/articleApi";
import "./css/ArticleDetails.css";

export default function ArticleDetails() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [activeTocId, setActiveTocId] = useState("");
  const [mobileTocOpen, setMobileTocOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  
  const [article, setArticle] = useState<PublicArticle | null>(null);
  const [relatedArticles, setRelatedArticles] = useState<PublicArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [contentHtml, setContentHtml] = useState("");
  const [toc, setToc] = useState<{ id: string, title: string, level: number }[]>([]);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const fetchArticle = async () => {
      if (!slug) return;
      try {
        setLoading(true);
        setError("");
        const data = await articleApi.getArticleBySlug(slug);
        setArticle(data);
        
        const all = await articleApi.getArticles();
        setRelatedArticles(all.filter(a => a.id !== data.id).slice(0, 3));
        
        const parser = new DOMParser();
        const doc = parser.parseFromString(data.content, 'text/html');
        const headings = doc.querySelectorAll('h2, h3');
        const newToc: { id: string, title: string, level: number }[] = [];
        headings.forEach((heading, i) => {
          let id = heading.id;
          if (!id) {
            id = `heading-${i}-${heading.textContent?.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
            heading.id = id;
          }
          newToc.push({
            id,
            title: heading.textContent || '',
            level: heading.tagName.toLowerCase() === 'h2' ? 2 : 3
          });
        });
        setToc(newToc);
        setContentHtml(doc.body.innerHTML);
      } catch (err) {
        console.error(err);
        setError("Failed to load article");
      } finally {
        setLoading(false);
      }
    };
    fetchArticle();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [slug]);

  // TOC Intersection Observer
  useEffect(() => {
    if (loading) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveTocId(entry.target.id);
          }
        });
      },
      { rootMargin: "-100px 0px -70% 0px" }
    );
    
    document.querySelectorAll(".article-body h2, .article-body h3").forEach((elem) => {
      observer.observe(elem);
    });
    
    return () => observer.disconnect();
  }, [slug, loading, contentHtml]);

  if (loading) {
    return (
      <div style={{ minHeight: "70vh", display: "flex", justifyContent: "center", alignItems: "center", color: "white", fontSize: "22px" }}>
        Loading article...
      </div>
    );
  }

  if (error || !article) {
    return (
      <div style={{ minHeight: "70vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", color: "white" }}>
        <h1>404 - Article Not Found</h1>
        <button onClick={() => navigate('/Articles')} className="back-home-btn" style={{ marginTop: '20px' }}>
          Back to Articles
        </button>
      </div>
    );
  }

  const scrollToId = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: elementPosition - offset, behavior: "smooth" });
      setMobileTocOpen(false);
    }
  };

  const handleShare = (platform: string) => {
    const url = window.location.href;
    const text = article?.title || "";
    if (platform === 'twitter') {
      window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer');
    } else if (platform === 'facebook') {
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank', 'noopener,noreferrer');
    } else if (platform === 'linkedin') {
      window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank', 'noopener,noreferrer');
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main className="article-details-page">
      <motion.div className="scroll-progress-bar" style={{ scaleX }} />
      
      {/* Hero Section */}
      <section className="article-hero-section">
        <button onClick={() => navigate('/Articles')} className="back-link" style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
          <ArrowLeft size={18} /> Back to Articles
        </button>
        
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <span className="hero-category-badge">{article.category.name}</span>
          <h1 className="hero-title">{article.title}</h1>
          <p className="hero-subtitle">{article.excerpt}</p>
          
          <div className="hero-meta">
            <div className="hero-author">
              <img src={article.author.photo || "/logos/logo-small.png"} alt={article.author.name} />
              <div className="hero-author-info">
                <span className="hero-author-name">{article.author.name}</span>
                <span className="hero-author-role">{article.author.bio || "Science Communicator"}</span>
              </div>
            </div>
            
            <div className="hero-date-time">
              <span><Calendar size={16} /> {new Date(article.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
              <span><Clock size={16} /> {article.readingTime} min read</span>
            </div>
          </div>
        </motion.div>
        
        <motion.img 
          initial={{ opacity: 0, scale: 0.95 }} 
          animate={{ opacity: 1, scale: 1 }} 
          transition={{ duration: 0.8, delay: 0.2 }}
          src={article.coverImage || "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=1200"} 
          alt={article.title} 
          className="hero-cover-image" 
        />
      </section>

      {/* Main Layout */}
      <div className="article-layout">
        {/* Left Sidebar - TOC */}
        <aside className="toc-sidebar">
          <h4>Table of Contents</h4>
          <ul className="toc-list">
            {toc.map(item => (
              <li key={item.id}>
                <button 
                  onClick={() => scrollToId(item.id)}
                  className={`toc-link level-${item.level} ${activeTocId === item.id ? 'active' : ''}`}
                  style={{ background: 'none', border: 'none', textAlign: 'left', width: '100%', cursor: 'pointer', borderLeftWidth: '2px', borderLeftStyle: 'solid' }}
                >
                  {item.title}
                </button>
              </li>
            ))}
          </ul>
        </aside>

        {/* Article Content */}
        <motion.article 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="article-main-content"
        >
          {/* Mobile TOC */}
          <div className="mobile-toc-toggle" onClick={() => setMobileTocOpen(!mobileTocOpen)}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Menu size={18} /> Table of Contents
            </span>
            {mobileTocOpen ? <X size={18} /> : <ChevronRight size={18} />}
          </div>
          {mobileTocOpen && (
            <ul className="toc-list" style={{ marginBottom: '30px', background: 'rgba(19, 28, 59, 0.4)', padding: '20px', borderRadius: '12px' }}>
              {toc.map(item => (
                <li key={item.id}>
                  <button 
                    onClick={() => scrollToId(item.id)}
                    className={`toc-link level-${item.level} ${activeTocId === item.id ? 'active' : ''}`}
                    style={{ background: 'none', border: 'none', textAlign: 'left', width: '100%', cursor: 'pointer', paddingLeft: item.level === 3 ? '16px' : '0', borderLeftWidth: '2px', borderLeftStyle: 'solid' }}
                  >
                    {item.title}
                  </button>
                </li>
              ))}
            </ul>
          )}

          <div 
            className="article-body" 
            dangerouslySetInnerHTML={{ __html: contentHtml }} 
          />

          <div className="article-tags">
            {article.tags.map(tag => (
              <span key={tag} className="tag-chip">#{tag}</span>
            ))}
          </div>

          <div className="article-footer-blocks">
            <div className="share-section">
              <span>Share this article:</span>
              <div className="share-btns">
                <button 
                  className="share-btn"
                  onClick={() => handleShare('twitter')}
                  aria-label="Share on X"
                  title="Share on X"
                >
                  <Twitter size={16} /> <span>X</span>
                </button>
                <button 
                  className="share-btn"
                  onClick={() => handleShare('facebook')}
                  aria-label="Share on Facebook"
                  title="Share on Facebook"
                >
                  <Facebook size={16} /> <span>Facebook</span>
                </button>
                <button 
                  className="share-btn"
                  onClick={() => handleShare('linkedin')}
                  aria-label="Share on LinkedIn"
                  title="Share on LinkedIn"
                >
                  <Linkedin size={16} /> <span>LinkedIn</span>
                </button>
                <button 
                  className={`share-btn ${copied ? 'copied' : ''}`}
                  onClick={handleCopyLink}
                  aria-label="Copy Link"
                  title="Copy Link"
                >
                  {copied ? <Check size={16} /> : <Link2 size={16} />} 
                  <span>{copied ? "Link copied!" : "Copy Link"}</span>
                </button>
              </div>
            </div>

            <div className="author-card">
              <div className="author-avatar-container">
                <img src="/logos/logo-small.png" alt="Astrospacious" />
              </div>
              <div className="author-card-info">
                <h3>{article.author.name}</h3>
                <p className="author-bio">{article.author.bio || "Science Communicator"}</p>
                <p className="author-meta">
                  {article.category.name} &bull; {new Date(article.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </p>
              </div>
            </div>
          </div>

          <div className="article-navigation">
            {/* Disabled previous/next links as they require knowing the surrounding articles in the database sequence. Could fetch previous/next by ID/date in the future. */}
            <div style={{ flex: 1 }} />
            <div style={{ flex: 1 }} />
          </div>
        </motion.article>

        {/* Right Sidebar Placeholder */}
        <aside className="right-sidebar">
          {/* Space for future ads or sticky elements */}
        </aside>
      </div>

      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <section className="related-articles-section">
          <h2>Related Articles</h2>
          <div className="related-grid">
            {relatedArticles.map((relArticle, index) => (
              <ArticleCard key={relArticle.id} article={relArticle} index={index} />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}