import React from "react";
import PolicyCard from "./components/PolicyCard";
import SectionHeading from "./components/SectionHeading";
import "./css/PrivacyPolicy.css";

export default function PrivacyPolicy() {
  return (
    <div className="privacy-page">
      <div className="privacy-container">

        <SectionHeading
          title="Privacy Policy"
          subtitle="Your privacy is important to Astrospacious. This policy explains what information we collect, how we use it, and how we protect it while you use our platform."
        />

        {/* Table of Contents */}

        <div className="privacy-toc">
          <h2 className="privacy-tocTitle">Contents</h2>

          <div className="privacy-list">
            <div>🔒 Information We Collect</div>
            <div>📊 How We Use Information</div>
            <div>🍪 Cookies & Analytics</div>
            <div>🌐 Third-Party Services</div>
            <div>🛡 Data Security</div>
            <div>⚖ Your Rights</div>
            <div>📧 Contact Information</div>
          </div>
        </div>

        <PolicyCard
          icon="🔒"
          title="Information We Collect"
        >
          <p>
            Astrospacious collects only the information necessary to
            provide our educational platform and improve the user
            experience. This may include your name, email address,
            contact information, and any information voluntarily
            submitted through forms or communication with our team.
          </p>
        </PolicyCard>

        <PolicyCard
          icon="📊"
          title="How We Use Your Information"
        >
          <p>
            We use information to improve our services, respond to
            enquiries, personalize user experiences, maintain website
            security, communicate important updates, and enhance our
            educational resources.
          </p>
        </PolicyCard>

        <PolicyCard
          icon="🍪"
          title="Cookies & Analytics"
        >
          <p>
            Astrospacious may use cookies and analytics tools to
            understand visitor behavior, improve website performance,
            remember preferences, and deliver a better browsing
            experience.
          </p>
        </PolicyCard>

        {/* More cards will be added here */}

        <div className="privacy-footer">
          <h2>Questions about your privacy?</h2>

          <p>
            Contact our team anytime at
          </p>

          <h3>
            outreach.astrospacious@gmail.com
          </h3>
        </div>

      </div>
    </div>
  );
}