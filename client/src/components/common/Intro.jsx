import { useEffect, useState } from "react";

const LETTERS = ["S", "A", "N", "K", "A", "L", "A", "N"];

export default function Intro({ onFinish }) {
  const [phase, setPhase] = useState(0);
  // phase 0 = black screen
  // phase 1 = subtitle fades in
  // phase 2 = letters drop in one by one
  // phase 3 = year + bar appear
  // phase 4 = whole screen fades out

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 400);   // subtitle
    const t2 = setTimeout(() => setPhase(2), 900);   // letters start
    const t3 = setTimeout(() => setPhase(3), 2200);  // year + bar
    const t4 = setTimeout(() => setPhase(4), 3400);  // fade out
    const t5 = setTimeout(() => onFinish(), 4100);   // done

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
    };
  }, [onFinish]);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "#03040a",
        opacity: phase === 4 ? 0 : 1,
        transition: "opacity 0.7s ease",
        overflow: "hidden",
        fontFamily: "'Orbitron', monospace",
      }}
    >

      {/* ── GRID BACKGROUND ── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          backgroundImage: `
            linear-gradient(rgba(0,245,196,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,245,196,0.04) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
          maskImage:
            "radial-gradient(ellipse 80% 60% at 50% 50%, black 30%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 60% at 50% 50%, black 30%, transparent 100%)",
        }}
      />

      {/* ── GLOW ORBS ── */}
      <div
        style={{
          position: "absolute",
          width: "500px",
          height: "500px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(0,245,196,0.06) 0%, transparent 70%)",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          width: "400px",
          height: "400px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(123,95,255,0.05) 0%, transparent 70%)",
          top: "50%",
          left: "50%",
          transform: "translate(-60%, -40%)",
          pointerEvents: "none",
        }}
      />

      {/* ── CONTENT WRAPPER ── */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "1.2rem",
          padding: "2rem",
          width: "100%",
        }}
      >

        {/* ── SUBTITLE — DUCS line ── */}
        <p
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: "clamp(0.6rem, 1.5vw, 0.78rem)",
            letterSpacing: "0.45em",
            textTransform: "uppercase",
            color: "#7a7f99",
            opacity: phase >= 1 ? 1 : 0,
            transform: phase >= 1 ? "translateY(0)" : "translateY(-10px)",
            transition: "opacity 0.6s ease, transform 0.6s ease",
            textAlign: "center",
            margin: 0,
          }}
        >
          DUCS &nbsp;·&nbsp; University of Delhi
        </p>

        {/* ── SANKALAN LETTERS ── */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "clamp(2px, 1vw, 8px)",
            flexWrap: "nowrap",
          }}
        >
          {LETTERS.map((letter, i) => (
            <Letter
              key={i}
              letter={letter}
              index={i}
              visible={phase >= 2}
            />
          ))}
        </div>

        {/* ── YEAR ── */}
        <p
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: "clamp(0.75rem, 2vw, 1rem)",
            letterSpacing: "0.55em",
            color: "#00f5c4",
            opacity: phase >= 3 ? 1 : 0,
            transform: phase >= 3 ? "translateY(0)" : "translateY(8px)",
            transition: "opacity 0.6s ease 0.1s, transform 0.6s ease 0.1s",
            textAlign: "center",
            margin: 0,
          }}
        >
          2 &nbsp; 0 &nbsp; 2 &nbsp; 6
        </p>

        {/* ── LOADING BAR ── */}
        <div
          style={{
            width: "clamp(120px, 30vw, 200px)",
            height: "1px",
            background: "rgba(0,245,196,0.15)",
            marginTop: "0.5rem",
            overflow: "hidden",
            opacity: phase >= 3 ? 1 : 0,
            transition: "opacity 0.4s ease",
          }}
        >
          <div
            style={{
              height: "100%",
              background:
                "linear-gradient(90deg, #00f5c4, #7b5fff)",
              width: phase >= 3 ? "100%" : "0%",
              transition: "width 1.2s ease-out",
              boxShadow: "0 0 10px rgba(0,245,196,0.6)",
            }}
          />
        </div>

        {/* ── TAGLINE ── */}
        <p
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: "clamp(0.55rem, 1.2vw, 0.7rem)",
            letterSpacing: "0.3em",
            color: "#7a7f99",
            opacity: phase >= 3 ? 0.7 : 0,
            transform: phase >= 3 ? "translateY(0)" : "translateY(6px)",
            transition: "opacity 0.6s ease 0.4s, transform 0.6s ease 0.4s",
            textAlign: "center",
            margin: 0,
          }}
        >
          ANNUAL TECH FEST · 24–25 APRIL 2026
        </p>
      </div>
    </div>
  );
}

// ─── individual letter component ───────────────────────────────
function Letter({ letter, index, visible }) {
  // each letter drops in with staggered delay
  const delay = index * 110; // ms between each letter

  return (
    <span
      style={{
        fontFamily: "'Orbitron', monospace",
        fontSize: "clamp(2.8rem, 10vw, 7.5rem)",
        fontWeight: 900,
        lineHeight: 1,
        display: "inline-block",
        // gradient fill
        background:
          index < 3
            ? "linear-gradient(160deg, #ffffff 0%, #00f5c4 100%)"  // S A N — teal
            : index < 6
            ? "linear-gradient(160deg, #00f5c4 0%, #7b5fff 100%)"  // K A L — teal→purple
            : "linear-gradient(160deg, #7b5fff 0%, #ffffff 100%)", // A N   — purple→white
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
        // animation
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0) scale(1)" : "translateY(-60px) scale(0.6)",
        transition: visible
          ? `opacity 0.5s ease ${delay}ms, transform 0.5s cubic-bezier(0.34,1.56,0.64,1) ${delay}ms`
          : "none",
        // subtle text shadow glow
        filter: "drop-shadow(0 0 20px rgba(0,245,196,0.25))",
        cursor: "default",
        userSelect: "none",
      }}
    >
      {letter}
    </span>
  );
}