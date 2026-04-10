import { useEffect, useRef, useState } from "react";

const techResults = [
  {
    event: "HackDUCS",
    icon: "⚡",
    status: "Upcoming",
    date: "Nov 8–9, 2025",
    color: "#00f5c4",
    tag: "Hackathon",
    desc: "36-hour build challenge — results announced at Valedictory.",
  },
  {
    event: "Signal Protocol",
    icon: "📡",
    status: "Upcoming",
    date: "Nov 8, 2025",
    color: "#00f5c4",
    tag: "Cybersecurity",
    desc: "Decode, encrypt and crack — network security challenge results.",
  },
  {
    event: "Line Following Robot",
    icon: "🤖",
    status: "Upcoming",
    date: "Nov 8, 2025",
    color: "#00f5c4",
    tag: "Robotics",
    desc: "Fastest autonomous bot through the obstacle track wins.",
  },
  {
    event: "CtrlQuery",
    icon: "🗄️",
    status: "Upcoming",
    date: "Nov 8, 2025",
    color: "#00f5c4",
    tag: "Database",
    desc: "SQL and database management showdown — top scores win.",
  },
  {
    event: "ChessArena",
    icon: "♟️",
    status: "Upcoming",
    date: "Nov 8, 2025",
    color: "#00f5c4",
    tag: "Strategy",
    desc: "Strategy meets technology — tournament bracket results.",
  },
  {
    event: "Blind Coding",
    icon: "🙈",
    status: "Upcoming",
    date: "Nov 8, 2025",
    color: "#00f5c4",
    tag: "Coding",
    desc: "Code without seeing your screen — pure logic decides the winner.",
  },
  {
    event: "Code Auction",
    icon: "🔨",
    status: "Upcoming",
    date: "Nov 8, 2025",
    color: "#00f5c4",
    tag: "Coding",
    desc: "Bid, debug and race — the fastest and smartest team wins.",
  },
  {
    event: "Algoholics",
    icon: "🧮",
    status: "Upcoming",
    date: "Nov 9, 2025",
    color: "#00f5c4",
    tag: "Competitive",
    desc: "Algorithm-heavy competitive programming — only the sharpest survive.",
  },
  {
    event: "Squash the Bugs",
    icon: "🐛",
    status: "Upcoming",
    date: "Nov 9, 2025",
    color: "#00f5c4",
    tag: "Debugging",
    desc: "Find and fix bugs faster than anyone else — clock is ticking.",
  },
];

const nonTechResults = [
  {
    event: "Dastur-e-Mehfil",
    icon: "🎭",
    status: "Upcoming",
    date: "Nov 8, 2025",
    color: "#7b5fff",
    tag: "Cultural",
    desc: "Poetry, shayari and the art of expression — best performance wins.",
  },
  {
    event: "Feet on Fire",
    icon: "🔥",
    status: "Upcoming",
    date: "Nov 9, 2025",
    color: "#7b5fff",
    tag: "Dance",
    desc: "Dance battle royale — solo and group performances judged by experts.",
  },
  {
    event: "Chakravyuh",
    icon: "🌀",
    status: "Upcoming",
    date: "Nov 8–9, 2025",
    color: "#7b5fff",
    tag: "Treasure Hunt",
    desc: "Ultimate maze of mind games, puzzles and real-world challenges.",
  },
];

export default function Results() {
  const sectionRef = useRef();
  const [timeLeft, setTimeLeft] = useState({});
  const [activeTab, setActiveTab] = useState("tech");

  // countdown
  useEffect(() => {
    const target = new Date("2025-11-08T09:00:00");
    const tick = () => {
      const diff = target - new Date();
      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, mins: 0, secs: 0 });
        return;
      }
      setTimeLeft({
        days:  Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        mins:  Math.floor((diff % 3600000) / 60000),
        secs:  Math.floor((diff % 60000) / 1000),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  // scroll reveal
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.style.opacity = "1";
            e.target.style.transform = "translateY(0)";
            observer.unobserve(e.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    const cards = sectionRef.current?.querySelectorAll(".result-card");
    cards?.forEach((c) => observer.observe(c));
    return () => observer.disconnect();
  }, [activeTab]);

  const activeResults =
    activeTab === "tech" ? techResults : nonTechResults;

  return (
    <section
      id="results"
      ref={sectionRef}
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
          Leaderboard
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
            Event{" "}
            <span style={{ color: "#00f5c4" }}>Results</span>
          </h2>

          {/* EVENT COUNTS */}
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
                {techResults.length}
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
                {nonTechResults.length}
              </span>{" "}
              Non-Tech
            </span>
          </div>
        </div>

        {/* ── COMING SOON HERO BANNER ── */}
        <div
          style={{
            position: "relative",
            overflow: "hidden",
            padding: "3.5rem 3rem",
            marginBottom: "4rem",
            background: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(0,245,196,0.2)",
            clipPath:
              "polygon(14px 0%, 100% 0%, calc(100% - 14px) 100%, 0% 100%)",
            textAlign: "center",
          }}
        >
          {/* GRID BG */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage: `
                linear-gradient(rgba(0,245,196,0.03) 1px, transparent 1px),
                linear-gradient(90deg, rgba(0,245,196,0.03) 1px, transparent 1px)
              `,
              backgroundSize: "40px 40px",
              pointerEvents: "none",
            }}
          />

          {/* GLOW */}
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "400px",
              height: "200px",
              background:
                "radial-gradient(ellipse, rgba(0,245,196,0.07) 0%, transparent 70%)",
              pointerEvents: "none",
            }}
          />

          {/* TROPHY */}
          <div
            style={{
              fontSize: "3rem",
              marginBottom: "1rem",
              position: "relative",
              zIndex: 1,
            }}
          >
            🏆
          </div>

          {/* HEADLINE */}
          <h3
            style={{
              fontFamily: "'Orbitron', monospace",
              fontSize: "clamp(1.2rem, 3vw, 2rem)",
              fontWeight: 900,
              color: "#e8eaf0",
              marginBottom: "0.8rem",
              position: "relative",
              zIndex: 1,
            }}
          >
            Results Go Live on{" "}
            <span style={{ color: "#00f5c4" }}>Nov 9, 2025</span>
          </h3>

          <p
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: "0.82rem",
              color: "#7a7f99",
              lineHeight: 1.8,
              maxWidth: "560px",
              margin: "0 auto 2.5rem",
              position: "relative",
              zIndex: 1,
            }}
          >
            Winners will be announced live at the Valedictory Ceremony
            and published here immediately after. Stay tuned — glory awaits.
          </p>

          {/* COUNTDOWN */}
          <div
            style={{
              display: "flex",
              gap: "1.2rem",
              justifyContent: "center",
              flexWrap: "wrap",
              position: "relative",
              zIndex: 1,
            }}
          >
            {[
              { label: "Days",  val: timeLeft.days  },
              { label: "Hours", val: timeLeft.hours },
              { label: "Mins",  val: timeLeft.mins  },
              { label: "Secs",  val: timeLeft.secs  },
            ].map((unit, i) => (
              <div
                key={i}
                style={{
                  minWidth: "72px",
                  padding: "1rem 0.5rem",
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(0,245,196,0.15)",
                  clipPath:
                    "polygon(6px 0%, 100% 0%, calc(100% - 6px) 100%, 0% 100%)",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    fontFamily: "'Orbitron', monospace",
                    fontSize: "1.8rem",
                    fontWeight: 900,
                    color: "#00f5c4",
                    textShadow: "0 0 20px rgba(0,245,196,0.4)",
                    lineHeight: 1,
                  }}
                >
                  {String(unit.val ?? "00").padStart(2, "0")}
                </div>
                <div
                  style={{
                    fontFamily: "'Space Mono', monospace",
                    fontSize: "0.55rem",
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: "#7a7f99",
                    marginTop: "0.4rem",
                  }}
                >
                  {unit.label}
                </div>
              </div>
            ))}
          </div>

          {/* NOTIFY BADGE */}
          <div
            style={{
              marginTop: "2rem",
              display: "inline-flex",
              alignItems: "center",
              gap: "0.6rem",
              fontFamily: "'Space Mono', monospace",
              fontSize: "0.68rem",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "#7b5fff",
              border: "1px solid rgba(123,95,255,0.25)",
              background: "rgba(123,95,255,0.06)",
              padding: "0.5rem 1.2rem",
              clipPath:
                "polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)",
              position: "relative",
              zIndex: 1,
            }}
          >
            <span
              style={{
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                background: "#7b5fff",
                display: "inline-block",
                animation: "pulse 1.5s infinite",
              }}
            />
            Follow @ducs.sankalan for live updates
          </div>
        </div>

        {/* ── TAB SWITCHER ── */}
        <div
          style={{
            display: "inline-flex",
            gap: "0",
            marginBottom: "1.5rem",
            border: "1px solid rgba(0,245,196,0.15)",
            clipPath:
              "polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)",
            overflow: "hidden",
          }}
        >
          {[
            {
              key: "tech",
              label: "⚡ Tech Events",
              color: "#00f5c4",
              rgb: "0,245,196",
            },
            {
              key: "nontech",
              label: "🎭 Non-Tech Events",
              color: "#7b5fff",
              rgb: "123,95,255",
            },
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
                    ? `rgba(${tab.rgb},0.12)`
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

        {/* ── AWAITING LABEL ── */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "1rem",
            marginBottom: "1.5rem",
          }}
        >
          <div
            style={{
              width: "7px",
              height: "7px",
              borderRadius: "50%",
              background:
                activeTab === "tech" ? "#00f5c4" : "#7b5fff",
              boxShadow: `0 0 10px ${
                activeTab === "tech" ? "#00f5c4" : "#7b5fff"
              }`,
              animation: "pulse 1.5s infinite",
            }}
          />
          <p
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: "0.7rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#7a7f99",
            }}
          >
            Awaiting results for{" "}
            {activeTab === "tech"
              ? `${techResults.length} tech events`
              : `${nonTechResults.length} non-tech events`}
          </p>
        </div>

        {/* ── RESULT CARDS GRID ── */}
        <div
          key={activeTab}
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "1rem",
            marginBottom: "3rem",
          }}
        >
          {activeResults.map((item, i) => {
            const rgb =
              item.color === "#00f5c4" ? "0,245,196" : "123,95,255";
            return (
              <div
                key={i}
                className="result-card"
                style={{
                  padding: "1.5rem",
                  background: "rgba(255,255,255,0.02)",
                  border: `1px solid rgba(${rgb},0.12)`,
                  clipPath:
                    "polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)",
                  opacity: 0,
                  transform: "translateY(20px)",
                  transition: `opacity 0.5s ${i * 0.07}s ease,
                               transform 0.5s ${i * 0.07}s ease`,
                  display: "flex",
                  gap: "1.2rem",
                  alignItems: "flex-start",
                  cursor: "default",
                  position: "relative",
                  overflow: "hidden",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = item.color;
                  e.currentTarget.style.background = `rgba(${rgb},0.04)`;
                  e.currentTarget.style.boxShadow = `0 0 30px rgba(${rgb},0.1)`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor =
                    `rgba(${rgb},0.12)`;
                  e.currentTarget.style.background =
                    "rgba(255,255,255,0.02)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                {/* TOP ACCENT */}
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: "2px",
                    background: `linear-gradient(90deg, ${item.color}, transparent)`,
                  }}
                />

                {/* ICON */}
                <div
                  style={{
                    width: "42px",
                    height: "42px",
                    borderRadius: "50%",
                    background: `rgba(${rgb},0.1)`,
                    border: `1px solid rgba(${rgb},0.2)`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "1.2rem",
                    flexShrink: 0,
                    marginTop: "0.2rem",
                  }}
                >
                  {item.icon}
                </div>

                <div style={{ flex: 1 }}>
                  {/* TOP ROW */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      justifyContent: "space-between",
                      marginBottom: "0.5rem",
                      gap: "0.5rem",
                      flexWrap: "wrap",
                    }}
                  >
                    <div>
                      <h3
                        style={{
                          fontFamily: "'Orbitron', monospace",
                          fontSize: "0.82rem",
                          fontWeight: 700,
                          color: "#e8eaf0",
                          letterSpacing: "0.03em",
                          marginBottom: "0.2rem",
                        }}
                      >
                        {item.event}
                      </h3>
                      {/* TAG */}
                      <span
                        style={{
                          fontFamily: "'Space Mono', monospace",
                          fontSize: "0.55rem",
                          letterSpacing: "0.15em",
                          textTransform: "uppercase",
                          color: item.color,
                          opacity: 0.7,
                        }}
                      >
                        {item.tag}
                      </span>
                    </div>

                    {/* STATUS PILL */}
                    <span
                      style={{
                        fontFamily: "'Space Mono', monospace",
                        fontSize: "0.55rem",
                        letterSpacing: "0.15em",
                        textTransform: "uppercase",
                        color: item.color,
                        background: `rgba(${rgb},0.1)`,
                        border: `1px solid rgba(${rgb},0.25)`,
                        padding: "0.2rem 0.6rem",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "0.35rem",
                        flexShrink: 0,
                        clipPath:
                          "polygon(4px 0%, 100% 0%, calc(100% - 4px) 100%, 0% 100%)",
                      }}
                    >
                      <span
                        style={{
                          width: "5px",
                          height: "5px",
                          borderRadius: "50%",
                          background: item.color,
                          display: "inline-block",
                          animation:
                            item.status === "In Progress"
                              ? "pulse 1.2s infinite"
                              : "none",
                        }}
                      />
                      {item.status}
                    </span>
                  </div>

                  {/* DATE */}
                  <div
                    style={{
                      fontFamily: "'Space Mono', monospace",
                      fontSize: "0.63rem",
                      color: "#7a7f99",
                      letterSpacing: "0.08em",
                      marginBottom: "0.5rem",
                    }}
                  >
                    📅 {item.date}
                  </div>

                  {/* DESC */}
                  <p
                    style={{
                      fontSize: "0.78rem",
                      color: "rgba(232,234,240,0.5)",
                      lineHeight: 1.7,
                      marginBottom: "0.8rem",
                    }}
                  >
                    {item.desc}
                  </p>

                  {/* SHIMMER BAR */}
                  <div
                    style={{
                      height: "2px",
                      background: "rgba(255,255,255,0.05)",
                      borderRadius: "2px",
                      overflow: "hidden",
                      position: "relative",
                    }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        top: 0,
                        left: "-100%",
                        width: "60%",
                        height: "100%",
                        background: `linear-gradient(90deg, transparent, ${item.color}, transparent)`,
                        animation: "shimmer 2s infinite linear",
                      }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── PAST RESULTS BANNER ── */}
        <div
          style={{
            padding: "1.5rem 2rem",
            background: "rgba(123,95,255,0.04)",
            border: "1px solid rgba(123,95,255,0.15)",
            clipPath:
              "polygon(10px 0%, 100% 0%, calc(100% - 10px) 100%, 0% 100%)",
            display: "flex",
            alignItems: "center",
            gap: "1.5rem",
            flexWrap: "wrap",
          }}
        >
          <div style={{ flex: 1, minWidth: "200px" }}>
            <p
              style={{
                fontFamily: "'Orbitron', monospace",
                fontSize: "0.78rem",
                fontWeight: 700,
                color: "#7b5fff",
                marginBottom: "0.4rem",
                letterSpacing: "0.05em",
              }}
            >
              Looking for past results?
            </p>
            <p
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: "0.72rem",
                color: "#7a7f99",
                lineHeight: 1.7,
              }}
            >
              Results from Sankalan 2023 and earlier editions will be
              archived here after the fest.
            </p>
          </div>

          <a
            href="https://www.instagram.com/sankalan.ducs/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: "'Orbitron', monospace",
              fontSize: "0.7rem",
              fontWeight: 700,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "#7b5fff",
              border: "1px solid rgba(123,95,255,0.3)",
              padding: "0.7rem 1.5rem",
              textDecoration: "none",
              clipPath:
                "polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)",
              transition: "all 0.3s",
              flexShrink: 0,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background =
                "rgba(123,95,255,0.1)";
              e.currentTarget.style.borderColor = "#7b5fff";
              e.currentTarget.style.boxShadow =
                "0 0 30px rgba(123,95,255,0.2)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.borderColor =
                "rgba(123,95,255,0.3)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            Follow for Updates →
          </a>
        </div>
      </div>

      <style>{`
        @keyframes shimmer {
          0%   { left: -100%; }
          100% { left: 200%;  }
        }
      `}</style>
    </section>
  );
}