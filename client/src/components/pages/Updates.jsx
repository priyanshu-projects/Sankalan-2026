import { useState, useEffect, useRef } from "react";

// ── API URL ──────────────────────────────────────────────────────────────────
const API = "sankalan-2026-production.up.railway.app/api";

// ── Helpers ──────────────────────────────────────────────────────────────────
function getStatus(isoDate) {
  const now   = new Date();
  const start = new Date(isoDate);
  const end   = new Date(start.getTime() + 2 * 60 * 60 * 1000);
  if (now < start) return "upcoming";
  if (now >= start && now <= end) return "ongoing";
  return "past";
}

function getNextEvent(events) {
  const now = new Date();
  return (
    events
      .filter((e) => new Date(e.iso_date) > now)
      .sort((a, b) => new Date(a.iso_date) - new Date(b.iso_date))[0] || null
  );
}

// ── Format helpers ────────────────────────────────────────────────────────────
function formatDate(dateStr) {
  // DB se "2026-04-24" aata hai → "24th April, 2026"
  const d = new Date(dateStr);
  const day = d.getUTCDate();
  const suffix =
    day === 1 ? "st" : day === 2 ? "nd" : day === 3 ? "rd" : "th";
  const month = d.toLocaleString("en-US", { month: "long", timeZone: "UTC" });
  const year  = d.getUTCFullYear();
  return `${day}${suffix} ${month}, ${year}`;
}

function formatTime(timeStr) {
  // DB se "10:00:00" aata hai → "10:00 AM"
  const [h, m] = timeStr.split(":");
  const hour   = parseInt(h);
  const ampm   = hour >= 12 ? "PM" : "AM";
  const hour12 = hour % 12 || 12;
  return `${hour12}:${m} ${ampm}`;
}

function getRgb(color) {
  return color === "#00f5c4" ? "0,245,196" : "123,95,255";
}

// ── StatusBadge ───────────────────────────────────────────────────────────────
function StatusBadge({ status }) {
  const map = {
    upcoming: { label: "Upcoming", color: "#00f5c4", rgb: "0,245,196"   },
    ongoing:  { label: "Live",     color: "#ffd166", rgb: "255,209,102" },
    past:     { label: "Past",     color: "#7a7f99", rgb: "122,127,153" },
  };
  const s = map[status];
  return (
    <span style={{
      fontFamily: "'Space Mono', monospace",
      fontSize: "0.52rem", letterSpacing: "0.15em",
      textTransform: "uppercase", color: s.color,
      background: `rgba(${s.rgb},0.1)`,
      border: `1px solid rgba(${s.rgb},0.25)`,
      padding: "0.2rem 0.55rem",
      clipPath: "polygon(4px 0%,100% 0%,calc(100% - 4px) 100%,0% 100%)",
      flexShrink: 0, display: "inline-flex",
      alignItems: "center", gap: "0.3rem",
    }}>
      {status === "ongoing" && (
        <span style={{
          width: "5px", height: "5px", borderRadius: "50%",
          background: s.color, display: "inline-block",
          animation: "pulse 1.5s infinite",
        }} />
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

  const status  = getStatus(event.iso_date);
  const rgb     = getRgb(event.color);
  const dateStr = formatDate(event.event_date);
  const timeStr = formatTime(event.event_time);

  return (
    <div
      ref={ref}
      style={{
        opacity: 0, transform: "translateX(-20px)",
        transition: `opacity 0.5s ${index * 0.05}s ease,
                     transform 0.5s ${index * 0.05}s ease,
                     border-color 0.3s, background 0.3s`,
        padding: "0.9rem 1.1rem",
        background: "rgba(255,255,255,0.02)",
        border: `1px solid rgba(${rgb},0.12)`,
        clipPath: "polygon(6px 0%,100% 0%,calc(100% - 6px) 100%,0% 100%)",
        display: "flex", alignItems: "center", gap: "0.8rem",
        cursor: "default",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = `rgba(${rgb},0.4)`;
        e.currentTarget.style.background  = `rgba(${rgb},0.04)`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = `rgba(${rgb},0.12)`;
        e.currentTarget.style.background  = "rgba(255,255,255,0.02)";
      }}
    >
      <span style={{ fontSize: "1rem", flexShrink: 0 }}>{event.icon}</span>

      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{
          fontFamily: "'Orbitron', monospace",
          fontSize: "0.72rem", fontWeight: 700,
          color: event.color, letterSpacing: "0.05em",
          whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
        }}>
          {event.name}
        </div>
        <div style={{
          fontFamily: "'Space Mono', monospace",
          fontSize: "0.58rem", color: "#7a7f99",
          marginTop: "0.2rem", letterSpacing: "0.05em",
        }}>
          {dateStr} · {timeStr}
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

  const status  = getStatus(event.iso_date);
  const rgb     = getRgb(event.color);
  const dateStr = formatDate(event.event_date);
  const timeStr = formatTime(event.event_time);

  return (
    <div ref={ref} style={{
      opacity: 0, transform: "translateX(20px)",
      transition: `opacity 0.5s ${index * 0.06}s ease,
                   transform 0.5s ${index * 0.06}s ease`,
      display: "flex", gap: "1rem", alignItems: "flex-start",
    }}>
      {/* Spine */}
      <div style={{
        display: "flex", flexDirection: "column",
        alignItems: "center", flexShrink: 0, paddingTop: "4px",
      }}>
        <div style={{
          width: "10px", height: "10px", borderRadius: "50%",
          background: event.color,
          boxShadow: `0 0 10px ${event.color}`, flexShrink: 0,
        }} />
        {!isLast && (
          <div style={{
            width: "1px", minHeight: "50px", flex: 1,
            background: `linear-gradient(180deg, rgba(${rgb},0.3), transparent)`,
            marginTop: "4px",
          }} />
        )}
      </div>

      {/* Card */}
      <div style={{
        flex: 1,
        background: "rgba(255,255,255,0.02)",
        border: `1px solid rgba(${rgb},0.12)`,
        clipPath: "polygon(6px 0%,100% 0%,calc(100% - 6px) 100%,0% 100%)",
        padding: "0.9rem 1.1rem", marginBottom: "0.8rem",
        transition: "border-color 0.3s, background 0.3s",
        cursor: "default",
      }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = `rgba(${rgb},0.4)`;
          e.currentTarget.style.background  = `rgba(${rgb},0.04)`;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = `rgba(${rgb},0.12)`;
          e.currentTarget.style.background  = "rgba(255,255,255,0.02)";
        }}
      >
        {/* Date + status */}
        <div style={{
          display: "flex", alignItems: "center",
          justifyContent: "space-between",
          gap: "0.5rem", marginBottom: "0.35rem", flexWrap: "wrap",
        }}>
          <span style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: "0.6rem", color: event.color, letterSpacing: "0.1em",
          }}>
            {dateStr} · {timeStr}
          </span>
          <StatusBadge status={status} />
        </div>

        {/* Name */}
        <div style={{
          fontFamily: "'Orbitron', monospace",
          fontSize: "0.8rem", fontWeight: 700,
          color: "#e8eaf0", letterSpacing: "0.04em", marginBottom: "0.35rem",
        }}>
          {event.icon} {event.name}
        </div>

        {/* Desc */}
        <p style={{
          fontFamily: "'Space Mono', monospace",
          fontSize: "0.65rem",
          color: "rgba(232,234,240,0.45)", lineHeight: 1.6,
        }}>
          {event.description}
        </p>
      </div>
    </div>
  );
}

// ── UpcomingBanner ────────────────────────────────────────────────────────────
function UpcomingBanner({ allEvents }) {
  const next = getNextEvent(allEvents);
  const [timeLeft, setTimeLeft] = useState({ d: 0, h: 0, m: 0, s: 0 });

  useEffect(() => {
    if (!next) return;
    const tick = () => {
      const diff = new Date(next.iso_date) - new Date();
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

  const rgb     = next ? getRgb(next.color) : "0,245,196";
  const dateStr = next ? formatDate(next.event_date) : "";
  const timeStr = next ? formatTime(next.event_time) : "";

  return (
    <div style={{
      background: "rgba(0,245,196,0.04)",
      border: "1px solid rgba(0,245,196,0.2)",
      clipPath: "polygon(14px 0%,100% 0%,calc(100% - 14px) 100%,0% 100%)",
      padding: "2rem 2.5rem", marginBottom: "2.5rem",
      position: "relative", overflow: "hidden",
      animation: "fadeInUp 0.8s 0.2s ease both",
    }}>
      {/* Ambient glow */}
      <div style={{
        position: "absolute", top: "50%", left: "50%",
        transform: "translate(-50%,-50%)",
        width: "400px", height: "120px",
        background: "radial-gradient(ellipse, rgba(0,245,196,0.07) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      {/* Top accent */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0,
        height: "2px",
        background: "linear-gradient(90deg, #00f5c4, transparent)",
      }} />

      {next ? (
        <div style={{
          display: "flex", alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap", gap: "1.5rem",
          position: "relative", zIndex: 1,
        }}>
          {/* Left */}
          <div>
            <div style={{
              display: "flex", alignItems: "center",
              gap: "0.5rem", marginBottom: "0.6rem",
            }}>
              <span style={{
                width: "7px", height: "7px", borderRadius: "50%",
                background: "#00f5c4", display: "inline-block",
                animation: "pulse 1.5s infinite",
              }} />
              <span style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: "0.6rem", letterSpacing: "0.25em",
                textTransform: "uppercase", color: "#00f5c4",
              }}>Next Up</span>
            </div>

            <div style={{
              fontFamily: "'Orbitron', monospace",
              fontSize: "clamp(1rem, 3vw, 1.6rem)",
              fontWeight: 900, color: "#e8eaf0",
              letterSpacing: "0.04em", marginBottom: "0.4rem",
            }}>
              {next.icon} {next.name}
            </div>

            <div style={{
              display: "flex", alignItems: "center",
              gap: "0.8rem", flexWrap: "wrap",
            }}>
              <span style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: "0.7rem", color: "#7a7f99", letterSpacing: "0.08em",
              }}>
                📅 {dateStr} &nbsp;·&nbsp; 🕐 {timeStr}
              </span>
              <span style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: "0.55rem", letterSpacing: "0.12em",
                textTransform: "uppercase", color: next.color,
                background: `rgba(${rgb},0.1)`,
                border: `1px solid rgba(${rgb},0.2)`,
                padding: "0.2rem 0.6rem",
                clipPath: "polygon(4px 0%,100% 0%,calc(100% - 4px) 100%,0% 100%)",
              }}>
                {next.tag}
              </span>
            </div>
          </div>

          {/* Right — countdown */}
          <div style={{ display: "flex", gap: "0.8rem", flexWrap: "wrap" }}>
            {[
              { val: timeLeft.d, label: "Days" },
              { val: timeLeft.h, label: "Hrs"  },
              { val: timeLeft.m, label: "Min"  },
              { val: timeLeft.s, label: "Sec"  },
            ].map((u, i) => (
              <div key={i} style={{
                textAlign: "center", minWidth: "60px",
                padding: "0.7rem 0.5rem",
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(0,245,196,0.15)",
                clipPath: "polygon(5px 0%,100% 0%,calc(100% - 5px) 100%,0% 100%)",
              }}>
                <div style={{
                  fontFamily: "'Orbitron', monospace",
                  fontSize: "1.4rem", fontWeight: 900,
                  color: "#00f5c4",
                  textShadow: "0 0 15px rgba(0,245,196,0.4)", lineHeight: 1,
                }}>
                  {String(u.val).padStart(2, "0")}
                </div>
                <div style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: "0.5rem", letterSpacing: "0.2em",
                  textTransform: "uppercase", color: "#7a7f99", marginTop: "0.3rem",
                }}>
                  {u.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div style={{
          textAlign: "center", position: "relative", zIndex: 1, padding: "0.5rem 0",
        }}>
          <div style={{
            fontFamily: "'Orbitron', monospace",
            fontSize: "0.9rem", color: "#7a7f99", letterSpacing: "0.1em",
          }}>
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
    <div style={{
      background: "rgba(255,209,102,0.05)",
      border: "1px solid rgba(255,209,102,0.2)",
      clipPath: "polygon(10px 0%,100% 0%,calc(100% - 10px) 100%,0% 100%)",
      padding: "1.1rem 1.5rem", marginBottom: "2.5rem",
      display: "flex", alignItems: "flex-start",
      justifyContent: "space-between", gap: "1rem",
      position: "relative", overflow: "hidden",
      animation: "fadeInDown 0.6s 0.3s ease both",
    }}>
      <div style={{
        position: "absolute", top: 0, left: 0, bottom: 0,
        width: "2px",
        background: "linear-gradient(180deg, #ffd166, transparent)",
      }} />

      <div style={{ flex: 1, paddingLeft: "0.5rem" }}>
        <div style={{
          fontFamily: "'Orbitron', monospace",
          fontSize: "0.78rem", fontWeight: 700,
          color: "#ffd166", letterSpacing: "0.08em", marginBottom: "0.4rem",
        }}>
          📣 Results Are OUT!
        </div>
        <p style={{
          fontFamily: "'Space Mono', monospace",
          fontSize: "0.67rem",
          color: "rgba(232,234,240,0.6)", lineHeight: 1.75,
        }}>
          Results for all winners up to Top Third Position are released on our
          Official Instagram Handle{" "}
          <a href="https://instagram.com/ducs.sankalan"
            target="_blank" rel="noopener noreferrer"
            style={{
              color: "#00f5c4", textDecoration: "none",
              borderBottom: "1px solid rgba(0,245,196,0.3)",
              transition: "border-color 0.2s",
            }}>
            @ducs.sankalan
          </a>{" "}
          as well as our{" "}
          <span style={{ color: "#e8eaf0" }}>Results</span> tab in the Navigation Bar.
        </p>
        <div style={{
          fontFamily: "'Space Mono', monospace",
          fontSize: "0.58rem", color: "#7a7f99",
          marginTop: "0.5rem", letterSpacing: "0.1em",
        }}>
          🗓 May 1, 2026
        </div>
      </div>

      <button
        onClick={() => setVisible(false)}
        style={{
          background: "transparent",
          border: "1px solid rgba(255,255,255,0.08)",
          color: "#7a7f99", cursor: "pointer",
          fontSize: "0.75rem", lineHeight: 1,
          padding: "0.35rem 0.5rem", flexShrink: 0,
          transition: "color 0.2s, border-color 0.2s",
          clipPath: "polygon(3px 0%,100% 0%,calc(100% - 3px) 100%,0% 100%)",
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
      >✕</button>
    </div>
  );
}

// ── DaySeparator ──────────────────────────────────────────────────────────────
function DaySeparator({ label }) {
  return (
    <div style={{
      display: "flex", alignItems: "center",
      gap: "1rem", margin: "1.8rem 0 1.2rem",
    }}>
      <span style={{
        fontFamily: "'Space Mono', monospace",
        fontSize: "0.6rem", letterSpacing: "0.25em",
        textTransform: "uppercase", color: "#7a7f99",
        flexShrink: 0, whiteSpace: "nowrap",
      }}>{label}</span>
      <div style={{
        flex: 1, height: "1px",
        background: "linear-gradient(90deg, rgba(255,255,255,0.08), transparent)",
      }} />
    </div>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────
export default function Updates() {
  const [filter,    setFilter]    = useState("all");
  const [allEvents, setAllEvents] = useState([]);
  const [loading,   setLoading]   = useState(true);
  const [error,     setError]     = useState(null);
  const headerRef = useRef();

  // ── Fetch events ──
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        setError(null);

        const res  = await fetch(`${API}/events`);
        if (!res.ok) throw new Error("Failed to fetch events");
        const data = await res.json();

        // Sort by day then time
        const sorted = data.data.sort(
          (a, b) => new Date(a.iso_date) - new Date(b.iso_date)
        );

        setAllEvents(sorted);
      } catch (err) {
        console.error("Fetch error:", err);
        setError("Failed to load updates. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // ── Header reveal ──
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
      : allEvents.filter((e) => getStatus(e.iso_date) === filter);

  const counts = {
    all:      allEvents.length,
    upcoming: allEvents.filter((e) => getStatus(e.iso_date) === "upcoming").length,
    ongoing:  allEvents.filter((e) => getStatus(e.iso_date) === "ongoing").length,
    past:     allEvents.filter((e) => getStatus(e.iso_date) === "past").length,
  };

  return (
    <section id="updates" style={{ position: "relative", zIndex: 1 }}>
      {/* Grid BG */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage: `
          linear-gradient(rgba(0,245,196,0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0,245,196,0.03) 1px, transparent 1px)
        `,
        backgroundSize: "60px 60px",
        maskImage: "radial-gradient(ellipse 80% 50% at 50% 0%, black 30%, transparent 100%)",
        WebkitMaskImage: "radial-gradient(ellipse 80% 50% at 50% 0%, black 30%, transparent 100%)",
        zIndex: 0,
      }} />

      <div style={{
        maxWidth: "1200px", margin: "0 auto",
        padding: "6rem 2rem", position: "relative", zIndex: 1,
      }}>
        {/* Header */}
        <div ref={headerRef} style={{
          opacity: 0, transform: "translateY(30px)",
          transition: "opacity 0.7s ease, transform 0.7s ease",
          marginBottom: "3rem",
        }}>
          <p style={{
            display: "flex", alignItems: "center", gap: "0.8rem",
            fontFamily: "'Space Mono', monospace",
            fontSize: "0.72rem", letterSpacing: "0.3em",
            textTransform: "uppercase", color: "#00f5c4", marginBottom: "0.8rem",
          }}>
            <span style={{ display: "block", width: "30px", height: "1px", background: "#00f5c4", flexShrink: 0 }} />
            Live Tracking
          </p>

          <div style={{
            display: "flex", alignItems: "flex-end",
            justifyContent: "space-between", flexWrap: "wrap", gap: "1rem",
          }}>
            <h2 style={{
              fontFamily: "'Orbitron', monospace",
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              fontWeight: 900, lineHeight: 1.1, color: "#e8eaf0",
            }}>
              Event <span style={{ color: "#00f5c4" }}>Updates</span>
            </h2>

            <div style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: "0.7rem", color: "#7a7f99",
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.07)",
              padding: "0.4rem 1.1rem",
              clipPath: "polygon(6px 0%,100% 0%,calc(100% - 6px) 100%,0% 100%)",
              letterSpacing: "0.1em",
            }}>
              📅 24 – 25 April 2026
            </div>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div style={{
            padding: "2rem", marginBottom: "2rem",
            background: "rgba(255,62,108,0.05)",
            border: "1px solid rgba(255,62,108,0.2)",
            clipPath: "polygon(10px 0%, 100% 0%, calc(100% - 10px) 100%, 0% 100%)",
            fontFamily: "'Space Mono', monospace",
            fontSize: "0.75rem", color: "#ff3e6c",
            textAlign: "center", letterSpacing: "0.05em",
          }}>
            ⚠ {error}
          </div>
        )}

        {/* Upcoming Banner */}
        {!loading && <UpcomingBanner allEvents={allEvents} />}

        {/* Notification */}
        <NotificationBanner />

        {/* Two-column layout */}
        {loading ? (
          <div style={{
            display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem",
          }}>
            {[...Array(2)].map((_, col) => (
              <div key={col} style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                {[...Array(6)].map((_, i) => (
                  <div key={i} style={{
                    height: "60px",
                    background: "rgba(255,255,255,0.02)",
                    border: "1px solid rgba(0,245,196,0.06)",
                    clipPath: "polygon(6px 0%,100% 0%,calc(100% - 6px) 100%,0% 100%)",
                    position: "relative", overflow: "hidden",
                  }}>
                    <div style={{
                      position: "absolute", top: 0, left: "-100%",
                      width: "60%", height: "100%",
                      background: "linear-gradient(90deg, transparent, rgba(0,245,196,0.03), transparent)",
                      animation: "shimmer 1.5s infinite",
                    }} />
                  </div>
                ))}
              </div>
            ))}
          </div>
        ) : (
          <div style={{
            display: "grid", gridTemplateColumns: "1fr 1fr",
            gap: "2rem", alignItems: "start",
          }}>
            {/* LEFT — Event Updates */}
            <div>
              {/* Panel header */}
              <div style={{
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(0,245,196,0.12)",
                clipPath: "polygon(8px 0%,100% 0%,calc(100% - 8px) 100%,0% 100%)",
                padding: "1rem 1.4rem", marginBottom: "1rem",
                display: "flex", alignItems: "center",
                justifyContent: "space-between", gap: "1rem", flexWrap: "wrap",
              }}>
                <span style={{
                  fontFamily: "'Orbitron', monospace",
                  fontSize: "0.78rem", fontWeight: 700,
                  color: "#e8eaf0", letterSpacing: "0.05em",
                }}>Event Updates</span>

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
                      <button key={t.key} onClick={() => setFilter(t.key)} style={{
                        fontFamily: "'Space Mono', monospace",
                        fontSize: "0.55rem", letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        padding: "0.3rem 0.65rem",
                        border: `1px solid ${isActive ? t.activeColor : "rgba(255,255,255,0.08)"}`,
                        background: isActive ? `rgba(${t.activeRgb},0.12)` : "transparent",
                        color: isActive ? t.activeColor : "#7a7f99",
                        cursor: "pointer", transition: "all 0.2s",
                        clipPath: "polygon(3px 0%,100% 0%,calc(100% - 3px) 100%,0% 100%)",
                      }}>
                        {t.label}
                        <span style={{ marginLeft: "0.35rem", fontSize: "0.5rem", opacity: 0.7 }}>
                          {counts[t.key]}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Event rows */}
              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                {filteredEvents.length > 0 ? (
                  filteredEvents.map((e, i) => (
                    <UpdateRow key={e.id} event={e} index={i} />
                  ))
                ) : (
                  <div style={{
                    padding: "2rem", textAlign: "center",
                    fontFamily: "'Space Mono', monospace",
                    fontSize: "0.7rem", color: "#7a7f99",
                    border: "1px solid rgba(255,255,255,0.05)",
                    clipPath: "polygon(6px 0%,100% 0%,calc(100% - 6px) 100%,0% 100%)",
                    letterSpacing: "0.1em",
                  }}>
                    No {filter} events found.
                  </div>
                )}
              </div>
            </div>

            {/* RIGHT — Timeline */}
            <div>
              <div style={{
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(123,95,255,0.15)",
                clipPath: "polygon(8px 0%,100% 0%,calc(100% - 8px) 100%,0% 100%)",
                padding: "1rem 1.4rem", marginBottom: "0.5rem",
              }}>
                <span style={{
                  fontFamily: "'Orbitron', monospace",
                  fontSize: "0.78rem", fontWeight: 700,
                  color: "#e8eaf0", letterSpacing: "0.05em",
                }}>Event Timeline</span>
              </div>

              <DaySeparator label="Day 1 — 24th April 2026" />
              <div style={{ paddingLeft: "0.3rem" }}>
                {day1Events.map((e, i) => (
                  <TimelineCard
                    key={e.id} event={e} index={i}
                    isLast={i === day1Events.length - 1}
                  />
                ))}
              </div>

              <DaySeparator label="Day 2 — 25th April 2026" />
              <div style={{ paddingLeft: "0.3rem" }}>
                {day2Events.map((e, i) => (
                  <TimelineCard
                    key={e.id} event={e}
                    index={day1Events.length + i}
                    isLast={i === day2Events.length - 1}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @media (max-width: 768px) {
          #updates .two-col { grid-template-columns: 1fr !important; }
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
        @keyframes shimmer {
          0%   { left: -100%; }
          100% { left: 200%;  }
        }
      `}</style>
    </section>
  );
}