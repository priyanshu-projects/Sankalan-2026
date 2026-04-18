import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

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
const faqs = [
  {
    q: "When is Sankalan 2026 scheduled?",
    a: "Sankalan 2026 will be held on 24–25 April 2026 at the Department of Computer Science, University of Delhi. The fest spans multiple events across technical and non-technical categories over two action-packed days.",
    tag: "General",
  },
  {
    q: "Who can participate in Sankalan?",
    a: "Students from colleges and universities across the country are welcome to participate. Some events allow team participation while others are individual competitions. Check individual event pages for eligibility details.",
    tag: "Eligibility",
  },
  {
    q: "How do I register for events?",
    a: "Registration for Sankalan 2026 is handled through Unstop. Click the 'Register on Unstop' button on the website to access all event listings and secure your spot.",
    tag: "Registration",
  },
  {
    q: "Is there a registration fee?",
    a: "Some events may have a nominal registration fee while others are free to participate in. Exact fee details are mentioned on the individual event pages on Unstop.",
    tag: "Registration",
  },
  {
    q: "What kind of events are conducted at Sankalan?",
    a: "Sankalan hosts a diverse mix of technical and creative competitions — HackDUCS (36-hour hackathon), Signal Protocol, Line Following Robot, CtrlQuery, ChessArena, Blind Coding, Code Auction, Algoholics, Squash the Bugs and non-tech events like Dastur-e-Mehfil, Feet on Fire and Chakravyuh.",
    tag: "Events",
  },
  {
    q: "Can participants join multiple events?",
    a: "Yes. Participants are generally allowed to register for multiple events as long as the event timings do not clash. We recommend checking the event schedule carefully before registering for multiple events.",
    tag: "General",
  },
  {
    q: "Where will the events take place?",
    a: "All events are conducted at the Department of Computer Science, University of Delhi — North Campus, Delhi — 110007, unless mentioned otherwise on the event page.",
    tag: "Venue",
  },
  {
    q: "How will winners be decided?",
    a: "Winners are selected based on event-specific judging criteria such as performance, innovation, correctness of solutions, speed, and overall presentation. Each event has a dedicated panel of judges.",
    tag: "Judging",
  },
  {
    q: "Will certificates be provided?",
    a: "Yes. Certificates are provided to winners and in most cases to all participants. Certificate details vary by event — refer to the individual event guidelines for more information.",
    tag: "General",
  },
  {
    q: "What is the prize pool for Sankalan 2026?",
    a: "Sankalan 2026 has a total prize pool of ₹2L+ distributed across all competitive events. Winners also receive goodies, certificates and opportunities for recognition from industry partners.",
    tag: "Prizes",
  },
  {
    q: "Will there be workshops or talks?",
    a: "Yes. Alongside competitions, Sankalan features expert talks and workshops led by industry professionals covering topics like AI, open source, cybersecurity and startup culture.",
    tag: "Events",
  },
  {
    q: "How can I contact the organising team?",
    a: "You can reach us at ducss@cs.du.ac.in or use the Contact form on this website. You can also follow @ducs.sankalan on Instagram for the latest updates and announcements.",
    tag: "Contact",
  },
];

const tagColors = {
  General:      { color: "#00f5c4", rgb: "0,245,196"  },
  Eligibility:  { color: "#7b5fff", rgb: "123,95,255" },
  Registration: { color: "#00f5c4", rgb: "0,245,196"  },
  Events:       { color: "#7b5fff", rgb: "123,95,255" },
  Venue:        { color: "#00f5c4", rgb: "0,245,196"  },
  Judging:      { color: "#7b5fff", rgb: "123,95,255" },
  Prizes:       { color: "#00f5c4", rgb: "0,245,196"  },
  Contact:      { color: "#7b5fff", rgb: "123,95,255" },
};

// ── Main Component ───────────────────────────────────────────────────────────
export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);
  const [activeTag, setActiveTag] = useState("All");
  const navigate                  = useNavigate();

  const width    = useWindowWidth();
  const isMobile = width < 600;
  const isTablet = width >= 600 && width < 1024;

  const allTags  = ["All", ...Array.from(new Set(faqs.map((f) => f.tag)))];
  const filtered = activeTag === "All" ? faqs : faqs.filter((f) => f.tag === activeTag);
  const toggle   = (i) => setOpenIndex(openIndex === i ? null : i);

  // ── navigate to Home with state flag ────────────────────────────────────
  function handleAskQuestion() {
    navigate("/", { state: { scrollToContact: true } });
  }

  return (
    <section id="faq" style={{ position: "relative", zIndex: 1 }}>
      <div
        style={{
          maxWidth: "900px",
          margin: "0 auto",
          padding: isMobile
            ? "4rem 1rem 3rem"
            : isTablet
            ? "5rem 1.5rem 4rem"
            : "6rem 2rem",
        }}
      >
        {/* ── SECTION TAG ── */}
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
            margin: "0 0 0.8rem 0",
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
          Got Questions?
        </p>

        {/* ── TITLE ── */}
        <h2
          style={{
            fontFamily: "'Orbitron', monospace",
            fontSize: "clamp(1.6rem, 5vw, 3.5rem)",
            fontWeight: 900,
            lineHeight: 1.1,
            margin: "0 0 1rem 0",
            color: "#e8eaf0",
          }}
        >
          Frequently Asked{" "}
          <span style={{ color: "#00f5c4" }}>Questions</span>
        </h2>

        {/* ── SUBTITLE ── */}
        <p
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: isMobile ? "0.75rem" : "0.88rem",
            color: "rgba(232,234,240,0.6)",
            lineHeight: 1.8,
            margin: "0 0 2.5rem 0",
            maxWidth: "600px",
          }}
        >
          Everything you need to know about Sankalan 2026.
        </p>

        {/* ── TAG FILTERS ── */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "0.5rem",
            marginBottom: "2.5rem",
          }}
        >
          {allTags.map((tag) => {
            const cfg      = tagColors[tag] || { color: "#00f5c4", rgb: "0,245,196" };
            const isActive = activeTag === tag;
            const tagRgb   = tag === "All" ? "0,245,196" : cfg.rgb;
            const tagColor = tag === "All" ? "#00f5c4"   : cfg.color;

            return (
              <button
                key={tag}
                onClick={() => {
                  setActiveTag(tag);
                  setOpenIndex(null);
                }}
                style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: isMobile ? "0.58rem" : "0.65rem",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  padding: isMobile ? "0.35rem 0.75rem" : "0.4rem 1rem",
                  border: `1px solid rgba(${tagRgb},${isActive ? "0.8" : "0.2"})`,
                  background: isActive ? `rgba(${tagRgb},0.12)` : "transparent",
                  color: isActive ? tagColor : "#7a7f99",
                  cursor: "pointer",
                  clipPath:
                    "polygon(5px 0%, 100% 0%, calc(100% - 5px) 100%, 0% 100%)",
                  transition: "all 0.25s",
                  boxShadow: isActive ? `0 0 15px rgba(${tagRgb},0.2)` : "none",
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.color       = tagColor;
                    e.currentTarget.style.borderColor = `rgba(${tagRgb},0.4)`;
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.color       = "#7a7f99";
                    e.currentTarget.style.borderColor = `rgba(${tagRgb},0.2)`;
                  }
                }}
              >
                {tag}
              </button>
            );
          })}
        </div>

        {/* ── FAQ COUNT ── */}
        <p
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: "0.68rem",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "#7a7f99",
            margin: "0 0 1.5rem 0",
          }}
        >
          — Showing {filtered.length} question
          {filtered.length !== 1 ? "s" : ""}
          {activeTag !== "All" ? ` in ${activeTag}` : ""}
        </p>

        {/* ── ACCORDION ── */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.8rem" }}>
          {filtered.map((faq, i) => {
            const cfg    = tagColors[faq.tag] || { color: "#00f5c4", rgb: "0,245,196" };
            const isOpen = openIndex === i;

            return (
              <div
                key={i}
                style={{
                  background: isOpen
                    ? `rgba(${cfg.rgb},0.04)`
                    : "rgba(255,255,255,0.02)",
                  border: `1px solid rgba(${cfg.rgb},${isOpen ? "0.35" : "0.12"})`,
                  clipPath:
                    "polygon(10px 0%, 100% 0%, calc(100% - 10px) 100%, 0% 100%)",
                  transition: "all 0.3s",
                  boxShadow: isOpen ? `0 0 30px rgba(${cfg.rgb},0.08)` : "none",
                  overflow: "hidden",
                }}
                onMouseEnter={(e) => {
                  if (!isOpen) {
                    e.currentTarget.style.borderColor = `rgba(${cfg.rgb},0.25)`;
                    e.currentTarget.style.background  = "rgba(255,255,255,0.03)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isOpen) {
                    e.currentTarget.style.borderColor = `rgba(${cfg.rgb},0.12)`;
                    e.currentTarget.style.background  = "rgba(255,255,255,0.02)";
                  }
                }}
              >
                {/* ── QUESTION BUTTON ── */}
                <button
                  onClick={() => toggle(i)}
                  style={{
                    width: "100%",
                    padding: isMobile ? "1rem 1rem" : "1.4rem 1.8rem",
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: isMobile ? "0.6rem" : "1rem",
                    textAlign: "left",
                  }}
                >
                  {/* LEFT — INDEX + QUESTION */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: isMobile ? "flex-start" : "center",
                      gap: isMobile ? "0.7rem" : "1.2rem",
                      flex: 1,
                      minWidth: 0,
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "'Orbitron', monospace",
                        fontSize: "0.65rem",
                        fontWeight: 700,
                        color: isOpen ? cfg.color : "#7a7f99",
                        letterSpacing: "0.1em",
                        flexShrink: 0,
                        minWidth: "24px",
                        transition: "color 0.3s",
                        paddingTop: isMobile ? "2px" : "0",
                      }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>

                    <span
                      style={{
                        fontFamily: "'Orbitron', monospace",
                        fontSize: isMobile ? "0.72rem" : "0.85rem",
                        fontWeight: 700,
                        color: isOpen ? "#e8eaf0" : "rgba(232,234,240,0.8)",
                        letterSpacing: "0.03em",
                        lineHeight: 1.5,
                        transition: "color 0.3s",
                        wordBreak: "break-word",
                      }}
                    >
                      {faq.q}
                    </span>
                  </div>

                  {/* RIGHT — TAG + CHEVRON */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.8rem",
                      flexShrink: 0,
                    }}
                  >
                    {!isMobile && (
                      <span
                        style={{
                          fontFamily: "'Space Mono', monospace",
                          fontSize: "0.52rem",
                          letterSpacing: "0.15em",
                          textTransform: "uppercase",
                          color: cfg.color,
                          background: `rgba(${cfg.rgb},0.1)`,
                          border: `1px solid rgba(${cfg.rgb},0.2)`,
                          padding: "0.2rem 0.55rem",
                          clipPath:
                            "polygon(4px 0%, 100% 0%, calc(100% - 4px) 100%, 0% 100%)",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {faq.tag}
                      </span>
                    )}

                    <div
                      style={{
                        width: isMobile ? "24px" : "28px",
                        height: isMobile ? "24px" : "28px",
                        border: `1px solid rgba(${cfg.rgb},${isOpen ? "0.5" : "0.2"})`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        background: isOpen
                          ? `rgba(${cfg.rgb},0.1)`
                          : "transparent",
                        clipPath:
                          "polygon(4px 0%, 100% 0%, calc(100% - 4px) 100%, 0% 100%)",
                        transition: "all 0.3s",
                        flexShrink: 0,
                      }}
                    >
                      <span
                        style={{
                          display: "block",
                          width: "7px",
                          height: "7px",
                          borderRight: `2px solid ${cfg.color}`,
                          borderBottom: `2px solid ${cfg.color}`,
                          transform: isOpen
                            ? "rotate(-135deg) translateY(2px)"
                            : "rotate(45deg) translateY(-2px)",
                          transition: "transform 0.3s",
                          marginTop: isOpen ? "4px" : "0px",
                        }}
                      />
                    </div>
                  </div>
                </button>

                {/* ── ANSWER ── */}
                <div
                  style={{
                    maxHeight: isOpen ? "500px" : "0px",
                    overflow: "hidden",
                    transition: "max-height 0.4s ease",
                  }}
                >
                  <div
                    style={{
                      padding: isMobile
                        ? "0 1rem 1.2rem 1rem"
                        : "0 1.8rem 1.6rem 4.4rem",
                      borderTop: `1px solid rgba(${cfg.rgb},0.1)`,
                      paddingTop: "1.2rem",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        gap: "1rem",
                        alignItems: "flex-start",
                      }}
                    >
                      <div
                        style={{
                          width: "2px",
                          minHeight: "40px",
                          background: `linear-gradient(to bottom, ${cfg.color}, transparent)`,
                          flexShrink: 0,
                          marginTop: "4px",
                          alignSelf: "stretch",
                        }}
                      />
                      <p
                        style={{
                          fontFamily: "'Space Mono', monospace",
                          fontSize: isMobile ? "0.72rem" : "0.82rem",
                          color: "rgba(232,234,240,0.65)",
                          lineHeight: 1.9,
                          margin: 0,
                        }}
                      >
                        {faq.a}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── STILL HAVE QUESTIONS CTA ── */}
        <div
          style={{
            marginTop: isMobile ? "2.5rem" : "4rem",
            padding: isMobile
              ? "1.4rem 1.2rem"
              : isTablet
              ? "1.8rem 2rem"
              : "2rem 2.5rem",
            background: "rgba(123,95,255,0.04)",
            border: "1px solid rgba(123,95,255,0.15)",
            clipPath:
              "polygon(12px 0%, 100% 0%, calc(100% - 12px) 100%, 0% 100%)",
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            alignItems: isMobile ? "flex-start" : "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: isMobile ? "1.2rem" : "1.5rem",
          }}
        >
          <div>
            <p
              style={{
                fontFamily: "'Orbitron', monospace",
                fontSize: isMobile ? "0.78rem" : "0.85rem",
                fontWeight: 700,
                color: "#e8eaf0",
                margin: "0 0 0.4rem 0",
              }}
            >
              Still have questions?
            </p>
            <p
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: isMobile ? "0.68rem" : "0.72rem",
                color: "#7a7f99",
                lineHeight: 1.7,
                margin: 0,
              }}
            >
              Use our contact form and we'll get back to you within 24 hours.
            </p>
          </div>

          {/* ── ASK A QUESTION → navigates to Home → scrolls to #contact ── */}
          <button
            onClick={handleAskQuestion}
            style={{
              fontFamily: "'Orbitron', monospace",
              fontSize: isMobile ? "0.65rem" : "0.72rem",
              fontWeight: 900,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "#03040a",
              background: "#00f5c4",
              padding: isMobile ? "0.8rem 1.5rem" : "0.85rem 2rem",
              border: "none",
              cursor: "pointer",
              clipPath:
                "polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)",
              boxShadow: "0 0 25px rgba(0,245,196,0.3)",
              transition: "all 0.3s",
              flexShrink: 0,
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              width: isMobile ? "100%" : "auto",
              justifyContent: isMobile ? "center" : "flex-start",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 0 45px rgba(0,245,196,0.5)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 0 25px rgba(0,245,196,0.3)";
            }}
          >
            Ask a Question →
          </button>
        </div>
      </div>
    </section>
  );
}