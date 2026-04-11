import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer
      style={{
        position: "relative",
        zIndex: 1,
        borderTop: "1px solid rgba(0,245,196,0.15)",
        background: "rgba(3,4,10,0.9)",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "4rem 2rem",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "2.5rem",
        }}
      >
        {/* LOGO + ABOUT */}
        <div>
          <h2
            style={{
              fontFamily: "'Orbitron', monospace",
              fontSize: "1.1rem",
              fontWeight: 900,
              color: "#00f5c4",
              letterSpacing: "0.08em",
              textShadow: "0 0 20px rgba(0,245,196,0.5)",
              marginBottom: "1rem",
            }}
          >
            SANKALAN 2025
          </h2>
          <p
            style={{
              fontSize: "0.88rem",
              color: "#7a7f99",
              lineHeight: 1.8,
              maxWidth: "280px",
            }}
          >
            Sankalan is the annual tech fest of the Department of Computer
            Science Society celebrating innovation, technology and creativity.
          </p>
        </div>

        {/* QUICK LINKS */}
        <div>
          <h3
            style={{
              fontFamily: "'Orbitron', monospace",
              fontSize: "0.78rem",
              fontWeight: 700,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#e8eaf0",
              marginBottom: "1.2rem",
            }}
          >
            Quick Links
          </h3>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0.8rem",
            }}
          >
            {[
              { name: "Home",     path: "/"        },
              { name: "Events",   path: "/events"  },
              { name: "Results",  path: "/results" },
              { name: "Updates",  path: "/updates" },
              { name: "Sponsors", path: "/sponsors"},
              { name: "Team",     path: "/team"    },
              { name: "FAQ",      path: "/faq"     },
            ].map((link, i) => (
              <Link
                key={i}
                to={link.path}
                style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: "0.78rem",
                  color: "#7a7f99",
                  textDecoration: "none",
                  letterSpacing: "0.05em",
                  transition: "color 0.2s",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = "#00f5c4")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "#7a7f99")
                }
              >
                <span style={{ color: "#00f5c4", fontSize: "0.7rem" }}>
                  ›
                </span>
                {link.name}
              </Link>
            ))}
          </div>
        </div>

        {/* ADDRESS ONLY — no social icons */}
        <div>
          <h3
            style={{
              fontFamily: "'Orbitron', monospace",
              fontSize: "0.78rem",
              fontWeight: 700,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#e8eaf0",
              marginBottom: "1.2rem",
            }}
          >
            Find Us
          </h3>
          <p
            style={{
              fontSize: "0.88rem",
              color: "#7a7f99",
              lineHeight: 1.9,
            }}
          >
            Department of Computer Science Society
            <br />
            University of Delhi
            <br />
            Delhi — 110007
          </p>
          <a
            href="mailto:sankalan@cs.du.ac.in"
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: "0.78rem",
              color: "#00f5c4",
              textDecoration: "none",
              display: "block",
              marginTop: "0.8rem",
              transition: "opacity 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.7")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            sankalan@cs.du.ac.in
          </a>
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div
        style={{
          borderTop: "1px solid rgba(0,245,196,0.1)",
          padding: "1.5rem 2rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "1rem",
        }}
      >
        <p
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: "0.78rem",
            color: "#7a7f99",
          }}
        >
          © 2025 Sankalan — Department of Computer Science Society
        </p>

        <div style={{ display: "flex", gap: "1.5rem" }}>
          {["Privacy", "Code of Conduct"].map((item, i) => (
            <a
              key={i}
              href="#"
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: "0.78rem",
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
              {item}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}