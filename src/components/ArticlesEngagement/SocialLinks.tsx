import { motion } from "framer-motion";
import { Linkedin, Instagram, Github, Youtube, Twitter } from "lucide-react";
import "./ArticlesEngagement.css";

const socials = [
  { icon: Linkedin, name: "LinkedIn", href: "#" },
  { icon: Instagram, name: "Instagram", href: "#" },
  { icon: Github, name: "GitHub", href: "#" },
  { icon: Youtube, name: "YouTube", href: "#" },
  { icon: Twitter, name: "X (Twitter)", href: "#" }
];

export function SocialLinks() {
  return (
    <div className="social-links-section">
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="social-icons"
      >
        {socials.map((Social, index) => (
          <motion.a 
            key={index}
            href={Social.href}
            whileHover={{ scale: 1.15, y: -5 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="social-icon-link"
            aria-label={Social.name}
          >
            <Social.icon size={22} />
          </motion.a>
        ))}
      </motion.div>
    </div>
  );
}
