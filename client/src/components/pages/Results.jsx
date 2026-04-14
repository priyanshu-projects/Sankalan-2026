import { useEffect, useRef, useState } from "react";

const API = `${import.meta.env.VITE_API_URL}/api`;

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
function getRgb(color) {
  return color === "#00f5c4" ? "0,245,196" : "123,95,255";
}

function formatDate(dateStr) {
  const d      = new Date(dateStr);
  const day    = d.getUTCDate();
  const suffix = day === 1 ? "st" : day === 2 ? "nd" : day === 3 ? "rd" : "th";
  const month  = d.toLocaleString("en-US", { month: "long", timeZone: "UTC" });
  const year   = d.getUTCFullYear();
  return `${day}${suffix} ${month}, ${year}`;
}

// ── Loading Skeleton ──────────────────────────────────────────────────────────
function LoadingSkeleton({ isMobile, isTablet }) {
  const cols = isMobile ? "1fr" : isTablet ? "1fr 1fr" : "repeat(3, 1fr)";
  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: cols,
      gap: isMobile ? "0.8rem" : "1rem",
      marginBottom: "3rem",
    }}>
      {[...Array(6)].map((_, i) => (
        <div key={i} style={{
          height: isMobile ? "160px" : "200px",
          background: "rgba(255,255,255,0.02)",
          border: "1px solid rgba(0,245,196,0.06)",
          clipPath: "polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)",
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
  );
}

// ── Countdown Unit ───────────────────────────────────────────────────────────
function CountUnit({ label, val, isMobile }) {
  return (
    <div style={{
      minWidth: isMobile ? "58px" : "72px",
      padding: isMobile ? "0.8rem 0.4rem" : "1rem 0.5rem",
      background: "rgba(255,255,255,0.03)",
      border: "1px solid rgba(0,245,196,0.15)",
      clipPath: "polygon(6px 0%, 100% 0%, calc(100% - 6px) 100%, 0% 100%)",
      textAlign: "center",
      flex: "1 1 0",
    }}>
      <div style={{
        fontFamily: "'Orbitron', monospace",
        fontSize: isMobile ? "1.3rem" : "1.8rem",
        fontWeight: 900, color: "#00f5c4",
        textShadow: "0 0 20px rgba(0,245,196,0.4)",
        lineHeight: 1,
      }}>
        {String(val ?? "00").padStart(2, "0")}
      </div>
      <div style={{
        fontFamily: "'Space Mono', monospace",
        fontSize: isMobile ? "0.48rem" : "0.55rem",
        letterSpacing: "0.2em",
        textTransform: "uppercase",
        color: "#7a7f99", marginTop: "0.4rem",
      }}>
        {label}
      </div>
    </div>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────
export default function Results() {
  const sectionRef = useRef();
  const [timeLeft,      setTimeLeft]      = useState({});
  const [activeTab,     setActiveTab]     = useState("tech");
  const [techEvents,    setTechEvents]    = useState([]);
  const [nonTechEvents, setNonTechEvents] = useState([]);
  const [loading,       setLoading]       = useState(true);
  const [error,         setError]         = useState(null);

  const width    = useWindowWidth();
  const isMobile = width < 600;
  const isTablet = width >= 600 && width < 1024;

  // ── Fetch ──
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        setError(null);
        const [techRes, nonTechRes] = await Promise.all([
          fetch(`${API}/events/tech`),
          fetch(`${API}/events/nontech`),
        ]);
        if (!techRes.ok || !nonTechRes.ok) throw new Error("Failed to fetch events");
        const techData    = await techRes.json();
        const nonTechData = await nonTechRes.json();
        setTechEvents(techData.data);
        setNonTechEvents(nonTechData.data);
      } catch (err) {
        console.error("Fetch error:", err);
        setError("Failed to load results. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  // ── Countdown ──
  useEffect(() => {
    const target = new Date("2026-04-24T09:00:00");
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

  // ── Scroll reveal ──
  useEffect(() => {
    if (loading) return;
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
  }, [activeTab, loading]);

  const activeResults = activeTab === "tech" ? techEvents : nonTechEvents;

  // grid columns
  const gridCols = isMobile ? "1fr" : isTablet ? "1fr 1fr" : "repeat(3, 1fr)";

  return (
    <section
      id="results"
      ref={sectionRef}
      style={{ position: "relative", zIndex: 1 }}
    >
      <div style={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: isMobile
          ? "4rem 1rem 3rem"
          : isTablet
          ? "5rem 1.5rem 4rem"
          : "6rem 2rem",
      }}>

        {/* ── SECTION TAG ── */}
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
          Leaderboard
        </p>

        {/* ── TITLE + COUNTS ── */}
        <div style={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          alignItems: isMobile ? "flex-start" : "flex-end",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: isMobile ? "1rem" : "2rem",
          marginBottom: "2.5rem",
        }}>
          <h2 style={{
            fontFamily: "'Orbitron', monospace",
            fontSize: "clamp(1.8rem, 5vw, 3.5rem)",
            fontWeight: 900, lineHeight: 1.1,
            color: "#e8eaf0", margin: 0,
          }}>
            Event <span style={{ color: "#00f5c4" }}>Results</span>
          </h2>

          <div style={{
            display: "flex", gap: "1.5rem",
            fontFamily: "'Space Mono', monospace",
            fontSize: "0.75rem", color: "#7a7f99",
          }}>
            <span>
              <span style={{
                fontFamily: "'Orbitron', monospace",
                color: "#00f5c4", fontWeight: 700,
                fontSize: isMobile ? "0.9rem" : "1rem",
              }}>
                {loading ? "—" : techEvents.length}
              </span>{" "}Tech
            </span>
            <span>
              <span style={{
                fontFamily: "'Orbitron', monospace",
                color: "#7b5fff", fontWeight: 700,
                fontSize: isMobile ? "0.9rem" : "1rem",
              }}>
                {loading ? "—" : nonTechEvents.length}
              </span>{" "}Non-Tech
            </span>
          </div>
        </div>

        {/* ── ERROR ── */}
        {error && (
          <div style={{
            padding: isMobile ? "1.2rem" : "2rem",
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

        {/* ── COMING SOON HERO BANNER ── */}
        <div style={{
          position: "relative", overflow: "hidden",
          padding: isMobile
            ? "2rem 1.2rem"
            : isTablet
            ? "2.5rem 2rem"
            : "3.5rem 3rem",
          marginBottom: isMobile ? "2.5rem" : "4rem",
          background: "rgba(255,255,255,0.02)",
          border: "1px solid rgba(0,245,196,0.2)",
          clipPath: "polygon(14px 0%, 100% 0%, calc(100% - 14px) 100%, 0% 100%)",
          textAlign: "center",
        }}>
          {/* Grid BG */}
          <div style={{
            position: "absolute", inset: 0,
            backgroundImage: `
              linear-gradient(rgba(0,245,196,0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,245,196,0.03) 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px", pointerEvents: "none",
          }} />

          {/* Glow */}
          <div style={{
            position: "absolute", top: "50%", left: "50%",
            transform: "translate(-50%, -50%)",
            width: isMobile ? "200px" : "400px",
            height: isMobile ? "100px" : "200px",
            background: "radial-gradient(ellipse, rgba(0,245,196,0.07) 0%, transparent 70%)",
            pointerEvents: "none",
          }} />

          {/* Trophy */}
          <div style={{
            fontSize: isMobile ? "2rem" : "3rem",
            marginBottom: "1rem",
            position: "relative", zIndex: 1,
          }}>
            🏆
          </div>

          {/* Headline */}
          <h3 style={{
            fontFamily: "'Orbitron', monospace",
            fontSize: isMobile
              ? "clamp(1rem, 4vw, 1.3rem)"
              : "clamp(1.2rem, 3vw, 2rem)",
            fontWeight: 900, color: "#e8eaf0",
            margin: "0 0 0.8rem 0",
            position: "relative", zIndex: 1,
            lineHeight: 1.3,
          }}>
            Results Go Live on{" "}
            <span style={{ color: "#00f5c4" }}>
              {isMobile ? <><br />25th April, 2026</> : "25th April, 2026"}
            </span>
          </h3>

          <p style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: isMobile ? "0.7rem" : "0.82rem",
            color: "#7a7f99",
            lineHeight: 1.8,
            maxWidth: "560px",
            margin: "0 auto",
            marginBottom: isMobile ? "1.5rem" : "2.5rem",
            position: "relative", zIndex: 1,
          }}>
            Winners will be announced live at the Valedictory Ceremony
            and published here immediately after. Stay tuned — glory awaits.
          </p>

          {/* ── Countdown ── */}
          <div style={{
            display: "flex",
            gap: isMobile ? "0.5rem" : "1.2rem",
            justifyContent: "center",
            flexWrap: "nowrap",
            position: "relative", zIndex: 1,
            maxWidth: isMobile ? "320px" : "500px",
            margin: "0 auto",
          }}>
            {[
              { label: "Days",  val: timeLeft.days  },
              { label: "Hours", val: timeLeft.hours },
              { label: "Mins",  val: timeLeft.mins  },
              { label: "Secs",  val: timeLeft.secs  },
            ].map((unit, i) => (
              <CountUnit
                key={i}
                label={unit.label}
                val={unit.val}
                isMobile={isMobile}
              />
            ))}
          </div>

          {/* Notify badge */}
          <div style={{
            marginTop: isMobile ? "1.5rem" : "2rem",
            display: "inline-flex", alignItems: "center",
            gap: "0.6rem",
            fontFamily: "'Space Mono', monospace",
            fontSize: isMobile ? "0.58rem" : "0.68rem",
            letterSpacing: "0.12em",
            textTransform: "uppercase", color: "#7b5fff",
            border: "1px solid rgba(123,95,255,0.25)",
            background: "rgba(123,95,255,0.06)",
            padding: isMobile ? "0.4rem 0.8rem" : "0.5rem 1.2rem",
            clipPath: "polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)",
            position: "relative", zIndex: 1,
            flexWrap: "wrap",
            justifyContent: "center",
            textAlign: "center",
          }}>
            <span style={{
              width: "6px", height: "6px", borderRadius: "50%",
              background: "#7b5fff", display: "inline-block",
              flexShrink: 0,
              animation: "pulse 1.5s infinite",
            }} />
            Follow @ducs.sankalan for live updates
          </div>
        </div>

        {/* ── TAB SWITCHER ── */}
        <div style={{
          display: "flex",
          marginBottom: "1.5rem",
          border: "1px solid rgba(0,245,196,0.15)",
          clipPath: "polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)",
          overflow: "hidden",
          width: isMobile ? "100%" : "fit-content",
        }}>
          {[
            { key: "tech",    label: isMobile ? "⚡ Tech"    : "⚡ Tech Events",    color: "#00f5c4", rgb: "0,245,196"   },
            { key: "nontech", label: isMobile ? "🎭 Non-Tech" : "🎭 Non-Tech Events", color: "#7b5fff", rgb: "123,95,255" },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              style={{
                fontFamily: "'Orbitron', monospace",
                fontSize: isMobile ? "0.62rem" : "0.72rem",
                fontWeight: 700,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                padding: isMobile ? "0.8rem 1rem" : "0.9rem 2rem",
                border: "none",
                flex: isMobile ? 1 : "none",
                cursor: "pointer",
                transition: "all 0.3s",
                background: activeTab === tab.key
                  ? `rgba(${tab.rgb},0.12)`
                  : "transparent",
                color: activeTab === tab.key ? tab.color : "#7a7f99",
                borderRight: tab.key === "tech"
                  ? "1px solid rgba(0,245,196,0.15)"
                  : "none",
                boxShadow: activeTab === tab.key
                  ? `inset 0 -2px 0 ${tab.color}`
                  : "none",
                whiteSpace: "nowrap",
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* ── AWAITING LABEL ── */}
        <div style={{
          display: "flex", alignItems: "center",
          gap: "1rem", marginBottom: "1.5rem",
        }}>
          <div style={{
            width: "7px", height: "7px", borderRadius: "50%",
            background: activeTab === "tech" ? "#00f5c4" : "#7b5fff",
            boxShadow: `0 0 10px ${activeTab === "tech" ? "#00f5c4" : "#7b5fff"}`,
            animation: "pulse 1.5s infinite",
            flexShrink: 0,
          }} />
          <p style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: isMobile ? "0.62rem" : "0.7rem",
            letterSpacing: "0.15em",
            textTransform: "uppercase", color: "#7a7f99",
            margin: 0,
          }}>
            {loading
              ? "Loading events..."
              : `Awaiting results for ${activeResults.length} ${
                  activeTab === "tech" ? "tech" : "non-tech"
                } events`}
          </p>
        </div>

        {/* ── RESULT CARDS GRID ── */}
        {loading ? (
          <LoadingSkeleton isMobile={isMobile} isTablet={isTablet} />
        ) : (
          <div key={activeTab} style={{
            display: "grid",
            gridTemplateColumns: gridCols,
            gap: isMobile ? "0.8rem" : "1rem",
            marginBottom: isMobile ? "2rem" : "3rem",
          }}>
            {activeResults.map((item, i) => {
              const rgb     = getRgb(item.color);
              const dateStr = formatDate(item.event_date);

              return (
                <div
                  key={item.id}
                  className="result-card"
                  style={{
                    padding: isMobile ? "1rem" : "1.5rem",
                    background: "rgba(255,255,255,0.02)",
                    border: `1px solid rgba(${rgb},0.12)`,
                    clipPath: "polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)",
                    opacity: 0, transform: "translateY(20px)",
                    transition: `opacity 0.5s ${i * 0.07}s ease,
                                 transform 0.5s ${i * 0.07}s ease`,
                    display: "flex",
                    gap: isMobile ? "0.8rem" : "1.2rem",
                    alignItems: "flex-start",
                    cursor: "default",
                    position: "relative", overflow: "hidden",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = item.color;
                    e.currentTarget.style.background  = `rgba(${rgb},0.04)`;
                    e.currentTarget.style.boxShadow   = `0 0 30px rgba(${rgb},0.1)`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = `rgba(${rgb},0.12)`;
                    e.currentTarget.style.background  = "rgba(255,255,255,0.02)";
                    e.currentTarget.style.boxShadow   = "none";
                  }}
                >
                  {/* TOP ACCENT */}
                  <div style={{
                    position: "absolute", top: 0, left: 0, right: 0,
                    height: "2px",
                    background: `linear-gradient(90deg, ${item.color}, transparent)`,
                  }} />

                  {/* ICON */}
                  <div style={{
                    width: isMobile ? "36px" : "42px",
                    height: isMobile ? "36px" : "42px",
                    borderRadius: "50%",
                    background: `rgba(${rgb},0.1)`,
                    border: `1px solid rgba(${rgb},0.2)`,
                    display: "flex", alignItems: "center",
                    justifyContent: "center",
                    fontSize: isMobile ? "1rem" : "1.2rem",
                    flexShrink: 0, marginTop: "0.2rem",
                  }}>
                    {item.icon}
                  </div>

                  <div style={{ flex: 1, minWidth: 0 }}>
                    {/* TOP ROW */}
                    <div style={{
                      display: "flex",
                      alignItems: "flex-start",
                      justifyContent: "space-between",
                      marginBottom: "0.5rem",
                      gap: "0.5rem",
                      flexWrap: "wrap",
                    }}>
                      <div style={{ minWidth: 0 }}>
                        <h3 style={{
                          fontFamily: "'Orbitron', monospace",
                          fontSize: isMobile ? "0.72rem" : "0.82rem",
                          fontWeight: 700, color: "#e8eaf0",
                          letterSpacing: "0.03em",
                          margin: "0 0 0.2rem 0",
                          wordBreak: "break-word",
                        }}>
                          {item.name}
                        </h3>
                        <span style={{
                          fontFamily: "'Space Mono', monospace",
                          fontSize: "0.55rem", letterSpacing: "0.12em",
                          textTransform: "uppercase",
                          color: item.color, opacity: 0.7,
                        }}>
                          {item.tag}
                        </span>
                      </div>

                      {/* STATUS PILL */}
                      <span style={{
                        fontFamily: "'Space Mono', monospace",
                        fontSize: "0.52rem", letterSpacing: "0.12em",
                        textTransform: "uppercase", color: item.color,
                        background: `rgba(${rgb},0.1)`,
                        border: `1px solid rgba(${rgb},0.25)`,
                        padding: "0.2rem 0.5rem",
                        display: "inline-flex", alignItems: "center",
                        gap: "0.3rem", flexShrink: 0,
                        clipPath: "polygon(4px 0%, 100% 0%, calc(100% - 4px) 100%, 0% 100%)",
                        whiteSpace: "nowrap",
                      }}>
                        <span style={{
                          width: "5px", height: "5px", borderRadius: "50%",
                          background: item.color, display: "inline-block",
                          flexShrink: 0,
                        }} />
                        {item.status || "Upcoming"}
                      </span>
                    </div>

                    {/* DATE */}
                    <div style={{
                      fontFamily: "'Space Mono', monospace",
                      fontSize: isMobile ? "0.58rem" : "0.63rem",
                      color: "#7a7f99", letterSpacing: "0.06em",
                      marginBottom: "0.5rem",
                    }}>
                      📅 {dateStr}
                    </div>

                    {/* DESC */}
                    <p style={{
                      fontFamily: "'Space Mono', monospace",
                      fontSize: isMobile ? "0.68rem" : "0.78rem",
                      color: "rgba(232,234,240,0.5)",
                      lineHeight: 1.7, marginBottom: "0.8rem",
                      margin: "0 0 0.8rem 0",
                    }}>
                      {item.description}
                    </p>

                    {/* SHIMMER BAR */}
                    <div style={{
                      height: "2px",
                      background: "rgba(255,255,255,0.05)",
                      borderRadius: "2px",
                      overflow: "hidden", position: "relative",
                    }}>
                      <div style={{
                        position: "absolute", top: 0, left: "-100%",
                        width: "60%", height: "100%",
                        background: `linear-gradient(90deg, transparent, ${item.color}, transparent)`,
                        animation: "shimmer 2s infinite linear",
                      }} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* ── PAST RESULTS BANNER ── */}
        <div style={{
          padding: isMobile ? "1.2rem 1rem" : "1.5rem 2rem",
          background: "rgba(123,95,255,0.04)",
          border: "1px solid rgba(123,95,255,0.15)",
          clipPath: "polygon(10px 0%, 100% 0%, calc(100% - 10px) 100%, 0% 100%)",
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          alignItems: isMobile ? "flex-start" : "center",
          gap: isMobile ? "1.2rem" : "1.5rem",
          flexWrap: "wrap",
        }}>
          <div style={{ flex: 1, minWidth: "200px" }}>
            <p style={{
              fontFamily: "'Orbitron', monospace",
              fontSize: isMobile ? "0.72rem" : "0.78rem",
              fontWeight: 700, color: "#7b5fff",
              margin: "0 0 0.4rem 0",
              letterSpacing: "0.05em",
            }}>
              Looking for past results?
            </p>
            <p style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: isMobile ? "0.68rem" : "0.72rem",
              color: "#7a7f99", lineHeight: 1.7, margin: 0,
            }}>
              Results from Sankalan 2025 and earlier editions will be
              archived here after the fest.
            </p>
          </div>

          <a
            href="https://www.instagram.com/sankalan.ducs/"
            target="_blank" rel="noopener noreferrer"
            style={{
              fontFamily: "'Orbitron', monospace",
              fontSize: isMobile ? "0.62rem" : "0.7rem",
              fontWeight: 700, letterSpacing: "0.12em",
              textTransform: "uppercase", color: "#7b5fff",
              border: "1px solid rgba(123,95,255,0.3)",
              padding: isMobile ? "0.7rem 1.2rem" : "0.7rem 1.5rem",
              textDecoration: "none",
              clipPath: "polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)",
              transition: "all 0.3s", flexShrink: 0,
              width: isMobile ? "100%" : "auto",
              textAlign: isMobile ? "center" : "left",
              display: "inline-block",
              boxSizing: "border-box",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background  = "rgba(123,95,255,0.1)";
              e.currentTarget.style.borderColor = "#7b5fff";
              e.currentTarget.style.boxShadow   = "0 0 30px rgba(123,95,255,0.2)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background  = "transparent";
              e.currentTarget.style.borderColor = "rgba(123,95,255,0.3)";
              e.currentTarget.style.boxShadow   = "none";
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
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1);   }
          50%       { opacity: 0.4; transform: scale(1.4); }
        }
      `}</style>
    </section>
  );
}