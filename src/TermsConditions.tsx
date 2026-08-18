import React from "react";
import "./css/TermsConditions.css";

export default function TermsConditions() {
  return (
    <div className="terms-page">
      <div className="terms-container">
        <section className="terms-hero">
          <div className="terms-heroIcon">📜</div>

          <h1 className="terms-heroTitle">Terms & Conditions</h1>

          <p className="terms-heroSubtitle">
            These Terms & Conditions govern your access to and use of Astrospacious. By
            using our platform, you agree to comply with the terms outlined below.
          </p>

          <div className="terms-badge">Effective Date • July 30, 2026</div>
        </section>

        {/* ===========================
            AGREEMENT OVERVIEW
        =========================== */}
        <section className="terms-overview">
          <h2 className="terms-overviewTitle">Agreement Overview</h2>

          <p className="terms-overviewText">
            These Terms & Conditions define the rules, responsibilities, and legal
            obligations that apply when you access or use Astrospacious. They are
            intended to ensure a safe, respectful, and transparent experience for every
            visitor.
          </p>

          <div className="terms-overviewGrid">
            <div className="terms-overviewItem">✔ Your Rights</div>
            <div className="terms-overviewItem">✔ User Responsibilities</div>
            <div className="terms-overviewItem">✔ Intellectual Property</div>
            <div className="terms-overviewItem">✔ Acceptable Use</div>
            <div className="terms-overviewItem">✔ Platform Security</div>
            <div className="terms-overviewItem">✔ Legal Contact</div>
          </div>
        </section>

        {/* ===========================
            AGREEMENT INDEX
        =========================== */}
        <section className="terms-indexBox">
          <h2 className="terms-indexTitle">Agreement Index</h2>

          <div className="terms-indexItem">
            <span>
              <span className="terms-indexNumber">01</span>
              Acceptance of Terms
            </span>
          </div>
          <div className="terms-indexItem">
            <span>
              <span className="terms-indexNumber">02</span>
              User Responsibilities
            </span>
          </div>
          <div className="terms-indexItem">
            <span>
              <span className="terms-indexNumber">03</span>
              Intellectual Property
            </span>
          </div>
          <div className="terms-indexItem">
            <span>
              <span className="terms-indexNumber">04</span>
              Prohibited Activities
            </span>
          </div>
          <div className="terms-indexItem">
            <span>
              <span className="terms-indexNumber">05</span>
              Limitation of Liability
            </span>
          </div>
          <div className="terms-indexItem">
            <span>
              <span className="terms-indexNumber">06</span>
              Changes to Terms
            </span>
          </div>
        </section>

        <div className="terms-sectionDivider"></div>

        {/* ===========================
            SECTION 01
        =========================== */}
        <section className="terms-section">
          <div className="terms-number">01</div>

          <div className="terms-content">
            <h2 className="terms-heading">Acceptance of Terms</h2>
            <div className="terms-blueLine"></div>
            <p className="terms-paragraph">
              By accessing or using Astrospacious, you acknowledge that you have read,
              understood, and agreed to comply with these Terms & Conditions. If you do
              not agree with any part of these Terms, you should discontinue using the
              platform immediately.
            </p>
          </div>
        </section>

        {/* ===========================
            SECTION 02
        =========================== */}
        <section className="terms-section">
          <div className="terms-number">02</div>

          <div className="terms-content">
            <h2 className="terms-heading">User Responsibilities</h2>
            <div className="terms-blueLine"></div>
            <p className="terms-paragraph">
              Every user is expected to use Astrospacious responsibly and in accordance
              with applicable laws. Users are responsible for the activities performed
              using their accounts and must ensure the accuracy of the information they
              provide.
            </p>
            <ul className="terms-bulletList">
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
        <section className="terms-section">
          <div className="terms-number">03</div>

          <div className="terms-content">
            <h2 className="terms-heading">Intellectual Property</h2>
            <div className="terms-blueLine"></div>
            <p className="terms-paragraph">
              All content available on Astrospacious—including articles, graphics, logos,
              branding, educational materials, layouts, images, and other intellectual
              assets—is owned by or licensed to Astrospacious. Unauthorized copying,
              reproduction, or redistribution is strictly prohibited without prior written
              permission.
            </p>
          </div>
        </section>

        {/* ===========================
            SECTION 04
        =========================== */}
        <section className="terms-section">
          <div className="terms-number">04</div>

          <div className="terms-content">
            <h2 className="terms-heading">Prohibited Activities</h2>
            <div className="terms-blueLine"></div>
            <p className="terms-paragraph">
              To maintain a secure and reliable learning environment, users must not
              engage in activities that may harm the platform or other users.
            </p>
            <ul className="terms-bulletList">
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
        <section className="terms-section">
          <div className="terms-number">05</div>

          <div className="terms-content">
            <h2 className="terms-heading">Limitation of Liability</h2>
            <div className="terms-blueLine"></div>
            <p className="terms-paragraph">
              Astrospacious provides educational resources for informational purposes.
              While we strive for accuracy and uninterrupted availability, we cannot
              guarantee that all information will always be complete, current, or free
              from technical issues. Users access and use the platform at their own
              discretion.
            </p>
          </div>
        </section>

        {/* ===========================
            SECTION 06
        =========================== */}
        <section className="terms-section">
          <div className="terms-number">06</div>

          <div className="terms-content">
            <h2 className="terms-heading">Changes to These Terms</h2>
            <div className="terms-blueLine"></div>
            <p className="terms-paragraph">
              Astrospacious reserves the right to update or modify these Terms &
              Conditions at any time. Any revisions will become effective immediately
              after being published on this page. Continued use of the platform indicates
              your acceptance of the revised Terms.
            </p>
          </div>
        </section>

        {/* ===========================
            SECTION 07
        =========================== */}
        <section className="terms-section">
          <div className="terms-number">07</div>

          <div className="terms-content">
            <h2 className="terms-heading">Termination of Access</h2>
            <div className="terms-blueLine"></div>
            <p className="terms-paragraph">
              Astrospacious reserves the right to suspend or terminate access to the
              platform, with or without prior notice, if a user violates these Terms &
              Conditions, engages in unlawful activities, or compromises the security or
              integrity of the platform.
            </p>
          </div>
        </section>

        {/* ===========================
            SECTION 08
        =========================== */}
        <section className="terms-section">
          <div className="terms-number">08</div>

          <div className="terms-content">
            <h2 className="terms-heading">Governing Law</h2>
            <div className="terms-blueLine"></div>
            <p className="terms-paragraph">
              These Terms & Conditions shall be governed by and interpreted in accordance
              with the laws applicable in the jurisdiction in which Astrospacious
              operates. Any disputes arising from the use of this platform shall be
              subject to the competent courts of that jurisdiction.
            </p>
          </div>
        </section>

        <div className="terms-sectionDivider"></div>

        {/* ===========================
            LEGAL CONTACT
        =========================== */}
        <section className="terms-legalContact">
          <div className="terms-legalIcon">⚖️</div>
          <h2 className="terms-legalTitle">Legal Contact</h2>
          <p className="terms-legalText">
            If you have any questions regarding these Terms & Conditions, legal matters,
            or your rights while using Astrospacious, please contact our team.
          </p>
          <a href="mailto:outreach.astrospacious@gmail.com" className="terms-legalLink">
            📧 outreach.astrospacious@gmail.com
          </a>
        </section>

        <footer className="terms-footer">
          <p>© 2026 Astrospacious. All rights reserved.</p>
          <p>
            Continued use of Astrospacious constitutes acceptance of these Terms &
            Conditions.
          </p>
        </footer>
      </div>
    </div>
  );
}
