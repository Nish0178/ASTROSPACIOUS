import React from 'react';
import { motion } from 'framer-motion';
import './css/Home.css';
import './css/base.css';

const Careers = () => {
  return (
    <main className="container careers-page" style={{ paddingTop: '120px', paddingBottom: '80px', minHeight: '100vh', background: 'rgb(5, 8, 20)' }}>
      {/* Hero Section */}
      <section className="showcaseSection" style={{ paddingBottom: '40px', paddingTop: '0px' }}>
        <div className="contentWrapper" style={{ textAlign: 'center', maxWidth: '900px', margin: '0 auto' }}>
          <motion.h1 
            className="sectionTitle gradient-text centered"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{ fontSize: 'clamp(36px, 5vw, 56px)', marginBottom: '24px' }}
          >
            Build the Future of Space & Science
          </motion.h1>
          <motion.p 
            className="heroSubtitle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{ color: '#cbd5e1', fontSize: 'clamp(18px, 2vw, 22px)', lineHeight: '1.6', maxWidth: '800px', margin: '0 auto 40px' }}
          >
            Astrospacious is building a premier platform for astronomy, astrophysics, space science, research, technology, and science communication. Join us in making the universe accessible to everyone.
          </motion.p>
        </div>
      </section>

      {/* Google Form Section */}
      <section className="showcaseSection" style={{ paddingTop: '0px' }}>
        <div className="contentWrapper" style={{ maxWidth: '800px', margin: '0 auto' }}>
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="form-container"
            style={{ 
              background: 'rgba(15, 23, 42, 0.6)', 
              backdropFilter: 'blur(20px)', 
              borderRadius: '24px', 
              border: '1px solid rgba(139, 92, 246, 0.2)',
              padding: 'clamp(16px, 4vw, 32px)',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)'
            }}
          >
            <div style={{ textAlign: 'center', marginBottom: '24px' }}>
              <h3 style={{ color: 'white', fontSize: '24px', marginBottom: '12px' }}>Opportunities</h3>
              <p style={{ color: '#94a3b8', fontSize: '16px' }}>Submit your application below to express your interest in joining the Astrospacious team.</p>
            </div>
            
            <div className="iframe-wrapper" style={{ position: 'relative', width: '100%', height: '800px', overflow: 'hidden', borderRadius: '12px', background: 'transparent' }}>
              <iframe 
                src="https://docs.google.com/forms/d/e/1FAIpQLSefpwnYgrIP61bJWKBqVqB4NSC1NBOVKnfpXcVqlhX0eD0Asw/viewform?embedded=true" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }}
                title="Astrospacious Careers Form"
              >
                Loading…
              </iframe>
            </div>

            <div style={{ textAlign: 'center', marginTop: '32px' }}>
              <p style={{ color: '#94a3b8', fontSize: '14px', marginBottom: '16px' }}>Having trouble viewing the form?</p>
              <button 
                className="ctaButtonLarge gradient"
                style={{ padding: '14px 32px', fontSize: '16px' }}
                onClick={() => window.open('https://docs.google.com/forms/d/e/1FAIpQLSefpwnYgrIP61bJWKBqVqB4NSC1NBOVKnfpXcVqlhX0eD0Asw/viewform', '_blank', 'noopener,noreferrer')}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.05)';
                  e.currentTarget.style.boxShadow = '0 15px 40px rgba(139, 92, 246, 0.5)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.boxShadow = '0 10px 30px rgba(139, 92, 246, 0.3)';
                }}
              >
                Open Application Form
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default Careers;
