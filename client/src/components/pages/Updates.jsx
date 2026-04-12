import { useState, useEffect, useRef } from "react";

const API = "https://sankalan-2026-production.up.railway.app/api";

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

function formatDate(dateStr) {
  const d      = new Date(dateStr);
  const day    = d.getUTCDate();
  const suffix = day === 1 ? "st" : day === 2 ? "nd" : day === 3 ? "rd" : "th";
  const month  = d.toLocaleString("en-US", { month: "long", timeZone: "UTC" });
  const year   = d.getUTCFullYear();
  return `${day}${suffix} ${month}, ${year}`;
}

function formatTime(timeStr) {
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
      whiteSpace: "nowrap",
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
function UpdateRow({ event, index, isMobile }) {
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
        padding: isMobile ? "0.75rem 0.8rem" : "0.9rem 1.1rem",
        background: "rgba(255,255,255,0.02)",
        border: `1px solid rgba(${rgb},0.12)`,
        clipPath: "polygon(6px 0%,100% 0%,calc(100% - 6px) 100%,0% 100%)",
        display: "flex", alignItems: "center",
        gap: isMobile ? "0.6rem" : "0.8rem",
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
      <span style={{ fontSize: isMobile ? "0.85rem" : "1rem", flexShrink: 0 }}>
        {event.icon}
      </span>

      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{
          fontFamily: "'Orbitron', monospace",
          fontSize: isMobile ? "0.62rem" : "0.72rem",
          fontWeight: 700, color: event.color,
          letterSpacing: "0.05em",
          whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
        }}>
          {event.name}
        </div>
        {/* ── FIX 1: always show full date + time on all screen sizes ── */}
        <div style={{
          fontFamily: "'Space Mono', monospace",
          fontSize: isMobile ? "0.5rem" : "0.58rem",
          color: "#7a7f99", marginTop: "0.2rem", letterSpacing: "0.05em",
          whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
        }}>
          {dateStr} · {timeStr}
        </div>
      </div>

      <StatusBadge status={status} />
    </div>
  );
}

// ── TimelineCard ──────────────────────────────────────────────────────────────
function TimelineCard({ event, index, isLast, isMobile }) {
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
      display: "flex", gap: isMobile ? "0.6rem" : "1rem",
      alignItems: "flex-start",
    }}>
      {/* Spine */}
      <div style={{
        display: "flex", flexDirection: "column",
        alignItems: "center", flexShrink: 0, paddingTop: "4px",
      }}>
        <div style={{
          width: isMobile ? "8px" : "10px",
          height: isMobile ? "8px" : "10px",
          borderRadius: "50%",
          background: event.color,
          boxShadow: `0 0 10px ${event.color}`,
          flexShrink: 0,
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
      <div
        style={{
          flex: 1,
          background: "rgba(255,255,255,0.02)",
          border: `1px solid rgba(${rgb},0.12)`,
          clipPath: "polygon(6px 0%,100% 0%,calc(100% - 6px) 100%,0% 100%)",
          padding: isMobile ? "0.7rem 0.8rem" : "0.9rem 1.1rem",
          marginBottom: "0.8rem",
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
        {/* ── FIX 1: always show full date + time in timeline too ── */}
        <div style={{
          display: "flex", alignItems: "center",
          justifyContent: "space-between",
          gap: "0.5rem", marginBottom: "0.35rem", flexWrap: "wrap",
        }}>
          <span style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: isMobile ? "0.5rem" : "0.6rem",
            color: event.color, letterSpacing: "0.08em",
          }}>
            {dateStr} · {timeStr}
          </span>
          <StatusBadge status={status} />
        </div>

        {/* Name */}
        <div style={{
          fontFamily: "'Orbitron', monospace",
          fontSize: isMobile ? "0.68rem" : "0.8rem",
          fontWeight: 700, color: "#e8eaf0",
          letterSpacing: "0.04em", marginBottom: "0.35rem",
        }}>
          {event.icon} {event.name}
        </div>

        {/* Desc — hide on mobile to save space */}
        {!isMobile && (
          <p style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: "0.65rem",
            color: "rgba(232,234,240,0.45)",
            lineHeight: 1.6, margin: 0,
          }}>
            {event.description}
          </p>
        )}
      </div>
    </div>
  );
}

// ── UpcomingBanner ────────────────────────────────────────────────────────────
function UpcomingBanner({ allEvents, isMobile }) {
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
      padding: isMobile ? "1.4rem 1rem" : "2rem 2.5rem",
      marginBottom: "2.5rem",
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
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          alignItems: isMobile ? "flex-start" : "center",
          justifyContent: "space-between",
          gap: isMobile ? "1.2rem" : "1.5rem",
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
              fontSize: isMobile
                ? "clamp(0.9rem, 4vw, 1.2rem)"
                : "clamp(1rem, 3vw, 1.6rem)",
              fontWeight: 900, color: "#e8eaf0",
              letterSpacing: "0.04em", marginBottom: "0.4rem",
            }}>
              {next.icon} {next.name}
            </div>

            {/* ── FIX 1: always show full date on mobile too ── */}
            <div style={{
              display: "flex", alignItems: "center",
              gap: "0.6rem", flexWrap: "wrap",
            }}>
              <span style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: isMobile ? "0.6rem" : "0.7rem",
                color: "#7a7f99", letterSpacing: "0.06em",
              }}>
                📅 {dateStr} · {timeStr}
              </span>
              <span style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: "0.55rem", letterSpacing: "0.12em",
                textTransform: "uppercase", color: next.color,
                background: `rgba(${rgb},0.1)`,
                border: `1px solid rgba(${rgb},0.2)`,
                padding: "0.2rem 0.5rem",
                clipPath: "polygon(4px 0%,100% 0%,calc(100% - 4px) 100%,0% 100%)",
              }}>
                {next.tag}
              </span>
            </div>
          </div>

          {/* Right — countdown */}
          <div style={{
            display: "flex",
            gap: isMobile ? "0.5rem" : "0.8rem",
            flexWrap: "nowrap",
            width: isMobile ? "100%" : "auto",
          }}>
            {[
              { val: timeLeft.d, label: "Days" },
              { val: timeLeft.h, label: "Hrs"  },
              { val: timeLeft.m, label: "Min"  },
              { val: timeLeft.s, label: "Sec"  },
            ].map((u, i) => (
              <div key={i} style={{
                textAlign: "center",
                flex: isMobile ? "1 1 0" : "none",
                minWidth: isMobile ? "0" : "60px",
                padding: isMobile ? "0.6rem 0.3rem" : "0.7rem 0.5rem",
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(0,245,196,0.15)",
                clipPath: "polygon(5px 0%,100% 0%,calc(100% - 5px) 100%,0% 100%)",
              }}>
                <div style={{
                  fontFamily: "'Orbitron', monospace",
                  fontSize: isMobile ? "1.1rem" : "1.4rem",
                  fontWeight: 900, color: "#00f5c4",
                  textShadow: "0 0 15px rgba(0,245,196,0.4)", lineHeight: 1,
                }}>
                  {String(u.val).padStart(2, "0")}
                </div>
                <div style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: "0.48rem", letterSpacing: "0.15em",
                  textTransform: "uppercase", color: "#7a7f99",
                  marginTop: "0.3rem",
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
            fontSize: isMobile ? "0.75rem" : "0.9rem",
            color: "#7a7f99", letterSpacing: "0.1em",
          }}>
            🎉 All events concluded — check Results for winners!
          </div>
        </div>
      )}
    </div>
  );
}

// ── NotificationBanner ────────────────────────────────────────────────────────
// !! FIX 2: Commented out — results not out yet, uncomment when ready !!
/*
function NotificationBanner({ isMobile }) {
  const [visible, setVisible] = useState(true);
  if (!visible) return null;

  return (
    <div style={{
      background: "rgba(255,209,102,0.05)",
      border: "1px solid rgba(255,209,102,0.2)",
      clipPath: "polygon(10px 0%,100% 0%,calc(100% - 10px) 100%,0% 100%)",
      padding: isMobile ? "0.9rem 0.9rem" : "1.1rem 1.5rem",
      marginBottom: "2.5rem",
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
          fontSize: isMobile ? "0.65rem" : "0.78rem",
          fontWeight: 700, color: "#ffd166",
          letterSpacing: "0.08em", marginBottom: "0.4rem",
        }}>
          📣 Results Are OUT!
        </div>
        <p style={{
          fontFamily: "'Space Mono', monospace",
          fontSize: isMobile ? "0.6rem" : "0.67rem",
          color: "rgba(232,234,240,0.6)", lineHeight: 1.75, margin: 0,
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
          <span style={{ color: "#e8eaf0" }}>Results</span> tab.
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
        aria-label="Dismiss"
      >✕</button>
    </div>
  );
}
*/

// ── DaySeparator ──────────────────────────────────────────────────────────────
function DaySeparator({ label, isMobile }) {
  return (
    <div style={{
      display: "flex", alignItems: "center",
      gap: "0.8rem", margin: "1.5rem 0 1rem",
    }}>
      <span style={{
        fontFamily: "'Space Mono', monospace",
        fontSize: isMobile ? "0.52rem" : "0.6rem",
        letterSpacing: "0.2em",
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

// ── Loading Skeleton ──────────────────────────────────────────────────────────
function LoadingSkeleton({ isMobile }) {
  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
      gap: isMobile ? "1rem" : "2rem",
    }}>
      {[...Array(isMobile ? 1 : 2)].map((_, col) => (
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
  );
}

// ── Filter Tabs ───────────────────────────────────────────────────────────────
function FilterTabs({ filter, setFilter, counts, isMobile }) {
  const tabs = [
    { key: "all",      label: "All",      activeColor: "#00f5c4", activeRgb: "0,245,196"   },
    { key: "upcoming", label: isMobile ? "Soon" : "Upcoming", activeColor: "#00f5c4", activeRgb: "0,245,196" },
    { key: "ongoing",  label: "Live",     activeColor: "#ffd166", activeRgb: "255,209,102" },
    { key: "past",     label: "Past",     activeColor: "#7a7f99", activeRgb: "122,127,153" },
  ];

  return (
    <div style={{
      display: "flex",
      gap: "0.3rem",
      flexWrap: isMobile ? "wrap" : "nowrap",
    }}>
      {tabs.map((t) => {
        const isActive = filter === t.key;
        return (
          <button key={t.key} onClick={() => setFilter(t.key)} style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: isMobile ? "0.5rem" : "0.55rem",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            padding: isMobile ? "0.3rem 0.5rem" : "0.3rem 0.65rem",
            border: `1px solid ${isActive ? t.activeColor : "rgba(255,255,255,0.08)"}`,
            background: isActive ? `rgba(${t.activeRgb},0.12)` : "transparent",
            color: isActive ? t.activeColor : "#7a7f99",
            cursor: "pointer", transition: "all 0.2s",
            clipPath: "polygon(3px 0%,100% 0%,calc(100% - 3px) 100%,0% 100%)",
            whiteSpace: "nowrap",
          }}>
            {t.label}
            <span style={{ marginLeft: "0.3rem", fontSize: "0.48rem", opacity: 0.7 }}>
              {counts[t.key]}
            </span>
          </button>
        );
      })}
    </div>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────
export default function Updates() {
  const [filter,    setFilter]    = useState("all");
  const [allEvents, setAllEvents] = useState([]);
  const [loading,   setLoading]   = useState(true);
  const [error,     setError]     = useState(null);
  const [mobileTab, setMobileTab] = useState("updates");
  const headerRef = useRef();

  const width    = useWindowWidth();
  const isMobile = width < 600;
  const isTablet = width >= 600 && width < 1024;

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        setError(null);
        const res  = await fetch(`${API}/events`);
        if (!res.ok) throw new Error("Failed to fetch events");
        const data = await res.json();
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
        padding: isMobile
          ? "4rem 1rem 3rem"
          : isTablet
          ? "5rem 1.5rem 4rem"
          : "6rem 2rem",
        position: "relative", zIndex: 1,
      }}>

        {/* ── HEADER ── */}
        <div ref={headerRef} style={{
          opacity: 0, transform: "translateY(30px)",
          transition: "opacity 0.7s ease, transform 0.7s ease",
          marginBottom: isMobile ? "2rem" : "3rem",
        }}>
          <p style={{
            display: "flex", alignItems: "center", gap: "0.8rem",
            fontFamily: "'Space Mono', monospace",
            fontSize: "0.72rem", letterSpacing: "0.3em",
            textTransform: "uppercase", color: "#00f5c4",
            margin: "0 0 0.8rem 0",
          }}>
            <span style={{
              display: "block", width: "30px", height: "1px",
              background: "#00f5c4", flexShrink: 0,
            }} />
            Live Tracking
          </p>

          <div style={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            alignItems: isMobile ? "flex-start" : "flex-end",
            justifyContent: "space-between",
            flexWrap: "wrap", gap: "1rem",
          }}>
            <h2 style={{
              fontFamily: "'Orbitron', monospace",
              fontSize: "clamp(1.8rem, 5vw, 3.5rem)",
              fontWeight: 900, lineHeight: 1.1,
              color: "#e8eaf0", margin: 0,
            }}>
              Event <span style={{ color: "#00f5c4" }}>Updates</span>
            </h2>

            {/* ── FIX 1: date badge always visible, no conditional hiding ── */}
            <div style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: isMobile ? "0.62rem" : "0.7rem",
              color: "#7a7f99",
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.07)",
              padding: "0.4rem 1rem",
              clipPath: "polygon(6px 0%,100% 0%,calc(100% - 6px) 100%,0% 100%)",
              letterSpacing: "0.1em",
              whiteSpace: "nowrap",
              alignSelf: isMobile ? "flex-start" : "auto",
            }}>
              📅 24–25 April 2026
            </div>
          </div>
        </div>

        {/* ── ERROR ── */}
        {error && (
          <div style={{
            padding: isMobile ? "1rem" : "2rem",
            marginBottom: "2rem",
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

        {/* ── UPCOMING BANNER ── */}
        {!loading && (
          <UpcomingBanner allEvents={allEvents} isMobile={isMobile} />
        )}

        {/* ── NOTIFICATION BANNER — commented out until results are ready ──
        <NotificationBanner isMobile={isMobile} />
        */}

        {/* ── MOBILE: tab switcher ── */}
        {isMobile && (
          <div style={{
            display: "flex",
            marginBottom: "1.5rem",
            border: "1px solid rgba(0,245,196,0.15)",
            clipPath: "polygon(8px 0%,100% 0%,calc(100% - 8px) 100%,0% 100%)",
            overflow: "hidden",
          }}>
            {[
              { key: "updates",  label: "📋 Updates"  },
              { key: "timeline", label: "🕐 Timeline" },
            ].map((tab, i) => (
              <button
                key={tab.key}
                onClick={() => setMobileTab(tab.key)}
                style={{
                  flex: 1,
                  fontFamily: "'Orbitron', monospace",
                  fontSize: "0.6rem", fontWeight: 700,
                  letterSpacing: "0.08em",
                  padding: "0.8rem 0.5rem",
                  border: "none",
                  borderRight: i === 0 ? "1px solid rgba(0,245,196,0.15)" : "none",
                  cursor: "pointer", transition: "all 0.3s",
                  background: mobileTab === tab.key
                    ? "rgba(0,245,196,0.12)"
                    : "transparent",
                  color: mobileTab === tab.key ? "#00f5c4" : "#7a7f99",
                  boxShadow: mobileTab === tab.key
                    ? "inset 0 -2px 0 #00f5c4"
                    : "none",
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>
        )}

        {/* ── LOADING ── */}
        {loading ? (
          <LoadingSkeleton isMobile={isMobile} />
        ) : (
          <>
            {/* ── DESKTOP/TABLET ── */}
            {!isMobile && (
              <div style={{
                display: "grid",
                gridTemplateColumns: isTablet ? "1fr" : "1fr 1fr",
                gap: "2rem",
                alignItems: "start",
              }}>
                {/* LEFT — Event Updates */}
                <div>
                  <div style={{
                    background: "rgba(255,255,255,0.02)",
                    border: "1px solid rgba(0,245,196,0.12)",
                    clipPath: "polygon(8px 0%,100% 0%,calc(100% - 8px) 100%,0% 100%)",
                    padding: "1rem 1.4rem", marginBottom: "1rem",
                    display: "flex", alignItems: "center",
                    justifyContent: "space-between",
                    gap: "1rem", flexWrap: "wrap",
                  }}>
                    <span style={{
                      fontFamily: "'Orbitron', monospace",
                      fontSize: "0.78rem", fontWeight: 700,
                      color: "#e8eaf0", letterSpacing: "0.05em",
                      whiteSpace: "nowrap",
                    }}>Event Updates</span>
                    <FilterTabs
                      filter={filter} setFilter={setFilter}
                      counts={counts} isMobile={false}
                    />
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                    {filteredEvents.length > 0 ? (
                      filteredEvents.map((e, i) => (
                        <UpdateRow key={e.id} event={e} index={i} isMobile={false} />
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

                {/* RIGHT — Timeline (desktop only) */}
                {!isTablet && (
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

                    <DaySeparator label="Day 1 — 24th April 2026" isMobile={false} />
                    <div style={{ paddingLeft: "0.3rem" }}>
                      {day1Events.map((e, i) => (
                        <TimelineCard
                          key={e.id} event={e} index={i}
                          isLast={i === day1Events.length - 1}
                          isMobile={false}
                        />
                      ))}
                    </div>

                    <DaySeparator label="Day 2 — 25th April 2026" isMobile={false} />
                    <div style={{ paddingLeft: "0.3rem" }}>
                      {day2Events.map((e, i) => (
                        <TimelineCard
                          key={e.id} event={e}
                          index={day1Events.length + i}
                          isLast={i === day2Events.length - 1}
                          isMobile={false}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* TABLET — timeline below */}
                {isTablet && (
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

                    <div style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: "0 1.5rem",
                    }}>
                      <div>
                        <DaySeparator label="Day 1 — 24th April" isMobile={false} />
                        <div style={{ paddingLeft: "0.3rem" }}>
                          {day1Events.map((e, i) => (
                            <TimelineCard
                              key={e.id} event={e} index={i}
                              isLast={i === day1Events.length - 1}
                              isMobile={false}
                            />
                          ))}
                        </div>
                      </div>
                      <div>
                        <DaySeparator label="Day 2 — 25th April" isMobile={false} />
                        <div style={{ paddingLeft: "0.3rem" }}>
                          {day2Events.map((e, i) => (
                            <TimelineCard
                              key={e.id} event={e}
                              index={day1Events.length + i}
                              isLast={i === day2Events.length - 1}
                              isMobile={false}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* ── MOBILE: tabbed panels ── */}
            {isMobile && (
              <>
                {mobileTab === "updates" && (
                  <div>
                    <div style={{ marginBottom: "1rem" }}>
                      <FilterTabs
                        filter={filter} setFilter={setFilter}
                        counts={counts} isMobile={true}
                      />
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                      {filteredEvents.length > 0 ? (
                        filteredEvents.map((e, i) => (
                          <UpdateRow key={e.id} event={e} index={i} isMobile={true} />
                        ))
                      ) : (
                        <div style={{
                          padding: "1.5rem", textAlign: "center",
                          fontFamily: "'Space Mono', monospace",
                          fontSize: "0.65rem", color: "#7a7f99",
                          border: "1px solid rgba(255,255,255,0.05)",
                          clipPath: "polygon(6px 0%,100% 0%,calc(100% - 6px) 100%,0% 100%)",
                          letterSpacing: "0.1em",
                        }}>
                          No {filter} events found.
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {mobileTab === "timeline" && (
                  <div>
                    <DaySeparator label="Day 1 — 24th April 2026" isMobile={true} />
                    <div style={{ paddingLeft: "0.2rem" }}>
                      {day1Events.map((e, i) => (
                        <TimelineCard
                          key={e.id} event={e} index={i}
                          isLast={i === day1Events.length - 1}
                          isMobile={true}
                        />
                      ))}
                    </div>

                    <DaySeparator label="Day 2 — 25th April 2026" isMobile={true} />
                    <div style={{ paddingLeft: "0.2rem" }}>
                      {day2Events.map((e, i) => (
                        <TimelineCard
                          key={e.id} event={e}
                          index={day1Events.length + i}
                          isLast={i === day2Events.length - 1}
                          isMobile={true}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}
          </>
        )}
      </div>

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1);   }
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