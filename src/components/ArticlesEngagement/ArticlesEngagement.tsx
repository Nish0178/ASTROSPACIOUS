import { NewsletterSection } from "./NewsletterSection";
import { FinalCTA } from "./FinalCTA";
import { SocialLinks } from "./SocialLinks";
import "./ArticlesEngagement.css";

export function ArticlesEngagement() {
  return (
    <div className="articles-engagement-wrapper">
      <NewsletterSection />
      <FinalCTA />
      <SocialLinks />
    </div>
  );
}
