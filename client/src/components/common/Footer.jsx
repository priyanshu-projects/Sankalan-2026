import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

// ─── custom hook ───────────────────────────────────────────────
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
// ───────────────────────────────────────────────────────────────

export default function Footer() {
  const width = useWindowWidth();
  const isMobile = width < 600;
  const isTablet = width >= 600 && width < 1024;

  const navLinks = [
    { name: "Home",     path: "/"         },
    { name: "Events",   path: "/events"   },
    { name: "Updates",  path: "/updates"  },
    { name: "Sponsors", path: "/sponsors" },
    { name: "Team",     path: "/team"     },
    { name: "FAQ",      path: "/faq"      },
  ];

  return (
    <footer
      style={{
        position: "relative",
        zIndex: 1,
        borderTop: "1px solid rgba(0,245,196,0.15)",
        background: "rgba(3,4,10,0.97)",
      }}
    >
      {/* ── TOP ACCENT LINE ── */}
      <div
        style={{
          height: "2px",
          background:
            "linear-gradient(90deg, transparent, #00f5c4, #7b5fff, transparent)",
          width: "100%",
        }}
      />

      {/* ── MAIN GRID ── */}
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: isMobile
            ? "2.5rem 1.2rem"
            : isTablet
            ? "3rem 2rem"
            : "4rem 2rem",
          display: "grid",
          gridTemplateColumns: isMobile
            ? "1fr"
            : isTablet
            ? "1fr 1fr"
            : "1.6fr 1fr 1.2fr",
          gap: isMobile ? "2.2rem" : isTablet ? "2rem" : "2.5rem",
        }}
      >
        {/* ── LOGO + ABOUT ── */}
        <div>
          <h2
            style={{
              fontFamily: "'Orbitron', monospace",
              fontSize: isMobile ? "1rem" : "1.1rem",
              fontWeight: 900,
              color: "#00f5c4",
              letterSpacing: "0.08em",
              textShadow: "0 0 20px rgba(0,245,196,0.5)",
              marginBottom: "1rem",
              margin: "0 0 1rem 0",
            }}
          >
            SANKALAN 2026
          </h2>
          <p
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: isMobile ? "0.8rem" : "0.88rem",
              color: "#7a7f99",
              lineHeight: 1.9,
              maxWidth: isMobile ? "100%" : "300px",
              margin: 0,
            }}
          >
            Sankalan is the annual tech fest of the Department of Computer
            Science Society, celebrating innovation, technology and creativity.
          </p>

          {/* Instagram badge */}
          <a
            href="https://instagram.com/ducs.sankalan"
            target="_blank"
            rel="noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              marginTop: "1.2rem",
              fontFamily: "'Space Mono', monospace",
              fontSize: "0.75rem",
              color: "#7b5fff",
              textDecoration: "none",
              border: "1px solid rgba(123,95,255,0.3)",
              padding: "0.4rem 0.9rem",
              clipPath:
                "polygon(6px 0%, 100% 0%, calc(100% - 6px) 100%, 0% 100%)",
              transition: "all 0.2s",
              background: "rgba(123,95,255,0.07)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(123,95,255,0.18)";
              e.currentTarget.style.color = "#a78bfa";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(123,95,255,0.07)";
              e.currentTarget.style.color = "#7b5fff";
            }}
          >
            <span style={{ fontSize: "0.85rem" }}>◈</span>
            @ducs.sankalan
          </a>
        </div>

        {/* ── QUICK LINKS ── */}
        <div>
          <h3
            style={{
              fontFamily: "'Orbitron', monospace",
              fontSize: "0.72rem",
              fontWeight: 700,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#e8eaf0",
              marginBottom: "1.2rem",
              margin: "0 0 1.2rem 0",
            }}
          >
            Quick Links
          </h3>
          <div
            style={{
              display: "grid",
              // on mobile show 2 columns for links to save space
              gridTemplateColumns: isMobile ? "1fr 1fr" : "1fr",
              gap: isMobile ? "0.7rem 1rem" : "0.85rem",
            }}
          >
            {navLinks.map((link, i) => (
              <FooterLink key={i} to={link.path} name={link.name} />
            ))}
          </div>
        </div>

        {/* ── FIND US ── */}
        <div
          style={{
            // on tablet span full width in second row
            gridColumn: isTablet ? "1 / -1" : "auto",
          }}
        >
          <h3
            style={{
              fontFamily: "'Orbitron', monospace",
              fontSize: "0.72rem",
              fontWeight: 700,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#e8eaf0",
              marginBottom: "1.2rem",
              margin: "0 0 1.2rem 0",
            }}
          >
            Find Us
          </h3>

          {/* address block */}
          <div
            style={{
              borderLeft: "2px solid rgba(0,245,196,0.2)",
              paddingLeft: "1rem",
            }}
          >
            <p
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: isMobile ? "0.78rem" : "0.85rem",
                color: "#7a7f99",
                lineHeight: 2,
                margin: 0,
              }}
            >
              Department of Computer Science Society
              <br />
              University of Delhi
              <br />
              Delhi — 110007
            </p>
          </div>

          {/* event dates badge */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              marginTop: "1rem",
              background: "rgba(0,245,196,0.06)",
              border: "1px solid rgba(0,245,196,0.2)",
              padding: "0.4rem 0.9rem",
              clipPath:
                "polygon(6px 0%, 100% 0%, calc(100% - 6px) 100%, 0% 100%)",
            }}
          >
            <span
              style={{
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                background: "#00f5c4",
                boxShadow: "0 0 8px #00f5c4",
                flexShrink: 0,
              }}
            />
            <span
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: "0.7rem",
                color: "#00f5c4",
                letterSpacing: "0.05em",
              }}
            >
              24–25 APRIL 2026
            </span>
          </div>
        </div>
      </div>

      {/* ── BOTTOM BAR ── */}
      <div
        style={{
          borderTop: "1px solid rgba(0,245,196,0.1)",
          padding: isMobile ? "1.2rem 1.2rem" : "1.5rem 2rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "0.8rem",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        <p
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: isMobile ? "0.68rem" : "0.75rem",
            color: "#7a7f99",
            margin: 0,
            lineHeight: 1.6,
          }}
        >
          © 2026 Sankalan — Delhi University Computer Science Society
        </p>

        <div
          style={{
            display: "flex",
            gap: isMobile ? "1rem" : "1.5rem",
            flexWrap: "wrap",
          }}
        >
          <Link
            to="/privacy-policy"
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: isMobile ? "0.68rem" : "0.75rem",
              color: "#7a7f99",
              textDecoration: "none",
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.color = "#00f5c4")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = "#7a7f99")
            }
          >
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  );
}

// ─── reusable footer link ──────────────────────────────────────
function FooterLink({ to, name }) {
  const [hovered, setHovered] = useState(false);
  return (
    <Link
      to={to}
      style={{
        fontFamily: "'Space Mono', monospace",
        fontSize: "0.78rem",
        color: hovered ? "#00f5c4" : "#7a7f99",
        textDecoration: "none",
        letterSpacing: "0.05em",
        transition: "color 0.2s",
        display: "flex",
        alignItems: "center",
        gap: "0.4rem",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <span
        style={{
          color: "#00f5c4",
          fontSize: "0.7rem",
          opacity: hovered ? 1 : 0.5,
          transition: "opacity 0.2s",
        }}
      >
        ›
      </span>
      {name}
    </Link>
  );
}