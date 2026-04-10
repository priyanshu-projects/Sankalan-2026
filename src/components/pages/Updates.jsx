// src/components/pages/Updates.jsx
import { useState, useEffect, useRef } from "react";

// ── Event schedule data ──────────────────────────────────────────────────────
const allEvents = [
  // ── DAY 1 — 24th April 2026 ──
  {
    id: 1,
    name: "HackDUCS",
    icon: "⚡",
    tag: "Hackathon",
    color: "#00f5c4",
    rgb: "0,245,196",
    day: 1,
    date: "24th April, 2026",
    time: "10:00 AM",
    isoDate: "2026-04-24T10:00:00",
    desc: "The flagship 36-hour hackathon. Build, break and innovate under pressure.",
  },
  {
    id: 2,
    name: "Algoholics",
    icon: "🧮",
    tag: "Competitive",
    color: "#00f5c4",
    rgb: "0,245,196",
    day: 1,
    date: "24th April, 2026",
    time: "10:30 AM",
    isoDate: "2026-04-24T10:30:00",
    desc: "Algorithm-heavy competitive programming — only the sharpest survive.",
  },
  {
    id: 3,
    name: "Chakravyuh",
    icon: "🌀",
    tag: "Treasure Hunt",
    color: "#7b5fff",
    rgb: "123,95,255",
    day: 1,
    date: "24th April, 2026",
    time: "11:00 AM",
    isoDate: "2026-04-24T11:00:00",
    desc: "The ultimate maze of mind games, puzzles and real-world challenges.",
  },
  {
    id: 4,
    name: "Dastur-e-Mehfil",
    icon: "🎭",
    tag: "Cultural",
    color: "#7b5fff",
    rgb: "123,95,255",
    day: 1,
    date: "24th April, 2026",
    time: "12:00 PM",
    isoDate: "2026-04-24T12:00:00",
    desc: "A cultural extravaganza — poetry, shayari and the art of expression.",
  },
  {
    id: 5,
    name: "Signal Protocol",
    icon: "📡",
    tag: "Cybersecurity",
    color: "#00f5c4",
    rgb: "0,245,196",
    day: 1,
    date: "24th April, 2026",
    time: "12:30 PM",
    isoDate: "2026-04-24T12:30:00",
    desc: "Decode, encrypt and crack — a deep dive into network security challenges.",
  },
  {
    id: 6,
    name: "Blind Coding",
    icon: "🙈",
    tag: "Coding",
    color: "#00f5c4",
    rgb: "0,245,196",
    day: 1,
    date: "24th April, 2026",
    time: "02:00 PM",
    isoDate: "2026-04-24T14:00:00",
    desc: "Code without seeing your screen. Pure logic, zero visuals.",
  },
  {
    id: 7,
    name: "ChessArena",
    icon: "♟️",
    tag: "Strategy",
    color: "#00f5c4",
    rgb: "0,245,196",
    day: 1,
    date: "24th April, 2026",
    time: "03:00 PM",
    isoDate: "2026-04-24T15:00:00",
    desc: "Strategy meets technology — a chess tournament with a competitive twist.",
  },
  {
    id: 8,
    name: "Feet on Fire",
    icon: "🔥",
    tag: "Dance",
    color: "#7b5fff",
    rgb: "123,95,255",
    day: 1,
    date: "24th April, 2026",
    time: "04:00 PM",
    isoDate: "2026-04-24T16:00:00",
    desc: "Dance battle royale — solo and group performances judged by experts.",
  },

  // ── DAY 2 — 25th April 2026 ──
  {
    id: 9,
    name: "Code Auction",
    icon: "🔨",
    tag: "Coding",
    color: "#00f5c4",
    rgb: "0,245,196",
    day: 2,
    date: "25th April, 2026",
    time: "10:00 AM",
    isoDate: "2026-04-25T10:00:00",
    desc: "Bid on code snippets, debug them and race to the finish line.",
  },
  {
    id: 10,
    name: "CtrlQuery",
    icon: "🗄️",
    tag: "Database",
    color: "#00f5c4",
    rgb: "0,245,196",
    day: 2,
    date: "25th April, 2026",
    time: "11:00 AM",
    isoDate: "2026-04-25T11:00:00",
    desc: "Query your way to victory — a SQL and database management showdown.",
  },
  {
    id: 11,
    name: "Squash the Bugs",
    icon: "🐛",
    tag: "Debugging",
    color: "#00f5c4",
    rgb: "0,245,196",
    day: 2,
    date: "25th April, 2026",
    time: "12:00 PM",
    isoDate: "2026-04-25T12:00:00",
    desc: "Find and fix bugs faster than anyone else. Debugging under the clock.",
  },
  {
    id: 12,
    name: "Line Following Robot",
    icon: "🤖",
    tag: "Robotics",
    color: "#00f5c4",
    rgb: "0,245,196",
    day: 2,
    date: "25th April, 2026",
    time: "01:00 PM",
    isoDate: "2026-04-25T13:00:00",
    desc: "Build and race your autonomous bot through the ultimate obstacle track.",
  },
];

// ── Helpers ──────────────────────────────────────────────────────────────────
function getStatus(isoDate) {
  const now = new Date();
  const start = new Date(isoDate);
  const end = new Date(start.getTime() + 2 * 60 * 60 * 1000); // +2h window
  if (now < start) return "upcoming";
  if (now >= start && now <= end) return "ongoing";
  return "past";
}

function getNextEvent() {
  const now = new Date();
  return (
    allEvents
      .filter((e) => new Date(e.isoDate) > now)
      .sort((a, b) => new Date(a.isoDate) - new Date(b.isoDate))[0] || null
  );
}

// ── StatusBadge ───────────────────────────────────────────────────────────────
function StatusBadge({ status }) {
  const map = {
    upcoming: { label: "Upcoming", color: "#00f5c4", rgb: "0,245,196"     },
    ongoing:  { label: "Live",     color: "#ffd166", rgb: "255,209,102"   },
    past:     { label: "Past",     color: "#7a7f99", rgb: "122,127,153"   },
  };
  const s = map[status];
  return (
    <span
      style={{
        fontFamily: "'Space Mono', monospace",
        fontSize: "0.52rem",
        letterSpacing: "0.15em",
        textTransform: "uppercase",
        color: s.color,
        background: `rgba(${s.rgb},0.1)`,
        border: `1px solid rgba(${s.rgb},0.25)`,
        padding: "0.2rem 0.55rem",
        clipPath: "polygon(4px 0%,100% 0%,calc(100% - 4px) 100%,0% 100%)",
        flexShrink: 0,
        display: "inline-flex",
        alignItems: "center",
        gap: "0.3rem",
      }}
    >
      {status === "ongoing" && (
        <span
          style={{
            width: "5px",
            height: "5px",
            borderRadius: "50%",
            background: s.color,
            display: "inline-block",
            animation: "pulse 1.5s infinite",
          }}
        />
      )}
      {s.label}
    </span>
  );
}

// ── UpdateRow ─────────────────────────────────────────────────────────────────
function UpdateRow({ event, index }) {
  const ref = useRef();

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateX(0)";
          obs.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const status = getStatus(event.isoDate);

  return (
    <div
      ref={ref}
      style={{
        opacity: 0,
        transform: "translateX(-20px)",
        transition: `opacity 0.5s ${index * 0.05}s ease,
                     transform 0.5s ${index * 0.05}s ease,
                     border-color 0.3s, background 0.3s`,
        padding: "0.9rem 1.1rem",
        background: "rgba(255,255,255,0.02)",
        border: `1px solid rgba(${event.rgb},0.12)`,
        clipPath: "polygon(6px 0%,100% 0%,calc(100% - 6px) 100%,0% 100%)",
        display: "flex",
        alignItems: "center",
        gap: "0.8rem",
        cursor: "default",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = `rgba(${event.rgb},0.4)`;
        e.currentTarget.style.background   = `rgba(${event.rgb},0.04)`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = `rgba(${event.rgb},0.12)`;
        e.currentTarget.style.background   = "rgba(255,255,255,0.02)";
      }}
    >
      {/* Icon */}
      <span style={{ fontSize: "1rem", flexShrink: 0 }}>{event.icon}</span>

      {/* Name + datetime */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            fontFamily: "'Orbitron', monospace",
            fontSize: "0.72rem",
            fontWeight: 700,
            color: event.color,
            letterSpacing: "0.05em",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {event.name}
        </div>
        <div
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: "0.58rem",
            color: "#7a7f99",
            marginTop: "0.2rem",
            letterSpacing: "0.05em",
          }}
        >
          {event.date} · {event.time}
        </div>
      </div>

      <StatusBadge status={status} />
    </div>
  );
}

// ── TimelineCard ──────────────────────────────────────────────────────────────
function TimelineCard({ event, index, isLast }) {
  const ref = useRef();

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateX(0)";
          obs.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const status = getStatus(event.isoDate);

  return (
    <div
      ref={ref}
      style={{
        opacity: 0,
        transform: "translateX(20px)",
        transition: `opacity 0.5s ${index * 0.06}s ease,
                     transform 0.5s ${index * 0.06}s ease`,
        display: "flex",
        gap: "1rem",
        alignItems: "flex-start",
      }}
    >
      {/* Spine */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          flexShrink: 0,
          paddingTop: "4px",
        }}
      >
        <div
          style={{
            width: "10px",
            height: "10px",
            borderRadius: "50%",
            background: event.color,
            boxShadow: `0 0 10px ${event.color}`,
            flexShrink: 0,
          }}
        />
        {!isLast && (
          <div
            style={{
              width: "1px",
              minHeight: "50px",
              flex: 1,
              background: `linear-gradient(180deg, rgba(${event.rgb},0.3), transparent)`,
              marginTop: "4px",
            }}
          />
        )}
      </div>

      {/* Card */}
      <div
        style={{
          flex: 1,
          background: "rgba(255,255,255,0.02)",
          border: `1px solid rgba(${event.rgb},0.12)`,
          clipPath: "polygon(6px 0%,100% 0%,calc(100% - 6px) 100%,0% 100%)",
          padding: "0.9rem 1.1rem",
          marginBottom: "0.8rem",
          transition: "border-color 0.3s, background 0.3s",
          cursor: "default",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = `rgba(${event.rgb},0.4)`;
          e.currentTarget.style.background   = `rgba(${event.rgb},0.04)`;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = `rgba(${event.rgb},0.12)`;
          e.currentTarget.style.background   = "rgba(255,255,255,0.02)";
        }}
      >
        {/* Date + status */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "0.5rem",
            marginBottom: "0.35rem",
            flexWrap: "wrap",
          }}
        >
          <span
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: "0.6rem",
              color: event.color,
              letterSpacing: "0.1em",
            }}
          >
            {event.date} · {event.time}
          </span>
          <StatusBadge status={status} />
        </div>

        {/* Name */}
        <div
          style={{
            fontFamily: "'Orbitron', monospace",
            fontSize: "0.8rem",
            fontWeight: 700,
            color: "#e8eaf0",
            letterSpacing: "0.04em",
            marginBottom: "0.35rem",
          }}
        >
          {event.icon} {event.name}
        </div>

        {/* Desc */}
        <p
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: "0.65rem",
            color: "rgba(232,234,240,0.45)",
            lineHeight: 1.6,
          }}
        >
          {event.desc}
        </p>
      </div>
    </div>
  );
}

// ── UpcomingBanner ────────────────────────────────────────────────────────────
function UpcomingBanner() {
  const next = getNextEvent();
  const [timeLeft, setTimeLeft] = useState({ d: 0, h: 0, m: 0, s: 0 });

  useEffect(() => {
    if (!next) return;
    const tick = () => {
      const diff = new Date(next.isoDate) - new Date();
      if (diff <= 0) return;
      setTimeLeft({
        d: Math.floor(diff / 86400000),
        h: Math.floor((diff % 86400000) / 3600000),
        m: Math.floor((diff % 3600000) / 60000),
        s: Math.floor((diff % 60000) / 1000),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [next]);

  return (
    <div
      style={{
        background: "rgba(0,245,196,0.04)",
        border: "1px solid rgba(0,245,196,0.2)",
        clipPath: "polygon(14px 0%,100% 0%,calc(100% - 14px) 100%,0% 100%)",
        padding: "2rem 2.5rem",
        marginBottom: "2.5rem",
        position: "relative",
        overflow: "hidden",
        animation: "fadeInUp 0.8s 0.2s ease both",
      }}
    >
      {/* Ambient glow */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          width: "400px",
          height: "120px",
          background:
            "radial-gradient(ellipse, rgba(0,245,196,0.07) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      {/* Top accent line */}
      <div
        style={{
          position: "absolute",
          top: 0, left: 0, right: 0,
          height: "2px",
          background: "linear-gradient(90deg, #00f5c4, transparent)",
        }}
      />

      {next ? (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "1.5rem",
            position: "relative",
            zIndex: 1,
          }}
        >
          {/* Left — event info */}
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                marginBottom: "0.6rem",
              }}
            >
              <span
                style={{
                  width: "7px",
                  height: "7px",
                  borderRadius: "50%",
                  background: "#00f5c4",
                  display: "inline-block",
                  animation: "pulse 1.5s infinite",
                }}
              />
              <span
                style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: "0.6rem",
                  letterSpacing: "0.25em",
                  textTransform: "uppercase",
                  color: "#00f5c4",
                }}
              >
                Next Up
              </span>
            </div>

            <div
              style={{
                fontFamily: "'Orbitron', monospace",
                fontSize: "clamp(1rem, 3vw, 1.6rem)",
                fontWeight: 900,
                color: "#e8eaf0",
                letterSpacing: "0.04em",
                marginBottom: "0.4rem",
              }}
            >
              {next.icon} {next.name}
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.8rem",
                flexWrap: "wrap",
              }}
            >
              <span
                style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: "0.7rem",
                  color: "#7a7f99",
                  letterSpacing: "0.08em",
                }}
              >
                📅 {next.date} &nbsp;·&nbsp; 🕐 {next.time}
              </span>
              <span
                style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: "0.55rem",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: next.color,
                  background: `rgba(${next.rgb},0.1)`,
                  border: `1px solid rgba(${next.rgb},0.2)`,
                  padding: "0.2rem 0.6rem",
                  clipPath:
                    "polygon(4px 0%,100% 0%,calc(100% - 4px) 100%,0% 100%)",
                }}
              >
                {next.tag}
              </span>
            </div>
          </div>

          {/* Right — live countdown */}
          <div style={{ display: "flex", gap: "0.8rem", flexWrap: "wrap" }}>
            {[
              { val: timeLeft.d, label: "Days" },
              { val: timeLeft.h, label: "Hrs"  },
              { val: timeLeft.m, label: "Min"  },
              { val: timeLeft.s, label: "Sec"  },
            ].map((u, i) => (
              <div
                key={i}
                style={{
                  textAlign: "center",
                  minWidth: "60px",
                  padding: "0.7rem 0.5rem",
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(0,245,196,0.15)",
                  clipPath:
                    "polygon(5px 0%,100% 0%,calc(100% - 5px) 100%,0% 100%)",
                }}
              >
                <div
                  style={{
                    fontFamily: "'Orbitron', monospace",
                    fontSize: "1.4rem",
                    fontWeight: 900,
                    color: "#00f5c4",
                    textShadow: "0 0 15px rgba(0,245,196,0.4)",
                    lineHeight: 1,
                  }}
                >
                  {String(u.val).padStart(2, "0")}
                </div>
                <div
                  style={{
                    fontFamily: "'Space Mono', monospace",
                    fontSize: "0.5rem",
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: "#7a7f99",
                    marginTop: "0.3rem",
                  }}
                >
                  {u.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div
          style={{
            textAlign: "center",
            position: "relative",
            zIndex: 1,
            padding: "0.5rem 0",
          }}
        >
          <div
            style={{
              fontFamily: "'Orbitron', monospace",
              fontSize: "0.9rem",
              color: "#7a7f99",
              letterSpacing: "0.1em",
            }}
          >
            🎉 All events have concluded — check Results for winners!
          </div>
        </div>
      )}
    </div>
  );
}

// ── NotificationBanner ────────────────────────────────────────────────────────
function NotificationBanner() {
  const [visible, setVisible] = useState(true);
  if (!visible) return null;

  return (
    <div
      style={{
        background: "rgba(255,209,102,0.05)",
        border: "1px solid rgba(255,209,102,0.2)",
        clipPath: "polygon(10px 0%,100% 0%,calc(100% - 10px) 100%,0% 100%)",
        padding: "1.1rem 1.5rem",
        marginBottom: "2.5rem",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "space-between",
        gap: "1rem",
        position: "relative",
        overflow: "hidden",
        animation: "fadeInDown 0.6s 0.3s ease both",
      }}
    >
      {/* Left accent */}
      <div
        style={{
          position: "absolute",
          top: 0, left: 0, bottom: 0,
          width: "2px",
          background: "linear-gradient(180deg, #ffd166, transparent)",
        }}
      />

      <div style={{ flex: 1, paddingLeft: "0.5rem" }}>
        <div
          style={{
            fontFamily: "'Orbitron', monospace",
            fontSize: "0.78rem",
            fontWeight: 700,
            color: "#ffd166",
            letterSpacing: "0.08em",
            marginBottom: "0.4rem",
          }}
        >
          📣 Results Are OUT!
        </div>
        <p
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: "0.67rem",
            color: "rgba(232,234,240,0.6)",
            lineHeight: 1.75,
          }}
        >
          Results for all winners up to Top Third Position are released on our
          Official Instagram Handle{" "}
          <a
            href="https://instagram.com/ducs.sankalan"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: "#00f5c4",
              textDecoration: "none",
              borderBottom: "1px solid rgba(0,245,196,0.3)",
              transition: "border-color 0.2s",
            }}
          >
            @ducs.sankalan
          </a>{" "}
          as well as our{" "}
          <span style={{ color: "#e8eaf0" }}>Results</span> tab in the
          Navigation Bar.
        </p>
        <div
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: "0.58rem",
            color: "#7a7f99",
            marginTop: "0.5rem",
            letterSpacing: "0.1em",
          }}
        >
          🗓 May 1, 2025
        </div>
      </div>

      {/* Dismiss */}
      <button
        onClick={() => setVisible(false)}
        style={{
          background: "transparent",
          border: "1px solid rgba(255,255,255,0.08)",
          color: "#7a7f99",
          cursor: "pointer",
          fontSize: "0.75rem",
          lineHeight: 1,
          padding: "0.35rem 0.5rem",
          flexShrink: 0,
          transition: "color 0.2s, border-color 0.2s",
          clipPath:
            "polygon(3px 0%,100% 0%,calc(100% - 3px) 100%,0% 100%)",
          fontFamily: "'Space Mono', monospace",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.color = "#e8eaf0";
          e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.color = "#7a7f99";
          e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
        }}
        aria-label="Dismiss notification"
      >
        ✕
      </button>
    </div>
  );
}

// ── DaySeparator ──────────────────────────────────────────────────────────────
function DaySeparator({ label }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "1rem",
        margin: "1.8rem 0 1.2rem",
      }}
    >
      <span
        style={{
          fontFamily: "'Space Mono', monospace",
          fontSize: "0.6rem",
          letterSpacing: "0.25em",
          textTransform: "uppercase",
          color: "#7a7f99",
          flexShrink: 0,
          whiteSpace: "nowrap",
        }}
      >
        {label}
      </span>
      <div
        style={{
          flex: 1,
          height: "1px",
          background:
            "linear-gradient(90deg, rgba(255,255,255,0.08), transparent)",
        }}
      />
    </div>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────
export default function Updates() {
  const [filter, setFilter] = useState("all");
  const headerRef = useRef();

  // Header reveal
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
          obs.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );
    if (headerRef.current) obs.observe(headerRef.current);
    return () => obs.disconnect();
  }, []);

  const day1Events = allEvents.filter((e) => e.day === 1);
  const day2Events = allEvents.filter((e) => e.day === 2);

  const filteredEvents =
    filter === "all"
      ? allEvents
      : allEvents.filter((e) => getStatus(e.isoDate) === filter);

  // Tab counts
  const counts = {
    all:      allEvents.length,
    upcoming: allEvents.filter((e) => getStatus(e.isoDate) === "upcoming").length,
    ongoing:  allEvents.filter((e) => getStatus(e.isoDate) === "ongoing").length,
    past:     allEvents.filter((e) => getStatus(e.isoDate) === "past").length,
  };

  return (
    <section
      id="updates"
      style={{ position: "relative", zIndex: 1 }}
    >
      {/* ── Grid BG ── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          backgroundImage: `
            linear-gradient(rgba(0,245,196,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,245,196,0.03) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
          maskImage:
            "radial-gradient(ellipse 80% 50% at 50% 0%, black 30%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 50% at 50% 0%, black 30%, transparent 100%)",
          zIndex: 0,
        }}
      />

      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "6rem 2rem",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* ── Section header ── */}
        <div
          ref={headerRef}
          style={{
            opacity: 0,
            transform: "translateY(30px)",
            transition: "opacity 0.7s ease, transform 0.7s ease",
            marginBottom: "3rem",
          }}
        >
          {/* Section tag */}
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
            Live Tracking
          </p>

          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "1rem",
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
              <span style={{ color: "#00f5c4" }}>Updates</span>
            </h2>

            {/* Date range badge */}
            <div
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: "0.7rem",
                color: "#7a7f99",
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.07)",
                padding: "0.4rem 1.1rem",
                clipPath:
                  "polygon(6px 0%,100% 0%,calc(100% - 6px) 100%,0% 100%)",
                letterSpacing: "0.1em",
              }}
            >
              📅 24 – 25 April 2026
            </div>
          </div>
        </div>

        {/* ── Upcoming banner ── */}
        <UpcomingBanner />

        {/* ── Notification ── */}
        <NotificationBanner />

        {/* ── Two-column layout ── */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "2rem",
            alignItems: "start",
          }}
        >
          {/* ════ LEFT — Event Updates ════ */}
          <div>
            {/* Panel header */}
            <div
              style={{
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(0,245,196,0.12)",
                clipPath:
                  "polygon(8px 0%,100% 0%,calc(100% - 8px) 100%,0% 100%)",
                padding: "1rem 1.4rem",
                marginBottom: "1rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "1rem",
                flexWrap: "wrap",
              }}
            >
              <span
                style={{
                  fontFamily: "'Orbitron', monospace",
                  fontSize: "0.78rem",
                  fontWeight: 700,
                  color: "#e8eaf0",
                  letterSpacing: "0.05em",
                }}
              >
                Event Updates
              </span>

              {/* Filter tabs */}
              <div style={{ display: "flex", gap: "0.4rem" }}>
                {[
                  { key: "all",      label: "All",      activeColor: "#00f5c4", activeRgb: "0,245,196"   },
                  { key: "upcoming", label: "Upcoming", activeColor: "#00f5c4", activeRgb: "0,245,196"   },
                  { key: "ongoing",  label: "Ongoing",  activeColor: "#ffd166", activeRgb: "255,209,102" },
                  { key: "past",     label: "Past",     activeColor: "#7a7f99", activeRgb: "122,127,153" },
                ].map((t) => {
                  const isActive = filter === t.key;
                  return (
                    <button
                      key={t.key}
                      onClick={() => setFilter(t.key)}
                      style={{
                        fontFamily: "'Space Mono', monospace",
                        fontSize: "0.55rem",
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        padding: "0.3rem 0.65rem",
                        border: `1px solid ${
                          isActive
                            ? t.activeColor
                            : "rgba(255,255,255,0.08)"
                        }`,
                        background: isActive
                          ? `rgba(${t.activeRgb},0.12)`
                          : "transparent",
                        color: isActive ? t.activeColor : "#7a7f99",
                        cursor: "pointer",
                        transition: "all 0.2s",
                        clipPath:
                          "polygon(3px 0%,100% 0%,calc(100% - 3px) 100%,0% 100%)",
                      }}
                    >
                      {t.label}
                      {/* count bubble */}
                      <span
                        style={{
                          marginLeft: "0.35rem",
                          fontSize: "0.5rem",
                          opacity: 0.7,
                        }}
                      >
                        {counts[t.key]}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Event rows */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
              }}
            >
              {filteredEvents.length > 0 ? (
                filteredEvents.map((e, i) => (
                  <UpdateRow key={e.id} event={e} index={i} />
                ))
              ) : (
                <div
                  style={{
                    padding: "2rem",
                    textAlign: "center",
                    fontFamily: "'Space Mono', monospace",
                    fontSize: "0.7rem",
                    color: "#7a7f99",
                    border: "1px solid rgba(255,255,255,0.05)",
                    clipPath:
                      "polygon(6px 0%,100% 0%,calc(100% - 6px) 100%,0% 100%)",
                    letterSpacing: "0.1em",
                  }}
                >
                  No {filter} events found.
                </div>
              )}
            </div>
          </div>

          {/* ════ RIGHT — Event Timeline ════ */}
          <div>
            {/* Panel header */}
            <div
              style={{
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(123,95,255,0.15)",
                clipPath:
                  "polygon(8px 0%,100% 0%,calc(100% - 8px) 100%,0% 100%)",
                padding: "1rem 1.4rem",
                marginBottom: "0.5rem",
              }}
            >
              <span
                style={{
                  fontFamily: "'Orbitron', monospace",
                  fontSize: "0.78rem",
                  fontWeight: 700,
                  color: "#e8eaf0",
                  letterSpacing: "0.05em",
                }}
              >
                Event Timeline
              </span>
            </div>

            {/* Day 1 */}
            <DaySeparator label="Day 1 — 24th April 2026" />
            <div style={{ paddingLeft: "0.3rem" }}>
              {day1Events.map((e, i) => (
                <TimelineCard
                  key={e.id}
                  event={e}
                  index={i}
                  isLast={i === day1Events.length - 1}
                />
              ))}
            </div>

            {/* Day 2 */}
            <DaySeparator label="Day 2 — 25th April 2026" />
            <div style={{ paddingLeft: "0.3rem" }}>
              {day2Events.map((e, i) => (
                <TimelineCard
                  key={e.id}
                  event={e}
                  index={day1Events.length + i}
                  isLast={i === day2Events.length - 1}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Mobile responsive ── */}
      <style>{`
        @media (max-width: 768px) {
          #updates .two-col {
            grid-template-columns: 1fr !important;
          }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: 0.4; transform: scale(1.4); }
        }
      `}</style>
    </section>
  );
}