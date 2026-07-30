import React from "react";

export default function Contact() {
  const styles: Record<string, React.CSSProperties> = {
    page: {
      minHeight: "100vh",
      background:
        "linear-gradient(180deg,#06131F 0%,#081B29 50%,#09111B 100%)",
      color: "#FFFFFF",
      fontFamily: "'Inter', sans-serif",
      padding: "60px 20px",
    },

    container: {
      maxWidth: "1200px",
      margin: "0 auto",
    },

    hero: {
      textAlign: "center",
      padding: "clamp(40px, 8vw, 80px) clamp(20px, 5vw, 40px)",
      borderRadius: "30px",
      background:
        "linear-gradient(135deg,#0F172A,#10283E,#0D3B4D)",
      border: "1px solid rgba(16,185,129,.25)",
      marginBottom: "60px",
      boxShadow: "0 25px 70px rgba(0,0,0,.35)",
    },

    heroIcon: {
      fontSize: "70px",
      marginBottom: "20px",
    },

    heroTitle: {
      fontSize: "clamp(32px, 8vw, 56px)",
      fontWeight: 800,
      marginBottom: "20px",
    },

    heroSubtitle: {
      maxWidth: "760px",
      margin: "0 auto",
      color: "#CBD5E1",
      lineHeight: 1.9,
      fontSize: "20px",
    },

    cardGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit,minmax(min(100%, 300px),1fr))",
      gap: "30px",
      marginTop: "60px",
    },

    card: {
      background: "#0F172A",
      borderRadius: "20px",
      padding: "35px",
      border: "1px solid rgba(16,185,129,.15)",
      transition: ".3s",
      textAlign: "center",
    },

    cardIcon: {
      fontSize: "48px",
      marginBottom: "18px",
    },

    cardTitle: {
      fontSize: "24px",
      marginBottom: "10px",
    },

    cardText: {
      color: "#CBD5E1",
      lineHeight: 1.8,
    },
    formSection: {
  marginTop: "80px",
  background: "#0F172A",
  borderRadius: "24px",
  padding: "clamp(20px, 5vw, 50px)",
  border: "1px solid rgba(16,185,129,.20)",
},

formTitle: {
  fontSize: "clamp(28px, 6vw, 38px)",
  marginBottom: "15px",
  textAlign: "center" as const,
},

formSubtitle: {
  color: "#CBD5E1",
  textAlign: "center" as const,
  marginBottom: "40px",
  lineHeight: 1.8,
},

formGrid: {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit,minmax(min(100%, 280px),1fr))",
  gap: "25px",
},

inputGroup: {
  display: "flex",
  flexDirection: "column" as const,
},

label: {
  marginBottom: "10px",
  fontWeight: 600,
  color: "#E5E7EB",
},

input: {
  padding: "16px",
  borderRadius: "12px",
  border: "1px solid rgba(255,255,255,.10)",
  background: "#162238",
  color: "#FFFFFF",
  fontSize: "16px",
  outline: "none",
},

textarea: {
  marginTop: "25px",
  width: "100%",
  minHeight: "180px",
  padding: "18px",
  borderRadius: "12px",
  border: "1px solid rgba(255,255,255,.10)",
  background: "#162238",
  color: "#FFFFFF",
  resize: "vertical" as const,
  fontSize: "16px",
  outline: "none",
},

button: {
  marginTop: "35px",
  width: "100%",
  padding: "18px",
  background: "#10B981",
  color: "#FFFFFF",
  border: "none",
  borderRadius: "12px",
  cursor: "pointer",
  fontSize: "18px",
  fontWeight: 700,
},
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <section style={styles.hero}>

  <div style={styles.heroIcon}>
    💬
  </div>

  <h1 style={styles.heroTitle}>
    Contact Astrospacious
  </h1>

  <p style={styles.heroSubtitle}>
    We'd love to hear from you. Whether you have a question,
    partnership proposal, feedback, or need technical support,
    our team is ready to help you.
  </p>

</section>
<section style={styles.cardGrid}>

  <div style={styles.card}>

    <div style={styles.cardIcon}>
      📧
    </div>

    <h2 style={styles.cardTitle}>
      Email Us
    </h2>

    <p style={styles.cardText}>
      outreach.astrospacious@gmail.com
    </p>

  </div>

  <div style={styles.card}>

    <div style={styles.cardIcon}>
      📍
    </div>

    <h2 style={styles.cardTitle}>
      Location
    </h2>

    <p style={styles.cardText}>
      Lucknow<br />
      Uttar Pradesh<br />
      India
    </p>

  </div>

  <div style={styles.card}>

    <div style={styles.cardIcon}>
      🕒
    </div>

    <h2 style={styles.cardTitle}>
      Response Time
    </h2>

    <p style={styles.cardText}>
      Usually within<br />
      24–48 Hours
    </p>

  </div>

</section>
<section style={styles.formSection}>

  <h2 style={styles.formTitle}>
    Send Us a Message
  </h2>

  <p style={styles.formSubtitle}>
    Complete the form below and our team will get back to you within 24–48 hours.
  </p>

  <form
  action="https://formsubmit.co/outreach.astrospacious@gmail.com"
  method="POST"
>
  <input
  type="hidden"
  name="_subject"
  value="New Contact Form Submission - Astrospacious"
/>

<input
  type="hidden"
  name="_captcha"
  value="false"
/>

<input
  type="hidden"
  name="_template"
  value="table"
/>

<input
  type="hidden"
  name="_next"
  value="https://www.astrospacious.com/thank-you"
/>

    <div style={styles.formGrid}>

      <div style={styles.inputGroup}>
        <label style={styles.label}>First Name *</label>
        <input type="text" placeholder="John" style={styles.input}/>
      </div>

      <div style={styles.inputGroup}>
        <label style={styles.label}>Last Name *</label>
        <input type="text" placeholder="Doe" style={styles.input}/>
      </div>

      <div style={styles.inputGroup}>
        <label style={styles.label}>Email *</label>
        <input type="email" placeholder="john@example.com" style={styles.input}/>
      </div>

      <div style={styles.inputGroup}>
        <label style={styles.label}>Phone</label>
        <input type="tel" placeholder="+91 9876543210" style={styles.input}/>
      </div>

      <div style={styles.inputGroup}>
        <label style={styles.label}>Subject *</label>
        <input type="text" placeholder="Enter subject" style={styles.input}/>
      </div>

      <div style={styles.inputGroup}>
        <label style={styles.label}>Category *</label>

        <select style={styles.input} defaultValue="">
          <option value="" disabled>Select Category</option>
          <option>General Inquiry</option>
          <option>Technical Support</option>
          <option>Partnership</option>
          <option>Feedback</option>
          <option>Bug Report</option>
          <option>Other</option>
        </select>

      </div>

    </div>

    <label
      style={{
        ...styles.label,
        display: "block",
        marginTop: "25px"
      }}
    >
      Message *
    </label>

    <textarea
      style={styles.textarea}
      placeholder="Write your message..."
    ></textarea>

    <button
      type="submit"
      style={styles.button}
    >
      Send Message
    </button>

  </form>

</section>
      </div>
    </div>
  );
}