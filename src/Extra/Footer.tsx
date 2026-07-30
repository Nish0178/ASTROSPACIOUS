import React from "react";
import "font-awesome/css/font-awesome.min.css";

const Footer: React.FC = () => {
  const styles: Record<string, React.CSSProperties> = {
    footer: {
      background: "#000",
      color: "#fff",
      padding: "40px 20px",
      fontFamily: "'Play', sans-serif",
      textAlign: "center",
      position: "relative",
      zIndex: 100,
    },

    row: {
      width: "100%",
      margin: "15px 0",
    },

    iconContainer: {
      display: "flex",
      justifyContent: "center",
      gap: "30px",
      marginBottom: "20px",
    },

    icon: {
      color: "#fff",
      fontSize: "26px",
      transition: "0.3s",
    },

    link: {
      color: "#bfbfbf",
      textDecoration: "none",
      transition: "0.3s",
      cursor: "pointer",
    },

    menu: {
      display: "flex",
      justifyContent: "center",
      flexWrap: "wrap",
      gap: "20px",
      listStyle: "none",
      padding: 0,
      margin: "20px 0",
      fontSize: "15px",
    },

    email: {
      color: "#ffffff",
      marginTop: "15px",
      fontSize: "15px",
    },

    copyright: {
      marginTop: "25px",
      paddingTop: "20px",
      borderTop: "1px solid #333",
      color: "#999",
      fontSize: "14px",
    },
  };

  return (
    <footer style={styles.footer}>
      {/* Social Icons */}

      <div style={styles.iconContainer}>
        <a
          href="https://www.instagram.com/astrospacious/"
target="_blank"
rel="noopener noreferrer"
                  >
          <i className="fa fa-instagram" style={styles.icon}></i>
        </a>

        <a
          href="https://www.linkedin.com/company/astrospacious/"
target="_blank"
rel="noopener noreferrer"
                >
          <i className="fa fa-linkedin" style={styles.icon}></i>
        </a>

        <a
  href="mailto:outreach.astrospacious@gmail.com?subject=Contact%20from%20Astrospacious%20Website"
  target="_blank"
  rel="noopener noreferrer"
>
  <i className="fa fa-envelope" style={styles.icon}></i>
</a>
      </div>

      {/* Footer Links */}

      <ul style={styles.menu}>
        <li>
          <a href="/about" style={styles.link}>
            About Us
          </a>
        </li>

        <li>
          <a href="/articles" style={styles.link}>
            Articles
          </a>
        </li>

        <li>
          <a href="/magazines" style={styles.link}>
            Magazines
          </a>
        </li>

        <li>
          <a href="/explore" style={styles.link}>
            Explore Subjects
          </a>
        </li>

        <li>
          <a href="/contact" style={styles.link}>
            Contact Us
          </a>
        </li>

        <li>
          <a href="/privacy-policy" style={styles.link}>
            Privacy Policy
          </a>
        </li>

        <li>
          <a href="/terms-and-conditions" style={styles.link}>
            Terms & Conditions
          </a>
        </li>
      </ul>

      {/* Email */}

      <div style={styles.email}>
        outreach.astrospacious@gmail.com
      </div>

      {/* Copyright */}

      <div style={styles.copyright}>
        © 2026 ASTROSPACIOUS. All Rights Reserved. 
      </div>
    </footer>
  );
};

export default Footer;