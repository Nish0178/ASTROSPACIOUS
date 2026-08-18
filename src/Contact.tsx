import "./css/Contact.css";
import React, { useState } from "react";

export default function Contact() {
const [formData, setFormData] = useState({
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
  subject: "",
  category: "",
  message: "",
});

const [loading, setLoading] = useState(false);
const [submitted, setSubmitted] = useState(false);
const [errorMessage, setErrorMessage] = useState(""); 
const handleChange = (
  e: React.ChangeEvent<
    HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
  >
) => {
  setFormData((prev) => ({
    ...prev,
    [e.target.name]: e.target.value,
  }));
};
const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  setLoading(true);

    setErrorMessage("");

  try {
    const response = await fetch("/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Something went wrong.");
    }

    setSubmitted(true);

setTimeout(() => {
  window.location.href = "/";
}, 3000);
        setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      subject: "",
      category: "",
      message: "",
    });
  } catch (err) {
    setErrorMessage(
      err instanceof Error
        ? err.message
        : "Unable to send your message."
    );
  } finally {
    setLoading(false);
  }
};

if (submitted) {
  return (
    <div className="contact-success">
      <div className="contact-success-content">
        <div style={{ fontSize: "90px", marginBottom: "25px" }}>✅</div>

        <h1 style={{ fontSize: "46px", marginBottom: "20px", color: "#10B981" }}>
          Message Sent Successfully!
        </h1>

        <p style={{ fontSize: "20px", color: "#CBD5E1", lineHeight: 1.8 }}>
          Thank you for contacting <strong>Astrospacious</strong>.
          <br />
          We've received your message and our team will contact you
          within <strong>24–48 business hours.</strong>
        </p>

        <p style={{ marginTop: "35px", color: "#10B981", fontWeight: 700, fontSize: "18px" }}>
          Redirecting to Home...
        </p>
      </div>
    </div>
  );
}

  return (
    <div className="contact-page">
      <div className="contact-container">
        <section className="contact-hero">

  <div className="contact-heroIcon">
    💬
  </div>

  <h1 className="contact-heroTitle">
    Contact Astrospacious
  </h1>

  <p className="contact-heroSubtitle">
    We'd love to hear from you. Whether you have a question,
    partnership proposal, feedback, or need technical support,
    our team is ready to help you.
  </p>

</section>
<section className="contact-cardGrid">

  <div className="contact-card">

    <div className="contact-cardIcon">
      📧
    </div>

    <h2 className="contact-cardTitle">
      Email Us
    </h2>

    <p className="contact-cardText">
      outreach.astrospacious@gmail.com
    </p>

  </div>

  <div className="contact-card">

    <div className="contact-cardIcon">
      📍
    </div>

    <h2 className="contact-cardTitle">
      Location
    </h2>

    <p className="contact-cardText">
      Lucknow<br />
      Uttar Pradesh<br />
      India
    </p>

  </div>

  <div className="contact-card">

    <div className="contact-cardIcon">
      🕒
    </div>

    <h2 className="contact-cardTitle">
      Response Time
    </h2>

    <p className="contact-cardText">
      Usually within<br />
      24–48 Hours
    </p>

  </div>

</section>
<section className="contact-formSection">

  <h2 className="contact-formTitle">
    Send Us a Message
  </h2>

  <p className="contact-formSubtitle">
    Complete the form below and our team will get back to you within 24–48 hours.
  </p>

  <form onSubmit={handleSubmit}>

  
      <div className="contact-formGrid">

  <div className="contact-inputGroup">
    <label className="contact-label">First Name *</label>
       <input
  type="text"
  name="firstName"
  value={formData.firstName}
  onChange={handleChange}
  placeholder="John"
  className="contact-input"
  required
/>
  </div>

  <div className="contact-inputGroup">
    <label className="contact-label">Last Name *</label>
    <input
  type="text"
  name="lastName"
  value={formData.lastName}
  onChange={handleChange}
  placeholder="Doe"
  className="contact-input"
  required
/>
  </div>

  <div className="contact-inputGroup">
    <label className="contact-label">Email *</label>
    <input
  type="email"
  name="email"
  value={formData.email}
  onChange={handleChange}
  placeholder="john@example.com"
  className="contact-input"
  required
/>
  </div>

  <div className="contact-inputGroup">
    <label className="contact-label">Phone number</label>
   <input
  type="tel"
  name="phoneNumber"
  value={formData.phoneNumber}
  onChange={handleChange}
  placeholder="+91 9876543210"
  className="contact-input"
/>
  </div>

  <div className="contact-inputGroup">
    <label className="contact-label">Subject *</label>
    <input
  type="text"
  name="subject"
  value={formData.subject}
  onChange={handleChange}
  placeholder="Enter subject"
  className="contact-input"
  required
/>
  </div>

  <div className="contact-inputGroup">
    <label className="contact-label">Category *</label>

    <select
  name="category"
  value={formData.category}
  onChange={handleChange}
  className="contact-input"
  required
>
  
  
      <option value="" disabled>
        Select Category
      </option>
      <option value="General Inquiry">General Inquiry</option>
      <option value="Technical Support">Technical Support</option>
      <option value="Partnership">Partnership</option>
      <option value="Feedback">Feedback</option>
      <option value="Bug Report">Bug Report</option>
      <option value="Other">Other</option>
    </select>

  </div>

</div>

<label
  className="contact-label"
  style={{
    display: "block",
    marginTop: "25px",
  }}
>
  Message *
</label>
<textarea
  name="message"
  value={formData.message}
  onChange={handleChange}
  className="contact-textarea"
  placeholder="Write your message..."
  required
/>
{errorMessage && (
  <div
    style={{
      marginTop: "25px",
      background: "rgba(239,68,68,.12)",
      border: "1px solid #EF4444",
      borderRadius: "16px",
      padding: "20px",
      textAlign: "center",
    }}
  >
    <div style={{ fontSize: "42px" }}>❌</div>

    <h3 style={{ color: "#EF4444" }}>
      Message Failed
    </h3>

    <p style={{ color: "#CBD5E1" }}>
      {errorMessage}
    </p>
  </div>
)}
<button
  type="submit"
  className="contact-button"
  disabled={loading}
>
  {loading ? "Sending..." : "Send Message"}
</button>

  </form>

</section>
      </div>
    </div>
  );
}
