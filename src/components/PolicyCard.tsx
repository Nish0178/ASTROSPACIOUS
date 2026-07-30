import React from "react";

interface PolicyCardProps {
  icon: string;
  title: string;
  children: React.ReactNode;
}

export default function PolicyCard({
  icon,
  title,
  children,
}: PolicyCardProps) {
  const styles: Record<string, React.CSSProperties> = {
    card: {
      background: "rgba(15,23,42,0.82)",
      backdropFilter: "blur(14px)",
      WebkitBackdropFilter: "blur(14px)",
      border: "1px solid rgba(124,92,255,0.25)",
      borderRadius: "22px",
      padding: "32px",
      marginBottom: "28px",
      transition: "all .35s ease",
      boxShadow: "0 10px 35px rgba(0,0,0,.35)",
    },

    titleRow: {
      display: "flex",
      alignItems: "center",
      marginBottom: "18px",
    },

    icon: {
      fontSize: "30px",
      marginRight: "15px",
    },

    title: {
      fontSize: "28px",
      color: "#ffffff",
      fontWeight: 700,
      margin: 0,
    },

    body: {
      color: "#CBD5E1",
      lineHeight: 1.9,
      fontSize: "17px",
    },
  };

  return (
    <div
      style={styles.card}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-6px)";
        e.currentTarget.style.borderColor = "#7C5CFF";
        e.currentTarget.style.boxShadow =
          "0 20px 45px rgba(124,92,255,.30)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0px)";
        e.currentTarget.style.borderColor =
          "rgba(124,92,255,0.25)";
        e.currentTarget.style.boxShadow =
          "0 10px 35px rgba(0,0,0,.35)";
      }}
    >
      <div style={styles.titleRow}>
        <span style={styles.icon}>{icon}</span>

        <h2 style={styles.title}>{title}</h2>
      </div>

      <div style={styles.body}>{children}</div>
    </div>
  );
}