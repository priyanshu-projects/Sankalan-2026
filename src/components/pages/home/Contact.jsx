import { useState } from "react";
import { Mail, Instagram, Linkedin, MessageCircle } from "lucide-react";

const contactLinks = [
  {
    icon: <Mail size={18} />,
    label: "sankalan@cs.du.ac.in",
    href: "mailto:sankalan@cs.du.ac.in",
  },
  {
    icon: <Instagram size={18} />,
    label: "@ducs.sankalan",
    href: "https://www.instagram.com/sankalan.ducs/",
  },
  {
    icon: <Linkedin size={18} />,
    label: "Sankalan DUCS",
    href: "https://www.linkedin.com/school/department-of-computer-science-university-of-delhi/",
  },
  {
    icon: <MessageCircle size={18} />,
    label: "Join our Discord",
    href: "#",
  },
];

const eventTopics = [
  "General Inquiry",
  "Hackathon",
  "Coding Contest",
  "Paper Presentation",
  "UI/UX Challenge",
  "Sponsorship",
  "Volunteering",
  "Media & Press",
  "Other",
];

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    topic: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [focused, setFocused] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const focusStyle = {
    borderColor: "#00f5c4",
    boxShadow: "0 0 20px rgba(0,245,196,0.1)",
    outline: "none",
  };

  const blurStyle = {
    borderColor: "rgba(0,245,196,0.15)",
    boxShadow: "none",
    outline: "none",
  };

  const baseInput = {
    width: "100%",
    padding: "1rem 1.2rem",
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(0,245,196,0.15)",
    color: "#e8eaf0",
    fontFamily: "'Space Mono', monospace",
    fontSize: "0.82rem",
    transition: "border-color 0.3s, box-shadow 0.3s",
    boxSizing: "border-box",
  };

  return (
    <section
      id="contact"
      style={{ position: "relative", zIndex: 1 }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "6rem 2rem",
        }}
      >
        {/* SECTION TAG */}
        <p
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.8rem",
            fontFamily: "'Space Mono', monospace",
            fontSize: "0.72rem",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: "#00f5c4",
            marginBottom: "0.8rem",
          }}
        >
          <span
            style={{
              display: "block",
              width: "30px",
              height: "1px",
              background: "#00f5c4",
              flexShrink: 0,
            }}
          />
          Get In Touch
        </p>

        {/* TITLE */}
        <h2
          style={{
            fontFamily: "'Orbitron', monospace",
            fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
            fontWeight: 900,
            lineHeight: 1.05,
            marginBottom: "3rem",
            color: "#e8eaf0",
          }}
        >
          Contact{" "}
          <span style={{ color: "#00f5c4" }}>Us</span>
        </h2>

        {/* TWO COLUMN */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "4rem",
            alignItems: "start",
          }}
        >
          {/* ── LEFT — INFO ── */}
          <div>
            <p
              style={{
                fontSize: "1rem",
                lineHeight: 1.8,
                color: "rgba(232,234,240,0.6)",
                marginBottom: "2rem",
                maxWidth: "480px",
              }}
            >
              Have questions about events, sponsorships, or anything else
              about Sankalan? Drop us a message — our team will get back
              to you within 24 hours.
            </p>

            {/* ADDRESS */}
            <div style={{ marginBottom: "2rem" }}>
              <p
                style={{
                  fontFamily: "'Orbitron', monospace",
                  fontSize: "0.85rem",
                  fontWeight: 700,
                  color: "#00f5c4",
                  marginBottom: "0.4rem",
                  letterSpacing: "0.05em",
                }}
              >
                Department of Computer Science
              </p>
              <p
                style={{
                  fontSize: "0.9rem",
                  color: "#7a7f99",
                  lineHeight: 1.8,
                }}
              >
                University of Delhi
                <br />
                Delhi — 110007
              </p>
            </div>

            {/* CONTACT LINKS */}
            <div
              style={{ display: "flex", flexDirection: "column", gap: "0" }}
            >
              {contactLinks.map((item, i) => (
                <a
                  key={i}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "1rem",
                    padding: "1rem 1.2rem",
                    borderBottom: "1px solid rgba(0,245,196,0.1)",
                    borderLeft: "1px solid rgba(0,245,196,0.1)",
                    borderRight: "1px solid rgba(0,245,196,0.1)",
                    borderTop:
                      i === 0 ? "1px solid rgba(0,245,196,0.1)" : "none",
                    color: "#7a7f99",
                    textDecoration: "none",
                    fontFamily: "'Space Mono', monospace",
                    fontSize: "0.82rem",
                    letterSpacing: "0.05em",
                    transition: "all 0.3s",
                    background: "rgba(255,255,255,0.02)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "#00f5c4";
                    e.currentTarget.style.background =
                      "rgba(0,245,196,0.05)";
                    e.currentTarget.style.borderLeftColor = "#00f5c4";
                    e.currentTarget.style.paddingLeft = "1.8rem";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "#7a7f99";
                    e.currentTarget.style.background =
                      "rgba(255,255,255,0.02)";
                    e.currentTarget.style.borderLeftColor =
                      "rgba(0,245,196,0.1)";
                    e.currentTarget.style.paddingLeft = "1.2rem";
                  }}
                >
                  <span style={{ color: "#00f5c4", flexShrink: 0 }}>
                    {item.icon}
                  </span>
                  {item.label}
                </a>
              ))}
            </div>

            {/* REGISTER CTA */}
            <div
              style={{
                marginTop: "2.5rem",
                padding: "1.5rem",
                background: "rgba(0,245,196,0.04)",
                border: "1px solid rgba(0,245,196,0.15)",
                clipPath:
                  "polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)",
              }}
            >
              <p
                style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: "0.75rem",
                  color: "#7a7f99",
                  lineHeight: 1.8,
                  marginBottom: "1rem",
                }}
              >
                Ready to compete? Register for Sankalan 2025 on Unstop
                and secure your spot today.
              </p>
              <a
                href="https://unstop.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-block",
                  fontFamily: "'Orbitron', monospace",
                  clipPath:
                    "polygon(10px 0%, 100% 0%, calc(100% - 10px) 100%, 0% 100%)",
                  background: "#00f5c4",
                  color: "#03040a",
                  padding: "0.8rem 2rem",
                  fontSize: "0.75rem",
                  fontWeight: 900,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  textDecoration: "none",
                  boxShadow: "0 0 30px rgba(0,245,196,0.3)",
                  transition: "all 0.3s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow =
                    "0 0 50px rgba(0,245,196,0.5)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow =
                    "0 0 30px rgba(0,245,196,0.3)";
                }}
              >
                Register on Unstop →
              </a>
            </div>
          </div>

          {/* ── RIGHT — QUESTION FORM ── */}
          <div
            style={{
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(0,245,196,0.15)",
              padding: "2.5rem",
              clipPath:
                "polygon(12px 0%, 100% 0%, calc(100% - 12px) 100%, 0% 100%)",
              position: "relative",
            }}
          >
            {/* FORM HEADER */}
            <div style={{ marginBottom: "2rem" }}>
              <h3
                style={{
                  fontFamily: "'Orbitron', monospace",
                  fontSize: "1.1rem",
                  fontWeight: 900,
                  color: "#e8eaf0",
                  marginBottom: "0.5rem",
                }}
              >
                Have a{" "}
                <span style={{ color: "#00f5c4" }}>Question?</span>
              </h3>
              <p
                style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: "0.72rem",
                  color: "#7a7f99",
                  letterSpacing: "0.05em",
                  lineHeight: 1.7,
                }}
              >
                Ask us anything about events, schedule, eligibility or
                sponsorship opportunities.
              </p>
            </div>

            {submitted ? (
              /* SUCCESS STATE */
              <div
                style={{
                  textAlign: "center",
                  padding: "3rem 1rem",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "1rem",
                }}
              >
                {/* CHECK ICON */}
                <div
                  style={{
                    width: "64px",
                    height: "64px",
                    borderRadius: "50%",
                    border: "2px solid #00f5c4",
                    background: "rgba(0,245,196,0.08)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "1.8rem",
                    color: "#00f5c4",
                    boxShadow: "0 0 30px rgba(0,245,196,0.2)",
                  }}
                >
                  ✓
                </div>
                <div
                  style={{
                    fontFamily: "'Orbitron', monospace",
                    fontSize: "0.9rem",
                    color: "#00f5c4",
                    fontWeight: 700,
                    letterSpacing: "0.08em",
                  }}
                >
                  Message Sent!
                </div>
                <p
                  style={{
                    fontFamily: "'Space Mono', monospace",
                    fontSize: "0.75rem",
                    color: "#7a7f99",
                    lineHeight: 1.8,
                    textAlign: "center",
                  }}
                >
                  Thanks for reaching out. Our team will
                  <br />
                  respond within 24 hours.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setForm({ name: "", email: "", topic: "", message: "" });
                  }}
                  style={{
                    fontFamily: "'Space Mono', monospace",
                    fontSize: "0.72rem",
                    color: "#00f5c4",
                    background: "none",
                    border: "1px solid rgba(0,245,196,0.3)",
                    padding: "0.6rem 1.2rem",
                    cursor: "pointer",
                    letterSpacing: "0.1em",
                    transition: "all 0.3s",
                    marginTop: "0.5rem",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background =
                      "rgba(0,245,196,0.08)";
                    e.currentTarget.style.borderColor = "#00f5c4";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "none";
                    e.currentTarget.style.borderColor =
                      "rgba(0,245,196,0.3)";
                  }}
                >
                  Send another →
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1.2rem",
                }}
              >
                {/* NAME */}
                <div>
                  <label
                    style={{
                      display: "block",
                      fontFamily: "'Space Mono', monospace",
                      fontSize: "0.65rem",
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                      color: "#7a7f99",
                      marginBottom: "0.5rem",
                    }}
                  >
                    Your Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    placeholder="e.g. Rahul Verma"
                    value={form.name}
                    onChange={handleChange}
                    required
                    style={{
                      ...baseInput,
                      ...(focused === "name" ? focusStyle : blurStyle),
                    }}
                    onFocus={() => setFocused("name")}
                    onBlur={() => setFocused("")}
                  />
                </div>

                {/* EMAIL */}
                <div>
                  <label
                    style={{
                      display: "block",
                      fontFamily: "'Space Mono', monospace",
                      fontSize: "0.65rem",
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                      color: "#7a7f99",
                      marginBottom: "0.5rem",
                    }}
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="e.g. rahul@college.edu"
                    value={form.email}
                    onChange={handleChange}
                    required
                    style={{
                      ...baseInput,
                      ...(focused === "email" ? focusStyle : blurStyle),
                    }}
                    onFocus={() => setFocused("email")}
                    onBlur={() => setFocused("")}
                  />
                </div>

                {/* TOPIC */}
                <div>
                  <label
                    style={{
                      display: "block",
                      fontFamily: "'Space Mono', monospace",
                      fontSize: "0.65rem",
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                      color: "#7a7f99",
                      marginBottom: "0.5rem",
                    }}
                  >
                    Topic
                  </label>
                  <select
                    name="topic"
                    value={form.topic}
                    onChange={handleChange}
                    required
                    style={{
                      ...baseInput,
                      appearance: "none",
                      WebkitAppearance: "none",
                      cursor: "pointer",
                      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath fill='%2300f5c4' d='M1 1l5 5 5-5'/%3E%3C/svg%3E")`,
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "right 1.2rem center",
                      paddingRight: "2.5rem",
                      ...(focused === "topic" ? focusStyle : blurStyle),
                    }}
                    onFocus={() => setFocused("topic")}
                    onBlur={() => setFocused("")}
                  >
                    <option value="" disabled style={{ background: "#03040a" }}>
                      What is your question about?
                    </option>
                    {eventTopics.map((t) => (
                      <option
                        key={t}
                        value={t}
                        style={{ background: "#03040a", color: "#e8eaf0" }}
                      >
                        {t}
                      </option>
                    ))}
                  </select>
                </div>

                {/* MESSAGE */}
                <div>
                  <label
                    style={{
                      display: "block",
                      fontFamily: "'Space Mono', monospace",
                      fontSize: "0.65rem",
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                      color: "#7a7f99",
                      marginBottom: "0.5rem",
                    }}
                  >
                    Your Message
                  </label>
                  <textarea
                    name="message"
                    placeholder="Type your question or message here..."
                    value={form.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    style={{
                      ...baseInput,
                      resize: "vertical",
                      minHeight: "110px",
                      lineHeight: 1.7,
                      ...(focused === "message" ? focusStyle : blurStyle),
                    }}
                    onFocus={() => setFocused("message")}
                    onBlur={() => setFocused("")}
                  />
                </div>

                {/* SUBMIT */}
                <button
                  type="submit"
                  style={{
                    marginTop: "0.4rem",
                    width: "100%",
                    padding: "1rem",
                    background: "#00f5c4",
                    color: "#03040a",
                    fontFamily: "'Orbitron', monospace",
                    fontSize: "0.78rem",
                    fontWeight: 900,
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    border: "none",
                    cursor: "pointer",
                    clipPath:
                      "polygon(12px 0%, 100% 0%, calc(100% - 12px) 100%, 0% 100%)",
                    boxShadow: "0 0 30px rgba(0,245,196,0.3)",
                    transition: "all 0.3s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-2px)";
                    e.currentTarget.style.boxShadow =
                      "0 0 50px rgba(0,245,196,0.5)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow =
                      "0 0 30px rgba(0,245,196,0.3)";
                  }}
                >
                  Send Message →
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}