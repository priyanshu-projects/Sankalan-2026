import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Header() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: "HOME", path: "/" },
    { name: "EVENTS", path: "/events" },
    { name: "RESULTS", path: "/results" },
    { name: "UPDATES", path: "/updates" },
    { name: "SPONSORS", path: "/sponsors" },
    { name: "TEAM", path: "/team" },
    { name: "FAQ", path: "/faq" },
  ];

  const isActive = (path) => location.pathname === path;

  return (
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
        padding: "1.2rem 4rem",
        background: "rgba(3,4,10,0.7)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(0,245,196,0.15)",
      }}
    >
      {/* LOGO */}
      <Link
        to="/"
        style={{
          fontFamily: "'Orbitron', monospace",
          fontSize: "1.4rem",
          fontWeight: 900,
          color: "#00f5c4",
          letterSpacing: "0.08em",
          textDecoration: "none",
          textShadow: "0 0 20px rgba(0,245,196,0.5)",
        }}
      >
        SANKALAN
      </Link>

      {/* DESKTOP LINKS */}
      <ul
        style={{
          display: "flex",
          gap: "2rem",
          listStyle: "none",
          margin: 0,
          padding: 0,
        }}
        className="hidden md:flex"
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
                fontSize: "0.78rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: isActive(link.path) ? "#00f5c4" : "#7a7f99",
                textDecoration: "none",
                transition: "color 0.2s",
                display: "block",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#00f5c4")}
              onMouseLeave={(e) => {
                if (!isActive(link.path))
                  e.currentTarget.style.color = "#7a7f99";
              }}
            >
              {link.name}
            </Link>

            {/* UNDERLINE — now below text, not overlapping */}
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
              className="nav-underline"
            />
          </li>
        ))}
      </ul>

      {/* CTA */}
      <Link
        to="/events"
        style={{
          fontFamily: "'Orbitron', monospace",
          fontSize: "0.72rem",
          fontWeight: 700,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: "#00f5c4",
          textDecoration: "none",
          border: "1.5px solid #00f5c4",
          padding: "0.55rem 1.5rem",
          clipPath: "polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)",
          transition: "all 0.3s",
          background: "transparent",
        }}
        className="hidden md:block"
        onMouseEnter={(e) => {
          e.currentTarget.style.background = "#00f5c4";
          e.currentTarget.style.color = "#03040a";
          e.currentTarget.style.boxShadow = "0 0 40px rgba(0,245,196,0.18)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "transparent";
          e.currentTarget.style.color = "#00f5c4";
          e.currentTarget.style.boxShadow = "none";
        }}
      >
        REGISTER NOW
      </Link>

      {/* HAMBURGER */}
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
        }}
        className="md:hidden"
      >
        <span style={{
          display: "block", width: "24px", height: "1.5px",
          background: "#00f5c4", transition: "all 0.3s",
          transform: open ? "rotate(45deg) translate(4px, 4px)" : "none",
        }} />
        <span style={{
          display: "block", width: "24px", height: "1.5px",
          background: "#00f5c4", transition: "all 0.3s",
          opacity: open ? 0 : 1,
        }} />
        <span style={{
          display: "block", width: "24px", height: "1.5px",
          background: "#00f5c4", transition: "all 0.3s",
          transform: open ? "rotate(-45deg) translate(4px, -4px)" : "none",
        }} />
      </button>

      {/* MOBILE MENU */}
      <div
        style={{
          position: "absolute",
          top: "100%",
          left: 0,
          width: "100%",
          background: "#03040a",
          borderBottom: "1px solid rgba(0,245,196,0.15)",
          flexDirection: "column",
          gap: "1.2rem",
          padding: open ? "1.5rem 2rem" : "0 2rem",
          maxHeight: open ? "500px" : "0",
          opacity: open ? 1 : 0,
          overflow: "hidden",
          transition: "all 0.3s ease",
          zIndex: 99,
        }}
        className="md:hidden flex"
      >
        {navLinks.map((link, i) => (
          <Link
            key={i}
            to={link.path}
            onClick={() => setOpen(false)}
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: "0.78rem",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: isActive(link.path) ? "#00f5c4" : "#7a7f99",
              textDecoration: "none",
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#00f5c4")}
            onMouseLeave={(e) => {
              if (!isActive(link.path))
                e.currentTarget.style.color = "#7a7f99";
            }}
          >
            <span style={{ color: "#00f5c4", marginRight: "0.5rem" }}>›</span>
            {link.name}
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
            color: "#00f5c4",
            textDecoration: "none",
            border: "1.5px solid #00f5c4",
            padding: "0.8rem",
            textAlign: "center",
            clipPath: "polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)",
            marginTop: "0.5rem",
            display: "block",
          }}
        >
          REGISTER NOW
        </Link>
      </div>
    </nav>
  );
}