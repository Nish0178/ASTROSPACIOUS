import React from "react";

interface SectionHeadingProps {
  title: string;
  subtitle: string;
}

export default function SectionHeading({
  title,
  subtitle,
}: SectionHeadingProps) {
  const styles: Record<string, React.CSSProperties> = {
    wrapper: {
      textAlign: "center",
      marginBottom: "60px",
      position: "relative",
      overflow: "hidden",
      padding: "80px 20px 60px",
      borderRadius: "28px",
      background:
        "linear-gradient(135deg, rgba(124,92,255,0.18), rgba(79,70,229,0.08), rgba(15,23,42,1))",
      border: "1px solid rgba(124,92,255,0.25)",
    },

    glow: {
      position: "absolute",
      width: "280px",
      height: "280px",
      borderRadius: "50%",
      background: "rgba(124,92,255,0.25)",
      filter: "blur(120px)",
      top: "-120px",
      left: "50%",
      transform: "translateX(-50%)",
      pointerEvents: "none",
    },

    badge: {
      display: "inline-block",
      padding: "8px 18px",
      borderRadius: "999px",
      border: "1px solid rgba(124,92,255,0.35)",
      background: "rgba(124,92,255,0.12)",
      color: "#C4B5FD",
      fontSize: "14px",
      fontWeight: 600,
      marginBottom: "24px",
      letterSpacing: "0.5px",
    },

    title: {
      fontSize: "56px",
      fontWeight: 800,
      color: "#FFFFFF",
      margin: 0,
      lineHeight: 1.1,
    },

    gradient: {
      background:
        "linear-gradient(90deg,#A78BFA,#7C5CFF,#60A5FA)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
    },

    subtitle: {
      maxWidth: "760px",
      margin: "24px auto 0",
      color: "#CBD5E1",
      fontSize: "20px",
      lineHeight: 1.8,
    },
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.glow}></div>

      <div style={styles.badge}>
        Last Updated • July 30, 2026
      </div>

      <h1 style={styles.title}>
        <span style={styles.gradient}>{title}</span>
      </h1>

      <p style={styles.subtitle}>
        {subtitle}
      </p>
    </div>
  );
}