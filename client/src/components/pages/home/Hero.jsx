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

export default function Hero() {
  const daysRef  = useRef();
  const hoursRef = useRef();
  const minsRef  = useRef();
  const secsRef  = useRef();

  const width    = useWindowWidth();
  const isMobile = width < 600;
  const isTablet = width >= 600 && width < 1024;

  // ── UPDATED: countdown to April 24, 2026 ──
  useEffect(() => {
    const target = new Date("2026-04-24T09:00:00");
    const tick = () => {
      const diff = target - new Date();
      if (diff <= 0) {
        if (daysRef.current)  daysRef.current.textContent  = "00";
        if (hoursRef.current) hoursRef.current.textContent = "00";
        if (minsRef.current)  minsRef.current.textContent  = "00";
        if (secsRef.current)  secsRef.current.textContent  = "00";
        return;
      }
      const d = Math.floor(diff / 86400000);
      const h = Math.floor((diff % 86400000) / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      const s = Math.floor((diff % 60000) / 1000);
      if (daysRef.current)  daysRef.current.textContent  = String(d).padStart(2, "0");
      if (hoursRef.current) hoursRef.current.textContent = String(h).padStart(2, "0");
      if (minsRef.current)  minsRef.current.textContent  = String(m).padStart(2, "0");
      if (secsRef.current)  secsRef.current.textContent  = String(s).padStart(2, "0");
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <section
      id="home"
      style={{
        position:       "relative",
        minHeight:      "100vh",
        display:        "flex",
        flexDirection:  "column",
        alignItems:     "center",
        justifyContent: "center",
        textAlign:      "center",
        padding:        isMobile
          ? "5rem 1.25rem 3rem"
          : isTablet
          ? "6rem 1.5rem 4rem"
          : "6rem 2rem 4rem",
        overflow:       "hidden",
        zIndex:         1,
        boxSizing:      "border-box",
        width:          "100%",
      }}
    >
      {/* GRID BG */}
      <div
        style={{
          position:        "absolute",
          inset:           0,
          pointerEvents:   "none",
          backgroundImage: `
            linear-gradient(rgba(0,245,196,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,245,196,0.04) 1px, transparent 1px)
          `,
          backgroundSize:  isMobile ? "40px 40px" : "60px 60px",
          maskImage:
            "radial-gradient(ellipse 80% 60% at 50% 0%, black 30%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 60% at 50% 0%, black 30%, transparent 100%)",
          zIndex: 0,
        }}
      />

      {/* BADGE */}
      <div
        style={{
          display:       "inline-flex",
          alignItems:    "center",
          gap:           "0.6rem",
          border:        "1px solid rgba(0,245,196,0.15)",
          padding:       isMobile ? "0.4rem 1rem" : "0.4rem 1rem",
          marginBottom:  isMobile ? "1.5rem" : "2rem",
          fontFamily:    "'Space Mono', monospace",
          fontSize:      isMobile ? "0.6rem" : "0.72rem",
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color:         "#00f5c4",
          background:    "rgba(0,245,196,0.06)",
          animation:     "fadeInDown 1s ease both",
          position:      "relative",
          zIndex:        1,
          maxWidth:      "90vw",
          textAlign:     "center",
          lineHeight:    1.5,
          flexWrap:      "wrap",
          justifyContent:"center",
        }}
      >
        <span
          style={{
            width:        "6px",
            height:       "6px",
            borderRadius: "50%",
            background:   "#00f5c4",
            display:      "inline-block",
            flexShrink:   0,
            animation:    "pulse 1.5s infinite",
          }}
        />
        DUCS Annual Tech Fest · University of Delhi
      </div>

      {/* TITLE WRAPPER — fixed overflow on mobile */}
      <div
        style={{
          position:  "relative",
          zIndex:    1,
          animation: "fadeInUp 1s 0.2s ease both",
          width:     "100%",
          maxWidth:  "100%",
          overflow:  "hidden",          // ← prevent bleed
          textAlign: "center",
          lineHeight: 1,
        }}
      >
        <h1
          style={{
            fontFamily:    "'Orbitron', monospace",
            // ── KEY FIX: keep the title inside the viewport on small screens ──
            fontSize:      isMobile
              ? "clamp(2rem, 13vw, 3.5rem)"
              : isTablet
              ? "clamp(4rem, 12vw, 7rem)"
              : "clamp(4rem, 11vw, 9rem)",
            fontWeight:    900,
            letterSpacing: isMobile ? "0.04em" : "-0.02em",
            lineHeight:    1,
            background:
              "linear-gradient(135deg, #ffffff 0%, #00f5c4 40%, #7b5fff 80%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor:  "transparent",
            backgroundClip:       "text",
            margin:        0,
            padding:       isMobile ? "0 0.5rem" : 0,
            position:      "relative",
            width:         "100%",
            display:       "block",
            textAlign:     "center",
            wordBreak:     "keep-all",  // ← don't break the word
            whiteSpace:    "nowrap",    // ← keep on one line, clamp handles size
          }}
        >
          SANKALAN

          {/* GLITCH LAYER */}
          <span
            aria-hidden="true"
            style={{
              position:      "absolute",
              top:           0,
              left:          0,
              width:         "100%",
              textAlign:     "center",
              fontFamily:    "'Orbitron', monospace",
              fontSize:      isMobile
                ? "clamp(2rem, 13vw, 3.5rem)"
                : isTablet
                ? "clamp(4rem, 12vw, 7rem)"
                : "clamp(4rem, 11vw, 9rem)",
              fontWeight:    900,
              letterSpacing: isMobile ? "0.04em" : "-0.02em",
              lineHeight:    1,
              background:    "linear-gradient(135deg, #ff3e6c, transparent)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor:  "transparent",
              backgroundClip:       "text",
              animation:     "glitch 4s infinite",
              pointerEvents: "none",
              whiteSpace:    "nowrap",
            }}
          >
            SANKALAN
          </span>
        </h1>
      </div>

      {/* SUB HEADING — updated year to 2026 */}
      <p
        style={{
          fontFamily:    "'Space Mono', monospace",
          fontSize:      isMobile ? "0.6rem" : "clamp(0.8rem, 2vw, 1rem)",
          color:         "#7a7f99",
          letterSpacing: isMobile ? "0.1em" : "0.25em",
          textTransform: "uppercase",
          marginTop:     isMobile ? "0.8rem" : "1rem",
          animation:     "fadeInUp 1s 0.4s ease both",
          position:      "relative",
          zIndex:        1,
          padding:       "0 0.5rem",
          lineHeight:    1.6,
        }}
      >
        <span style={{ color: "#00f5c4" }}>2026</span>
        &nbsp;·&nbsp; Department of Computer Science
      </p>

      {/* DESC */}
      <p
        style={{
          maxWidth:   isMobile ? "100%" : "600px",
          margin:     isMobile ? "1rem auto 0" : "1.5rem auto 0",
          fontSize:   isMobile ? "0.8rem" : "1.05rem",
          lineHeight: 1.7,
          color:      "rgba(232,234,240,0.7)",
          animation:  "fadeInUp 1s 0.6s ease both",
          position:   "relative",
          zIndex:     1,
          padding:    isMobile ? "0 0.25rem" : 0,
          fontFamily: "'Space Mono', monospace",
        }}
      >
        Where code meets creativity. India's most electrifying college tech
        festival returns — 36 hours, infinite ideas, one legendary weekend.
      </p>

      {/* BUTTONS */}
      <div
        style={{
          display:        "flex",
          gap:            isMobile ? "0.8rem" : "1rem",
          justifyContent: "center",
          flexDirection:  isMobile ? "column" : "row",
          flexWrap:       "wrap",
          marginTop:      isMobile ? "1.8rem" : "2rem",
          animation:      "fadeInUp 1s 0.8s ease both",
          position:       "relative",
          zIndex:         1,
          width:          isMobile ? "100%" : "auto",
          alignItems:     "center",
        }}
      >
        {/* ── UPDATED: href points to Unstop registration link ── */}
        <a
          href="https://unstop.com/college-fests/sankalan-2026-department-of-computer-science-docs-university-of-delhi-du-458407"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            fontFamily:     "'Orbitron', monospace",
            clipPath:
              "polygon(12px 0%, 100% 0%, calc(100% - 12px) 100%, 0% 100%)",
            background:     "#00f5c4",
            color:          "#03040a",
            padding:        isMobile ? "0.9rem 1.8rem" : "1rem 2.5rem",
            fontSize:       isMobile ? "0.72rem" : "0.8rem",
            fontWeight:     700,
            letterSpacing:  "0.15em",
            textTransform:  "uppercase",
            textDecoration: "none",
            boxShadow:      "0 0 30px rgba(0,245,196,0.3)",
            transition:     "all 0.3s",
            display:        "inline-block",
            width:          isMobile ? "80%" : "auto",
            textAlign:      "center",
            boxSizing:      "border-box",
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
          Register Now
        </a>

        <a
          href="#about"
          style={{
            fontFamily:     "'Orbitron', monospace",
            clipPath:
              "polygon(12px 0%, 100% 0%, calc(100% - 12px) 100%, 0% 100%)",
            border:         "1.5px solid rgba(255,255,255,0.2)",
            color:          "#e8eaf0",
            padding:        isMobile ? "0.9rem 1.8rem" : "1rem 2.5rem",
            fontSize:       isMobile ? "0.72rem" : "0.8rem",
            fontWeight:     700,
            letterSpacing:  "0.15em",
            textTransform:  "uppercase",
            textDecoration: "none",
            transition:     "all 0.3s",
            display:        "inline-block",
            width:          isMobile ? "80%" : "auto",
            textAlign:      "center",
            boxSizing:      "border-box",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "#7b5fff";
            e.currentTarget.style.color       = "#7b5fff";
            e.currentTarget.style.boxShadow   = "0 0 30px rgba(123,95,255,0.3)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)";
            e.currentTarget.style.color       = "#e8eaf0";
            e.currentTarget.style.boxShadow   = "none";
          }}
        >
          Explore More
        </a>
      </div>

      {/* COUNTDOWN */}
      <div
        style={{
          display:        "flex",
          gap:            isMobile ? "0.5rem" : "1.5rem",
          justifyContent: "center",
          marginTop:      isMobile ? "2rem" : "3rem",
          animation:      "fadeInUp 1s 1s ease both",
          position:       "relative",
          zIndex:         1,
          width:          isMobile ? "100%" : "auto",
          padding:        isMobile ? "0 0.5rem" : 0,
          boxSizing:      "border-box",
        }}
      >
        {[
          { ref: daysRef,  label: "Days"  },
          { ref: hoursRef, label: "Hours" },
          { ref: minsRef,  label: "Mins"  },
          { ref: secsRef,  label: "Secs"  },
        ].map((unit, i) => (
          <div
            key={i}
            style={{
              textAlign:  "center",
              flex:       "1",
              minWidth:   isMobile ? 0 : "80px",
              maxWidth:   isMobile ? "80px" : "none",
              padding:    isMobile ? "0.7rem 0.2rem" : "1rem 0.5rem",
              background: "rgba(255,255,255,0.03)",
              border:     "1px solid rgba(0,245,196,0.15)",
              clipPath:
                "polygon(6px 0%, 100% 0%, calc(100% - 6px) 100%, 0% 100%)",
            }}
          >
            <div
              ref={unit.ref}
              style={{
                fontFamily: "'Orbitron', monospace",
                fontSize:   isMobile ? "1.3rem" : "2.2rem",
                fontWeight: 900,
                color:      "#00f5c4",
                textShadow: "0 0 20px rgba(0,245,196,0.4)",
                lineHeight: 1,
              }}
            >
              00
            </div>
            <div
              style={{
                fontFamily:    "'Space Mono', monospace",
                fontSize:      isMobile ? "0.45rem" : "0.6rem",
                letterSpacing: isMobile ? "0.08em" : "0.2em",
                textTransform: "uppercase",
                color:         "#7a7f99",
                marginTop:     "0.4rem",
              }}
            >
              {unit.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}