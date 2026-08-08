import { motion } from "framer-motion";
import { Linkedin, Instagram, Mail } from "lucide-react";
import "./ArticlesEngagement.css";

const socials = [
  { icon: Linkedin, name: "LinkedIn", href: "https://www.linkedin.com/company/astrospacious/" },
  { icon: Instagram, name: "Instagram", href: "https://www.instagram.com/astrospacious/" },
  { icon: Mail, name: "Email", href: "mailto:outreach.astrospacious@gmail.com" }
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
            target="_blank"
            rel="noopener noreferrer"
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
