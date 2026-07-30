import React, { useEffect, useState } from "react";

export default function ThankYou() {
  const [countdown, setCountdown] = useState(30);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    const redirect = setTimeout(() => {
      window.location.href = "/";
    }, 30000);

    return () => {
      clearInterval(timer);
      clearTimeout(redirect);
    };
  }, []);

  const styles: Record<string, React.CSSProperties> = {
    page: {
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background:
        "linear-gradient(180deg,#06131F 0%,#081B29 50%,#09111B 100%)",
      color: "#FFFFFF",
      padding: "20px",
      fontFamily: "'Inter', sans-serif",
    },

    card: {
      width: "100%",
      maxWidth: "700px",
      background: "#0F172A",
      borderRadius: "24px",
      padding: "60px",
      textAlign: "center",
      border: "1px solid rgba(16,185,129,.25)",
      boxShadow: "0 25px 70px rgba(0,0,0,.35)",
    },

    icon: {
      fontSize: "80px",
      marginBottom: "20px",
    },

    title: {
      fontSize: "48px",
      fontWeight: 800,
      marginBottom: "20px",
    },

    subtitle: {
      color: "#CBD5E1",
      fontSize: "20px",
      lineHeight: 1.8,
      marginBottom: "40px",
    },

    countdown: {
      fontSize: "32px",
      color: "#10B981",
      fontWeight: 700,
      marginBottom: "40px",
    },

    button: {
      display: "inline-block",
      background: "#10B981",
      color: "#FFFFFF",
      textDecoration: "none",
      padding: "16px 40px",
      borderRadius: "12px",
      fontWeight: 700,
      fontSize: "18px",
    },
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>

        <div style={styles.icon}>
          🎉
        </div>

        <h1 style={styles.title}>
          Thank You!
        </h1>

        <p style={styles.subtitle}>
          Your message has been sent successfully.
          <br /><br />
          Thank you for contacting Astrospacious.
          <br /><br />
          Our team has received your inquiry and will get
          back to you within <strong>24–48 hours.</strong>
        </p>

        <div style={styles.countdown}>
          Redirecting to Home in {countdown}s
        </div>

        <a
          href="/"
          style={styles.button}
        >
          🏠 Back to Home
        </a>

      </div>
    </div>
  );
}
