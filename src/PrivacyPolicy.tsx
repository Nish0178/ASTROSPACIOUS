import React from "react";
import PolicyCard from "./components/PolicyCard";
import SectionHeading from "./components/SectionHeading";

export default function PrivacyPolicy() {
  const styles: Record<string, React.CSSProperties> = {
    page: {
      minHeight: "100vh",
      background:
        "radial-gradient(circle at top, #1E1B4B 0%, #0B1026 45%, #060816 100%)",
      color: "#fff",
      fontFamily: "'Inter', sans-serif",
      padding: "40px 20px 80px",
    },

    container: {
      maxWidth: "1150px",
      margin: "0 auto",
    },

    toc: {
      background: "rgba(17,24,39,.75)",
      border: "1px solid rgba(124,92,255,.25)",
      borderRadius: "20px",
      padding: "30px",
      marginBottom: "50px",
      backdropFilter: "blur(18px)",
    },

    tocTitle: {
      fontSize: "28px",
      color: "#fff",
      marginBottom: "20px",
      fontWeight: 700,
    },

    list: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))",
      gap: "14px",
      color: "#CBD5E1",
      fontSize: "17px",
      lineHeight: 2,
    },

    footer: {
      marginTop: "70px",
      textAlign: "center",
      color: "#94A3B8",
      borderTop: "1px solid rgba(255,255,255,.08)",
      paddingTop: "35px",
      lineHeight: 1.8,
    },
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>

        <SectionHeading
          title="Privacy Policy"
          subtitle="Your privacy is important to Astrospacious. This policy explains what information we collect, how we use it, and how we protect it while you use our platform."
        />

        {/* Table of Contents */}

        <div style={styles.toc}>
          <h2 style={styles.tocTitle}>Contents</h2>

          <div style={styles.list}>
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

        <div style={styles.footer}>
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