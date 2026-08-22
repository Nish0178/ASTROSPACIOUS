import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { articleApi, PublicArticle } from "./services/api/articleApi";
import { ArticleCard } from "./components/LatestArticles/ArticleCard";

import "./css/Home.css";
import "./css/base.css";
import "./css/Articles.css";
import "./css/Magazines.css";






const Home = () => {
  const [scrollY, setScrollY] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const heroCanvasRef = useRef<HTMLCanvasElement>(null);

  const [latestArticles, setLatestArticles] = useState<PublicArticle[]>([]);
  const [loadingArticles, setLoadingArticles] = useState(true);

  useEffect(() => {
    const fetchLatestArticles = async () => {
      try {
        setLoadingArticles(true);
        const articles = await articleApi.getArticles();
        
        const now = new Date();
        const cutoffDate = new Date(now);
        cutoffDate.setDate(now.getDate() - 3);

        const filtered = articles.filter(article => {
          const isPublished = !article.status || String(article.status).toLowerCase() === 'published';
          const isDeleted = article.isDeleted === true;
          if (!isPublished || isDeleted) return false;

          if (!article.publishedAt) return false;
          const pubDate = new Date(article.publishedAt);
          if (isNaN(pubDate.getTime())) return false;
          return pubDate >= cutoffDate;
        });

        filtered.sort((a, b) => new Date(b.publishedAt!).getTime() - new Date(a.publishedAt!).getTime());

        setLatestArticles(filtered);
      } catch (err) {
        console.error("Failed to fetch latest articles", err);
      } finally {
        setLoadingArticles(false);
      }
    };
    fetchLatestArticles();
  }, []);

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
            transform: `scale(${scale}) translateY(${translateY}px)`,
            height: '100vh',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            boxSizing: 'border-box',
            padding: '80px 24px 40px 24px',
            fontFamily: '"Times New Roman", Times, serif'
          }}
        >
          {/* Top Spacer */}
          <div style={{ flex: '1 1 auto' }}></div>

          {/* Center Area: Logo + Tagline */}
          <div style={{ flex: '0 0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div className="logoContainer">
              <img className='logo-text' src="astrospacious.png" alt="Astrospacious Logo"></img>
            </div>
            <p className="heroSubtitle" style={{ fontFamily: '"Times New Roman", Times, serif', margin: 0 }}>MAKING SPACE ACCESSIBLE</p>
          </div>

          {/* Spacer between Center and Lower */}
          <div style={{ flex: '1 1 auto', minHeight: '40px' }}></div>

          {/* Lower Area: Paragraph + Explore More */}
          <div style={{ flex: '0 0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
            <div className="heroTagline" style={{ 
              maxWidth: '800px', 
              margin: '0 auto', 
              lineHeight: '1.6', 
              fontSize: '18px', 
              color: '#cbd5e1',
              fontFamily: '"Times New Roman", Times, serif',
              textAlign: 'center'
            }}>
              Founded in 2024, Astrospacious is a space research organization dedicated to making astronomy and space science accessible to all. Join 1,000+ members exploring research, articles, and magazines from across the cosmos.
            </div>
            <div 
              className="exploreMore" 
              style={{ 
                marginTop: '2rem', 
                cursor: 'pointer', 
                opacity: 0.9, 
                fontSize: '18px', 
                color: '#fff', 
                transition: 'opacity 0.3s',
                fontFamily: '"Times New Roman", Times, serif'
              }} 
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
        </div>
    </section>

      {/* Anchor for Explore More button */}
      <div id="explore-target" style={{ position: 'relative', top: '-80px' }}></div>

      {/* About / Mission Section */}
      <section className="showcaseSection" style={{ padding: '80px 24px', fontFamily: '"Times New Roman", Times, serif' }}>
        <div className="contentWrapper" style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          <h2 className="sectionTitle gradient-text centered" style={{ marginBottom: '32px', fontSize: '36px' }}>About ASTROSPACIOUS</h2>
          <p style={{ fontSize: '20px', lineHeight: '1.8', color: '#cbd5e1' }}>
            Astrospacious is a pioneering student-led organization operating at the intersection of research, education, and innovation. We believe that astronomy and space science should be universally accessible.
          </p>
        </div>
      </section>

      {/* Core Areas Section */}
      <section className="showcaseSection" style={{ padding: '40px 24px 80px', fontFamily: '"Times New Roman", Times, serif' }}>
        <div className="contentWrapper" style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '40px', textAlign: 'center' }}>
            <div>
              <h3 style={{ color: '#fff', fontSize: '22px', marginBottom: '16px', letterSpacing: '1px' }}>ASTRONOMY</h3>
              <p style={{ color: '#94a3b8', fontSize: '16px', lineHeight: '1.6' }}>Exploring celestial objects, phenomena, and the universe.</p>
            </div>
            <div>
              <h3 style={{ color: '#fff', fontSize: '22px', marginBottom: '16px', letterSpacing: '1px' }}>ASTROPHYSICS</h3>
              <p style={{ color: '#94a3b8', fontSize: '16px', lineHeight: '1.6' }}>Understanding the physical principles governing the cosmos.</p>
            </div>
            <div>
              <h3 style={{ color: '#fff', fontSize: '22px', marginBottom: '16px', letterSpacing: '1px' }}>SPACE SCIENCE</h3>
              <p style={{ color: '#94a3b8', fontSize: '16px', lineHeight: '1.6' }}>Following discoveries, missions, exploration, and scientific progress.</p>
            </div>
            <div>
              <h3 style={{ color: '#fff', fontSize: '22px', marginBottom: '16px', letterSpacing: '1px' }}>RESEARCH & EDUCATION</h3>
              <p style={{ color: '#94a3b8', fontSize: '16px', lineHeight: '1.6' }}>Making scientific knowledge understandable and accessible.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Articles - Last 3 Days */}
      <section className="showcaseSection" style={{ paddingBottom: '80px', fontFamily: '"Times New Roman", Times, serif' }}>
        <div className="contentWrapper" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <h2 className="sectionTitle gradient-text centered" style={{ fontSize: '36px', marginBottom: '8px' }}>Latest Articles</h2>
            <p style={{ color: '#94a3b8', fontSize: '18px' }}>Published in the last 3 days</p>
          </div>
          
          {loadingArticles ? (
            <div style={{ textAlign: 'center', color: '#cbd5e1', fontSize: '18px' }}>Loading articles...</div>
          ) : latestArticles.length > 0 ? (
            <div className="latest-articles-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '32px' }}>
              {latestArticles.map((article, index) => (
                <ArticleCard key={article.id} article={article} index={index} />
              ))}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '40px', background: 'rgba(15, 23, 42, 0.4)', borderRadius: '16px', border: '1px dashed rgba(255, 255, 255, 0.1)' }}>
              <p style={{ color: '#cbd5e1', fontSize: '18px', margin: 0 }}>No new articles in the last 3 days.</p>
            </div>
          )}
        </div>
      </section>

      {/* Publish Your Work Section */}
      <section className="showcaseSection" style={{ paddingBottom: '80px', fontFamily: '"Times New Roman", Times, serif' }}>
        <div className="contentWrapper" style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto', padding: '64px 32px', background: 'rgba(15, 23, 42, 0.6)', backdropFilter: 'blur(20px)', borderRadius: '24px', border: '1px solid rgba(139, 92, 246, 0.2)' }}>
          <h2 className="sectionTitle gradient-text centered" style={{ marginBottom: '24px', fontSize: '36px' }}>Publish Your Work with Astrospacious</h2>
          <p className="ctaSubtitle" style={{ marginBottom: '40px', color: '#cbd5e1', lineHeight: '1.6' }}>
            Have original astronomy, astrophysics, space science, or research-focused work to share?
            <br/><br/>
            Submit your work to the Astrospacious editorial team.
          </p>
          <button 
            className="ctaButtonLarge gradient"
            style={{ padding: '18px 48px', fontSize: '18px', fontFamily: '"Times New Roman", Times, serif' }}
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

      {/* Optional Simple Explore CTA */}
      <section className="showcaseSection" style={{ paddingBottom: '120px', fontFamily: '"Times New Roman", Times, serif' }}>
        <div className="contentWrapper" style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}>
          <h2 style={{ color: '#fff', fontSize: '32px', marginBottom: '24px' }}>Explore the Cosmos</h2>
          <p style={{ color: '#94a3b8', fontSize: '18px', lineHeight: '1.6', marginBottom: '40px' }}>
            Discover research, articles, magazines, and ideas shaping our understanding of the universe.
          </p>
          <div style={{ display: 'flex', gap: '24px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/articles" style={{ color: '#fff', textDecoration: 'none', borderBottom: '1px solid rgba(255,255,255,0.3)', paddingBottom: '4px', fontSize: '18px', transition: 'border-color 0.3s' }} onMouseEnter={e => e.currentTarget.style.borderColor = '#fff'} onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)'}>
              Explore Articles &rarr;
            </Link>
            <Link to="/magazines" style={{ color: '#fff', textDecoration: 'none', borderBottom: '1px solid rgba(255,255,255,0.3)', paddingBottom: '4px', fontSize: '18px', transition: 'border-color 0.3s' }} onMouseEnter={e => e.currentTarget.style.borderColor = '#fff'} onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)'}>
              Explore Magazines &rarr;
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
};

export default Home;