// Place your images in src/assets/gallery/
// Name them: g1.jpg, g2.jpg, g3.jpg ... g8.jpg
// Replace imports below once you add your images

import { useState } from "react";

// ── swap these for your real imports ──────────────────────────────
// import g1 from "../../../assets/gallery/g1.jpg";
// import g2 from "../../../assets/gallery/g2.jpg";
// ... etc

// Placeholder colours until real images are added
const placeholders = [
  { id: 1,  label: "Hackathon — War Room",         span: "col",  src: null, accent: "#00f5c4" },
  { id: 2,  label: "Opening Ceremony",              span: "row",  src: null, accent: "#7b5fff" },
  { id: 3,  label: "Coding Contest",                span: "",     src: null, accent: "#00f5c4" },
  { id: 4,  label: "Workshop Session",              span: "",     src: null, accent: "#7b5fff" },
  { id: 5,  label: "Prize Distribution",            span: "col",  src: null, accent: "#00f5c4" },
  { id: 6,  label: "Paper Presentation",            span: "",     src: null, accent: "#7b5fff" },
  { id: 7,  label: "UI/UX Challenge",               span: "",     src: null, accent: "#00f5c4" },
  { id: 8,  label: "Team Celebration",              span: "row",  src: null, accent: "#7b5fff" },
];

export default function Gallery() {
  const [lightbox, setLightbox] = useState(null);

  return (
    <section
      id="gallery"
      style={{ position: "relative", zIndex: 1 }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "6rem 2rem",
        }}
      >
        {/* SECTION TAG */}
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
          Memories
        </p>

        {/* TITLE */}
        <h2
          style={{
            fontFamily: "'Orbitron', monospace",
            fontSize: "clamp(2rem, 5vw, 3.5rem)",
            fontWeight: 900,
            lineHeight: 1.1,
            marginBottom: "1rem",
            color: "#e8eaf0",
          }}
        >
          Gallery{" "}
          <span style={{ color: "#00f5c4" }}>Showcase</span>
        </h2>

        <p
          style={{
            fontSize: "1rem",
            color: "rgba(232,234,240,0.6)",
            maxWidth: "500px",
            lineHeight: 1.8,
            marginBottom: "3rem",
          }}
        >
          Snapshots from Sankalan 2024 — the moments that defined the fest.
        </p>

        {/* MASONRY GRID */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gridAutoRows: "200px",
            gap: "1rem",
          }}
        >
          {placeholders.map((item) => (
            <div
              key={item.id}
              onClick={() => setLightbox(item)}
              style={{
                gridColumn: item.span === "col" ? "span 2" : "span 1",
                gridRow: item.span === "row" ? "span 2" : "span 1",
                position: "relative",
                overflow: "hidden",
                cursor: "pointer",
                border: `1px solid rgba(${
                  item.accent === "#00f5c4" ? "0,245,196" : "123,95,255"
                },0.15)`,
                clipPath:
                  "polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)",
                background: `rgba(${
                  item.accent === "#00f5c4" ? "0,245,196" : "123,95,255"
                },0.04)`,
                transition: "all 0.3s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = item.accent;
                e.currentTarget.style.boxShadow = `0 0 40px rgba(${
                  item.accent === "#00f5c4" ? "0,245,196" : "123,95,255"
                },0.2)`;
                const img = e.currentTarget.querySelector("img");
                const overlay = e.currentTarget.querySelector(".g-overlay");
                if (img) img.style.transform = "scale(1.06)";
                if (overlay) overlay.style.opacity = "1";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = `rgba(${
                  item.accent === "#00f5c4" ? "0,245,196" : "123,95,255"
                },0.15)`;
                e.currentTarget.style.boxShadow = "none";
                const img = e.currentTarget.querySelector("img");
                const overlay = e.currentTarget.querySelector(".g-overlay");
                if (img) img.style.transform = "scale(1)";
                if (overlay) overlay.style.opacity = "0";
              }}
            >
              {/* IMAGE — replace src={item.src} with your import */}
              {item.src ? (
                <img
                  src={item.src}
                  alt={item.label}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                    transition: "transform 0.5s ease",
                  }}
                />
              ) : (
                /* PLACEHOLDER until real image added */
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "0.5rem",
                  }}
                >
                  <div
                    style={{
                      fontFamily: "'Orbitron', monospace",
                      fontSize: "0.6rem",
                      letterSpacing: "0.2em",
                      color: item.accent,
                      opacity: 0.5,
                      textTransform: "uppercase",
                    }}
                  >
                    [ img {item.id} ]
                  </div>
                </div>
              )}

              {/* HOVER OVERLAY */}
              <div
                className="g-overlay"
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(to top, rgba(3,4,10,0.85) 0%, transparent 60%)",
                  opacity: 0,
                  transition: "opacity 0.3s",
                  display: "flex",
                  alignItems: "flex-end",
                  padding: "1rem 1.2rem",
                }}
              >
                <span
                  style={{
                    fontFamily: "'Space Mono', monospace",
                    fontSize: "0.7rem",
                    letterSpacing: "0.1em",
                    color: item.accent,
                    textTransform: "uppercase",
                  }}
                >
                  {item.label}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* VIEW ALL BUTTON */}
        <div style={{ textAlign: "center", marginTop: "3rem" }}>
          <a
            href="#"
            style={{
              display: "inline-block",
              fontFamily: "'Orbitron', monospace",
              clipPath:
                "polygon(12px 0%, 100% 0%, calc(100% - 12px) 100%, 0% 100%)",
              border: "1.5px solid rgba(255,255,255,0.15)",
              color: "#e8eaf0",
              padding: "1rem 2.5rem",
              fontSize: "0.78rem",
              fontWeight: 700,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              textDecoration: "none",
              transition: "all 0.3s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "#00f5c4";
              e.currentTarget.style.color = "#00f5c4";
              e.currentTarget.style.boxShadow =
                "0 0 30px rgba(0,245,196,0.2)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)";
              e.currentTarget.style.color = "#e8eaf0";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            View Full Gallery →
          </a>
        </div>
      </div>

      {/* LIGHTBOX */}
      {lightbox && (
        <div
          onClick={() => setLightbox(null)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(3,4,10,0.95)",
            zIndex: 1000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "2rem",
            cursor: "zoom-out",
          }}
        >
          <div
            style={{
              maxWidth: "900px",
              width: "100%",
              position: "relative",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {lightbox.src ? (
              <img
                src={lightbox.src}
                alt={lightbox.label}
                style={{
                  width: "100%",
                  border: `1px solid ${lightbox.accent}44`,
                  clipPath:
                    "polygon(10px 0%, 100% 0%, calc(100% - 10px) 100%, 0% 100%)",
                }}
              />
            ) : (
              <div
                style={{
                  width: "100%",
                  height: "480px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: `1px solid ${lightbox.accent}44`,
                  clipPath:
                    "polygon(10px 0%, 100% 0%, calc(100% - 10px) 100%, 0% 100%)",
                  background: "rgba(255,255,255,0.02)",
                  fontFamily: "'Orbitron', monospace",
                  fontSize: "0.75rem",
                  color: lightbox.accent,
                  letterSpacing: "0.2em",
                  opacity: 0.5,
                }}
              >
                IMAGE PLACEHOLDER
              </div>
            )}

            <p
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: "0.78rem",
                color: lightbox.accent,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                marginTop: "1rem",
                textAlign: "center",
              }}
            >
              {lightbox.label}
            </p>

            {/* CLOSE */}
            <button
              onClick={() => setLightbox(null)}
              style={{
                position: "absolute",
                top: "-1.5rem",
                right: 0,
                background: "none",
                border: "none",
                color: "#7a7f99",
                fontSize: "1.5rem",
                cursor: "pointer",
                fontFamily: "'Orbitron', monospace",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = "#00f5c4")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "#7a7f99")
              }
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </section>
  );
}