import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { NewsletterCard } from "./NewsletterCard";
import { useNewsletter } from "../../hooks/useNewsletter";
import "./ArticlesEngagement.css";

const features = [
  { icon: "🚀", title: "Weekly Space Articles", description: "Deep dives into astronomy and space exploration." },
  { icon: "🛰", title: "Mission Updates", description: "Latest news from ISRO, NASA, and SpaceX." },
  { icon: "📚", title: "Astronomy Learning Resources", description: "Educational materials for all space enthusiasts." },
  { icon: "🌌", title: "Exclusive Astrospacious News", description: "Early access to Astrospacious content and events." }
];

export function NewsletterSection() {
  const [email, setEmail] = useState("");
  const { subscribe, status, errorMessage, resetStatus } = useNewsletter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await subscribe(email);
    if (success) {
      setEmail("");
    }
  };

  return (
    <section className="newsletter-section">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8 }}
        className="newsletter-container"
      >
        <div className="newsletter-content">
          <h2>Stay Updated With the Universe</h2>
          <p>
            Receive the latest astronomy articles, space mission updates, educational resources, 
            and exclusive Astrospacious content directly in your inbox.
          </p>

          <form className="newsletter-form" onSubmit={handleSubmit}>
            <div className="input-wrapper">
              <Mail className="mail-icon" size={20} />
              <input 
                type="text" 
                placeholder="Enter your email address" 
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  resetStatus();
                }}
                disabled={status === "loading"}
              />
            </div>
            <button 
              type="submit" 
              className="subscribe-btn"
              disabled={status === "loading"}
            >
              {status === "loading" ? (
                <>
                  <Loader2 className="spinner-icon" size={18} style={{ animation: "spin 1s linear infinite", marginRight: "8px", verticalAlign: "middle" }} />
                  Subscribing...
                </>
              ) : (
                "Subscribe"
              )}
            </button>
          </form>

          {status === "empty" && (
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="status-msg error">
              <AlertCircle size={16} /> {errorMessage || "Please enter an email address."}
            </motion.p>
          )}
          {status === "error" && (
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="status-msg error">
              <AlertCircle size={16} /> {errorMessage || "Please enter a valid email address."}
            </motion.p>
          )}
          {status === "exists" && (
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="status-msg error">
              <AlertCircle size={16} /> {errorMessage || "This email is already subscribed!"}
            </motion.p>
          )}
          {status === "success" && (
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="status-msg success">
              <CheckCircle size={16} /> Successfully subscribed! Welcome aboard.
            </motion.p>
          )}
        </div>

        <div className="newsletter-features">
          {features.map((feature, index) => (
            <NewsletterCard key={index} feature={feature} index={index} />
          ))}
        </div>
      </motion.div>
    </section>
  );
}
