import { useState } from "react";

const faqs = [
  {
    q: "When is Sankalan 2025 scheduled?",
    a: "Sankalan 2025 will be held on November 8–9, 2025 at the Department of Computer Science, University of Delhi. The fest spans multiple events across technical and non-technical categories over two action-packed days.",
    tag: "General",
  },
  {
    q: "Who can participate in Sankalan?",
    a: "Students from colleges and universities across the country are welcome to participate. Some events allow team participation while others are individual competitions. Check individual event pages for eligibility details.",
    tag: "Eligibility",
  },
  {
    q: "How do I register for events?",
    a: "Registration for Sankalan 2025 is handled through Unstop. Click the 'Register on Unstop' button on the website to access all event listings and secure your spot.",
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
    q: "What is the prize pool for Sankalan 2025?",
    a: "Sankalan 2025 has a total prize pool of ₹2L+ distributed across all competitive events. Winners also receive goodies, certificates and opportunities for recognition from industry partners.",
    tag: "Prizes",
  },
  {
    q: "Will there be workshops or talks?",
    a: "Yes. Alongside competitions, Sankalan features expert talks and workshops led by industry professionals covering topics like AI, open source, cybersecurity and startup culture.",
    tag: "Events",
  },
  {
    q: "How can I contact the organising team?",
    a: "You can reach us at sankalan@cs.du.ac.in or use the Contact form on this website. You can also follow @ducs.sankalan on Instagram for the latest updates and announcements.",
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

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);
  const [activeTag, setActiveTag] = useState("All");

  const allTags = [
    "All",
    ...Array.from(new Set(faqs.map((f) => f.tag))),
  ];

  const filtered =
    activeTag === "All"
      ? faqs
      : faqs.filter((f) => f.tag === activeTag);

  const toggle = (i) =>
    setOpenIndex(openIndex === i ? null : i);

  return (
    <section id="faq" style={{ position: "relative", zIndex: 1 }}>
      <div
        style={{
          maxWidth: "900px",
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
          Got Questions?
        </p>

        {/* TITLE */}
        <h2
          style={{
            fontFamily: "'Orbitron', monospace",
            fontSize: "clamp(2rem, 5vw, 3.5rem)",
            fontWeight: 900,
            lineHeight: 1.1,
            marginBottom: "1rem",
            color: "#e8eaf0",
          }}
        >
          Frequently Asked{" "}
          <span style={{ color: "#00f5c4" }}>Questions</span>
        </h2>

        <p
          style={{
            fontSize: "1rem",
            color: "rgba(232,234,240,0.6)",
            lineHeight: 1.8,
            marginBottom: "3rem",
            maxWidth: "600px",
          }}
        >
          Everything you need to know about Sankalan 2025. Can't find
          your answer?{" "}
          <a
            href="#contact"
            style={{
              color: "#00f5c4",
              textDecoration: "none",
              borderBottom: "1px solid rgba(0,245,196,0.3)",
              transition: "border-color 0.2s",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.borderColor = "#00f5c4")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.borderColor =
                "rgba(0,245,196,0.3)")
            }
          >
            Drop us a message.
          </a>
        </p>

        {/* TAG FILTERS */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "0.6rem",
            marginBottom: "3rem",
          }}
        >
          {allTags.map((tag) => {
            const cfg = tagColors[tag] || {
              color: "#00f5c4",
              rgb: "0,245,196",
            };
            const isActive = activeTag === tag;
            return (
              <button
                key={tag}
                onClick={() => {
                  setActiveTag(tag);
                  setOpenIndex(null);
                }}
                style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: "0.65rem",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  padding: "0.4rem 1rem",
                  border: `1px solid rgba(${
                    tag === "All" ? "0,245,196" : cfg.rgb
                  },${isActive ? "0.8" : "0.2"})`,
                  background: isActive
                    ? `rgba(${
                        tag === "All" ? "0,245,196" : cfg.rgb
                      },0.12)`
                    : "transparent",
                  color: isActive
                    ? tag === "All"
                      ? "#00f5c4"
                      : cfg.color
                    : "#7a7f99",
                  cursor: "pointer",
                  clipPath:
                    "polygon(5px 0%, 100% 0%, calc(100% - 5px) 100%, 0% 100%)",
                  transition: "all 0.25s",
                  boxShadow: isActive
                    ? `0 0 15px rgba(${
                        tag === "All" ? "0,245,196" : cfg.rgb
                      },0.2)`
                    : "none",
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.color = cfg.color;
                    e.currentTarget.style.borderColor = `rgba(${cfg.rgb},0.4)`;
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.color = "#7a7f99";
                    e.currentTarget.style.borderColor = `rgba(${cfg.rgb},0.2)`;
                  }
                }}
              >
                {tag}
              </button>
            );
          })}
        </div>

        {/* FAQ COUNT */}
        <p
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: "0.68rem",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "#7a7f99",
            marginBottom: "1.5rem",
          }}
        >
          — Showing {filtered.length} question
          {filtered.length !== 1 ? "s" : ""}
          {activeTag !== "All" ? ` in ${activeTag}` : ""}
        </p>

        {/* ACCORDION */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "0.8rem",
          }}
        >
          {filtered.map((faq, i) => {
            const cfg = tagColors[faq.tag] || {
              color: "#00f5c4",
              rgb: "0,245,196",
            };
            const isOpen = openIndex === i;

            return (
              <div
                key={i}
                style={{
                  background: isOpen
                    ? `rgba(${cfg.rgb},0.04)`
                    : "rgba(255,255,255,0.02)",
                  border: `1px solid rgba(${cfg.rgb},${
                    isOpen ? "0.35" : "0.12"
                  })`,
                  clipPath:
                    "polygon(10px 0%, 100% 0%, calc(100% - 10px) 100%, 0% 100%)",
                  transition: "all 0.3s",
                  boxShadow: isOpen
                    ? `0 0 30px rgba(${cfg.rgb},0.08)`
                    : "none",
                  overflow: "hidden",
                }}
                onMouseEnter={(e) => {
                  if (!isOpen) {
                    e.currentTarget.style.borderColor = `rgba(${cfg.rgb},0.25)`;
                    e.currentTarget.style.background =
                      "rgba(255,255,255,0.03)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isOpen) {
                    e.currentTarget.style.borderColor = `rgba(${cfg.rgb},0.12)`;
                    e.currentTarget.style.background =
                      "rgba(255,255,255,0.02)";
                  }
                }}
              >
                {/* QUESTION BUTTON */}
                <button
                  onClick={() => toggle(i)}
                  style={{
                    width: "100%",
                    padding: "1.4rem 1.8rem",
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "1rem",
                    textAlign: "left",
                  }}
                >
                  {/* LEFT — INDEX + QUESTION */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "1.2rem",
                      flex: 1,
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
                        minWidth: "28px",
                        transition: "color 0.3s",
                      }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>

                    <span
                      style={{
                        fontFamily: "'Orbitron', monospace",
                        fontSize: "0.85rem",
                        fontWeight: 700,
                        color: isOpen
                          ? "#e8eaf0"
                          : "rgba(232,234,240,0.8)",
                        letterSpacing: "0.03em",
                        lineHeight: 1.5,
                        transition: "color 0.3s",
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
                    <span
                      className="faq-tag"
                      style={{
                        fontFamily: "'Space Mono', monospace",
                        fontSize: "0.55rem",
                        letterSpacing: "0.15em",
                        textTransform: "uppercase",
                        color: cfg.color,
                        background: `rgba(${cfg.rgb},0.1)`,
                        border: `1px solid rgba(${cfg.rgb},0.2)`,
                        padding: "0.2rem 0.6rem",
                        clipPath:
                          "polygon(4px 0%, 100% 0%, calc(100% - 4px) 100%, 0% 100%)",
                        display: "none",
                      }}
                    >
                      {faq.tag}
                    </span>

                    {/* CHEVRON BOX */}
                    <div
                      style={{
                        width: "28px",
                        height: "28px",
                        border: `1px solid rgba(${cfg.rgb},${
                          isOpen ? "0.5" : "0.2"
                        })`,
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
                          width: "8px",
                          height: "8px",
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

                {/* ANSWER */}
                <div
                  style={{
                    maxHeight: isOpen ? "400px" : "0px",
                    overflow: "hidden",
                    transition: "max-height 0.4s ease",
                  }}
                >
                  <div
                    style={{
                      padding: "0 1.8rem 1.6rem 4.4rem",
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
                      {/* LEFT COLOR BAR */}
                      <div
                        style={{
                          width: "2px",
                          background: `linear-gradient(to bottom, ${cfg.color}, transparent)`,
                          flexShrink: 0,
                          marginTop: "4px",
                          alignSelf: "stretch",
                        }}
                      />
                      <p
                        style={{
                          fontSize: "0.88rem",
                          color: "rgba(232,234,240,0.65)",
                          lineHeight: 1.85,
                          fontFamily: "'Space Mono', monospace",
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

        {/* STILL HAVE QUESTIONS */}
        <div
          style={{
            marginTop: "4rem",
            padding: "2rem 2.5rem",
            background: "rgba(123,95,255,0.04)",
            border: "1px solid rgba(123,95,255,0.15)",
            clipPath:
              "polygon(12px 0%, 100% 0%, calc(100% - 12px) 100%, 0% 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "1.5rem",
          }}
        >
          <div>
            <p
              style={{
                fontFamily: "'Orbitron', monospace",
                fontSize: "0.85rem",
                fontWeight: 700,
                color: "#e8eaf0",
                marginBottom: "0.4rem",
              }}
            >
              Still have questions?
            </p>
            <p
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: "0.72rem",
                color: "#7a7f99",
                lineHeight: 1.7,
              }}
            >
              Use our contact form and we'll get back to you within 24
              hours.
            </p>
          </div>

          {/* SINGLE CTA — scrolls to contact form + highlights it */}
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              const el = document.getElementById("contact");
              if (el) {
                el.scrollIntoView({ behavior: "smooth" });
                setTimeout(() => {
                  const form = el.querySelector("form");
                  if (form) {
                    form.style.transition = "box-shadow 0.4s";
                    form.style.boxShadow =
                      "0 0 50px rgba(0,245,196,0.15)";
                    setTimeout(
                      () => (form.style.boxShadow = "none"),
                      1500
                    );
                  }
                }, 700);
              }
            }}
            style={{
              fontFamily: "'Orbitron', monospace",
              fontSize: "0.72rem",
              fontWeight: 900,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "#03040a",
              background: "#00f5c4",
              padding: "0.85rem 2rem",
              textDecoration: "none",
              clipPath:
                "polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)",
              boxShadow: "0 0 25px rgba(0,245,196,0.3)",
              transition: "all 0.3s",
              flexShrink: 0,
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow =
                "0 0 45px rgba(0,245,196,0.5)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow =
                "0 0 25px rgba(0,245,196,0.3)";
            }}
          >
            Ask a Question →
          </a>
        </div>
      </div>

      {/* SHOW TAG LABELS ON WIDER SCREENS */}
      <style>{`
        @media (min-width: 600px) {
          .faq-tag { display: inline-block !important; }
        }
      `}</style>
    </section>
  );
}