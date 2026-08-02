import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import "./ArticlesEngagement.css";

export function FinalCTA() {
  return (
    <motion.section 
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8 }}
      className="final-cta-section"
    >
      <div className="cta-content">
        <h2>Ready to Explore the Universe?</h2>
        <p>
          Join the Astrospacious community and begin your journey through astronomy, 
          research, education, and space exploration.
        </p>
        <div className="cta-buttons">
          <button className="cta-btn primary" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            Explore More Articles
          </button>
          <Link to="/" className="cta-btn secondary">
            Join Our Community
          </Link>
        </div>
      </div>
    </motion.section>
  );
}
