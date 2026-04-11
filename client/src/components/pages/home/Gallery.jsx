import { useState, useEffect } from "react";

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

// Placeholder colours until real images are added
const placeholders = [
  { id: 1, label: "Hackathon — War Room",  span: "col", src: null, accent: "#00f5c4" },
  { id: 2, label: "Opening Ceremony",      span: "row", src: null, accent: "#7b5fff" },
  { id: 3, label: "Coding Contest",        span: "",    src: null, accent: "#00f5c4" },
  { id: 4, label: "Workshop Session",      span: "",    src: null, accent: "#7b5fff" },
  { id: 5, label: "Prize Distribution",    span: "col", src: null, accent: "#00f5c4" },
  { id: 6, label: "Paper Presentation",    span: "",    src: null, accent: "#7b5fff" },
  { id: 7, label: "UI/UX Challenge",       span: "",    src: null, accent: "#00f5c4" },
  { id: 8, label: "Team Celebration",      span: "row", src: null, accent: "#7b5fff" },
];

// ── Gallery Card ─────────────────────────────────────────────────────────────
function GalleryCard({ item, isMobile, isTablet, onClick }) {
  // On mobile: every card is 1 col, 1 row — no spans
  // On tablet: col-spans kept, row-spans removed (grid is 2-col)
  // On desktop: full spans, 4-col grid
  const colSpan = isMobile
    ? 1
    : item.span === "col"
    ? 2
    : 1;

  const rowSpan = isMobile || isTablet
    ? 1
    : item.span === "row"
    ? 2
    : 1;

  const accentRGB =
    item.accent === "#00f5c4" ? "0,245,196" : "123,95,255";

  return (
    <div
      onClick={() => onClick(item)}
      style={{
        gridColumn: `span ${colSpan}`,
        gridRow:    `span ${rowSpan}`,
        position:   "relative",
        overflow:   "hidden",
        cursor:     "pointer",
        border:     `1px solid rgba(${accentRGB},0.15)`,
        clipPath:
          "polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)",
        background: `rgba(${accentRGB},0.04)`,
        transition: "all 0.3s",
        minHeight:  isMobile ? "140px" : "200px",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = item.accent;
        e.currentTarget.style.boxShadow   =
          `0 0 40px rgba(${accentRGB},0.2)`;
        const img     = e.currentTarget.querySelector("img");
        const overlay = e.currentTarget.querySelector(".g-overlay");
        if (img)     img.style.transform     = "scale(1.06)";
        if (overlay) overlay.style.opacity   = "1";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor =
          `rgba(${accentRGB},0.15)`;
        e.currentTarget.style.boxShadow = "none";
        const img     = e.currentTarget.querySelector("img");
        const overlay = e.currentTarget.querySelector(".g-overlay");
        if (img)     img.style.transform   = "scale(1)";
        if (overlay) overlay.style.opacity = "0";
      }}
    >
      {/* IMAGE or PLACEHOLDER */}
      {item.src ? (
        <img
          src={item.src}
          alt={item.label}
          style={{
            width:      "100%",
            height:     "100%",
            objectFit:  "cover",
            display:    "block",
            transition: "transform 0.5s ease",
          }}
        />
      ) : (
        <div
          style={{
            width:           "100%",
            height:          "100%",
            display:         "flex",
            flexDirection:   "column",
            alignItems:      "center",
            justifyContent:  "center",
            gap:             "0.5rem",
          }}
        >
          <div
            style={{
              fontFamily:    "'Orbitron', monospace",
              fontSize:      "0.6rem",
              letterSpacing: "0.2em",
              color:         item.accent,
              opacity:       0.5,
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
          position:   "absolute",
          inset:      0,
          background:
            "linear-gradient(to top, rgba(3,4,10,0.85) 0%, transparent 60%)",
          opacity:    0,
          transition: "opacity 0.3s",
          display:    "flex",
          alignItems: "flex-end",
          padding:    isMobile ? "0.8rem 1rem" : "1rem 1.2rem",
        }}
      >
        <span
          style={{
            fontFamily:    "'Space Mono', monospace",
            fontSize:      isMobile ? "0.62rem" : "0.7rem",
            letterSpacing: "0.1em",
            color:         item.accent,
            textTransform: "uppercase",
          }}
        >
          {item.label}
        </span>
      </div>
    </div>
  );
}

// ── Lightbox ──────────────────────────────────────────────────────────────────
function Lightbox({ item, onClose, isMobile }) {
  // close on Escape key
  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <div
      onClick={onClose}
      style={{
        position:        "fixed",
        inset:           0,
        background:      "rgba(3,4,10,0.95)",
        zIndex:          1000,
        display:         "flex",
        alignItems:      "center",
        justifyContent:  "center",
        padding:         isMobile ? "1rem" : "2rem",
        cursor:          "zoom-out",
      }}
    >
      <div
        style={{
          maxWidth: "900px",
          width:    "100%",
          position: "relative",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {item.src ? (
          <img
            src={item.src}
            alt={item.label}
            style={{
              width:    "100%",
              border:   `1px solid ${item.accent}44`,
              clipPath:
                "polygon(10px 0%, 100% 0%, calc(100% - 10px) 100%, 0% 100%)",
            }}
          />
        ) : (
          <div
            style={{
              width:           "100%",
              height:          isMobile ? "260px" : "480px",
              display:         "flex",
              alignItems:      "center",
              justifyContent:  "center",
              border:          `1px solid ${item.accent}44`,
              clipPath:
                "polygon(10px 0%, 100% 0%, calc(100% - 10px) 100%, 0% 100%)",
              background:      "rgba(255,255,255,0.02)",
              fontFamily:      "'Orbitron', monospace",
              fontSize:        isMobile ? "0.6rem" : "0.75rem",
              color:           item.accent,
              letterSpacing:   "0.2em",
              opacity:         0.5,
            }}
          >
            IMAGE PLACEHOLDER
          </div>
        )}

        <p
          style={{
            fontFamily:    "'Space Mono', monospace",
            fontSize:      isMobile ? "0.65rem" : "0.78rem",
            color:         item.accent,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            marginTop:     "1rem",
            textAlign:     "center",
          }}
        >
          {item.label}
        </p>

        {/* CLOSE */}
        <button
          onClick={onClose}
          style={{
            position:   "absolute",
            top:        "-1.5rem",
            right:      0,
            background: "none",
            border:     "none",
            color:      "#7a7f99",
            fontSize:   isMobile ? "1.2rem" : "1.5rem",
            cursor:     "pointer",
            fontFamily: "'Orbitron', monospace",
            transition: "color 0.2s",
            padding:    "0.25rem 0.5rem",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#00f5c4")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "#7a7f99")}
        >
          ✕
        </button>
      </div>
    </div>
  );
}

// ── Gallery ───────────────────────────────────────────────────────────────────
export default function Gallery() {
  const [lightbox, setLightbox] = useState(null);

  const width    = useWindowWidth();
  const isMobile = width < 600;
  const isTablet = width >= 600 && width < 1024;

  // grid columns: 1 on mobile, 2 on tablet, 4 on desktop
  const gridCols = isMobile ? 1 : isTablet ? 2 : 4;

  return (
    <section id="gallery" style={{ position: "relative", zIndex: 1 }}>
      <div
        style={{
          maxWidth: "1200px",
          margin:   "0 auto",
          padding:  isMobile
            ? "4rem 1rem"
            : isTablet
            ? "5rem 1.5rem"
            : "6rem 2rem",
        }}
      >
        {/* SECTION TAG */}
        <p
          style={{
            display:       "flex",
            alignItems:    "center",
            gap:           "0.8rem",
            fontFamily:    "'Space Mono', monospace",
            fontSize:      "0.72rem",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color:         "#00f5c4",
            margin:        "0 0 0.8rem 0",
          }}
        >
          <span
            style={{
              display:    "block",
              width:      "30px",
              height:     "1px",
              background: "#00f5c4",
              flexShrink: 0,
            }}
          />
          Memories
        </p>

        {/* TITLE */}
        <h2
          style={{
            fontFamily:  "'Orbitron', monospace",
            fontSize:    "clamp(1.8rem, 5vw, 3.5rem)",
            fontWeight:  900,
            lineHeight:  1.1,
            margin:      "0 0 1rem 0",
            color:       "#e8eaf0",
          }}
        >
          Gallery{" "}
          <span style={{ color: "#00f5c4" }}>Showcase</span>
        </h2>

        <p
          style={{
            fontFamily:  "'Space Mono', monospace",
            fontSize:    isMobile ? "0.78rem" : "0.9rem",
            color:       "rgba(232,234,240,0.6)",
            maxWidth:    "500px",
            lineHeight:  1.8,
            margin:      "0 0 2.5rem 0",
          }}
        >
          Snapshots from Sankalan 2024 — the moments that defined the fest.
        </p>

        {/* MASONRY GRID */}
        <div
          style={{
            display:             "grid",
            gridTemplateColumns: `repeat(${gridCols}, 1fr)`,
            gridAutoRows:        isMobile ? "140px" : "200px",
            gap:                 isMobile ? "0.6rem" : "1rem",
          }}
        >
          {placeholders.map((item) => (
            <GalleryCard
              key={item.id}
              item={item}
              isMobile={isMobile}
              isTablet={isTablet}
              onClick={setLightbox}
            />
          ))}
        </div>

        {/* VIEW ALL BUTTON */}
        <div
          style={{
            textAlign: "center",
            marginTop: isMobile ? "2rem" : "3rem",
          }}
        >
          <a
            href="#"
            style={{
              display:        "inline-block",
              fontFamily:     "'Orbitron', monospace",
              clipPath:
                "polygon(12px 0%, 100% 0%, calc(100% - 12px) 100%, 0% 100%)",
              border:         "1.5px solid rgba(255,255,255,0.15)",
              color:          "#e8eaf0",
              padding:        isMobile ? "0.85rem 1.8rem" : "1rem 2.5rem",
              fontSize:       isMobile ? "0.7rem" : "0.78rem",
              fontWeight:     700,
              letterSpacing:  "0.15em",
              textTransform:  "uppercase",
              textDecoration: "none",
              transition:     "all 0.3s",
              width:          isMobile ? "100%" : "auto",
              textAlign:      isMobile ? "center" : "left",
              boxSizing:      "border-box",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "#00f5c4";
              e.currentTarget.style.color       = "#00f5c4";
              e.currentTarget.style.boxShadow   =
                "0 0 30px rgba(0,245,196,0.2)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)";
              e.currentTarget.style.color       = "#e8eaf0";
              e.currentTarget.style.boxShadow   = "none";
            }}
          >
            View Full Gallery →
          </a>
        </div>
      </div>

      {/* LIGHTBOX */}
      {lightbox && (
        <Lightbox
          item={lightbox}
          onClose={() => setLightbox(null)}
          isMobile={isMobile}
        />
      )}
    </section>
  );
}