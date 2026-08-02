import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion, useScroll, useSpring } from "framer-motion";
import { 
  ArrowLeft, Calendar, Clock, Linkedin, Twitter, Facebook, 
  Link2, ChevronLeft, ChevronRight, Menu, X 
} from "lucide-react";
import { ArticleCard } from "./components/LatestArticles/ArticleCard";
import { mockPremiumArticles } from "./components/LatestArticles/mockData";
import "./css/ArticleDetails.css";

// Mock content to simulate CMS data
const mockContentHtml = `
  <p>The universe is vast and largely unexplored. Our recent discoveries are pushing the boundaries of what we understand about space and time.</p>
  
  <h2 id="early-formation">Early Formation</h2>
  <p>Scientists believe that shortly after the Big Bang, the universe was a hot, dense soup of particles. As it expanded, it cooled, allowing protons and neutrons to form.</p>
  
  <blockquote>"The cosmos is within us. We are made of star-stuff. We are a way for the universe to know itself." - Carl Sagan</blockquote>
  
  <h3 id="stellar-nurseries">Stellar Nurseries</h3>
  <p>Regions of dense gas and dust form the perfect environment for new stars to be born. These areas are characterized by:</p>
  <ul>
    <li>High concentrations of Hydrogen</li>
    <li>Trace amounts of Helium</li>
    <li>Extreme gravitational forces</li>
  </ul>
  
  <h2 id="modern-observations">Modern Observations</h2>
  <p>With advancements in technology, our ability to observe distant galaxies has improved exponentially. Here is a simple calculation of redshift:</p>
  
  <pre><code>const calculateRedshift = (observedWavelength, emittedWavelength) => {
  return (observedWavelength - emittedWavelength) / emittedWavelength;
};</code></pre>

  <img src="https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=1200" alt="Nebula" />
  <span class="caption">A distant nebula captured by modern space telescopes.</span>
  
  <h3 id="telescope-comparison">Telescope Comparison</h3>
  <table>
    <thead>
      <tr>
        <th>Telescope</th>
        <th>Launch Year</th>
        <th>Primary Mission</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Hubble Space Telescope</td>
        <td>1990</td>
        <td>Visible, Near-Ultraviolet</td>
      </tr>
      <tr>
        <td>James Webb Space Telescope</td>
        <td>2021</td>
        <td>Near-Infrared, Mid-Infrared</td>
      </tr>
      <tr>
        <td>Chandra X-ray Observatory</td>
        <td>1999</td>
        <td>X-ray observations</td>
      </tr>
    </tbody>
  </table>
`;

const mockToc = [
  { id: "early-formation", title: "Early Formation", level: 2 },
  { id: "stellar-nurseries", title: "Stellar Nurseries", level: 3 },
  { id: "modern-observations", title: "Modern Observations", level: 2 },
  { id: "telescope-comparison", title: "Telescope Comparison", level: 3 },
];

export default function ArticleDetails() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [activeTocId, setActiveTocId] = useState("");
  const [mobileTocOpen, setMobileTocOpen] = useState(false);
  
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [slug]);

  // TOC Intersection Observer
  useEffect(() => {
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
  }, [slug]);

  const article = mockPremiumArticles.find(a => a.slug === slug);
  const relatedArticles = mockPremiumArticles.filter(a => a.id !== article?.id).slice(0, 3);
  
  const currentIndex = mockPremiumArticles.findIndex(a => a.slug === slug);
  const prevArticle = currentIndex > 0 ? mockPremiumArticles[currentIndex - 1] : null;
  const nextArticle = currentIndex >= 0 && currentIndex < mockPremiumArticles.length - 1 ? mockPremiumArticles[currentIndex + 1] : null;

  if (!article) {
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

  return (
    <main className="article-details-page">
      <motion.div className="scroll-progress-bar" style={{ scaleX }} />
      
      {/* Hero Section */}
      <section className="article-hero-section">
        <button onClick={() => navigate('/Articles')} className="back-link" style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
          <ArrowLeft size={18} /> Back to Articles
        </button>
        
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <span className="hero-category-badge">{article.category}</span>
          <h1 className="hero-title">{article.title}</h1>
          <p className="hero-subtitle">{article.excerpt}</p>
          
          <div className="hero-meta">
            <div className="hero-author">
              <img src={article.authorAvatar} alt={article.author} />
              <div className="hero-author-info">
                <span className="hero-author-name">{article.author}</span>
                <span className="hero-author-role">Science Communicator</span>
              </div>
            </div>
            
            <div className="hero-date-time">
              <span><Calendar size={16} /> {article.publishedDate}</span>
              <span><Clock size={16} /> {article.readingTime}</span>
            </div>
          </div>
        </motion.div>
        
        <motion.img 
          initial={{ opacity: 0, scale: 0.95 }} 
          animate={{ opacity: 1, scale: 1 }} 
          transition={{ duration: 0.8, delay: 0.2 }}
          src={article.coverImage} 
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
            {mockToc.map(item => (
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
              {mockToc.map(item => (
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
            dangerouslySetInnerHTML={{ __html: mockContentHtml }} 
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
                <button className="share-btn"><Linkedin size={18} /></button>
                <button className="share-btn"><Twitter size={18} /></button>
                <button className="share-btn"><Facebook size={18} /></button>
                <button className="share-btn"><Link2 size={18} /></button>
              </div>
            </div>

            <div className="author-card">
              <img src={article.authorAvatar} alt={article.author} />
              <div className="author-card-info">
                <h3>{article.author}</h3>
                <p>Senior Science Communicator</p>
                <p className="author-bio">
                  {article.author} is a passionate science writer exploring the mysteries of the cosmos, 
                  bringing complex astrophysics and space missions to the general public.
                </p>
              </div>
            </div>
          </div>

          <div className="article-navigation">
            {prevArticle ? (
              <Link to={`/articles/${prevArticle.slug}`} className="nav-card prev">
                <span className="nav-label"><ChevronLeft size={16} /> Previous Article</span>
                <span className="nav-title">{prevArticle.title}</span>
              </Link>
            ) : <div style={{ flex: 1 }} />}
            
            {nextArticle ? (
              <Link to={`/articles/${nextArticle.slug}`} className="nav-card next">
                <span className="nav-label">Next Article <ChevronRight size={16} /></span>
                <span className="nav-title">{nextArticle.title}</span>
              </Link>
            ) : <div style={{ flex: 1 }} />}
          </div>
        </motion.article>

        {/* Right Sidebar Placeholder */}
        <aside className="right-sidebar">
          {/* Space for future ads or sticky elements */}
        </aside>
      </div>

      {/* Related Articles */}
      <section className="related-articles-section">
        <h2>Related Articles</h2>
        <div className="related-grid">
          {relatedArticles.map((relArticle, index) => (
            <ArticleCard key={relArticle.id} article={relArticle} index={index} />
          ))}
        </div>
      </section>
    </main>
  );
}