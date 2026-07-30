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

    link: {
      color: "#bfbfbf",
      textDecoration: "none",
      transition: "0.3s ease",
      cursor: "pointer",
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

  const hoverIn = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.currentTarget.style.color = "#ffffff";
  };

  const hoverOut = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.currentTarget.style.color = "#bfbfbf";
  };

  return (
    <footer style={styles.footer}>
      {/* Social Icons */}
      <div style={styles.iconContainer}>
        <a
          href="https://www.instagram.com/astrospacious/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
          style={styles.link}
          onMouseEnter={hoverIn}
          onMouseLeave={hoverOut}
        >
          <i className="fa fa-instagram" style={styles.icon}></i>
        </a>

        <a
          href="https://www.linkedin.com/in/anvita-srivastava-311b86325/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
          style={styles.link}
          onMouseEnter={hoverIn}
          onMouseLeave={hoverOut}
        >
          <i className="fa fa-linkedin" style={styles.icon}></i>
        </a>

        <a
          href="mailto:outreach.astrospacious@gmail.com?subject=Contact%20from%20Astrospacious%20Website"
          aria-label="Email"
          style={styles.link}
          onMouseEnter={hoverIn}
          onMouseLeave={hoverOut}
        >
          <i className="fa fa-envelope" style={styles.icon}></i>
        </a>
      </div>

      {/* Footer Navigation */}
      <ul style={styles.menu}>
        <li>
          <a
            href="/About"
            style={styles.link}
            onMouseEnter={hoverIn}
            onMouseLeave={hoverOut}
          >
            About Us
          </a>
        </li>

        <li>
          <a
            href="/Articles"
            style={styles.link}
            onMouseEnter={hoverIn}
            onMouseLeave={hoverOut}
          >
            Articles
          </a>
        </li>

        <li>
          <a
            href="/Magazines"
            style={styles.link}
            onMouseEnter={hoverIn}
            onMouseLeave={hoverOut}
          >
            Magazines
          </a>
        </li>

        <li>
          <a
            href="/Subject"
            style={styles.link}
            onMouseEnter={hoverIn}
            onMouseLeave={hoverOut}
          >
            Explore Subjects
          </a>
        </li>

        <li>
          <a
            href="/Contact"
            style={styles.link}
            onMouseEnter={hoverIn}
            onMouseLeave={hoverOut}
          >
            Contact Us
          </a>
        </li>

        <li>
          <a
            href="/privacy-policy"
            style={styles.link}
            onMouseEnter={hoverIn}
            onMouseLeave={hoverOut}
          >
            Privacy Policy
          </a>
        </li>

        <li>
          <a
            href="/terms-and-conditions"
            style={styles.link}
            onMouseEnter={hoverIn}
            onMouseLeave={hoverOut}
          >
            Terms & Conditions
          </a>
        </li>
      </ul>

      {/* Email */}
      <div style={styles.email}>
        <a
          href="mailto:outreach.astrospacious@gmail.com"
          style={styles.link}
          onMouseEnter={hoverIn}
          onMouseLeave={hoverOut}
        >
          outreach.astrospacious@gmail.com
        </a>
      </div>

      {/* Copyright */}
      <div style={styles.copyright}>
        © 2026 ASTROSPACIOUS. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;