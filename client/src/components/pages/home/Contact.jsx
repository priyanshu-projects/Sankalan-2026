import { useState, useEffect } from "react";
import { Mail, Instagram, MapPin, Phone, User } from "lucide-react";

const WEB3FORMS_KEY = "2f581325-df7c-41d6-8ec8-8c1a102ec31c";

// ── custom hook ──────────────────────────────────────────────────────────────
function useWindowWidth() {
  const [width, setWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1200
  );
  useEffect(() => {
    const handler = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);
  return width;
}

// ── Data ─────────────────────────────────────────────────────────────────────
const contactLinks = [
  {
    icon:  <Mail size={16} />,
    label: "sankalan@cs.du.ac.in",
    href:  "mailto:sankalan@cs.du.ac.in",
  },
  {
    icon:  <Instagram size={16} />,
    label: "@ducs.sankalan",
    href:  "https://www.instagram.com/sankalan.ducs/",
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

// ── Contact Link Row ──────────────────────────────────────────────────────────
function ContactLinkRow({ item, isFirst, isMobile }) {
  return (
    <a
      href={item.href}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        display:        "flex",
        alignItems:     "center",
        gap:            "1rem",
        padding:        isMobile ? "0.85rem 1rem" : "1rem 1.2rem",
        borderBottom:   "1px solid rgba(0,245,196,0.1)",
        borderLeft:     "1px solid rgba(0,245,196,0.1)",
        borderRight:    "1px solid rgba(0,245,196,0.1)",
        borderTop:      isFirst ? "1px solid rgba(0,245,196,0.1)" : "none",
        color:          "#7a7f99",
        textDecoration: "none",
        fontFamily:     "'Space Mono', monospace",
        fontSize:       isMobile ? "0.72rem" : "0.82rem",
        letterSpacing:  "0.05em",
        transition:     "all 0.3s",
        background:     "rgba(255,255,255,0.02)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.color           = "#00f5c4";
        e.currentTarget.style.background      = "rgba(0,245,196,0.05)";
        e.currentTarget.style.borderLeftColor = "#00f5c4";
        e.currentTarget.style.paddingLeft     = isMobile ? "1.4rem" : "1.8rem";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.color           = "#7a7f99";
        e.currentTarget.style.background      = "rgba(255,255,255,0.02)";
        e.currentTarget.style.borderLeftColor = "rgba(0,245,196,0.1)";
        e.currentTarget.style.paddingLeft     = isMobile ? "1rem" : "1.2rem";
      }}
    >
      <span style={{ color: "#00f5c4", flexShrink: 0 }}>{item.icon}</span>
      {item.label}
    </a>
  );
}

// ── Success State ─────────────────────────────────────────────────────────────
function SuccessState({ onReset, isMobile }) {
  return (
    <div style={{
      textAlign:      "center",
      padding:        isMobile ? "2rem 1rem" : "3rem 1rem",
      display:        "flex",
      flexDirection:  "column",
      alignItems:     "center",
      gap:            "1rem",
    }}>
      <div style={{
        width:          "64px",
        height:         "64px",
        borderRadius:   "50%",
        border:         "2px solid #00f5c4",
        background:     "rgba(0,245,196,0.08)",
        display:        "flex",
        alignItems:     "center",
        justifyContent: "center",
        fontSize:       "1.8rem",
        color:          "#00f5c4",
        boxShadow:      "0 0 30px rgba(0,245,196,0.2)",
      }}>
        ✓
      </div>
      <div style={{
        fontFamily:    "'Orbitron', monospace",
        fontSize:      "0.9rem",
        color:         "#00f5c4",
        fontWeight:    700,
        letterSpacing: "0.08em",
      }}>
        Message Sent!
      </div>
      <p style={{
        fontFamily: "'Space Mono', monospace",
        fontSize:   "0.75rem",
        color:      "#7a7f99",
        lineHeight: 1.8,
        textAlign:  "center",
        margin:     0,
      }}>
        Thanks for reaching out. Our team will
        <br />
        respond within 24 hours.
      </p>
      <button
        onClick={onReset}
        style={{
          fontFamily:    "'Space Mono', monospace",
          fontSize:      "0.72rem",
          color:         "#00f5c4",
          background:    "none",
          border:        "1px solid rgba(0,245,196,0.3)",
          padding:       "0.6rem 1.2rem",
          cursor:        "pointer",
          letterSpacing: "0.1em",
          transition:    "all 0.3s",
          marginTop:     "0.5rem",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background  = "rgba(0,245,196,0.08)";
          e.currentTarget.style.borderColor = "#00f5c4";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background  = "none";
          e.currentTarget.style.borderColor = "rgba(0,245,196,0.3)";
        }}
      >
        Send another →
      </button>
    </div>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────
export default function Contact() {
  const [form, setForm]           = useState({ name: "", email: "", topic: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading,   setLoading]   = useState(false);
  const [error,     setError]     = useState(false);
  const [focused,   setFocused]   = useState("");

  const width    = useWindowWidth();
  const isMobile = width < 600;
  const isTablet = width >= 600 && width < 1024;

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(false);
    try {
      const res  = await fetch("https://api.web3forms.com/submit", {
        method:  "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          name:       form.name,
          email:      form.email,
          topic:      form.topic,
          message:    form.message,
          subject:    `Sankalan 2026 — ${form.topic} from ${form.name}`,
        }),
      });
      const data = await res.json();
      if (data.success) setSubmitted(true);
      else setError(true);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    setError(false);
    setForm({ name: "", email: "", topic: "", message: "" });
  };

  // ── shared input styles ──
  const focusStyle = {
    borderColor: "#00f5c4",
    boxShadow:   "0 0 20px rgba(0,245,196,0.1)",
    outline:     "none",
  };
  const blurStyle = {
    borderColor: "rgba(0,245,196,0.15)",
    boxShadow:   "none",
    outline:     "none",
  };
  const baseInput = {
    width:      "100%",
    padding:    isMobile ? "0.8rem 1rem" : "1rem 1.2rem",
    background: "rgba(255,255,255,0.04)",
    border:     "1px solid rgba(0,245,196,0.15)",
    color:      "#e8eaf0",
    fontFamily: "'Space Mono', monospace",
    fontSize:   isMobile ? "0.75rem" : "0.82rem",
    transition: "border-color 0.3s, box-shadow 0.3s",
    boxSizing:  "border-box",
  };
  const labelStyle = {
    display:       "block",
    fontFamily:    "'Space Mono', monospace",
    fontSize:      "0.62rem",
    letterSpacing: "0.2em",
    textTransform: "uppercase",
    color:         "#7a7f99",
    marginBottom:  "0.5rem",
  };

  return (
    <section id="contact" style={{ position: "relative", zIndex: 1 }}>
      <div style={{
        maxWidth: "1200px",
        margin:   "0 auto",
        padding:  isMobile
          ? "4rem 1rem 3rem"
          : isTablet
          ? "5rem 1.5rem 4rem"
          : "6rem 2rem",
      }}>

        {/* ── SECTION TAG ── */}
        <p style={{
          display:       "flex",
          alignItems:    "center",
          gap:           "0.8rem",
          fontFamily:    "'Space Mono', monospace",
          fontSize:      "0.72rem",
          letterSpacing: "0.3em",
          textTransform: "uppercase",
          color:         "#00f5c4",
          margin:        "0 0 0.8rem 0",
        }}>
          <span style={{
            display:    "block",
            width:      "30px",
            height:     "1px",
            background: "#00f5c4",
            flexShrink: 0,
          }} />
          Get In Touch
        </p>

        {/* ── TITLE ── */}
        <h2 style={{
          fontFamily: "'Orbitron', monospace",
          fontSize:   "clamp(1.8rem, 6vw, 4.5rem)",
          fontWeight: 900,
          lineHeight: 1.05,
          margin:     "0 0 2.5rem 0",
          color:      "#e8eaf0",
        }}>
          Contact <span style={{ color: "#00f5c4" }}>Us</span>
        </h2>

        {/* ── TWO COLUMN GRID ── */}
        <div style={{
          display:             "grid",
          gridTemplateColumns: isMobile
            ? "1fr"
            : isTablet
            ? "1fr"
            : "1fr 1fr",
          gap:        isMobile ? "2.5rem" : isTablet ? "3rem" : "4rem",
          alignItems: "start",
        }}>

          {/* ── LEFT — INFO ── */}
          <div>
            <p style={{
              fontFamily: "'Space Mono', monospace",
              fontSize:   isMobile ? "0.78rem" : "0.9rem",
              lineHeight: 1.8,
              color:      "rgba(232,234,240,0.6)",
              margin:     "0 0 2rem 0",
              maxWidth:   "480px",
            }}>
              Have questions about events, sponsorships, or anything else about
              Sankalan? Drop us a message — our team will get back to you within
              24 hours.
            </p>

            {/* ADDRESS */}
            <div style={{ marginBottom: "2rem" }}>
              <p style={{
                fontFamily:    "'Orbitron', monospace",
                fontSize:      isMobile ? "0.75rem" : "0.85rem",
                fontWeight:    700,
                color:         "#00f5c4",
                margin:        "0 0 0.4rem 0",
                letterSpacing: "0.05em",
              }}>
                Department of Computer Science
              </p>
              <p style={{
                fontFamily: "'Space Mono', monospace",
                fontSize:   isMobile ? "0.75rem" : "0.85rem",
                color:      "#7a7f99",
                lineHeight: 1.8,
                margin:     0,
              }}>
                University of Delhi
                <br />
                Delhi — 110007
              </p>
            </div>

            {/* CONTACT LINKS */}
            <div style={{ display: "flex", flexDirection: "column" }}>
              {contactLinks.map((item, i) => (
                <ContactLinkRow
                  key={i}
                  item={item}
                  isFirst={i === 0}
                  isMobile={isMobile}
                />
              ))}
            </div>

            {/* ── CONTACT PERSON ── */}
            <div
              style={{
                marginTop:     "1rem",
                padding:       isMobile ? "1rem" : "1.2rem",
                background:    "rgba(123,95,255,0.05)",
                border:        "1px solid rgba(123,95,255,0.2)",
                borderTop:     "none",
                display:       "flex",
                flexDirection: "column",
                gap:           "0.6rem",
              }}
            >
              {/* Name */}
              <div style={{ display: "flex", alignItems: "center", gap: "0.7rem" }}>
                <User size={14} style={{ color: "#7b5fff", flexShrink: 0 }} />
                <span style={{
                  fontFamily:    "'Orbitron', monospace",
                  fontSize:      isMobile ? "0.7rem" : "0.78rem",
                  fontWeight:    700,
                  color:         "#e8eaf0",
                  letterSpacing: "0.05em",
                }}>
                  Dhruv Bhardwaj
                </span>
              </div>

              {/* Email */}
              <a
                href="mailto:dhruvmca24@cs.du.ac.in"
                style={{
                  display:        "flex",
                  alignItems:     "center",
                  gap:            "0.7rem",
                  textDecoration: "none",
                  transition:     "opacity 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.7")}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
              >
                <Mail size={14} style={{ color: "#7b5fff", flexShrink: 0 }} />
                <span style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize:   isMobile ? "0.68rem" : "0.75rem",
                  color:      "#7a7f99",
                  wordBreak:  "break-all",
                }}>
                  dhruvmca24@cs.du.ac.in
                </span>
              </a>

              {/* Phone */}
              <a
                href="tel:+917217681731"
                style={{
                  display:        "flex",
                  alignItems:     "center",
                  gap:            "0.7rem",
                  textDecoration: "none",
                  transition:     "opacity 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.7")}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
              >
                <Phone size={14} style={{ color: "#7b5fff", flexShrink: 0 }} />
                <span style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize:   isMobile ? "0.68rem" : "0.75rem",
                  color:      "#7a7f99",
                }}>
                  +91 7217681731
                </span>
              </a>
            </div>

            {/* ── OUR LOCATION ── */}
            <div
              style={{
                marginTop:  "1.5rem",
                padding:    isMobile ? "1.2rem 1rem" : "1.5rem",
                background: "rgba(0,245,196,0.03)",
                border:     "1px solid rgba(0,245,196,0.15)",
                clipPath:
                  "polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)",
              }}
            >
              {/* Location heading */}
              <div style={{
                display:      "flex",
                alignItems:   "center",
                gap:          "0.6rem",
                marginBottom: "0.8rem",
              }}>
                <MapPin size={14} style={{ color: "#00f5c4", flexShrink: 0 }} />
                <span style={{
                  fontFamily:    "'Orbitron', monospace",
                  fontSize:      isMobile ? "0.7rem" : "0.78rem",
                  fontWeight:    700,
                  letterSpacing: "0.1em",
                  color:         "#00f5c4",
                  textTransform: "uppercase",
                }}>
                  Our Location
                </span>
              </div>

              {/* divider */}
              <div style={{
                height:       "1px",
                background:   "linear-gradient(90deg, rgba(0,245,196,0.3), transparent)",
                marginBottom: "0.9rem",
              }} />

              {/* Full address */}
              <p style={{
                fontFamily: "'Space Mono', monospace",
                fontSize:   isMobile ? "0.68rem" : "0.75rem",
                color:      "#7a7f99",
                lineHeight: 2,
                margin:     "0 0 0.8rem 0",
              }}>
                Department of Computer Science,{" "}
                Faculty of Mathematical Sciences,{" "}
                New Academic Block, University of Delhi,{" "}
                Delhi, INDIA 110007.
              </p>

              {/* Metro info */}
              <div style={{
                display:      "inline-flex",
                alignItems:   "center",
                gap:          "0.5rem",
                background:   "rgba(123,95,255,0.08)",
                border:       "1px solid rgba(123,95,255,0.2)",
                padding:      "0.35rem 0.8rem",
                clipPath:
                  "polygon(6px 0%, 100% 0%, calc(100% - 6px) 100%, 0% 100%)",
                marginBottom: "1rem",
              }}>
                <span style={{ fontSize: "0.8rem" }}>🚇</span>
                <span style={{
                  fontFamily:    "'Space Mono', monospace",
                  fontSize:      isMobile ? "0.62rem" : "0.7rem",
                  color:         "#a78bfa",
                  letterSpacing: "0.05em",
                }}>
                  Nearest Metro: Vishwavidyalaya
                </span>
              </div>

              {/* Google Maps button */}
              <div>
                <a
                  href="https://maps.app.goo.gl/1SNeRP6Gbhv5DN176"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display:        "inline-flex",
                    alignItems:     "center",
                    gap:            "0.5rem",
                    fontFamily:     "'Space Mono', monospace",
                    fontSize:       isMobile ? "0.62rem" : "0.7rem",
                    color:          "#00f5c4",
                    textDecoration: "none",
                    border:         "1px solid rgba(0,245,196,0.25)",
                    padding:        "0.45rem 1rem",
                    background:     "rgba(0,245,196,0.05)",
                    clipPath:
                      "polygon(6px 0%, 100% 0%, calc(100% - 6px) 100%, 0% 100%)",
                    transition:     "all 0.2s",
                    letterSpacing:  "0.05em",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background  = "rgba(0,245,196,0.12)";
                    e.currentTarget.style.borderColor = "#00f5c4";
                    e.currentTarget.style.boxShadow   = "0 0 20px rgba(0,245,196,0.15)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background  = "rgba(0,245,196,0.05)";
                    e.currentTarget.style.borderColor = "rgba(0,245,196,0.25)";
                    e.currentTarget.style.boxShadow   = "none";
                  }}
                >
                  <MapPin size={12} />
                  View on Google Maps →
                </a>
              </div>
            </div>

            {/* REGISTER CTA */}
            <div style={{
              marginTop:  "1.5rem",
              padding:    isMobile ? "1.2rem 1rem" : "1.5rem",
              background: "rgba(0,245,196,0.04)",
              border:     "1px solid rgba(0,245,196,0.15)",
              clipPath:
                "polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)",
            }}>
              <p style={{
                fontFamily: "'Space Mono', monospace",
                fontSize:   isMobile ? "0.68rem" : "0.75rem",
                color:      "#7a7f99",
                lineHeight: 1.8,
                margin:     "0 0 1rem 0",
              }}>
                Ready to compete? Register for Sankalan 2026 on Unstop and
                secure your spot today.
              </p>
              <a
                href="https://unstop.com/college-fests/sankalan-2026-department-of-computer-science-docs-university-of-delhi-du-458407"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display:        "inline-block",
                  fontFamily:     "'Orbitron', monospace",
                  clipPath:
                    "polygon(10px 0%, 100% 0%, calc(100% - 10px) 100%, 0% 100%)",
                  background:     "#00f5c4",
                  color:          "#03040a",
                  padding:        isMobile ? "0.75rem 1.5rem" : "0.8rem 2rem",
                  fontSize:       isMobile ? "0.65rem" : "0.75rem",
                  fontWeight:     900,
                  letterSpacing:  "0.15em",
                  textTransform:  "uppercase",
                  textDecoration: "none",
                  boxShadow:      "0 0 30px rgba(0,245,196,0.3)",
                  transition:     "all 0.3s",
                  width:          isMobile ? "100%" : "auto",
                  textAlign:      isMobile ? "center" : "left",
                  boxSizing:      "border-box",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow = "0 0 50px rgba(0,245,196,0.5)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 0 30px rgba(0,245,196,0.3)";
                }}
              >
                Register on Unstop →
              </a>
            </div>
          </div>

          {/* ── RIGHT — FORM ── */}
          <div style={{
            background: "rgba(255,255,255,0.02)",
            border:     "1px solid rgba(0,245,196,0.15)",
            padding:    isMobile ? "1.5rem 1.2rem" : "2.5rem",
            clipPath:
              "polygon(12px 0%, 100% 0%, calc(100% - 12px) 100%, 0% 100%)",
            position:   "relative",
          }}>
            {/* top accent */}
            <div style={{
              position:   "absolute",
              top: 0, left: 0, right: 0,
              height:     "2px",
              background: "linear-gradient(90deg, #00f5c4, transparent)",
            }} />

            {/* FORM HEADER */}
            <div style={{ marginBottom: isMobile ? "1.5rem" : "2rem" }}>
              <h3 style={{
                fontFamily: "'Orbitron', monospace",
                fontSize:   isMobile ? "0.95rem" : "1.1rem",
                fontWeight: 900,
                color:      "#e8eaf0",
                margin:     "0 0 0.5rem 0",
              }}>
                Have a <span style={{ color: "#00f5c4" }}>Question?</span>
              </h3>
              <p style={{
                fontFamily:    "'Space Mono', monospace",
                fontSize:      isMobile ? "0.65rem" : "0.72rem",
                color:         "#7a7f99",
                letterSpacing: "0.05em",
                lineHeight:    1.7,
                margin:        0,
              }}>
                Ask us anything about events, schedule, eligibility or
                sponsorship opportunities.
              </p>
            </div>

            {/* SUCCESS STATE */}
            {submitted ? (
              <SuccessState onReset={handleReset} isMobile={isMobile} />
            ) : (
              <form
                onSubmit={handleSubmit}
                style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}
              >
                {/* NAME */}
                <div>
                  <label style={labelStyle}>Your Name</label>
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
                  <label style={labelStyle}>Email Address</label>
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
                  <label style={labelStyle}>Topic</label>
                  <select
                    name="topic"
                    value={form.topic}
                    onChange={handleChange}
                    required
                    style={{
                      ...baseInput,
                      appearance:         "none",
                      WebkitAppearance:   "none",
                      cursor:             "pointer",
                      backgroundImage:    `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath fill='%2300f5c4' d='M1 1l5 5 5-5'/%3E%3C/svg%3E")`,
                      backgroundRepeat:   "no-repeat",
                      backgroundPosition: "right 1.2rem center",
                      paddingRight:       "2.5rem",
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
                  <label style={labelStyle}>Your Message</label>
                  <textarea
                    name="message"
                    placeholder="Type your question or message here..."
                    value={form.message}
                    onChange={handleChange}
                    required
                    rows={isMobile ? 3 : 4}
                    style={{
                      ...baseInput,
                      resize:     "vertical",
                      minHeight:  isMobile ? "90px" : "110px",
                      lineHeight: 1.7,
                      ...(focused === "message" ? focusStyle : blurStyle),
                    }}
                    onFocus={() => setFocused("message")}
                    onBlur={() => setFocused("")}
                  />
                </div>

                {/* ERROR MESSAGE */}
                {error && (
                  <div style={{
                    padding:       "0.8rem 1rem",
                    background:    "rgba(255,62,108,0.08)",
                    border:        "1px solid rgba(255,62,108,0.25)",
                    clipPath:
                      "polygon(6px 0%,100% 0%,calc(100% - 6px) 100%,0% 100%)",
                    fontFamily:    "'Space Mono', monospace",
                    fontSize:      "0.65rem",
                    color:         "#ff3e6c",
                    letterSpacing: "0.05em",
                    lineHeight:    1.7,
                  }}>
                    ⚠ Something went wrong. Email us at{" "}
                    <a
                      href="mailto:sankalan@cs.du.ac.in"
                      style={{ color: "#00f5c4", textDecoration: "none" }}
                    >
                      sankalan@cs.du.ac.in
                    </a>
                  </div>
                )}

                {/* SUBMIT */}
                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    marginTop:      "0.4rem",
                    width:          "100%",
                    padding:        isMobile ? "0.85rem" : "1rem",
                    background:     loading ? "rgba(0,245,196,0.5)" : "#00f5c4",
                    color:          "#03040a",
                    fontFamily:     "'Orbitron', monospace",
                    fontSize:       isMobile ? "0.7rem" : "0.78rem",
                    fontWeight:     900,
                    letterSpacing:  "0.2em",
                    textTransform:  "uppercase",
                    border:         "none",
                    cursor:         loading ? "not-allowed" : "pointer",
                    clipPath:
                      "polygon(12px 0%, 100% 0%, calc(100% - 12px) 100%, 0% 100%)",
                    boxShadow:      loading ? "none" : "0 0 30px rgba(0,245,196,0.3)",
                    transition:     "all 0.3s",
                    display:        "flex",
                    alignItems:     "center",
                    justifyContent: "center",
                    gap:            "0.6rem",
                  }}
                  onMouseEnter={(e) => {
                    if (!loading) {
                      e.currentTarget.style.transform = "translateY(-2px)";
                      e.currentTarget.style.boxShadow = "0 0 50px rgba(0,245,196,0.5)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = loading
                      ? "none"
                      : "0 0 30px rgba(0,245,196,0.3)";
                  }}
                >
                  {loading ? (
                    <>
                      <span style={{
                        width:          "14px",
                        height:         "14px",
                        border:         "2px solid rgba(3,4,10,0.3)",
                        borderTopColor: "#03040a",
                        borderRadius:   "50%",
                        display:        "inline-block",
                        animation:      "spin 0.8s linear infinite",
                      }} />
                      Sending...
                    </>
                  ) : (
                    "Send Message →"
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  );
}