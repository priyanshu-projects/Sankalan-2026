import { useState, useEffect, useRef } from "react";

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

// ── Initials Avatar ───────────────────────────────────────────────────────────
function InitialsAvatar({ name, color, rgb, size = 90 }) {
  const initials = name
    ? name.split(" ").slice(0, 2).map((w) => w[0].toUpperCase()).join("")
    : "?";

  return (
    <div style={{
      width: size, height: size, borderRadius: "50%",
      background: `radial-gradient(circle at 35% 35%, rgba(${rgb},0.22) 0%, rgba(${rgb},0.05) 100%)`,
      border: `1.5px solid rgba(${rgb},0.4)`,
      display: "flex", alignItems: "center", justifyContent: "center",
      fontFamily: "'Orbitron', monospace",
      fontSize: size * 0.27 + "px", fontWeight: 900,
      color: color, textShadow: `0 0 15px rgba(${rgb},0.6)`,
      flexShrink: 0, position: "relative",
    }}>
      <div style={{
        position: "absolute", inset: 5, borderRadius: "50%",
        border: `1px solid rgba(${rgb},0.12)`, pointerEvents: "none",
      }} />
      {initials}
    </div>
  );
}

// ── Avatar Frame ──────────────────────────────────────────────────────────────
function AvatarFrame({ member, size = 90 }) {
  const name  = member.name;
  const image = member.image_url || member.image;
  const color = member.color;
  const rgb   = member.rgb;

  if (image) {
    return (
      <div style={{
        width: size, height: size, borderRadius: "50%",
        border: `2px solid rgba(${rgb},0.45)`,
        overflow: "hidden", flexShrink: 0,
        boxShadow: `0 0 20px rgba(${rgb},0.25)`,
      }}>
        <img src={image} alt={name}
          style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      </div>
    );
  }

  if (name) {
    return (
      <div style={{ position: "relative", flexShrink: 0 }}>
        <InitialsAvatar name={name} color={color} rgb={rgb} size={size} />
        <div style={{
          position: "absolute", inset: -4, borderRadius: "50%",
          border: `1px dashed rgba(${rgb},0.18)`, pointerEvents: "none",
        }} />
      </div>
    );
  }

  return (
    <div style={{
      width: size, height: size, borderRadius: "50%",
      background: "rgba(255,255,255,0.015)",
      border: "1.5px dashed rgba(255,255,255,0.07)",
      display: "flex", alignItems: "center",
      justifyContent: "center", flexShrink: 0,
    }}>
      <span style={{ fontSize: size * 0.3 + "px", opacity: 0.18 }}>?</span>
    </div>
  );
}

// ── Social Links ──────────────────────────────────────────────────────────────
function SocialLinks({ linkedin, email, color, rgb }) {
  const baseStyle = {
    display: "inline-flex", alignItems: "center", justifyContent: "center",
    width: "32px", height: "32px",
    border: `1px solid rgba(${rgb},0.22)`,
    background: `rgba(${rgb},0.06)`,
    clipPath: "polygon(4px 0%,100% 0%,calc(100% - 4px) 100%,0% 100%)",
    textDecoration: "none", fontSize: "0.78rem",
    transition: "all 0.25s", color: "#7a7f99",
  };

  return (
    <div style={{ display: "flex", gap: "0.45rem", marginTop: "0.9rem" }}>
      <a
        href={linkedin || "#"}
        target="_blank" rel="noopener noreferrer" title="LinkedIn"
        style={baseStyle}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = color;
          e.currentTarget.style.color = color;
          e.currentTarget.style.background = `rgba(${rgb},0.15)`;
          e.currentTarget.style.boxShadow = `0 0 12px rgba(${rgb},0.3)`;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = `rgba(${rgb},0.22)`;
          e.currentTarget.style.color = "#7a7f99";
          e.currentTarget.style.background = `rgba(${rgb},0.06)`;
          e.currentTarget.style.boxShadow = "none";
        }}
      >
        <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853
            0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9
            1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337
            7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063
            2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225
            0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24
            1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24
            .774 23.2 0 22.222 0h.003z" />
        </svg>
      </a>

      <a
        href={email ? `mailto:${email}` : "mailto:sankalan@cs.du.ac.in"}
        title="Email" style={baseStyle}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = color;
          e.currentTarget.style.color = color;
          e.currentTarget.style.background = `rgba(${rgb},0.15)`;
          e.currentTarget.style.boxShadow = `0 0 12px rgba(${rgb},0.3)`;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = `rgba(${rgb},0.22)`;
          e.currentTarget.style.color = "#7a7f99";
          e.currentTarget.style.background = `rgba(${rgb},0.06)`;
          e.currentTarget.style.boxShadow = "none";
        }}
      >
        <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1
            0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
        </svg>
      </a>
    </div>
  );
}

// ── Detail Card ───────────────────────────────────────────────────────────────
function DetailCard({ member, isMobile }) {
  const { name, role, tag, color, rgb } = member;
  const isTBA = !name;

  return (
    <div style={{
      background: "rgba(255,255,255,0.02)",
      border: `1px solid rgba(${rgb},0.2)`,
      clipPath: "polygon(16px 0%,100% 0%,calc(100% - 16px) 100%,0% 100%)",
      padding: isMobile ? "1.8rem 1.2rem" : "2.8rem 2.5rem",
      position: "relative", overflow: "hidden",
      animation: "fadeInUp 0.45s ease both",
    }}>
      {/* Top accent */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0,
        height: "2px",
        background: `linear-gradient(90deg, ${color}, transparent)`,
      }} />

      {/* Corner TL */}
      <div style={{
        position: "absolute", top: 12, left: 12,
        width: 18, height: 18,
        borderTop: `1px solid rgba(${rgb},0.3)`,
        borderLeft: `1px solid rgba(${rgb},0.3)`,
        pointerEvents: "none",
      }} />

      {/* Corner BR */}
      <div style={{
        position: "absolute", bottom: 12, right: 12,
        width: 18, height: 18,
        borderBottom: `1px solid rgba(${rgb},0.3)`,
        borderRight: `1px solid rgba(${rgb},0.3)`,
        pointerEvents: "none",
      }} />

      {/* Ambient glow */}
      <div style={{
        position: "absolute", top: "40%", left: "50%",
        transform: "translate(-50%,-50%)",
        width: "280px", height: "200px",
        background: `radial-gradient(ellipse, rgba(${rgb},0.08) 0%, transparent 70%)`,
        pointerEvents: "none",
      }} />

      <div style={{
        position: "relative", zIndex: 1,
        display: "flex", flexDirection: "column",
        alignItems: "center", textAlign: "center",
      }}>
        {/* Avatar + spinning ring */}
        <div style={{ position: "relative", marginBottom: "1.5rem" }}>
          <AvatarFrame member={member} size={isMobile ? 90 : 120} />
          <div style={{
            position: "absolute", inset: -10, borderRadius: "50%",
            border: `1px solid rgba(${rgb},0.12)`,
            borderTopColor: color,
            animation: "spin 8s linear infinite",
            pointerEvents: "none",
          }} />
          <div style={{
            position: "absolute", inset: -18, borderRadius: "50%",
            border: `1px solid rgba(${rgb},0.06)`,
            pointerEvents: "none",
          }} />
        </div>

        {isTBA ? (
          <>
            <div style={{
              fontFamily: "'Orbitron', monospace", fontSize: "1rem",
              fontWeight: 900, color: "rgba(255,255,255,0.12)",
              letterSpacing: "0.3em", marginBottom: "0.5rem",
            }}>TBA</div>
            <div style={{
              fontFamily: "'Space Mono', monospace", fontSize: "0.65rem",
              color: "rgba(255,255,255,0.08)", letterSpacing: "0.15em",
            }}>To be announced</div>
          </>
        ) : (
          <>
            <h3 style={{
              fontFamily: "'Orbitron', monospace",
              fontSize: isMobile ? "0.95rem" : "1.15rem",
              fontWeight: 900, color: "#e8eaf0",
              letterSpacing: "0.04em",
              margin: "0 0 0.5rem 0",
              lineHeight: 1.2,
            }}>{name}</h3>

            <p style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: isMobile ? "0.6rem" : "0.68rem",
              color: color, letterSpacing: "0.15em",
              textTransform: "uppercase",
              margin: "0 0 0.6rem 0",
            }}>{role}</p>

            <span style={{
              fontFamily: "'Space Mono', monospace", fontSize: "0.55rem",
              letterSpacing: "0.15em", textTransform: "uppercase",
              color: "#7a7f99", background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
              padding: "0.25rem 0.8rem",
              clipPath: "polygon(4px 0%,100% 0%,calc(100% - 4px) 100%,0% 100%)",
            }}>{tag}</span>

            <SocialLinks
              linkedin={member.linkedin}
              email={member.email}
              color={color} rgb={rgb}
            />

            <div style={{
              width: "100%", height: "1px",
              background: `linear-gradient(90deg, transparent, rgba(${rgb},0.25), transparent)`,
              margin: "1.4rem 0 1rem",
            }} />

            <p style={{
              fontFamily: "'Space Mono', monospace", fontSize: "0.58rem",
              color: "rgba(232,234,240,0.25)",
              letterSpacing: "0.08em", lineHeight: 1.6, margin: 0,
            }}>
              Sankalan 2026 · DUCS<br />University of Delhi
            </p>
          </>
        )}
      </div>
    </div>
  );
}

// ── List Row ──────────────────────────────────────────────────────────────────
function ListRow({ member, isActive, onClick, index, isMobile }) {
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
      { threshold: 0.05 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const isTBA = !member.name;
  const { color, rgb } = member;

  return (
    <div
      ref={ref}
      onClick={() => !isTBA && onClick()}
      style={{
        opacity: 0,
        transform: "translateX(-20px)",
        transition: `opacity 0.45s ${Math.min(index, 12) * 0.05}s ease,
                     transform 0.45s ${Math.min(index, 12) * 0.05}s ease,
                     border-color 0.25s, background 0.25s`,
        padding: isTBA
          ? (isMobile ? "0.55rem 0.8rem" : "0.65rem 1.1rem")
          : (isMobile ? "0.75rem 0.9rem" : "0.9rem 1.2rem"),
        background: isActive
          ? `rgba(${rgb},0.1)`
          : isTBA ? "rgba(255,255,255,0.01)"
          : "rgba(255,255,255,0.025)",
        border: `1px solid ${
          isActive ? color
          : isTBA ? "rgba(255,255,255,0.05)"
          : `rgba(${rgb},0.12)`
        }`,
        clipPath: "polygon(8px 0%,100% 0%,calc(100% - 8px) 100%,0% 100%)",
        cursor: isTBA ? "default" : "pointer",
        display: "flex", alignItems: "center",
        gap: isMobile ? "0.7rem" : "1rem",
        position: "relative", overflow: "hidden",
      }}
      onMouseEnter={(e) => {
        if (!isActive && !isTBA) {
          e.currentTarget.style.borderColor = `rgba(${rgb},0.4)`;
          e.currentTarget.style.background = `rgba(${rgb},0.05)`;
        }
      }}
      onMouseLeave={(e) => {
        if (!isActive && !isTBA) {
          e.currentTarget.style.borderColor = `rgba(${rgb},0.12)`;
          e.currentTarget.style.background = "rgba(255,255,255,0.025)";
        }
      }}
    >
      {isActive && (
        <div style={{
          position: "absolute", left: 0, top: 0, bottom: 0,
          width: "3px",
          background: `linear-gradient(180deg, ${color}, transparent)`,
        }} />
      )}

      <AvatarFrame member={member} size={isTBA ? 28 : (isMobile ? 36 : 44)} />

      <div style={{ flex: 1, minWidth: 0 }}>
        {isTBA ? (
          <div style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: isMobile ? "0.55rem" : "0.6rem",
            color: "rgba(255,255,255,0.12)",
            letterSpacing: "0.2em", textTransform: "uppercase",
          }}>To be announced</div>
        ) : (
          <>
            <div style={{
              fontFamily: "'Orbitron', monospace",
              fontSize: isMobile ? "0.65rem" : "0.75rem",
              fontWeight: 700, color: isActive ? color : "#e8eaf0",
              letterSpacing: "0.04em",
              whiteSpace: "nowrap", overflow: "hidden",
              textOverflow: "ellipsis",
              transition: "color 0.25s",
            }}>{member.name}</div>
            <div style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: isMobile ? "0.52rem" : "0.58rem",
              color: "#7a7f99", marginTop: "0.18rem",
              letterSpacing: "0.05em",
              whiteSpace: "nowrap", overflow: "hidden",
              textOverflow: "ellipsis",
            }}>{member.role}</div>
          </>
        )}
      </div>

      {!isTBA && (
        <div style={{
          fontFamily: "'Space Mono', monospace", fontSize: "0.8rem",
          color: isActive ? color : "rgba(255,255,255,0.12)",
          transition: "color 0.25s", flexShrink: 0,
        }}>›</div>
      )}
    </div>
  );
}

// ── Mobile Member Row (single column, image on right) ─────────────────────────
function MobileMemberRow({ member, onClick, index }) {
  const ref = useRef();
  const isTBA = !member.name;
  const { color, rgb } = member;

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
          obs.unobserve(entry.target);
        }
      },
      { threshold: 0.05 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      onClick={() => !isTBA && onClick(member)}
      style={{
        opacity: 0,
        transform: "translateY(16px)",
        transition: `opacity 0.45s ${Math.min(index, 10) * 0.05}s ease,
                     transform 0.45s ${Math.min(index, 10) * 0.05}s ease,
                     border-color 0.25s, background 0.25s`,
        padding: "0.9rem 1rem",
        background: "rgba(255,255,255,0.025)",
        border: `1px solid rgba(${rgb},0.18)`,
        clipPath: "polygon(8px 0%,100% 0%,calc(100% - 8px) 100%,0% 100%)",
        cursor: isTBA ? "default" : "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "0.8rem",
        position: "relative",
        overflow: "hidden",
      }}
      onMouseEnter={(e) => {
        if (!isTBA) {
          e.currentTarget.style.borderColor = color;
          e.currentTarget.style.background = `rgba(${rgb},0.07)`;
        }
      }}
      onMouseLeave={(e) => {
        if (!isTBA) {
          e.currentTarget.style.borderColor = `rgba(${rgb},0.18)`;
          e.currentTarget.style.background = "rgba(255,255,255,0.025)";
        }
      }}
    >
      {/* top accent line */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0,
        height: "1.5px",
        background: `linear-gradient(90deg, ${color}, transparent)`,
      }} />

      {/* LEFT: name + role + tag */}
      <div style={{ flex: 1, minWidth: 0 }}>
        {isTBA ? (
          <div style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: "0.6rem",
            color: "rgba(255,255,255,0.12)",
            letterSpacing: "0.2em",
          }}>To be announced</div>
        ) : (
          <>
            <div style={{
              fontFamily: "'Orbitron', monospace",
              fontSize: "0.72rem",
              fontWeight: 700,
              color: "#e8eaf0",
              letterSpacing: "0.03em",
              marginBottom: "0.25rem",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}>{member.name}</div>

            <div style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: "0.58rem",
              color: color,
              letterSpacing: "0.06em",
              marginBottom: "0.3rem",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}>{member.role}</div>

            {member.tag && (
              <span style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: "0.48rem",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "#7a7f99",
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.07)",
                padding: "0.18rem 0.5rem",
                clipPath: "polygon(3px 0%,100% 0%,calc(100% - 3px) 100%,0% 100%)",
                display: "inline-block",
              }}>{member.tag}</span>
            )}
          </>
        )}
      </div>

      {/* RIGHT: large avatar */}
      <div style={{ flexShrink: 0, position: "relative" }}>
        <AvatarFrame member={member} size={isTBA ? 36 : 64} />
        {!isTBA && (
          <div style={{
            position: "absolute", inset: -4, borderRadius: "50%",
            border: `1px solid rgba(${rgb},0.2)`,
            borderTopColor: color,
            animation: "spin 8s linear infinite",
            pointerEvents: "none",
          }} />
        )}
      </div>

      {/* tap hint */}
      {!isTBA && (
        <div style={{
          position: "absolute", bottom: "0.4rem", right: "0.8rem",
          fontFamily: "'Space Mono', monospace",
          fontSize: "0.55rem",
          color: `rgba(${rgb}, 0.4)`,
        }}>tap ›</div>
      )}
    </div>
  );
}

// ── Mobile Bottom Sheet ───────────────────────────────────────────────────────
function MobileSheet({ member, onClose }) {
  if (!member) return null;

  return (
    <>
      {/* overlay */}
      <div
        onClick={onClose}
        style={{
          position: "fixed", inset: 0,
          background: "rgba(3,4,10,0.8)",
          backdropFilter: "blur(4px)",
          WebkitBackdropFilter: "blur(4px)",
          zIndex: 200,
        }}
      />

      {/* sheet */}
      <div style={{
        position: "fixed",
        bottom: 0, left: 0, right: 0,
        zIndex: 201,
        maxHeight: "80vh",
        overflowY: "auto",
        background: "#0a0c14",
        borderTop: `1px solid rgba(${member.rgb},0.3)`,
        borderRadius: "16px 16px 0 0",
        padding: "1.5rem 1.2rem 2rem",
        animation: "slideUp 0.3s ease",
      }}>
        {/* drag handle */}
        <div style={{
          width: "40px", height: "3px",
          background: "rgba(255,255,255,0.15)",
          borderRadius: "2px",
          margin: "0 auto 1.5rem",
        }} />

        {/* close btn */}
        <button
          onClick={onClose}
          style={{
            position: "absolute", top: "1rem", right: "1rem",
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.1)",
            color: "#7a7f99", cursor: "pointer",
            width: "28px", height: "28px",
            borderRadius: "50%", fontSize: "0.75rem",
            display: "flex", alignItems: "center",
            justifyContent: "center",
          }}
        >✕</button>

        <DetailCard member={member} isMobile={true} />
      </div>
    </>
  );
}

// ── Split Panel ───────────────────────────────────────────────────────────────
function SplitPanel({ members, accentColor, accentRgb, loading, isMobile, isTablet }) {
  const [selected,    setSelected]    = useState(null);
  const [sheetMember, setSheetMember] = useState(null);

  useEffect(() => {
    if (members.length > 0) {
      setSelected(members.find((m) => m.name) || members[0]);
    }
  }, [members]);

  if (loading) {
    return (
      <div style={{
        display: "grid",
        gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
        gap: "2rem",
      }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          {[...Array(5)].map((_, i) => (
            <div key={i} style={{
              height: isMobile ? "72px" : "60px",
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(0,245,196,0.06)",
              clipPath: "polygon(8px 0%,100% 0%,calc(100% - 8px) 100%,0% 100%)",
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
        {!isMobile && (
          <div style={{
            height: "350px",
            background: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(0,245,196,0.06)",
            clipPath: "polygon(16px 0%,100% 0%,calc(100% - 16px) 100%,0% 100%)",
          }} />
        )}
      </div>
    );
  }

  // ── MOBILE: single-column list, large avatar on right, bottom sheet on tap ──
  if (isMobile) {
    return (
      <>
        <div style={{
          display: "flex",
          flexDirection: "column",
          gap: "0.6rem",
        }}>
          {members.map((member, i) => (
            <MobileMemberRow
              key={member.id}
              member={member}
              index={i}
              onClick={(m) => setSheetMember(m)}
            />
          ))}
        </div>

        <MobileSheet
          member={sheetMember}
          onClose={() => setSheetMember(null)}
        />
      </>
    );
  }

  // ── TABLET / DESKTOP: split panel ──
  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: isTablet ? "220px 1fr" : "1fr 1fr",
      gap: isTablet ? "1.5rem" : "2rem",
      alignItems: "start",
    }}>
      {/* Left list */}
      <div>
        <div style={{
          fontFamily: "'Space Mono', monospace", fontSize: "0.58rem",
          letterSpacing: "0.28em", textTransform: "uppercase",
          color: "#7a7f99", marginBottom: "1rem",
          display: "flex", alignItems: "center", gap: "0.8rem",
        }}>
          <span style={{ whiteSpace: "nowrap" }}>Select member</span>
          <div style={{
            flex: 1, height: "1px",
            background: `linear-gradient(90deg, rgba(${accentRgb},0.2), transparent)`,
          }} />
        </div>

        <div style={{
          display: "flex", flexDirection: "column", gap: "0.5rem",
          maxHeight: "70vh", overflowY: "auto", paddingRight: "4px",
        }}>
          {members.map((member, i) => (
            <ListRow
              key={member.id}
              member={member}
              isActive={selected?.id === member.id}
              onClick={() => setSelected(member)}
              index={i}
              isMobile={false}
            />
          ))}
        </div>
      </div>

      {/* Right detail */}
      <div style={{ position: "sticky", top: "6rem" }}>
        <div style={{
          height: "2px",
          background: `linear-gradient(90deg, ${accentColor}, rgba(${accentRgb},0.1))`,
          marginBottom: "1.5rem",
        }} />
        {selected && <DetailCard key={selected.id} member={selected} isMobile={false} />}
      </div>
    </div>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────
export default function Team() {
  const [activeTab,  setActiveTab]  = useState("admin");
  const [adminPanel, setAdminPanel] = useState([]);
  const [eventHeads, setEventHeads] = useState([]);
  const [loading,    setLoading]    = useState(true);
  const [error,      setError]      = useState(null);
  const headerRef = useRef();

  const width    = useWindowWidth();
  const isMobile = width < 600;
  const isTablet = width >= 600 && width < 1024;

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        setLoading(true);
        setError(null);
        const [adminRes, eventsRes] = await Promise.all([
          fetch(`${API}/team/admin`),
          fetch(`${API}/team/events`),
        ]);
        if (!adminRes.ok || !eventsRes.ok) throw new Error("Failed to fetch team");
        const adminData  = await adminRes.json();
        const eventsData = await eventsRes.json();

        const withColors = (arr, color, rgb) =>
          arr.map((m) => ({ ...m, color, rgb }));

        setAdminPanel(withColors(adminData.data,  "#00f5c4", "0,245,196"));
        setEventHeads(withColors(eventsData.data, "#7b5fff", "123,95,255"));
      } catch (err) {
        console.error("Fetch error:", err);
        setError("Failed to load team. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchTeam();
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

  return (
    <section id="team" style={{ position: "relative", zIndex: 1 }}>
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
            The People Behind It
          </p>

          <div style={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            alignItems: isMobile ? "flex-start" : "flex-end",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: isMobile ? "1rem" : "1.5rem",
          }}>
            <h2 style={{
              fontFamily: "'Orbitron', monospace",
              fontSize: "clamp(1.8rem, 5vw, 3.5rem)",
              fontWeight: 900, lineHeight: 1.1,
              color: "#e8eaf0", margin: 0,
            }}>
              Meet the <span style={{ color: "#00f5c4" }}>Team</span>
            </h2>
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

        {/* ── TAB SWITCHER ── */}
        <div style={{
          display: "flex",
          marginBottom: isMobile ? "2rem" : "3rem",
          border: "1px solid rgba(0,245,196,0.15)",
          clipPath: "polygon(8px 0%,100% 0%,calc(100% - 8px) 100%,0% 100%)",
          overflow: "hidden",
          width: isMobile ? "100%" : "fit-content",
        }}>
          {[
            { key: "admin",  label: isMobile ? "🏛️ Admin" : "🏛️ Administrative & DUCSS", color: "#00f5c4", rgb: "0,245,196"   },
            { key: "events", label: isMobile ? "⚡ Heads"  : "⚡ Event Heads",              color: "#7b5fff", rgb: "123,95,255" },
          ].map((tab, i) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              style={{
                fontFamily: "'Orbitron', monospace",
                fontSize: isMobile ? "0.58rem" : "0.68rem",
                fontWeight: 700,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                padding: isMobile ? "0.8rem 1rem" : "0.9rem 1.8rem",
                border: "none",
                flex: isMobile ? 1 : "none",
                cursor: "pointer",
                transition: "all 0.3s",
                background: activeTab === tab.key
                  ? `rgba(${tab.rgb},0.12)`
                  : "transparent",
                color: activeTab === tab.key ? tab.color : "#7a7f99",
                borderRight: i === 0
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

        {/* ── PANELS ── */}
        {activeTab === "admin" && (
          <SplitPanel
            members={adminPanel}
            accentColor="#00f5c4"
            accentRgb="0,245,196"
            loading={loading}
            isMobile={isMobile}
            isTablet={isTablet}
          />
        )}
        {activeTab === "events" && (
          <SplitPanel
            members={eventHeads}
            accentColor="#7b5fff"
            accentRgb="123,95,255"
            loading={loading}
            isMobile={isMobile}
            isTablet={isTablet}
          />
        )}
      </div>

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes shimmer {
          0%   { left: -100%; }
          100% { left: 200%;  }
        }
        @keyframes slideUp {
          from { transform: translateY(100%); }
          to   { transform: translateY(0); }
        }
        #team ::-webkit-scrollbar { width: 3px; }
        #team ::-webkit-scrollbar-track { background: transparent; }
        #team ::-webkit-scrollbar-thumb {
          background: rgba(0,245,196,0.2);
          border-radius: 2px;
        }
      `}</style>
    </section>
  );
}