import React, { useState, useEffect, useRef, useMemo } from "react";
import { articleApi, PublicArticle } from "./services/api/articleApi";
import { articles as staticArticles } from "./data/articles";
import FeaturedArticle from "./components/FeaturedArticle/FeaturedArticle";
import { ArticlesGrid } from "./components/LatestArticles/ArticlesGrid";
import { magazines } from "./data/magazines";
import MagazineCard from "./components/MagazineCard/MagazineCard";
import { ArticlesEngagement } from "./components/ArticlesEngagement/ArticlesEngagement";

import "./css/Home.css";
import "./css/base.css";
import "./css/Articles.css";
import "./css/Magazines.css";

// The original ShowcaseItem component, updated with classNames
const ShowcaseItem = ({ title, description, gradient }) => (
  <div className="showcaseItem">
    <div className="showcaseGradient" style={{ background: gradient }} />
    <h3 className="showcaseTitle">{title}</h3>
    <p className="showcaseDescription">{description}</p>
  </div>
);




const Home = () => {
  const [scrollY, setScrollY] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const heroCanvasRef = useRef<HTMLCanvasElement>(null);

  const [dbArticles, setDbArticles] = useState<PublicArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadArticles();
  }, []);

  const loadArticles = async () => {
    try {
      setLoading(true);
      const response = await articleApi.getArticles();
      setDbArticles(response);
    } catch (err) {
      console.error("Failed to load live articles, falling back to static data", err);
      // Fallback is handled by the useMemos below
    } finally {
      setLoading(false);
    }
  };

  // Fallback to static articles if dbArticles is empty (e.g. backend down or no articles in DB)
  const articlesSource = dbArticles.length > 0 ? dbArticles : staticArticles;

  const featuredArticles = useMemo(() => 
    articlesSource.filter(article => article.featured),
  [articlesSource]);

  const latestArticles = useMemo(() => 
    [...articlesSource].sort((a, b) => new Date(b.publishedAt || b.date).getTime() - new Date(a.publishedAt || a.date).getTime()),
  [articlesSource]);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Hero section space background with nebulae (UNMODIFIED JS LOGIC)
  useEffect(() => {
    const canvas = heroCanvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Generate stars
    const stars = Array.from({ length: 300 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 2,
      opacity: Math.random(),
      twinkleSpeed: Math.random() * 0.02 + 0.01
    }));

    // Generate nebulae
    const nebulae = Array.from({ length: 5 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 300 + 200,
      color: ['rgba(139, 92, 246, 0.15)', 'rgba(6, 182, 212, 0.12)', 'rgba(236, 72, 153, 0.1)'][Math.floor(Math.random() * 3)],
      drift: { x: (Math.random() - 0.5) * 0.1, y: (Math.random() - 0.5) * 0.1 }
    }));

    let animationFrame;
    const animate = () => {
      ctx.fillStyle = 'rgb(5, 8, 20)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw nebulae
      nebulae.forEach(nebula => {
        const gradient = ctx.createRadialGradient(
          nebula.x, nebula.y, 0,
          nebula.x, nebula.y, nebula.radius
        );
        gradient.addColorStop(0, nebula.color);
        gradient.addColorStop(1, 'transparent');
        
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        nebula.x += nebula.drift.x;
        nebula.y += nebula.drift.y;
        
        if (nebula.x < -nebula.radius) nebula.x = canvas.width + nebula.radius;
        if (nebula.x > canvas.width + nebula.radius) nebula.x = -nebula.radius;
        if (nebula.y < -nebula.radius) nebula.y = canvas.height + nebula.radius;
        if (nebula.y > canvas.height + nebula.radius) nebula.y = -nebula.radius;
      });
      
      // Draw stars
      stars.forEach(star => {
        star.opacity += (Math.random() - 0.5) * star.twinkleSpeed;
        star.opacity = Math.max(0.1, Math.min(1, star.opacity));
        
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
        ctx.fill();
      });

      animationFrame = requestAnimationFrame(animate);
    };
    
    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Background stars for scrolling sections (UNMODIFIED JS LOGIC)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = document.body.scrollHeight;

    const stars = Array.from({ length: 200 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 1.5,
      opacity: Math.random() * 0.5 + 0.3
    }));

    const drawStars = () => {
      ctx.fillStyle = 'rgb(10, 15, 35)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      stars.forEach(star => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
        ctx.fill();
      });
    };

    drawStars();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = document.body.scrollHeight;
      drawStars();
    };
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const opacity = Math.max(0, 1 - scrollY / 800);
  const scale = Math.max(0.8, 1 - scrollY / 2000);
  const translateY = scrollY * 0.5;

  return (
    <main className="container">
      <canvas ref={canvasRef} className="backgroundCanvas" />
      {/* Hero Section */}
      <section className="hero">
        <canvas ref={heroCanvasRef} className="heroCanvas" />
        <div 
          className="heroContent"
          style={{ // Inline styles needed for dynamic scrolling effects
            opacity,
            transform: `scale(${scale}) translateY(${translateY}px)`
          }}
        >
          <div className="logoContainer">
            <img className='logo-text' src="astrospacious.png"></img>
          </div>
          <p className="heroSubtitle">MAKING SPACE ACCESSIBLE</p>
          <div className="heroTagline" style={{ maxWidth: '800px', margin: '8rem auto 2rem auto', lineHeight: '1.6', fontSize: '18px', color: '#cbd5e1' }}>
            Founded in 2024, Astrospacious is a space research organization dedicated to making astronomy and space science accessible to all. Join 1,000+ members exploring research, articles, and magazines from across the cosmos.
          </div>
          <div 
            className="exploreMore" 
            style={{ marginTop: '2rem', cursor: 'pointer', opacity: 0.9, fontSize: '18px', color: '#fff', transition: 'opacity 0.3s' }} 
            onClick={() => {
              const target = document.getElementById('explore-target');
              if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
              } else {
                window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
              }
            }}
            onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
            onMouseLeave={(e) => e.currentTarget.style.opacity = '0.9'}
          >
            Explore more ↓
          </div>
        </div>
    </section>

      {/* Anchor for Explore More button */}
      <div id="explore-target" style={{ position: 'relative', top: '-80px' }}></div>

      {/* Featured Articles Section */}
      {!loading && featuredArticles.length > 0 && (
        <FeaturedArticle articles={featuredArticles} />
      )}

      {/* Latest Articles Section */}
      {!loading && latestArticles.length > 0 && (
        <ArticlesGrid articles={latestArticles} title="Latest Space Discoveries" />
      )}
      
      {loading && <div style={{ textAlign: 'center', color: '#fff', padding: '4rem' }}>Loading stellar content...</div>}

      {/* Features Showcase */}
      <section className="showcaseSection">
        <div className="contentWrapper">
          <h2 className="sectionTitle gradient-text centered">Why Choose ASTROSPACIOUS</h2>
          <div className="showcaseGrid">
            <ShowcaseItem 
              title="Visual Excellence"
              description="Excellet writing , visuals and explainations to make learning engaging"
              gradient="#8b5cf6"
            />
            <ShowcaseItem 
              title="Interactive Discovery"
              description="Engage with content through student driven exploration"
              gradient="#06b6d4"
            />
            <ShowcaseItem 
              title="Seamless Experience"
              description="Navigate through sources easily"
              gradient=" #ec4899"
            />
          </div>
        </div>
      </section>

      {/* Publish Your Work Section */}
      <section className="showcaseSection" style={{ paddingBottom: '60px' }}>
        <div className="contentWrapper" style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto', padding: '64px 32px', background: 'rgba(15, 23, 42, 0.6)', backdropFilter: 'blur(20px)', borderRadius: '24px', border: '1px solid rgba(139, 92, 246, 0.2)' }}>
          <h2 className="sectionTitle gradient-text centered" style={{ marginBottom: '24px', fontSize: '36px' }}>Publish Your Work with Astrospacious</h2>
          <p className="ctaSubtitle" style={{ marginBottom: '40px', color: '#cbd5e1', lineHeight: '1.6' }}>
            Have original astronomy, astrophysics, space science, or research-focused work to share?
            <br/><br/>
            Submit your work to the Astrospacious editorial team.
          </p>
          <button 
            className="ctaButtonLarge gradient"
            style={{ padding: '18px 48px', fontSize: '18px' }}
            onClick={() => window.open('https://docs.google.com/forms/d/e/1FAIpQLSeP5ZAD8YVwpt-grbPh96oY1zh9dGegkoYWclAK_pEfZgcTMA/viewform', '_blank', 'noopener,noreferrer')}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)';
              e.currentTarget.style.boxShadow = '0 20px 50px rgba(139, 92, 246, 0.6)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = '0 15px 50px rgba(139, 92, 246, 0.5)';
            }}
          >
            Publish Your Article &rarr;
          </button>
        </div>
      </section>

      {/* Featured Magazines Section */}
      <section className="showcaseSection">
        <div className="contentWrapper">
          <h2 className="sectionTitle gradient-text centered" style={{ marginBottom: '2rem' }}>Featured Magazines</h2>
          <div className="articles-grid" style={{ marginBottom: '4rem' }}>
            {magazines.slice(0, 3).map((magazine) => (
              <MagazineCard
                key={magazine.id}
                magazine={magazine}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter & Community CTA */}
      <ArticlesEngagement />

    </main>
  );
};

export default Home;