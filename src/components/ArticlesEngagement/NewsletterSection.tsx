import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, CheckCircle, AlertCircle } from "lucide-react";
import { NewsletterCard } from "./NewsletterCard";
import "./ArticlesEngagement.css";

const features = [
  { icon: "🚀", title: "Weekly Space Articles", description: "Deep dives into astronomy and space exploration." },
  { icon: "🛰", title: "Mission Updates", description: "Latest news from ISRO, NASA, and SpaceX." },
  { icon: "📚", title: "Astronomy Learning Resources", description: "Educational materials for all space enthusiasts." },
  { icon: "🌌", title: "Exclusive Astrospacious News", description: "Early access to Astrospacious content and events." }
];

export function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "error" | "success" | "exists">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setStatus("error");
      return;
    }
    if (!email.includes("@")) {
      setStatus("error");
      return;
    }
    if (email === "test@astrospacious.com") {
      setStatus("exists");
      return;
    }
    // Simulate successful subscription
    setStatus("success");
    setEmail("");
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
                type="email" 
                placeholder="Enter your email address" 
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (status !== "idle") setStatus("idle");
                }}
              />
            </div>
            <button type="submit" className="subscribe-btn">Subscribe</button>
          </form>

          {status === "error" && (
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="status-msg error">
              <AlertCircle size={16} /> Please enter a valid email address.
            </motion.p>
          )}
          {status === "exists" && (
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="status-msg error">
              <AlertCircle size={16} /> This email is already subscribed!
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
