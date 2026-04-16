import { useState, useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";

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

// ── Description Popup ────────────────────────────────────────────────────────
function DescriptionPopup({ event, onClose, isMobile }) {
  const rgb = event.color === "#00f5c4" ? "0,245,196" : "123,95,255";

  // Close on backdrop click
  const handleBackdrop = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  // Close on Escape key
  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  // Prevent body scroll when popup open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  return (
    <div
      onClick={handleBackdrop}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1000,
        background: "rgba(3,4,10,0.85)",
        backdropFilter: "blur(6px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: isMobile ? "1rem" : "2rem",
      }}
    >
      <div
        style={{
          background: "#0a0b12",
          border: `1px solid rgba(${rgb},0.3)`,
          clipPath: "polygon(14px 0%, 100% 0%, calc(100% - 14px) 100%, 0% 100%)",
          width: "100%",
          maxWidth: "720px",
          maxHeight: "85vh",
          display: "flex",
          flexDirection: "column",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* TOP ACCENT */}
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0,
          height: "2px",
          background: `linear-gradient(90deg, ${event.color}, transparent)`,
        }} />

        {/* POPUP HEADER */}
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: isMobile ? "1.2rem 1.2rem 1rem" : "1.5rem 2rem 1rem",
          borderBottom: `1px solid rgba(${rgb},0.1)`,
          flexShrink: 0,
        }}>
          {/* Icon + Name + Tag */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.8rem", flex: 1, minWidth: 0 }}>
            <div style={{
              width: isMobile ? "36px" : "44px",
              height: isMobile ? "36px" : "44px",
              borderRadius: "50%",
              background: `rgba(${rgb},0.1)`,
              border: `1px solid rgba(${rgb},0.25)`,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: isMobile ? "1rem" : "1.3rem",
              flexShrink: 0,
            }}>
              {event.icon}
            </div>
            <div>
              <h3 style={{
                fontFamily: "'Orbitron', monospace",
                fontSize: isMobile ? "0.85rem" : "1rem",
                fontWeight: 900,
                color: "#e8eaf0",
                margin: 0,
                letterSpacing: "0.05em",
              }}>
                {event.name}
              </h3>
              <span style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: "0.55rem",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: event.color,
              }}>
                {event.tag}
              </span>
            </div>
          </div>

          {/* Close Button */}
          <button
            onClick={onClose}
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "#7a7f99",
              fontFamily: "'Orbitron', monospace",
              fontSize: "0.7rem",
              padding: "0.4rem 0.8rem",
              cursor: "pointer",
              clipPath: "polygon(4px 0%, 100% 0%, calc(100% - 4px) 100%, 0% 100%)",
              transition: "all 0.2s",
              flexShrink: 0,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "#ff3e6c";
              e.currentTarget.style.borderColor = "rgba(255,62,108,0.3)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "#7a7f99";
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
            }}
          >
            ✕ Close
          </button>
        </div>

        {/* POPUP BODY — Scrollable */}
        <div style={{
          overflowY: "auto",
          flex: 1,
          padding: isMobile ? "1.2rem" : "1.5rem 2rem",
        }}>
          {/* Quick Info Row */}
          <div style={{
            display: "flex",
            gap: "1rem",
            flexWrap: "wrap",
            marginBottom: "1.5rem",
          }}>
            {[
              { label: "Day", value: `Day ${event.day}` },
              { label: "Date", value: event.event_date ? new Date(event.event_date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) : "TBA" },
              { label: "Time", value: event.event_time ? event.event_time.slice(0,5) : "TBA" },
              { label: "Category", value: event.category === "tech" ? "Technical" : "Non-Technical" },
            ].map((item, i) => (
              <div key={i} style={{
                padding: "0.5rem 1rem",
                background: `rgba(${rgb},0.05)`,
                border: `1px solid rgba(${rgb},0.15)`,
                clipPath: "polygon(4px 0%, 100% 0%, calc(100% - 4px) 100%, 0% 100%)",
              }}>
                <div style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: "0.5rem",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "#7a7f99",
                  marginBottom: "0.2rem",
                }}>
                  {item.label}
                </div>
                <div style={{
                  fontFamily: "'Orbitron', monospace",
                  fontSize: "0.7rem",
                  fontWeight: 700,
                  color: event.color,
                }}>
                  {item.value}
                </div>
              </div>
            ))}
          </div>

          {/* Divider */}
          <div style={{
            height: "1px",
            background: `linear-gradient(90deg, rgba(${rgb},0.3), transparent)`,
            marginBottom: "1.5rem",
          }} />

          {/* Full Description — Markdown */}
          <div style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: isMobile ? "0.72rem" : "0.78rem",
            color: "rgba(232,234,240,0.8)",
            lineHeight: 1.9,
          }}>
            {event.full_description ? (
              <ReactMarkdown
                components={{
                  h2: ({ children }) => (
                    <h2 style={{
                      fontFamily: "'Orbitron', monospace",
                      fontSize: isMobile ? "0.9rem" : "1rem",
                      fontWeight: 900,
                      color: event.color,
                      marginBottom: "1rem",
                      marginTop: "0.5rem",
                      letterSpacing: "0.05em",
                    }}>{children}</h2>
                  ),
                  h3: ({ children }) => (
                    <h3 style={{
                      fontFamily: "'Orbitron', monospace",
                      fontSize: isMobile ? "0.75rem" : "0.82rem",
                      fontWeight: 700,
                      color: "#e8eaf0",
                      marginBottom: "0.7rem",
                      marginTop: "1.2rem",
                      letterSpacing: "0.05em",
                    }}>{children}</h3>
                  ),
                  p: ({ children }) => (
                    <p style={{
                      marginBottom: "0.8rem",
                      color: "rgba(232,234,240,0.75)",
                      fontFamily: "'Space Mono', monospace",
                      fontSize: isMobile ? "0.7rem" : "0.75rem",
                      lineHeight: 1.9,
                    }}>{children}</p>
                  ),
                  strong: ({ children }) => (
                    <strong style={{ color: "#e8eaf0", fontWeight: 700 }}>
                      {children}
                    </strong>
                  ),
                  ul: ({ children }) => (
                    <ul style={{
                      paddingLeft: "1.2rem",
                      marginBottom: "0.8rem",
                      listStyle: "none",
                    }}>{children}</ul>
                  ),
                  li: ({ children }) => (
                    <li style={{
                      marginBottom: "0.4rem",
                      color: "rgba(232,234,240,0.75)",
                      fontFamily: "'Space Mono', monospace",
                      fontSize: isMobile ? "0.7rem" : "0.75rem",
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "0.5rem",
                    }}>
                      <span style={{ color: event.color, flexShrink: 0 }}>▸</span>
                      <span>{children}</span>
                    </li>
                  ),
                  hr: () => (
                    <div style={{
                      height: "1px",
                      background: `linear-gradient(90deg, rgba(${rgb},0.3), transparent)`,
                      margin: "1rem 0",
                    }} />
                  ),
                }}
              >
                {event.full_description}
              </ReactMarkdown>
            ) : (
              <p style={{ color: "#7a7f99", fontStyle: "italic" }}>
                Description coming soon...
              </p>
            )}
          </div>
        </div>

        {/* POPUP FOOTER — Register Now */}
        <div style={{
          padding: isMobile ? "1rem 1.2rem" : "1.2rem 2rem",
          borderTop: `1px solid rgba(${rgb},0.1)`,
          flexShrink: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "1rem",
          flexWrap: "wrap",
          background: `rgba(${rgb},0.02)`,
        }}>
          <p style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: "0.65rem",
            color: "#7a7f99",
            margin: 0,
          }}>
            Registration via Unstop
          </p>

          {event.registration_link ? (
            <a
              href={event.registration_link}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-block",
                fontFamily: "'Orbitron', monospace",
                fontSize: isMobile ? "0.65rem" : "0.72rem",
                fontWeight: 900,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                textDecoration: "none",
                color: "#03040a",
                background: event.color,
                padding: isMobile ? "0.75rem 1.5rem" : "0.85rem 2rem",
                clipPath: "polygon(10px 0%, 100% 0%, calc(100% - 10px) 100%, 0% 100%)",
                boxShadow: `0 0 25px rgba(${rgb},0.4)`,
                transition: "all 0.3s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = `0 0 40px rgba(${rgb},0.6)`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = `0 0 25px rgba(${rgb},0.4)`;
              }}
            >
              Register Now →
            </a>
          ) : (
            <span style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: "0.65rem",
              color: "#7a7f99",
              padding: "0.75rem 1.5rem",
              border: "1px solid rgba(255,255,255,0.08)",
              clipPath: "polygon(10px 0%, 100% 0%, calc(100% - 10px) 100%, 0% 100%)",
            }}>
              Link Coming Soon
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

// ── EventCard ────────────────────────────────────────────────────────────────
function EventCard({ event, index, isMobile }) {
  const ref = useRef();
  const [showPopup, setShowPopup] = useState(false);
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

  const heads = event.heads || [];
  const desc  = event.description || event.desc || "";
  const icon  = event.icon || "⚡";
  const tag   = event.tag || "";

  return (
    <>
      <div
        ref={ref}
        style={{
          opacity: 0,
          transform: "translateY(30px)",
          transition: `opacity 0.6s ${index * 0.07}s ease,
                       transform 0.6s ${index * 0.07}s ease,
                       border-color 0.3s, box-shadow 0.3s,
                       background 0.3s`,
          background: "rgba(255,255,255,0.02)",
          border: `1px solid rgba(${rgb},0.15)`,
          clipPath: "polygon(10px 0%, 100% 0%, calc(100% - 10px) 100%, 0% 100%)",
          padding: isMobile ? "1.2rem" : "1.8rem",
          display: "flex",
          flexDirection: "column",
          position: "relative",
          overflow: "hidden",
          cursor: "default",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = event.color;
          e.currentTarget.style.background  = `rgba(${rgb},0.05)`;
          e.currentTarget.style.boxShadow   = `0 0 40px rgba(${rgb},0.15)`;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = `rgba(${rgb},0.15)`;
          e.currentTarget.style.background  = "rgba(255,255,255,0.02)";
          e.currentTarget.style.boxShadow   = "none";
        }}
      >
        {/* TOP ACCENT LINE */}
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0,
          height: "2px",
          background: `linear-gradient(90deg, ${event.color}, transparent)`,
        }} />

        {/* WATERMARK ICON */}
        <div style={{
          position: "absolute", bottom: "-10px", right: "10px",
          fontSize: isMobile ? "3.5rem" : "5rem",
          opacity: 0.04, pointerEvents: "none",
          userSelect: "none", lineHeight: 1,
        }}>
          {icon}
        </div>

        {/* HEADER ROW */}
        <div style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          marginBottom: "1rem",
          gap: "0.5rem",
          flexWrap: isMobile ? "wrap" : "nowrap",
        }}>
          {/* ICON + NAME */}
          <div style={{
            display: "flex", alignItems: "center",
            gap: "0.7rem", flex: 1, minWidth: 0,
          }}>
            <div style={{
              width: isMobile ? "36px" : "42px",
              height: isMobile ? "36px" : "42px",
              borderRadius: "50%",
              background: `rgba(${rgb},0.1)`,
              border: `1px solid rgba(${rgb},0.25)`,
              display: "flex", alignItems: "center",
              justifyContent: "center",
              fontSize: isMobile ? "1rem" : "1.2rem",
              flexShrink: 0,
            }}>
              {icon}
            </div>
            <h3 style={{
              fontFamily: "'Orbitron', monospace",
              fontSize: isMobile ? "0.8rem" : "0.9rem",
              fontWeight: 700,
              color: "#e8eaf0",
              letterSpacing: "0.04em",
              lineHeight: 1.3,
              margin: 0,
              wordBreak: "break-word",
            }}>
              {event.name}
            </h3>
          </div>

          {/* TAG */}
          <span style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: "0.52rem",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: event.color,
            background: `rgba(${rgb},0.1)`,
            border: `1px solid rgba(${rgb},0.2)`,
            padding: "0.25rem 0.5rem",
            clipPath: "polygon(4px 0%, 100% 0%, calc(100% - 4px) 100%, 0% 100%)",
            flexShrink: 0,
            whiteSpace: "nowrap",
            alignSelf: "flex-start",
          }}>
            {tag}
          </span>
        </div>

        {/* DESC */}
        <p style={{
          fontFamily: "'Space Mono', monospace",
          fontSize: isMobile ? "0.72rem" : "0.8rem",
          color: "rgba(232,234,240,0.55)",
          lineHeight: 1.75,
          margin: "0 0 1rem 0",
          flex: 1,
        }}>
          {desc}
        </p>

        {/* ACTION ROW — Register button + Arrow */}
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "0.8rem",
          marginBottom: "1.2rem",
        }}>
          {/* SMALL REGISTER BUTTON */}
          {event.registration_link ? (
            <a
              href={event.registration_link}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: "'Orbitron', monospace",
                fontSize: "0.55rem",
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                textDecoration: "none",
                color: "#03040a",
                background: event.color,
                padding: "0.45rem 1rem",
                clipPath: "polygon(6px 0%, 100% 0%, calc(100% - 6px) 100%, 0% 100%)",
                transition: "all 0.3s",
                boxShadow: `0 0 15px rgba(${rgb},0.3)`,
                display: "inline-block",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = `0 0 25px rgba(${rgb},0.5)`;
                e.currentTarget.style.transform = "translateY(-1px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = `0 0 15px rgba(${rgb},0.3)`;
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              Register →
            </a>
          ) : (
            <span style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: "0.55rem",
              color: "#7a7f99",
              letterSpacing: "0.1em",
              padding: "0.45rem 1rem",
              border: "1px solid rgba(255,255,255,0.06)",
              clipPath: "polygon(6px 0%, 100% 0%, calc(100% - 6px) 100%, 0% 100%)",
            }}>
              Link Soon
            </span>
          )}

          {/* ARROW BUTTON — Open Popup */}
          <button
            onClick={() => setShowPopup(true)}
            title="View full details"
            style={{
              background: `rgba(${rgb},0.08)`,
              border: `1px solid rgba(${rgb},0.2)`,
              color: event.color,
              fontFamily: "'Orbitron', monospace",
              fontSize: "0.65rem",
              fontWeight: 700,
              padding: "0.45rem 0.9rem",
              cursor: "pointer",
              clipPath: "polygon(6px 0%, 100% 0%, calc(100% - 6px) 100%, 0% 100%)",
              transition: "all 0.3s",
              display: "flex",
              alignItems: "center",
              gap: "0.3rem",
              letterSpacing: "0.08em",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = `rgba(${rgb},0.15)`;
              e.currentTarget.style.boxShadow = `0 0 15px rgba(${rgb},0.2)`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = `rgba(${rgb},0.08)`;
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            Details ↗
          </button>
        </div>

        {/* DIVIDER */}
        <div style={{
          height: "1px",
          background: `linear-gradient(90deg, rgba(${rgb},0.3), transparent)`,
          marginBottom: "1.2rem",
        }} />

        {/* EVENT HEADS */}
        <div>
          <p style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: "0.58rem",
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            color: "#7a7f99",
            margin: "0 0 0.7rem 0",
          }}>
            Event Head{heads.length > 1 ? "s" : ""}
          </p>

          {heads.length > 0 ? (
            <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
              {heads.map((head, i) => (
                <div key={i} style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "0.6rem",
                  padding: isMobile ? "0.5rem 0.6rem" : "0.6rem 0.8rem",
                  background: `rgba(${rgb},0.05)`,
                  border: `1px solid rgba(${rgb},0.1)`,
                  clipPath: "polygon(4px 0%, 100% 0%, calc(100% - 4px) 100%, 0% 100%)",
                  flexWrap: "wrap",
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <div style={{
                      width: "24px", height: "24px", borderRadius: "50%",
                      background: `rgba(${rgb},0.15)`,
                      border: `1px solid rgba(${rgb},0.3)`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontFamily: "'Orbitron', monospace",
                      fontSize: "0.5rem", fontWeight: 900,
                      color: event.color, flexShrink: 0,
                    }}>
                      {head.name?.charAt(0).toUpperCase()}
                    </div>
                    <span style={{
                      fontFamily: "'Orbitron', monospace",
                      fontSize: isMobile ? "0.65rem" : "0.72rem",
                      fontWeight: 700,
                      color: event.color,
                      letterSpacing: "0.05em",
                    }}>
                      {head.name}
                    </span>
                  </div>

                  <div style={{
                    fontFamily: "'Space Mono', monospace",
                    fontSize: isMobile ? "0.6rem" : "0.65rem",
                    color: head.phone ? "#e8eaf0" : "#7a7f99",
                    letterSpacing: "0.03em",
                    display: "flex", alignItems: "center", gap: "0.3rem",
                  }}>
                    <span style={{ fontSize: "0.6rem" }}>📞</span>
                    {head.phone ? (
                      <a
                        href={`tel:${head.phone}`}
                        style={{
                          color: "#e8eaf0", textDecoration: "none",
                          transition: "color 0.2s",
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = event.color)}
                        onMouseLeave={(e) => (e.currentTarget.style.color = "#e8eaf0")}
                      >
                        {head.phone}
                      </a>
                    ) : (
                      <span style={{ opacity: 0.4, fontSize: "0.6rem", letterSpacing: "0.15em" }}>
                        TBA
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div style={{
              padding: "0.6rem 0.8rem",
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.06)",
              clipPath: "polygon(4px 0%, 100% 0%, calc(100% - 4px) 100%, 0% 100%)",
              fontFamily: "'Space Mono', monospace",
              fontSize: "0.65rem", color: "#7a7f99",
              letterSpacing: "0.1em", opacity: 0.6,
            }}>
              — To be assigned
            </div>
          )}
        </div>
      </div>

      {/* POPUP */}
      {showPopup && (
        <DescriptionPopup
          event={event}
          onClose={() => setShowPopup(false)}
          isMobile={isMobile}
        />
      )}
    </>
  );
}

// ── Loading Skeleton ─────────────────────────────────────────────────────────
function LoadingSkeleton({ isMobile, isTablet }) {
  const cols = isMobile ? "1fr" : isTablet ? "1fr 1fr" : "repeat(3, 1fr)";
  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: cols,
      gap: isMobile ? "1rem" : "1.2rem",
    }}>
      {[...Array(6)].map((_, i) => (
        <div key={i} style={{
          height: isMobile ? "220px" : "280px",
          background: "rgba(255,255,255,0.02)",
          border: "1px solid rgba(0,245,196,0.08)",
          clipPath: "polygon(10px 0%, 100% 0%, calc(100% - 10px) 100%, 0% 100%)",
          padding: "1.8rem",
          position: "relative",
          overflow: "hidden",
        }}>
          <div style={{
            position: "absolute", top: 0, left: "-100%",
            width: "60%", height: "100%",
            background: "linear-gradient(90deg, transparent, rgba(0,245,196,0.03), transparent)",
            animation: "shimmer 1.5s infinite",
          }} />
        </div>
      ))}
      <style>{`
        @keyframes shimmer {
          0%   { left: -100%; }
          100% { left: 200%;  }
        }
      `}</style>
    </div>
  );
}

// ── Main Component ───────────────────────────────────────────────────────────
export default function Events() {
  const [activeTab,     setActiveTab]     = useState("tech");
  const [techEvents,    setTechEvents]    = useState([]);
  const [nonTechEvents, setNonTechEvents] = useState([]);
  const [loading,       setLoading]       = useState(true);
  const [error,         setError]         = useState(null);

  const width     = useWindowWidth();
  const isMobile  = width < 600;
  const isTablet  = width >= 600 && width < 1024;

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
        setError("Failed to load events. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  const events = activeTab === "tech" ? techEvents : nonTechEvents;
  const gridCols = isMobile ? "1fr" : isTablet ? "1fr 1fr" : "repeat(3, 1fr)";

  return (
    <section id="events" style={{ position: "relative", zIndex: 1 }}>
      <div style={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: isMobile
          ? "4rem 1rem 3rem"
          : isTablet
          ? "5rem 1.5rem 4rem"
          : "6rem 2rem",
      }}>

        {/* SECTION TAG */}
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
          Compete
        </p>

        {/* TITLE + COUNTS */}
        <div style={{
          display: "flex",
          alignItems: isMobile ? "flex-start" : "flex-end",
          flexDirection: isMobile ? "column" : "row",
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
            Our <span style={{ color: "#00f5c4" }}>Events</span>
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
                {techEvents.length}
              </span>{" "}Tech
            </span>
            <span>
              <span style={{
                fontFamily: "'Orbitron', monospace",
                color: "#7b5fff", fontWeight: 700,
                fontSize: isMobile ? "0.9rem" : "1rem",
              }}>
                {nonTechEvents.length}
              </span>{" "}Non-Tech
            </span>
          </div>
        </div>

        {/* TAB SWITCHER */}
        <div style={{
          display: "flex",
          marginBottom: "2.5rem",
          border: "1px solid rgba(0,245,196,0.15)",
          clipPath: "polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)",
          overflow: "hidden",
          width: isMobile ? "100%" : "fit-content",
        }}>
          {[
            { key: "tech",    label: isMobile ? "⚡ Tech"     : "⚡ Tech Events",     color: "#00f5c4", rgb: "0,245,196"   },
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
                  ? `rgba(${tab.rgb},0.15)`
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

        {/* ACTIVE TAB STATUS */}
        <div style={{
          display: "flex", alignItems: "center",
          gap: "1rem", marginBottom: "2rem",
        }}>
          <div style={{
            width: "8px", height: "8px", borderRadius: "50%",
            background: activeTab === "tech" ? "#00f5c4" : "#7b5fff",
            boxShadow: `0 0 12px ${activeTab === "tech" ? "#00f5c4" : "#7b5fff"}`,
            animation: "pulse 1.5s infinite",
            flexShrink: 0,
          }} />
          <span style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: "0.7rem", letterSpacing: "0.2em",
            textTransform: "uppercase", color: "#7a7f99",
          }}>
            {loading ? "Loading events..." : `${events.length} events listed`}
          </span>
        </div>

        {/* ERROR */}
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

        {/* EVENT GRID */}
        {loading ? (
          <LoadingSkeleton isMobile={isMobile} isTablet={isTablet} />
        ) : (
          <div key={activeTab} style={{
            display: "grid",
            gridTemplateColumns: gridCols,
            gap: isMobile ? "1rem" : "1.2rem",
          }}>
            {events.map((event, i) => (
              <EventCard
                key={event.id}
                event={event}
                index={i}
                isMobile={isMobile}
              />
            ))}
          </div>
        )}

        {/* REGISTER CTA */}
        <div style={{
          marginTop: isMobile ? "2.5rem" : "4rem",
          padding: isMobile ? "1.5rem 1.2rem" : isTablet ? "2rem 2rem" : "2.5rem 3rem",
          background: "rgba(0,245,196,0.03)",
          border: "1px solid rgba(0,245,196,0.15)",
          clipPath: "polygon(14px 0%, 100% 0%, calc(100% - 14px) 100%, 0% 100%)",
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          alignItems: isMobile ? "flex-start" : "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: isMobile ? "1.5rem" : "2rem",
          position: "relative",
          overflow: "hidden",
        }}>
          <div style={{
            position: "absolute", left: "-50px", top: "50%",
            transform: "translateY(-50%)",
            width: "300px", height: "150px",
            background: "radial-gradient(ellipse, rgba(0,245,196,0.06) 0%, transparent 70%)",
            pointerEvents: "none",
          }} />

          <div style={{ position: "relative", zIndex: 1 }}>
            <h3 style={{
              fontFamily: "'Orbitron', monospace",
              fontSize: isMobile ? "0.95rem" : "1.1rem",
              fontWeight: 900, color: "#e8eaf0",
              margin: "0 0 0.5rem 0",
            }}>
              Ready to <span style={{ color: "#00f5c4" }}>Compete?</span>
            </h3>
            <p style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: isMobile ? "0.7rem" : "0.75rem",
              color: "#7a7f99", lineHeight: 1.7, margin: 0,
            }}>
              Register for Sankalan 2026 events on Unstop.
              <br />
              Spots are limited — secure yours now.
            </p>
          </div>

          <a
            href="https://unstop.com/college-fests/sankalan-2026-department-of-computer-science-docs-university-of-delhi-du-458407/amp"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-block",
              fontFamily: "'Orbitron', monospace",
              clipPath: "polygon(12px 0%, 100% 0%, calc(100% - 12px) 100%, 0% 100%)",
              background: "#00f5c4",
              color: "#03040a",
              padding: isMobile ? "0.85rem 1.5rem" : "1rem 2.5rem",
              fontSize: isMobile ? "0.7rem" : "0.78rem",
              fontWeight: 900,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              textDecoration: "none",
              boxShadow: "0 0 30px rgba(0,245,196,0.3)",
              transition: "all 0.3s",
              position: "relative",
              zIndex: 1,
              flexShrink: 0,
              width: isMobile ? "100%" : "auto",
              textAlign: isMobile ? "center" : "left",
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

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.4; }
        }
      `}</style>
    </section>
  );
}