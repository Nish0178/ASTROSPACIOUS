import { motion } from "framer-motion";
import "./ArticlesEngagement.css";

interface NewsletterCardProps {
  feature: {
    icon: string;
    title: string;
    description: string;
  };
  index: number;
}

export function NewsletterCard({ feature, index }: NewsletterCardProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="newsletter-card"
    >
      <div className="card-icon">{feature.icon}</div>
      <div className="card-info">
        <h4>{feature.title}</h4>
        <p>{feature.description}</p>
      </div>
    </motion.div>
  );
}
