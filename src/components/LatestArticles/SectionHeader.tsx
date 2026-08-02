import { motion } from "framer-motion";
import "./LatestArticles.css";

interface SectionHeaderProps {
  title: string;
  subtitle: string;
}

export function SectionHeader({ title, subtitle }: SectionHeaderProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6 }}
      className="latest-section-header"
    >
      <h2>{title}</h2>
      <p>{subtitle}</p>
    </motion.div>
  );
}
