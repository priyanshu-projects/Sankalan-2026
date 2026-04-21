import { useState, useEffect } from "react";

const API = `${import.meta.env.VITE_API_URL}/api`;

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

function GalleryCard({ item, index, isMobile, isTablet, onClick }) {
  const colSpan = isMobile ? 1 : item.span === "col" ? 2 : 1;
  const rowSpan = isMobile || isTablet ? 1 : item.span === "row" ? 2 : 1;
  const accentRGB = item.accent === "#00f5c4" ? "0,245,196" : "123,95,255";

  return (
    <div
      onClick={() => onClick({ ...item, index })}
      style={{
        gridColumn: `span ${colSpan}`,
        gridRow:    `span ${rowSpan}`,
        position:   "relative",
        overflow:   "hidden",
        cursor:     "pointer",
        border:     `1px solid rgba(${accentRGB},0.15)`,
        clipPath:   "polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)",
        background: `rgba(${accentRGB},0.04)`,
        transition: "all 0.3s",
        minHeight:  isMobile ? "140px" : "200px",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = item.accent;
        e.currentTarget.style.boxShadow   = `0 0 40px rgba(${accentRGB},0.2)`;
        const img     = e.currentTarget.querySelector("img");
        const overlay = e.currentTarget.querySelector(".g-overlay");
        if (img)     img.style.transform   = "scale(1.06)";
        if (overlay) overlay.style.opacity = "1";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = `rgba(${accentRGB},0.15)`;
        e.currentTarget.style.boxShadow   = "none";
        const img     = e.currentTarget.querySelector("img");
        const overlay = e.currentTarget.querySelector(".g-overlay");
        if (img)     img.style.transform   = "scale(1)";
        if (overlay) overlay.style.opacity = "0";
      }}
    >
      {/* IMAGE */}
      <img
        src={item.src}
        alt={`Photo ${index}`}
        loading="lazy"
        style={{
          width:      "100%",
          height:     "100%",
          objectFit:  "cover",
          display:    "block",
          transition: "transform 0.5s ease",
        }}
      />

      {/* HOVER OVERLAY */}
      <div
        className="g-overlay"
        style={{
          position:   "absolute",
          inset:      0,
          background: "linear-gradient(to top, rgba(3,4,10,0.85) 0%, transparent 60%)",
          opacity:    0,
          transition: "opacity 0.3s",
          display:    "flex",
          alignItems: "flex-end",
          padding:    isMobile ? "0.8rem 1rem" : "1rem 1.2rem",
        }}
      >
        <span style={{
          fontFamily:    "'Space Mono', monospace",
          fontSize:      isMobile ? "0.62rem" : "0.7rem",
          letterSpacing: "0.1em",
          color:         item.accent,
          textTransform: "uppercase",
        }}>
          Photo {index}
        </span>
      </div>
    </div>
  );
}

function LoadingSkeleton({ isMobile, isTablet }) {
  const gridCols = isMobile ? 1 : isTablet ? 2 : 4;
  return (
    <div style={{
      display:             "grid",
      gridTemplateColumns: `repeat(${gridCols}, 1fr)`,
      gridAutoRows:        isMobile ? "140px" : "200px",
      gap:                 isMobile ? "0.6rem" : "1rem",
    }}>
      {[...Array(8)].map((_, i) => (
        <div key={i} style={{
          background: "rgba(255,255,255,0.02)",
          border:     "1px solid rgba(0,245,196,0.08)",
          clipPath:   "polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)",
          position:   "relative",
          overflow:   "hidden",
        }}>
          <div style={{
            position:   "absolute",
            top:        0,
            left:       "-100%",
            width:      "60%",
            height:     "100%",
            background: "linear-gradient(90deg, transparent, rgba(0,245,196,0.03), transparent)",
            animation:  "shimmer 1.5s infinite",
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

function Lightbox({ item, onClose, isMobile }) {
  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  return (
    <div
      onClick={onClose}
      style={{
        position:       "fixed",
        inset:          0,
        background:     "rgba(3,4,10,0.95)",
        zIndex:         1000,
        display:        "flex",
        alignItems:     "center",
        justifyContent: "center",
        padding:        isMobile ? "1rem" : "2rem",
        cursor:         "zoom-out",
      }}
    >
      <div
        style={{ maxWidth: "900px", width: "100%", position: "relative" }}
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={item.src}
          alt={`Photo ${item.index}`}
          style={{
            width:    "100%",
            border:   `1px solid ${item.accent}44`,
            clipPath: "polygon(10px 0%, 100% 0%, calc(100% - 10px) 100%, 0% 100%)",
          }}
        />

        <p style={{
          fontFamily:    "'Space Mono', monospace",
          fontSize:      isMobile ? "0.65rem" : "0.78rem",
          color:         item.accent,
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          marginTop:     "1rem",
          textAlign:     "center",
        }}>
          Photo {item.index}
        </p>

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

export default function Gallery() {
  const [images,   setImages]   = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [error,    setError]    = useState(null);
  const [lightbox, setLightbox] = useState(null);

  const width    = useWindowWidth();
  const isMobile = width < 600;
  const isTablet = width >= 600 && width < 1024;
  const gridCols = isMobile ? 1 : isTablet ? 2 : 4;

  useEffect(() => {
    fetch(`${API}/gallery`)
      .then((r) => r.json())
      .then((data) => {
        if (data.success) setImages(data.data);
        else setError("Failed to load gallery.");
      })
      .catch(() => setError("Failed to load gallery."))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section id="gallery" style={{ position: "relative", zIndex: 1 }}>
      <div style={{
        maxWidth: "1200px",
        margin:   "0 auto",
        padding:  isMobile ? "4rem 1rem" : isTablet ? "5rem 1.5rem" : "6rem 2rem",
      }}>

        {/* SECTION TAG */}
        <p style={{
          display:       "flex",
          alignItems:    "center",
          gap:           "0.8rem",
          fontFamily:    "'Space Mono', monospace",
          fontSize:      "0.72rem",
          letterSpacing: "0.3em",
          textTransform: "uppercase",
          color:         "#00f5c4",
          margin:        "0 0 0.8rem 0",
        }}>
          <span style={{
            display:    "block",
            width:      "30px",
            height:     "1px",
            background: "#00f5c4",
            flexShrink: 0,
          }} />
          Memories
        </p>

        {/* TITLE */}
        <h2 style={{
          fontFamily: "'Orbitron', monospace",
          fontSize:   "clamp(1.8rem, 5vw, 3.5rem)",
          fontWeight: 900,
          lineHeight: 1.1,
          margin:     "0 0 1rem 0",
          color:      "#e8eaf0",
        }}>
          Gallery{" "}
          <span style={{ color: "#00f5c4" }}>Showcase</span>
        </h2>

        <p style={{
          fontFamily: "'Space Mono', monospace",
          fontSize:   isMobile ? "0.78rem" : "0.9rem",
          color:      "rgba(232,234,240,0.6)",
          maxWidth:   "500px",
          lineHeight: 1.8,
          margin:     "0 0 2.5rem 0",
        }}>
          Snapshots from Sankalan 2024 — the moments that defined the fest.
        </p>

        {/* ERROR */}
        {error && (
          <div style={{
            padding:      "1.5rem",
            marginBottom: "2rem",
            background:   "rgba(255,62,108,0.05)",
            border:       "1px solid rgba(255,62,108,0.2)",
            clipPath:     "polygon(10px 0%, 100% 0%, calc(100% - 10px) 100%, 0% 100%)",
            fontFamily:   "'Space Mono', monospace",
            fontSize:     "0.75rem",
            color:        "#ff3e6c",
            textAlign:    "center",
          }}>
            ⚠ {error}
          </div>
        )}

        {/* GRID */}
        {loading ? (
          <LoadingSkeleton isMobile={isMobile} isTablet={isTablet} />
        ) : (
          <div style={{
            display:             "grid",
            gridTemplateColumns: `repeat(${gridCols}, 1fr)`,
            gridAutoRows:        isMobile ? "140px" : "200px",
            gap:                 isMobile ? "0.6rem" : "1rem",
          }}>
            {images.map((item, index) => (
              <GalleryCard
                key={item.id}
                item={item}
                index={index + 1}
                isMobile={isMobile}
                isTablet={isTablet}
                onClick={setLightbox}
              />
            ))}
          </div>
        )}
      </div>

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