import { useEffect, useRef, useState } from "react";

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

const events = [
  {
    year:  "2005",
    title: "Inception of Sankalan",
    desc:  "Sankalan began as a small coding fest with a vision to empower tech enthusiasts.",
    color: "#00f5c4",
    side:  "left",
  },
  {
    year:  "2012",
    title: "Introduction of AI and Big Data",
    desc:  "Expanded into AI and Big Data domains, attracting national-level participants.",
    color: "#00f5c4",
    side:  "right",
  },
  {
    year:  "2017",
    title: "Launching the Extraordinary",
    desc:  "Entered \"ALACRITY\" the photography competition of DUCS where every click is your chance to shine.",
    color: "#00f5c4",
    side:  "left",
  },
  {
    year:  "2023",
    title: "Participation That Spoke Volumes",
    desc:  "SANKALAN'23 saw an outstanding participation, showcasing passion, energy, and a commitment that went above and beyond expectations. Empowered by the support and funding from DRDO.",
    color: "#00f5c4",
    side:  "right",
  },
  {
    year:  "2025",
    title: "Sankalan 21st Edition",
    desc:  "Celebrating 20 years of tech brilliance, expanding into AI, Cyber Security and Quantum Computing domains.",
    color: "#00f5c4",
    side:  "left",
  },
];

// ── Event Card ────────────────────────────────────────────────────────────────
function EventCard({ ev, align, isMobile }) {
  return (
    <div
      style={{
        padding:    isMobile ? "1.2rem 1.2rem" : "1.8rem 2rem",
        background: "rgba(255,255,255,0.03)",
        border:     "1px solid rgba(0,245,196,0.15)",
        clipPath:
          "polygon(10px 0%, 100% 0%, calc(100% - 10px) 100%, 0% 100%)",
        transition: "all 0.3s",
        textAlign:  isMobile ? "left" : align,
        position:   "relative",
        overflow:   "hidden",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "#00f5c4";
        e.currentTarget.style.background  = "rgba(0,245,196,0.05)";
        e.currentTarget.style.boxShadow   =
          "0 0 40px rgba(0,245,196,0.12)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "rgba(0,245,196,0.15)";
        e.currentTarget.style.background  = "rgba(255,255,255,0.03)";
        e.currentTarget.style.boxShadow   = "none";
      }}
    >
      {/* BG YEAR WATERMARK */}
      <div
        style={{
          position:      "absolute",
          top:           "50%",
          right:         !isMobile && align === "right" ? "1rem" : "auto",
          left:          isMobile || align === "left"   ? "1rem" : "auto",
          transform:     "translateY(-50%)",
          fontFamily:    "'Orbitron', monospace",
          fontSize:      isMobile ? "3.5rem" : "5rem",
          fontWeight:    900,
          color:         "rgba(0,245,196,0.04)",
          pointerEvents: "none",
          userSelect:    "none",
          lineHeight:    1,
        }}
      >
        {ev.year}
      </div>

      {/* YEAR */}
      <div
        style={{
          fontFamily:    "'Orbitron', monospace",
          fontSize:      isMobile ? "1.1rem" : "1.3rem",
          fontWeight:    900,
          color:         "#00f5c4",
          textShadow:    "0 0 20px rgba(0,245,196,0.5)",
          marginBottom:  "0.6rem",
          letterSpacing: "0.08em",
          position:      "relative",
          zIndex:        1,
        }}
      >
        {ev.year}
      </div>

      {/* TITLE */}
      <h3
        style={{
          fontFamily:    "'Orbitron', monospace",
          fontSize:      isMobile ? "0.82rem" : "0.95rem",
          fontWeight:    700,
          color:         "#e8eaf0",
          marginBottom:  "0.8rem",
          letterSpacing: "0.03em",
          lineHeight:    1.4,
          position:      "relative",
          zIndex:        1,
        }}
      >
        {ev.title}
      </h3>

      {/* DIVIDER */}
      <div
        style={{
          width:        "40px",
          height:       "1px",
          background:   "linear-gradient(90deg, #00f5c4, transparent)",
          marginBottom: "0.8rem",
          // on mobile always left-aligned
          marginLeft:   !isMobile && align === "right" ? "auto" : "0",
          marginRight:  !isMobile && align === "right" ? "0"    : "auto",
          transform:    !isMobile && align === "right" ? "scaleX(-1)" : "none",
          position:     "relative",
          zIndex:       1,
        }}
      />

      {/* DESC */}
      <p
        style={{
          fontFamily: "'Space Mono', monospace",
          fontSize:   isMobile ? "0.75rem" : "0.85rem",
          color:      "rgba(232,234,240,0.6)",
          lineHeight: 1.8,
          position:   "relative",
          zIndex:     1,
        }}
      >
        {ev.desc}
      </p>
    </div>
  );
}

// ── Center Dot ────────────────────────────────────────────────────────────────
function CenterDot({ isMobile }) {
  return (
    <div
      style={{
        display:         "flex",
        justifyContent:  "center",
        alignItems:      "center",
        position:        "relative",
        zIndex:          1,
        // on mobile the dot sits left, not centered
        paddingLeft:     isMobile ? 0 : 0,
      }}
    >
      <div
        style={{
          width:        isMobile ? "18px" : "22px",
          height:       isMobile ? "18px" : "22px",
          borderRadius: "50%",
          border:       "2px solid #00f5c4",
          display:      "flex",
          alignItems:   "center",
          justifyContent: "center",
          background:   "#03040a",
          boxShadow:    "0 0 20px rgba(0,245,196,0.4)",
          flexShrink:   0,
        }}
      >
        <div
          style={{
            width:        isMobile ? "7px" : "9px",
            height:       isMobile ? "7px" : "9px",
            borderRadius: "50%",
            background:   "#00f5c4",
            boxShadow:    "0 0 10px #00f5c4",
          }}
        />
      </div>
    </div>
  );
}

// ── Timeline ──────────────────────────────────────────────────────────────────
export default function Timeline() {
  const sectionRef = useRef();

  const width    = useWindowWidth();
  const isMobile = width < 600;
  const isTablet = width >= 600 && width < 1024;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.style.opacity   = "1";
            e.target.style.transform = "translateX(0)";
            observer.unobserve(e.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    const items = sectionRef.current?.querySelectorAll(".tl-item");
    items?.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="timeline"
      ref={sectionRef}
      style={{ position: "relative", zIndex: 1 }}
    >
      <div
        style={{
          maxWidth: "1100px",
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
          Our Journey
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
          Sankalan{" "}
          <span style={{ color: "#00f5c4" }}>Timeline</span>
        </h2>

        <p
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize:   isMobile ? "0.78rem" : "0.9rem",
            color:      "rgba(232,234,240,0.6)",
            maxWidth:   "500px",
            lineHeight: 1.8,
            margin:     isMobile ? "0 0 3rem 0" : "0 0 5rem 0",
          }}
        >
          Two decades of innovation, passion and technology — from a small
          coding fest to a national-level phenomenon.
        </p>

        {/* TIMELINE WRAPPER */}
        <div style={{ position: "relative" }}>

          {/* ── VERTICAL LINE ── */}
          <div
            style={{
              position:   "absolute",
              // center on desktop/tablet, left-offset on mobile
              left:       isMobile ? "8px" : "50%",
              top:        0,
              bottom:     0,
              width:      "2px",
              background:
                "linear-gradient(to bottom, transparent, #00f5c4 8%, #7b5fff 92%, transparent)",
              transform:  isMobile ? "none" : "translateX(-50%)",
              zIndex:     0,
            }}
          />

          {/* ── ITEMS ── */}
          <div
            style={{
              display:       "flex",
              flexDirection: "column",
              gap:           isMobile ? "2rem" : "3.5rem",
            }}
          >
            {events.map((ev, i) => (
              <div
                key={i}
                className="tl-item"
                style={
                  isMobile
                    ? {
                        // mobile: single column, card after dot
                        display:    "grid",
                        gridTemplateColumns: "28px 1fr",
                        alignItems: "start",
                        gap:        "0.8rem",
                        opacity:    0,
                        transform:  "translateX(-30px)",
                        transition: `opacity 0.7s ${i * 0.15}s ease,
                                     transform 0.7s ${i * 0.15}s ease`,
                      }
                    : {
                        // tablet / desktop: classic 3-col alternating
                        display:             "grid",
                        gridTemplateColumns: "1fr 60px 1fr",
                        alignItems:         "center",
                        opacity:            0,
                        transform:          `translateX(${
                          ev.side === "left" ? "-50px" : "50px"
                        })`,
                        transition: `opacity 0.7s ${i * 0.15}s ease,
                                     transform 0.7s ${i * 0.15}s ease`,
                      }
                }
              >
                {isMobile ? (
                  // ── MOBILE LAYOUT: dot | card ──
                  <>
                    <CenterDot isMobile />
                    <EventCard ev={ev} align="left" isMobile />
                  </>
                ) : (
                  // ── DESKTOP / TABLET LAYOUT: left | dot | right ──
                  <>
                    {/* LEFT SLOT */}
                    <div style={{ padding: "0 2.5rem 0 0" }}>
                      {ev.side === "left"
                        ? <EventCard ev={ev} align="right" isMobile={false} />
                        : <div />}
                    </div>

                    <CenterDot isMobile={false} />

                    {/* RIGHT SLOT */}
                    <div style={{ padding: "0 0 0 2.5rem" }}>
                      {ev.side === "right"
                        ? <EventCard ev={ev} align="left" isMobile={false} />
                        : <div />}
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}