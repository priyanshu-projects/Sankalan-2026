import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

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

export default function Header() {
  const [open, setOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState(null);
  const [ctaHovered, setCtaHovered] = useState(false);
  const location = useLocation();
  const width = useWindowWidth();

  const isMobile = width < 768;
  const isTablet = width >= 768 && width < 1024;
  const isDesktop = width >= 1024;

  // close menu on route change
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: "HOME",     path: "/" },
    { name: "EVENTS",   path: "/events" },
    { name: "RESULTS",  path: "/results" },
    { name: "UPDATES",  path: "/updates" },
    { name: "SPONSORS", path: "/sponsors" },
    { name: "TEAM",     path: "/team" },
    { name: "FAQ",      path: "/faq" },
  ];

  const isActive = (path) => location.pathname === path;

  // ── padding based on screen ──
  const navPadding = isMobile
    ? "1rem 1.2rem"
    : isTablet
    ? "1.1rem 2rem"
    : "1.2rem 4rem";

  return (
    <>
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: navPadding,
          background: "rgba(3,4,10,0.85)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(0,245,196,0.15)",
        }}
      >
        {/* ── LOGO ── */}
        <Link
          to="/"
          style={{
            fontFamily: "'Orbitron', monospace",
            fontSize: isMobile ? "1.1rem" : isTablet ? "1.25rem" : "1.4rem",
            fontWeight: 900,
            color: "#00f5c4",
            letterSpacing: "0.08em",
            textDecoration: "none",
            textShadow: "0 0 20px rgba(0,245,196,0.5)",
            flexShrink: 0,
          }}
        >
          SANKALAN
        </Link>

        {/* ── DESKTOP + TABLET NAV LINKS ── */}
        {!isMobile && (
          <ul
            style={{
              display: "flex",
              gap: isTablet ? "1.2rem" : "2rem",
              listStyle: "none",
              margin: 0,
              padding: 0,
              alignItems: "center",
            }}
          >
            {navLinks.map((link, i) => (
              <li
                key={i}
                style={{ position: "relative", paddingBottom: "4px" }}
              >
                <Link
                  to={link.path}
                  style={{
                    fontFamily: "'Space Mono', monospace",
                    fontSize: isTablet ? "0.68rem" : "0.78rem",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color:
                      isActive(link.path) || hoveredLink === i
                        ? "#00f5c4"
                        : "#7a7f99",
                    textDecoration: "none",
                    transition: "color 0.2s",
                    display: "block",
                    whiteSpace: "nowrap",
                  }}
                  onMouseEnter={() => setHoveredLink(i)}
                  onMouseLeave={() => setHoveredLink(null)}
                >
                  {link.name}
                </Link>

                {/* active underline */}
                <span
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    height: "1px",
                    background: "#00f5c4",
                    transition: "width 0.3s ease",
                    width: isActive(link.path) ? "100%" : "0%",
                    pointerEvents: "none",
                  }}
                />
              </li>
            ))}
          </ul>
        )}

        {/* ── DESKTOP CTA ── */}
        {!isMobile && (
          <Link
            to="/events"
            style={{
              fontFamily: "'Orbitron', monospace",
              fontSize: isTablet ? "0.65rem" : "0.72rem",
              fontWeight: 700,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: ctaHovered ? "#03040a" : "#00f5c4",
              textDecoration: "none",
              border: "1.5px solid #00f5c4",
              padding: isTablet ? "0.45rem 1rem" : "0.55rem 1.5rem",
              clipPath:
                "polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)",
              transition: "all 0.3s",
              background: ctaHovered ? "#00f5c4" : "transparent",
              boxShadow: ctaHovered
                ? "0 0 40px rgba(0,245,196,0.18)"
                : "none",
              flexShrink: 0,
              whiteSpace: "nowrap",
            }}
            onMouseEnter={() => setCtaHovered(true)}
            onMouseLeave={() => setCtaHovered(false)}
          >
            REGISTER NOW
          </Link>
        )}

        {/* ── HAMBURGER (mobile only) ── */}
        {isMobile && (
          <button
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "0.5rem",
              display: "flex",
              flexDirection: "column",
              gap: "5px",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <span
              style={{
                display: "block",
                width: "24px",
                height: "1.5px",
                background: "#00f5c4",
                transition: "all 0.3s",
                transform: open
                  ? "rotate(45deg) translate(4.5px, 4.5px)"
                  : "none",
              }}
            />
            <span
              style={{
                display: "block",
                width: "24px",
                height: "1.5px",
                background: "#00f5c4",
                transition: "all 0.3s",
                opacity: open ? 0 : 1,
              }}
            />
            <span
              style={{
                display: "block",
                width: "24px",
                height: "1.5px",
                background: "#00f5c4",
                transition: "all 0.3s",
                transform: open
                  ? "rotate(-45deg) translate(4.5px, -4.5px)"
                  : "none",
              }}
            />
          </button>
        )}
      </nav>

      {/* ── MOBILE DROPDOWN MENU ── */}
      {isMobile && (
        <div
          style={{
            position: "fixed",
            top: "56px", // matches mobile nav height
            left: 0,
            right: 0,
            zIndex: 99,
            background: "rgba(3,4,10,0.97)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            borderBottom: "1px solid rgba(0,245,196,0.15)",
            maxHeight: open ? "520px" : "0px",
            opacity: open ? 1 : 0,
            overflow: "hidden",
            transition: "max-height 0.35s ease, opacity 0.3s ease",
            pointerEvents: open ? "auto" : "none",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              padding: "1.5rem 1.8rem",
              gap: "0",
            }}
          >
            {navLinks.map((link, i) => (
              <Link
                key={i}
                to={link.path}
                onClick={() => setOpen(false)}
                style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: "0.8rem",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: isActive(link.path) ? "#00f5c4" : "#7a7f99",
                  textDecoration: "none",
                  transition: "color 0.2s",
                  padding: "0.85rem 0",
                  borderBottom: "1px solid rgba(0,245,196,0.07)",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.6rem",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = "#00f5c4")
                }
                onMouseLeave={(e) => {
                  if (!isActive(link.path))
                    e.currentTarget.style.color = "#7a7f99";
                }}
              >
                <span
                  style={{
                    color: "#00f5c4",
                    fontSize: "0.9rem",
                    fontFamily: "'Space Mono', monospace",
                    opacity: isActive(link.path) ? 1 : 0.5,
                  }}
                >
                  ›
                </span>
                {link.name}

                {/* active dot */}
                {isActive(link.path) && (
                  <span
                    style={{
                      marginLeft: "auto",
                      width: "5px",
                      height: "5px",
                      borderRadius: "50%",
                      background: "#00f5c4",
                      boxShadow: "0 0 8px #00f5c4",
                      flexShrink: 0,
                    }}
                  />
                )}
              </Link>
            ))}

            {/* mobile CTA */}
            <Link
              to="/events"
              onClick={() => setOpen(false)}
              style={{
                fontFamily: "'Orbitron', monospace",
                fontSize: "0.72rem",
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "#03040a",
                textDecoration: "none",
                border: "1.5px solid #00f5c4",
                padding: "0.9rem",
                textAlign: "center",
                clipPath:
                  "polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)",
                marginTop: "1.2rem",
                display: "block",
                background: "#00f5c4",
                boxShadow: "0 0 30px rgba(0,245,196,0.2)",
              }}
            >
              REGISTER NOW
            </Link>
          </div>
        </div>
      )}
    </>
  );
}