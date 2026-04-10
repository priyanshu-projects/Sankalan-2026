import { useState, useEffect, useRef } from "react";

const techEvents = [
  {
    id: 1,
    name: "HackDUCS",
    icon: "⚡",
    heads: [{ name: "Vineet", phone: null }],
    desc: "The flagship 36-hour hackathon. Build, break and innovate under pressure.",
    color: "#00f5c4",
    tag: "Hackathon",
  },
  {
    id: 2,
    name: "Signal Protocol",
    icon: "📡",
    heads: [
      { name: "Amit",  phone: null },
      { name: "Suraj", phone: null },
    ],
    desc: "Decode, encrypt and crack — a deep dive into network security challenges.",
    color: "#00f5c4",
    tag: "Cybersecurity",
  },
  {
    id: 3,
    name: "Line Following Robot",
    icon: "🤖",
    heads: [
      { name: "Prachi",       phone: null },
      { name: "Krishna Kumar", phone: null },
    ],
    desc: "Build and race your autonomous bot through the ultimate obstacle track.",
    color: "#00f5c4",
    tag: "Robotics",
  },
  {
    id: 4,
    name: "CtrlQuery",
    icon: "🗄️",
    heads: [{ name: "Tanubhav", phone: null }],
    desc: "Query your way to victory — a SQL and database management showdown.",
    color: "#00f5c4",
    tag: "Database",
  },
  {
    id: 5,
    name: "ChessArena",
    icon: "♟️",
    heads: [{ name: "Hritik", phone: null }],
    desc: "Strategy meets technology — a chess tournament with a competitive twist.",
    color: "#00f5c4",
    tag: "Strategy",
  },
  {
    id: 6,
    name: "Blind Coding",
    icon: "🙈",
    heads: [],
    desc: "Code without seeing your screen. Pure logic, zero visuals.",
    color: "#00f5c4",
    tag: "Coding",
  },
  {
    id: 7,
    name: "Code Auction",
    icon: "🔨",
    heads: [],
    desc: "Bid on code snippets, debug them and race to the finish line.",
    color: "#00f5c4",
    tag: "Coding",
  },
  {
    id: 8,
    name: "Algoholics",
    icon: "🧮",
    heads: [{ name: "Shukla", phone: null }],
    desc: "Algorithm-heavy competitive programming — only the sharpest survive.",
    color: "#00f5c4",
    tag: "Competitive",
  },
  {
    id: 9,
    name: "Squash the Bugs",
    icon: "🐛",
    heads: [{ name: "Anurag", phone: null }],
    desc: "Find and fix bugs faster than anyone else. Debugging under the clock.",
    color: "#00f5c4",
    tag: "Debugging",
  },
];

const nonTechEvents = [
  {
    id: 10,
    name: "Dastur-e-Mehfil",
    icon: "🎭",
    heads: [{ name: "Shivashish", phone: null }],
    desc: "A cultural extravaganza — poetry, shayari and the art of expression.",
    color: "#7b5fff",
    tag: "Cultural",
  },
  {
    id: 11,
    name: "Feet on Fire",
    icon: "🔥",
    heads: [{ name: "Anamika", phone: null }],
    desc: "Dance battle royale — solo and group performances judged by experts.",
    color: "#7b5fff",
    tag: "Dance",
  },
  {
    id: 12,
    name: "Chakravyuh",
    icon: "🌀",
    heads: [{ name: "Kritika", phone: null }],
    desc: "The ultimate maze of mind games, puzzles and real-world challenges.",
    color: "#7b5fff",
    tag: "Treasure Hunt",
  },
];

function EventCard({ event, index }) {
  const ref = useRef();
  const rgb = event.color === "#00f5c4" ? "0,245,196" : "123,95,255";

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        opacity: 0,
        transform: "translateY(30px)",
        transition: `opacity 0.6s ${index * 0.07}s ease,
                     transform 0.6s ${index * 0.07}s ease`,
        background: "rgba(255,255,255,0.02)",
        border: `1px solid rgba(${rgb},0.15)`,
        clipPath:
          "polygon(10px 0%, 100% 0%, calc(100% - 10px) 100%, 0% 100%)",
        padding: "1.8rem",
        display: "flex",
        flexDirection: "column",
        gap: "0",
        position: "relative",
        overflow: "hidden",
        transition: `opacity 0.6s ${index * 0.07}s ease,
                     transform 0.6s ${index * 0.07}s ease,
                     border-color 0.3s, box-shadow 0.3s,
                     background 0.3s`,
        cursor: "default",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = event.color;
        e.currentTarget.style.background = `rgba(${rgb},0.05)`;
        e.currentTarget.style.boxShadow = `0 0 40px rgba(${rgb},0.15)`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = `rgba(${rgb},0.15)`;
        e.currentTarget.style.background = "rgba(255,255,255,0.02)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      {/* TOP ACCENT LINE */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "2px",
          background: `linear-gradient(90deg, ${event.color}, transparent)`,
        }}
      />

      {/* WATERMARK ICON */}
      <div
        style={{
          position: "absolute",
          bottom: "-10px",
          right: "10px",
          fontSize: "5rem",
          opacity: 0.04,
          pointerEvents: "none",
          userSelect: "none",
          lineHeight: 1,
        }}
      >
        {event.icon}
      </div>

      {/* HEADER ROW */}
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          marginBottom: "1rem",
          gap: "0.5rem",
        }}
      >
        {/* ICON + NAME */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.8rem" }}>
          <div
            style={{
              width: "42px",
              height: "42px",
              borderRadius: "50%",
              background: `rgba(${rgb},0.1)`,
              border: `1px solid rgba(${rgb},0.25)`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "1.2rem",
              flexShrink: 0,
            }}
          >
            {event.icon}
          </div>
          <h3
            style={{
              fontFamily: "'Orbitron', monospace",
              fontSize: "0.9rem",
              fontWeight: 700,
              color: "#e8eaf0",
              letterSpacing: "0.04em",
              lineHeight: 1.3,
            }}
          >
            {event.name}
          </h3>
        </div>

        {/* TAG */}
        <span
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: "0.55rem",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: event.color,
            background: `rgba(${rgb},0.1)`,
            border: `1px solid rgba(${rgb},0.2)`,
            padding: "0.25rem 0.6rem",
            clipPath:
              "polygon(4px 0%, 100% 0%, calc(100% - 4px) 100%, 0% 100%)",
            flexShrink: 0,
            whiteSpace: "nowrap",
          }}
        >
          {event.tag}
        </span>
      </div>

      {/* DESC */}
      <p
        style={{
          fontSize: "0.8rem",
          color: "rgba(232,234,240,0.55)",
          lineHeight: 1.75,
          marginBottom: "1.5rem",
          flex: 1,
        }}
      >
        {event.desc}
      </p>

      {/* DIVIDER */}
      <div
        style={{
          height: "1px",
          background: `linear-gradient(90deg, rgba(${rgb},0.3), transparent)`,
          marginBottom: "1.2rem",
        }}
      />

      {/* EVENT HEADS */}
      <div>
        <p
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: "0.58rem",
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            color: "#7a7f99",
            marginBottom: "0.7rem",
          }}
        >
          Event Head{event.heads.length > 1 ? "s" : ""}
        </p>

        {event.heads.length > 0 ? (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0.6rem",
            }}
          >
            {event.heads.map((head, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "0.8rem",
                  padding: "0.6rem 0.8rem",
                  background: `rgba(${rgb},0.05)`,
                  border: `1px solid rgba(${rgb},0.1)`,
                  clipPath:
                    "polygon(4px 0%, 100% 0%, calc(100% - 4px) 100%, 0% 100%)",
                }}
              >
                {/* AVATAR + NAME */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.6rem",
                  }}
                >
                  <div
                    style={{
                      width: "26px",
                      height: "26px",
                      borderRadius: "50%",
                      background: `rgba(${rgb},0.15)`,
                      border: `1px solid rgba(${rgb},0.3)`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontFamily: "'Orbitron', monospace",
                      fontSize: "0.55rem",
                      fontWeight: 900,
                      color: event.color,
                      flexShrink: 0,
                    }}
                  >
                    {head.name.charAt(0).toUpperCase()}
                  </div>
                  <span
                    style={{
                      fontFamily: "'Orbitron', monospace",
                      fontSize: "0.72rem",
                      fontWeight: 700,
                      color: event.color,
                      letterSpacing: "0.05em",
                    }}
                  >
                    {head.name}
                  </span>
                </div>

                {/* PHONE */}
                <div
                  style={{
                    fontFamily: "'Space Mono', monospace",
                    fontSize: "0.65rem",
                    color: head.phone ? "#e8eaf0" : "#7a7f99",
                    letterSpacing: "0.05em",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.3rem",
                  }}
                >
                  <span style={{ fontSize: "0.6rem" }}>📞</span>
                  {head.phone ? (
                    <a
                      href={`tel:${head.phone}`}
                      style={{
                        color: "#e8eaf0",
                        textDecoration: "none",
                        transition: "color 0.2s",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.color = event.color)
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.color = "#e8eaf0")
                      }
                    >
                      {head.phone}
                    </a>
                  ) : (
                    <span
                      style={{
                        opacity: 0.4,
                        fontSize: "0.6rem",
                        letterSpacing: "0.15em",
                      }}
                    >
                      TBA
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* NO HEAD ASSIGNED YET */
          <div
            style={{
              padding: "0.6rem 0.8rem",
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.06)",
              clipPath:
                "polygon(4px 0%, 100% 0%, calc(100% - 4px) 100%, 0% 100%)",
              fontFamily: "'Space Mono', monospace",
              fontSize: "0.65rem",
              color: "#7a7f99",
              letterSpacing: "0.1em",
              opacity: 0.6,
            }}
          >
            — To be assigned
          </div>
        )}
      </div>
    </div>
  );
}

export default function Events() {
  const [activeTab, setActiveTab] = useState("tech");

  const events = activeTab === "tech" ? techEvents : nonTechEvents;

  return (
    <section
      id="events"
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
          Compete
        </p>

        {/* TITLE */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "2rem",
            marginBottom: "3rem",
          }}
        >
          <h2
            style={{
              fontFamily: "'Orbitron', monospace",
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              fontWeight: 900,
              lineHeight: 1.1,
              color: "#e8eaf0",
            }}
          >
            Our{" "}
            <span style={{ color: "#00f5c4" }}>Events</span>
          </h2>

          {/* COUNTS */}
          <div
            style={{
              display: "flex",
              gap: "1.5rem",
              fontFamily: "'Space Mono', monospace",
              fontSize: "0.75rem",
              color: "#7a7f99",
            }}
          >
            <span>
              <span
                style={{
                  fontFamily: "'Orbitron', monospace",
                  color: "#00f5c4",
                  fontWeight: 700,
                  fontSize: "1rem",
                }}
              >
                {techEvents.length}
              </span>{" "}
              Tech
            </span>
            <span>
              <span
                style={{
                  fontFamily: "'Orbitron', monospace",
                  color: "#7b5fff",
                  fontWeight: 700,
                  fontSize: "1rem",
                }}
              >
                {nonTechEvents.length}
              </span>{" "}
              Non-Tech
            </span>
          </div>
        </div>

        {/* ── TAB SWITCHER ── */}
        <div
          style={{
            display: "inline-flex",
            gap: "0",
            marginBottom: "3rem",
            border: "1px solid rgba(0,245,196,0.15)",
            clipPath:
              "polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)",
            overflow: "hidden",
          }}
        >
          {[
            { key: "tech",    label: "⚡ Tech Events",     color: "#00f5c4", rgb: "0,245,196"   },
            { key: "nontech", label: "🎭 Non-Tech Events",  color: "#7b5fff", rgb: "123,95,255" },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              style={{
                fontFamily: "'Orbitron', monospace",
                fontSize: "0.72rem",
                fontWeight: 700,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                padding: "0.9rem 2rem",
                border: "none",
                cursor: "pointer",
                transition: "all 0.3s",
                background:
                  activeTab === tab.key
                    ? `rgba(${tab.rgb},0.15)`
                    : "transparent",
                color:
                  activeTab === tab.key ? tab.color : "#7a7f99",
                borderRight:
                  tab.key === "tech"
                    ? "1px solid rgba(0,245,196,0.15)"
                    : "none",
                boxShadow:
                  activeTab === tab.key
                    ? `inset 0 -2px 0 ${tab.color}`
                    : "none",
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* ── ACTIVE TAB LABEL ── */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "1rem",
            marginBottom: "2rem",
          }}
        >
          <div
            style={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              background:
                activeTab === "tech" ? "#00f5c4" : "#7b5fff",
              boxShadow: `0 0 12px ${
                activeTab === "tech" ? "#00f5c4" : "#7b5fff"
              }`,
              animation: "pulse 1.5s infinite",
            }}
          />
          <span
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: "0.7rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#7a7f99",
            }}
          >
            {activeTab === "tech"
              ? `${techEvents.length} events listed`
              : `${nonTechEvents.length} events listed`}
          </span>
        </div>

        {/* ── EVENT GRID ── */}
        <div
          key={activeTab} // re-mount grid on tab switch for animation
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fill, minmax(320px, 1fr))",
            gap: "1.2rem",
          }}
        >
          {events.map((event, i) => (
            <EventCard key={event.id} event={event} index={i} />
          ))}
        </div>

        {/* ── REGISTER CTA ── */}
        <div
          style={{
            marginTop: "4rem",
            padding: "2.5rem 3rem",
            background: "rgba(0,245,196,0.03)",
            border: "1px solid rgba(0,245,196,0.15)",
            clipPath:
              "polygon(14px 0%, 100% 0%, calc(100% - 14px) 100%, 0% 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "2rem",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* BG GLOW */}
          <div
            style={{
              position: "absolute",
              left: "-50px",
              top: "50%",
              transform: "translateY(-50%)",
              width: "300px",
              height: "150px",
              background:
                "radial-gradient(ellipse, rgba(0,245,196,0.06) 0%, transparent 70%)",
              pointerEvents: "none",
            }}
          />

          <div style={{ position: "relative", zIndex: 1 }}>
            <h3
              style={{
                fontFamily: "'Orbitron', monospace",
                fontSize: "1.1rem",
                fontWeight: 900,
                color: "#e8eaf0",
                marginBottom: "0.5rem",
              }}
            >
              Ready to{" "}
              <span style={{ color: "#00f5c4" }}>Compete?</span>
            </h3>
            <p
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: "0.75rem",
                color: "#7a7f99",
                lineHeight: 1.7,
              }}
            >
              Register for Sankalan 2025 events on Unstop.
              <br />
              Spots are limited — secure yours now.
            </p>
          </div>

          <a
            href="https://unstop.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-block",
              fontFamily: "'Orbitron', monospace",
              clipPath:
                "polygon(12px 0%, 100% 0%, calc(100% - 12px) 100%, 0% 100%)",
              background: "#00f5c4",
              color: "#03040a",
              padding: "1rem 2.5rem",
              fontSize: "0.78rem",
              fontWeight: 900,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              textDecoration: "none",
              boxShadow: "0 0 30px rgba(0,245,196,0.3)",
              transition: "all 0.3s",
              position: "relative",
              zIndex: 1,
              flexShrink: 0,
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
    </section>
  );
}