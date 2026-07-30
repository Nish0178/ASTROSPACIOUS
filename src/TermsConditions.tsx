import React from "react";

export default function TermsConditions() {
  const styles: Record<string, React.CSSProperties> = {
    page: {
      minHeight: "100vh",
      background:
        "linear-gradient(180deg,#071428 0%,#081A32 50%,#0A0F1F 100%)",
      color: "#F8FAFC",
      fontFamily: "'Inter', sans-serif",
      padding: "60px 20px",
    },

    container: {
      maxWidth: "1180px",
      margin: "0 auto",
    },

    hero: {
      textAlign: "center",
      padding: "70px 40px",
      borderRadius: "28px",
      background:
        "linear-gradient(135deg,#0B1E39,#11294D,#173A67)",
      border: "1px solid rgba(59,130,246,.25)",
      marginBottom: "60px",
      boxShadow:
        "0 25px 70px rgba(0,0,0,.35)",
    },

    heroIcon: {
      fontSize: "70px",
      marginBottom: "25px",
    },

    heroTitle: {
      fontSize: "54px",
      fontWeight: 800,
      marginBottom: "15px",
      color: "#FFFFFF",
    },

    heroSubtitle: {
      maxWidth: "760px",
      margin: "0 auto",
      fontSize: "20px",
      lineHeight: 1.8,
      color: "#CBD5E1",
    },

    badge: {
      marginTop: "35px",
      display: "inline-block",
      padding: "12px 22px",
      borderRadius: "999px",
      background: "#2563EB",
      color: "#fff",
      fontWeight: 600,
      fontSize: "15px",
    },

    overview: {
      background: "#0F172A",
      borderRadius: "22px",
      padding: "40px",
      marginBottom: "50px",
      border: "1px solid rgba(59,130,246,.20)",
    },

    overviewTitle: {
      fontSize: "30px",
      marginBottom: "20px",
    },

    overviewText: {
      color: "#CBD5E1",
      lineHeight: 1.9,
      fontSize: "17px",
      marginBottom: "30px",
    },

    overviewGrid: {
      display: "grid",
      gridTemplateColumns:
        "repeat(auto-fit,minmax(250px,1fr))",
      gap: "20px",
    },

    overviewItem: {
      background: "#162238",
      padding: "20px",
      borderRadius: "14px",
      border: "1px solid rgba(59,130,246,.15)",
      fontSize: "16px",
      color: "#E2E8F0",
    },
    sectionDivider: {
  width: "100%",
  height: "1px",
  background: "rgba(255,255,255,.08)",
  margin: "70px 0",
},

section: {
  display: "flex",
  gap: "35px",
  marginBottom: "60px",
},

number: {
  fontSize: "64px",
  fontWeight: 800,
  color: "#2563EB",
  minWidth: "90px",
},

content: {
  flex: 1,
},

heading: {
  fontSize: "34px",
  color: "#FFFFFF",
  marginBottom: "15px",
},

paragraph: {
  color: "#CBD5E1",
  lineHeight: 1.9,
  fontSize: "17px",
},

blueLine: {
  width: "80px",
  height: "4px",
  background: "#2563EB",
  borderRadius: "999px",
  marginBottom: "25px",
},

bulletList: {
  marginTop: "20px",
  paddingLeft: "22px",
  color: "#CBD5E1",
  lineHeight: 2,
},
};

return (
  <div style={styles.page}>
    <div style={styles.container}>

      <section style={styles.hero}>
        <div style={styles.heroIcon}>📜</div>

        <h1 style={styles.heroTitle}>
          Terms & Conditions
        </h1>

        <p style={styles.heroSubtitle}>
          These Terms & Conditions govern your access to and use of
          Astrospacious. By using our platform, you agree to comply
          with the terms outlined below.
        </p>

        <div style={styles.badge}>
          Effective Date • July 30, 2026
        </div>
      </section>
{/* ===========================
    AGREEMENT OVERVIEW
=========================== */}

<section style={styles.overview}>

  <h2 style={styles.overviewTitle}>
    Agreement Overview
  </h2>

  <p style={styles.overviewText}>
    These Terms & Conditions define the rules, responsibilities,
    and legal obligations that apply when you access or use
    Astrospacious. They are intended to ensure a safe,
    respectful, and transparent experience for every visitor.
  </p>

  <div style={styles.overviewGrid}>

    <div style={styles.overviewItem}>
      ✔ Your Rights
    </div>

    <div style={styles.overviewItem}>
      ✔ User Responsibilities
    </div>

    <div style={styles.overviewItem}>
      ✔ Intellectual Property
    </div>

    <div style={styles.overviewItem}>
      ✔ Acceptable Use
    </div>

    <div style={styles.overviewItem}>
      ✔ Platform Security
    </div>

    <div style={styles.overviewItem}>
      ✔ Legal Contact
    </div>

  </div>

</section>

{/* ===========================
    AGREEMENT INDEX
=========================== */}

<section style={styles.indexBox}>

  <h2 style={styles.indexTitle}>
    Agreement Index
  </h2>

  <div style={styles.indexItem}>
    <span>
      <span style={styles.indexNumber}>01</span>
      Acceptance of Terms
    </span>
  </div>

  <div style={styles.indexItem}>
    <span>
      <span style={styles.indexNumber}>02</span>
      User Responsibilities
    </span>
  </div>

  <div style={styles.indexItem}>
    <span>
      <span style={styles.indexNumber}>03</span>
      Intellectual Property
    </span>
  </div>

  <div style={styles.indexItem}>
    <span>
      <span style={styles.indexNumber}>04</span>
      Prohibited Activities
    </span>
  </div>

  <div style={styles.indexItem}>
    <span>
      <span style={styles.indexNumber}>05</span>
      Limitation of Liability
    </span>
  </div>

  <div style={styles.indexItem}>
    <span>
      <span style={styles.indexNumber}>06</span>
      Changes to Terms
    </span>
  </div>

</section>

<div style={styles.sectionDivider}></div>
{/* ===========================
    SECTION 01
=========================== */}

<section style={styles.section}>
  <div style={styles.number}>01</div>

  <div style={styles.content}>
    <h2 style={styles.heading}>Acceptance of Terms</h2>

    <div style={styles.blueLine}></div>

    <p style={styles.paragraph}>
      By accessing or using Astrospacious, you acknowledge that you
      have read, understood, and agreed to comply with these Terms &
      Conditions. If you do not agree with any part of these Terms,
      you should discontinue using the platform immediately.
    </p>
  </div>
</section>

{/* ===========================
    SECTION 02
=========================== */}

<section style={styles.section}>
  <div style={styles.number}>02</div>

  <div style={styles.content}>
    <h2 style={styles.heading}>User Responsibilities</h2>

    <div style={styles.blueLine}></div>

    <p style={styles.paragraph}>
      Every user is expected to use Astrospacious responsibly and in
      accordance with applicable laws. Users are responsible for the
      activities performed using their accounts and must ensure the
      accuracy of the information they provide.
    </p>

    <ul style={styles.bulletList}>
      <li>Provide accurate and up-to-date information.</li>
      <li>Respect the rights and privacy of other users.</li>
      <li>Protect your account credentials.</li>
      <li>Comply with all applicable laws and regulations.</li>
    </ul>
  </div>
</section>

{/* ===========================
    SECTION 03
=========================== */}

<section style={styles.section}>
  <div style={styles.number}>03</div>

  <div style={styles.content}>
    <h2 style={styles.heading}>Intellectual Property</h2>

    <div style={styles.blueLine}></div>

    <p style={styles.paragraph}>
      All content available on Astrospacious—including articles,
      graphics, logos, branding, educational materials, layouts,
      images, and other intellectual assets—is owned by or licensed
      to Astrospacious. Unauthorized copying, reproduction, or
      redistribution is strictly prohibited without prior written
      permission.
    </p>
  </div>
</section>

{/* ===========================
    SECTION 04
=========================== */}

<section style={styles.section}>
  <div style={styles.number}>04</div>

  <div style={styles.content}>
    <h2 style={styles.heading}>Prohibited Activities</h2>

    <div style={styles.blueLine}></div>

    <p style={styles.paragraph}>
      To maintain a secure and reliable learning environment, users
      must not engage in activities that may harm the platform or
      other users.
    </p>

    <ul style={styles.bulletList}>
      <li>Attempt unauthorized access to any system or account.</li>
      <li>Upload malicious software, viruses, or harmful code.</li>
      <li>Reverse engineer any feature or functionality.</li>
      <li>Copy copyrighted material without permission.</li>
      <li>Disrupt or interfere with website services.</li>
      <li>Use Astrospacious for unlawful or fraudulent purposes.</li>
    </ul>
  </div>
</section>

{/* ===========================
    SECTION 05
=========================== */}

<section style={styles.section}>
  <div style={styles.number}>05</div>

  <div style={styles.content}>
    <h2 style={styles.heading}>Limitation of Liability</h2>

    <div style={styles.blueLine}></div>

    <p style={styles.paragraph}>
      Astrospacious provides educational resources for informational
      purposes. While we strive for accuracy and uninterrupted
      availability, we cannot guarantee that all information will
      always be complete, current, or free from technical issues.
      Users access and use the platform at their own discretion.
    </p>
  </div>
</section>

{/* ===========================
    SECTION 06
=========================== */}

<section style={styles.section}>
  <div style={styles.number}>06</div>

  <div style={styles.content}>
    <h2 style={styles.heading}>Changes to These Terms</h2>

    <div style={styles.blueLine}></div>

    <p style={styles.paragraph}>
      Astrospacious reserves the right to update or modify these
      Terms & Conditions at any time. Any revisions will become
      effective immediately after being published on this page.
      Continued use of the platform indicates your acceptance of
      the revised Terms.
    </p>
  </div>
</section>
{/* ===========================
    SECTION 07
=========================== */}

<section style={styles.section}>
  <div style={styles.number}>07</div>

  <div style={styles.content}>
    <h2 style={styles.heading}>Termination of Access</h2>

    <div style={styles.blueLine}></div>

    <p style={styles.paragraph}>
      Astrospacious reserves the right to suspend or terminate access
      to the platform, with or without prior notice, if a user
      violates these Terms & Conditions, engages in unlawful
      activities, or compromises the security or integrity of the
      platform.
    </p>
  </div>
</section>

{/* ===========================
    SECTION 08
=========================== */}

<section style={styles.section}>
  <div style={styles.number}>08</div>

  <div style={styles.content}>
    <h2 style={styles.heading}>Governing Law</h2>

    <div style={styles.blueLine}></div>

    <p style={styles.paragraph}>
      These Terms & Conditions shall be governed by and interpreted
      in accordance with the laws applicable in the jurisdiction in
      which Astrospacious operates. Any disputes arising from the use
      of this platform shall be subject to the competent courts of
      that jurisdiction.
    </p>
  </div>
</section>

<div style={styles.sectionDivider}></div>

{/* ===========================
    LEGAL CONTACT
=========================== */}

<section
  style={{
    background: "#0F172A",
    border: "1px solid rgba(59,130,246,.20)",
    borderRadius: "24px",
    padding: "50px",
    textAlign: "center",
    marginBottom: "60px",
  }}
>
  <div
    style={{
      fontSize: "52px",
      marginBottom: "20px",
    }}
  >
    ⚖️
  </div>

  <h2
    style={{
      fontSize: "36px",
      marginBottom: "15px",
      color: "#FFFFFF",
    }}
  >
    Legal Contact
  </h2>

  <p
    style={{
      color: "#CBD5E1",
      maxWidth: "700px",
      margin: "0 auto 30px",
      lineHeight: 1.9,
      fontSize: "17px",
    }}
  >
    If you have any questions regarding these Terms & Conditions,
    legal matters, or your rights while using Astrospacious,
    please contact our team.
  </p>

  <a
    href="mailto:outreach.astrospacious@gmail.com"
    style={{
      display: "inline-block",
      padding: "16px 32px",
      background: "#2563EB",
      color: "#FFFFFF",
      borderRadius: "12px",
      textDecoration: "none",
      fontWeight: 600,
      fontSize: "17px",
    }}
  >
    📧 outreach.astrospacious@gmail.com
  </a>
</section>

<footer
  style={{
    borderTop: "1px solid rgba(255,255,255,.08)",
    paddingTop: "35px",
    textAlign: "center",
    color: "#94A3B8",
    lineHeight: 1.8,
  }}
>
  <p>
    © 2026 Astrospacious. All rights reserved.
  </p>

  <p>
    Continued use of Astrospacious constitutes acceptance of these
    Terms & Conditions.
  </p>
</footer>

    </div>
  </div>
);
}
