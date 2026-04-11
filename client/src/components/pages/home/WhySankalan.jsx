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

const reasons = [
  {
    icon:  "⚡",
    title: "High-Octane Competitions",
    desc:  "From hackathons to coding contests, every event is designed to push your limits and bring out the best in you.",
    color: "#00f5c4",
  },
  {
    icon:  "🧠",
    title: "Learn from the Best",
    desc:  "Workshops, talks and sessions led by industry experts, researchers and senior developers from top tech companies.",
    color: "#7b5fff",
  },
  {
    icon:  "🤝",
    title: "Network & Collaborate",
    desc:  "Meet like-minded tech enthusiasts from 30+ colleges across India. Build friendships and teams that last beyond the fest.",
    color: "#00f5c4",
  },
  {
    icon:  "🏆",
    title: "Win Big",
    desc:  "A prize pool of ₹2L+ across events. Certificates, goodies, internship opportunities and recognition await.",
    color: "#7b5fff",
  },
  {
    icon:  "🚀",
    title: "Launch Your Ideas",
    desc:  "Pitch your startup ideas, showcase projects and get feedback from mentors who've built real products.",
    color: "#00f5c4",
  },
  {
    icon:  "🎨",
    title: "More Than Just Code",
    desc:  "UI/UX battles, design sprints, paper presentations — Sankalan celebrates every dimension of technology.",
    color: "#7b5fff",
  },
];

// ── Reason Card ───────────────────────────────────────────────────────────────
function ReasonCard({ r, i, isMobile }) {
  const rgb = r.color === "#00f5c4" ? "0,245,196" : "123,95,255";

  return (
    <div
      className="why-card"
      style={{
        padding:    isMobile ? "1.4rem 1.2rem" : "2rem",
        background: "rgba(255,255,255,0.02)",
        border:     "1px solid rgba(0,245,196,0.12)",
        clipPath:
          "polygon(10px 0%, 100% 0%, calc(100% - 10px) 100%, 0% 100%)",
        opacity:    0,
        transform:  "translateY(30px)",
        transition: `opacity 0.6s ${i * 0.1}s ease,
                     transform 0.6s ${i * 0.1}s ease`,
        cursor:     "default",
        position:   "relative",
        overflow:   "hidden",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = r.color;
        e.currentTarget.style.background  = `rgba(${rgb},0.05)`;
        e.currentTarget.style.boxShadow   =
          `0 0 40px rgba(${rgb},0.12)`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "rgba(0,245,196,0.12)";
        e.currentTarget.style.background  = "rgba(255,255,255,0.02)";
        e.currentTarget.style.boxShadow   = "none";
      }}
    >
      {/* TOP ACCENT */}
      <div
        style={{
          position:   "absolute",
          top:        0,
          left:       0,
          right:      0,
          height:     "2px",
          background: `linear-gradient(90deg, ${r.color}, transparent)`,
          opacity:    0.5,
        }}
      />

      {/* ICON */}
      <div
        style={{
          fontSize:     isMobile ? "1.8rem" : "2.2rem",
          marginBottom: isMobile ? "0.8rem" : "1rem",
          lineHeight:   1,
        }}
      >
        {r.icon}
      </div>

      {/* TITLE */}
      <h3
        style={{
          fontFamily:    "'Orbitron', monospace",
          fontSize:      isMobile ? "0.82rem" : "0.95rem",
          fontWeight:    700,
          color:         r.color,
          letterSpacing: "0.05em",
          marginBottom:  "0.8rem",
          textShadow:    `0 0 20px ${r.color}66`,
          lineHeight:    1.4,
        }}
      >
        {r.title}
      </h3>

      {/* DIVIDER */}
      <div
        style={{
          width:        "30px",
          height:       "1px",
          background:   `linear-gradient(90deg, ${r.color}, transparent)`,
          marginBottom: "0.8rem",
          opacity:      0.6,
        }}
      />

      {/* DESC */}
      <p
        style={{
          fontFamily: "'Space Mono', monospace",
          fontSize:   isMobile ? "0.72rem" : "0.85rem",
          color:      "rgba(232,234,240,0.6)",
          lineHeight: 1.8,
          margin:     0,
        }}
      >
        {r.desc}
      </p>
    </div>
  );
}

// ── WhySankalan ───────────────────────────────────────────────────────────────
export default function WhySankalan() {
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
            e.target.style.transform = "translateY(0)";
            observer.unobserve(e.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    const cards = sectionRef.current?.querySelectorAll(".why-card");
    cards?.forEach((c) => observer.observe(c));
    return () => observer.disconnect();
  }, []);

  // grid columns:
  // mobile  → 1 col
  // tablet  → 2 col
  // desktop → 3 col (auto-fit with minmax still works, but explicit is safer)
  const gridCols = isMobile ? "1fr" : isTablet ? "1fr 1fr" : "repeat(3, 1fr)";

  return (
    <section
      id="why"
      ref={sectionRef}
      style={{ position: "relative", zIndex: 1 }}
    >
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
          Reasons to Join
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
          Why{" "}
          <span style={{ color: "#00f5c4" }}>Sankalan?</span>
        </h2>

        {/* SUBTITLE */}
        <p
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize:   isMobile ? "0.78rem" : "0.9rem",
            color:      "rgba(232,234,240,0.6)",
            maxWidth:   "560px",
            lineHeight: 1.8,
            margin:     isMobile ? "0 0 2.5rem 0" : "0 0 4rem 0",
          }}
        >
          More than a tech fest — Sankalan is an experience that transforms
          students into innovators, competitors into collaborators.
        </p>

        {/* GRID */}
        <div
          style={{
            display:             "grid",
            gridTemplateColumns: gridCols,
            gap:                 isMobile ? "1rem" : "1.5rem",
          }}
        >
          {reasons.map((r, i) => (
            <ReasonCard
              key={i}
              r={r}
              i={i}
              isMobile={isMobile}
            />
          ))}
        </div>
      </div>
    </section>
  );
}