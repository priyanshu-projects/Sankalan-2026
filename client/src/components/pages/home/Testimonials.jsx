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

const testimonials = [
  {
    name:   "Aryan Mehta",
    role:   "CSE Final Year · IIT Delhi",
    quote:
      "Sankalan was hands down the most intense and rewarding hackathon experience I've had. The problem statements were real-world, the mentors were accessible, and the energy was unmatched. Walked away with ₹50K and three job leads.",
    avatar: "AM",
    image:  null,
    color:  "#00f5c4",
    event:  "Hackathon Winner 2024",
  },
  {
    name:   "Priya Nair",
    role:   "MCA 2nd Year · Delhi University",
    quote:
      "I came in nervous and left inspired. The product challenge forced me to think from a user's perspective under real pressure. The judges gave incredibly actionable feedback — better than most internship reviews I've had.",
    avatar: "PN",
    image:  null,
    color:  "#7b5fff",
    event:  "Product Challenge — 2nd Place",
  },
  {
    name:   "Rohan Sharma",
    role:   "B.Tech CSE · DTU",
    quote:
      "What sets Sankalan apart is the community. I met my current startup co-founder here. Two years later, we've raised our seed round. Never underestimate the connections you make at a college fest.",
    avatar: "RS",
    image:  null,
    color:  "#00f5c4",
    event:  "Participant 2023 & 2024",
  },
  {
    name:   "Sneha Kapoor",
    role:   "MSc CS · JNU",
    quote:
      "I presented my research paper on federated learning and the response from the panel was phenomenal. Sankalan gives research students a real platform — not just a podium, but genuine intellectual engagement.",
    avatar: "SK",
    image:  null,
    color:  "#7b5fff",
    event:  "Best Paper Award 2024",
  },
  {
    name:   "Karan Joshi",
    role:   "B.Tech IT · NSUT",
    quote:
      "Three Sankalans in a row and counting. Every year the bar is raised higher. The organization is world-class, the events are creative, and the prize pool keeps growing. It's the fest we plan our year around.",
    avatar: "KJ",
    image:  null,
    color:  "#00f5c4",
    event:  "Coding Contest Finalist",
  },
];

// ── Image / Placeholder Panel ─────────────────────────────────────────────────
function ImagePanel({ t, rgb, isMobile }) {
  return (
    <div
      style={{
        position:        "relative",
        background:      `rgba(${rgb},0.05)`,
        borderBottom:    isMobile
          ? `1px solid rgba(${rgb},0.15)`
          : "none",
        borderRight:     isMobile
          ? "none"
          : `1px solid rgba(${rgb},0.15)`,
        minHeight:       isMobile ? "180px" : "320px",
        display:         "flex",
        flexDirection:   "column",
        alignItems:      "center",
        justifyContent:  "center",
        overflow:        "hidden",
      }}
    >
      {t.image ? (
        <img
          src={t.image}
          alt={t.name}
          style={{
            width:          "100%",
            height:         "100%",
            objectFit:      "cover",
            objectPosition: "center top",
            display:        "block",
            position:       "absolute",
            inset:          0,
            filter:         "brightness(0.85) saturate(0.9)",
            transition:     "transform 0.5s ease",
          }}
        />
      ) : (
        <>
          {/* BIG INITIALS */}
          <div
            style={{
              width:        isMobile ? "72px" : "100px",
              height:       isMobile ? "72px" : "100px",
              borderRadius: "50%",
              border:       `2px solid rgba(${rgb},0.4)`,
              background:   `rgba(${rgb},0.08)`,
              display:      "flex",
              alignItems:   "center",
              justifyContent: "center",
              fontFamily:   "'Orbitron', monospace",
              fontSize:     isMobile ? "1.3rem" : "1.8rem",
              fontWeight:   900,
              color:        t.color,
              textShadow:   `0 0 30px ${t.color}`,
              marginBottom: "1rem",
              position:     "relative",
              zIndex:       1,
            }}
          >
            {t.avatar}
          </div>

          {/* PLACEHOLDER LABEL */}
          <div
            style={{
              fontFamily:    "'Space Mono', monospace",
              fontSize:      "0.58rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color:         `rgba(${rgb},0.35)`,
              position:      "relative",
              zIndex:        1,
            }}
          >
            [ photo ]
          </div>

          {/* GRID PATTERN */}
          <div
            style={{
              position:        "absolute",
              inset:           0,
              backgroundImage: `
                linear-gradient(rgba(${rgb},0.04) 1px, transparent 1px),
                linear-gradient(90deg, rgba(${rgb},0.04) 1px, transparent 1px)
              `,
              backgroundSize:  "24px 24px",
              pointerEvents:   "none",
            }}
          />
        </>
      )}

      {/* BOTTOM GRADIENT */}
      <div
        style={{
          position:      "absolute",
          bottom:        0,
          left:          0,
          right:         0,
          height:        "60px",
          background:    "linear-gradient(transparent, rgba(3,4,10,0.6))",
          pointerEvents: "none",
        }}
      />

      {/* TOP ACCENT BAR */}
      <div
        style={{
          position:   "absolute",
          top:        0,
          left:       0,
          right:      0,
          height:     "3px",
          background: `linear-gradient(90deg, ${t.color}, transparent)`,
        }}
      />
    </div>
  );
}

// ── Quote Panel ───────────────────────────────────────────────────────────────
function QuotePanel({ t, rgb, isMobile }) {
  return (
    <div
      style={{
        padding:        isMobile ? "1.5rem 1.2rem 1.5rem" : "2.5rem 2.5rem 2rem",
        display:        "flex",
        flexDirection:  "column",
        justifyContent: "space-between",
        position:       "relative",
      }}
    >
      {/* BIG QUOTE MARK */}
      <div
        style={{
          fontFamily:    "Georgia, serif",
          fontSize:      isMobile ? "5rem" : "8rem",
          lineHeight:    0.7,
          color:         t.color,
          opacity:       0.1,
          position:      "absolute",
          top:           isMobile ? "1rem" : "1.5rem",
          right:         isMobile ? "1rem" : "2rem",
          pointerEvents: "none",
          userSelect:    "none",
        }}
      >
        "
      </div>

      {/* EVENT BADGE */}
      <div style={{ marginBottom: isMobile ? "1rem" : "1.5rem" }}>
        <span
          style={{
            fontFamily:    "'Space Mono', monospace",
            fontSize:      isMobile ? "0.55rem" : "0.62rem",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color:         t.color,
            background:    `rgba(${rgb},0.1)`,
            border:        `1px solid rgba(${rgb},0.2)`,
            padding:       "0.3rem 0.8rem",
            clipPath:
              "polygon(6px 0%, 100% 0%, calc(100% - 6px) 100%, 0% 100%)",
            display:       "inline-block",
          }}
        >
          {t.event}
        </span>
      </div>

      {/* QUOTE */}
      <p
        style={{
          fontFamily:  "'Space Mono', monospace",
          fontSize:    isMobile ? "0.75rem" : "clamp(0.9rem, 1.5vw, 1.05rem)",
          lineHeight:  isMobile ? 1.8 : 1.95,
          color:       "rgba(232,234,240,0.78)",
          fontStyle:   "italic",
          position:    "relative",
          zIndex:      1,
          flex:        1,
          marginBottom: isMobile ? "1.2rem" : "2rem",
        }}
      >
        "{t.quote}"
      </p>

      {/* DIVIDER */}
      <div
        style={{
          width:        "50px",
          height:       "1px",
          background:   `linear-gradient(90deg, ${t.color}, transparent)`,
          marginBottom: "1.2rem",
        }}
      />

      {/* AUTHOR ROW */}
      <div
        style={{
          display:    "flex",
          alignItems: "center",
          gap:        "1rem",
        }}
      >
        {/* SMALL AVATAR */}
        <div
          style={{
            width:          isMobile ? "36px" : "42px",
            height:         isMobile ? "36px" : "42px",
            borderRadius:   "50%",
            border:         `2px solid rgba(${rgb},0.4)`,
            background:     `rgba(${rgb},0.1)`,
            display:        "flex",
            alignItems:     "center",
            justifyContent: "center",
            fontFamily:     "'Orbitron', monospace",
            fontSize:       isMobile ? "0.58rem" : "0.7rem",
            fontWeight:     900,
            color:          t.color,
            flexShrink:     0,
          }}
        >
          {t.avatar}
        </div>

        <div>
          <div
            style={{
              fontFamily:    "'Orbitron', monospace",
              fontSize:      isMobile ? "0.72rem" : "0.82rem",
              fontWeight:    700,
              color:         "#e8eaf0",
              letterSpacing: "0.05em",
            }}
          >
            {t.name}
          </div>
          <div
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize:   isMobile ? "0.6rem" : "0.68rem",
              color:      "#7a7f99",
              marginTop:  "0.2rem",
            }}
          >
            {t.role}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────
export default function Testimonials() {
  const [active, setActive] = useState(0);
  const intervalRef         = useRef();

  const width    = useWindowWidth();
  const isMobile = width < 600;
  const isTablet = width >= 600 && width < 1024;

  const startAuto = () => {
    intervalRef.current = setInterval(() => {
      setActive((prev) => (prev + 1) % testimonials.length);
    }, 4000);
  };

  useEffect(() => {
    startAuto();
    return () => clearInterval(intervalRef.current);
  }, []);

  const goTo = (i) => {
    clearInterval(intervalRef.current);
    setActive(i);
    startAuto();
  };

  const t   = testimonials[active];
  const rgb = t.color === "#00f5c4" ? "0,245,196" : "123,95,255";

  return (
    <section id="testimonials" style={{ position: "relative", zIndex: 1 }}>
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
          Voices
        </p>

        {/* TITLE */}
        <h2
          style={{
            fontFamily:   "'Orbitron', monospace",
            fontSize:     "clamp(1.8rem, 5vw, 3.5rem)",
            fontWeight:   900,
            lineHeight:   1.1,
            margin:       isMobile ? "0 0 2rem 0" : "0 0 4rem 0",
            color:        "#e8eaf0",
          }}
        >
          Our{" "}
          <span style={{ color: "#00f5c4" }}>Testimonials</span>
        </h2>

        {/* MAIN CARD */}
        <div
          key={active}
          style={{
            maxWidth:            isMobile ? "100%" : "960px",
            margin:              "0 auto",
            display:             "grid",
            gridTemplateColumns: isMobile ? "1fr" : "280px 1fr",
            background:          "rgba(255,255,255,0.02)",
            border:              `1px solid rgba(${rgb},0.2)`,
            clipPath:
              "polygon(12px 0%, 100% 0%, calc(100% - 12px) 100%, 0% 100%)",
            boxShadow:           `0 0 60px rgba(${rgb},0.08)`,
            animation:           "fadeInUp 0.5s ease both",
            overflow:            "hidden",
            position:            "relative",
          }}
        >
          <ImagePanel t={t} rgb={rgb} isMobile={isMobile} />
          <QuotePanel t={t} rgb={rgb} isMobile={isMobile} />
        </div>

        {/* DOTS */}
        <div
          style={{
            display:        "flex",
            justifyContent: "center",
            gap:            "0.6rem",
            marginTop:      isMobile ? "1.8rem" : "2.5rem",
          }}
        >
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              style={{
                width:      i === active ? "28px" : "8px",
                height:     "8px",
                borderRadius: "4px",
                background: i === active
                  ? "#00f5c4"
                  : "rgba(0,245,196,0.25)",
                border:     "none",
                cursor:     "pointer",
                transition: "all 0.4s ease",
                padding:    0,
                boxShadow:  i === active
                  ? "0 0 12px rgba(0,245,196,0.5)"
                  : "none",
              }}
            />
          ))}
        </div>

        {/* NAV ARROWS */}
        <div
          style={{
            display:        "flex",
            justifyContent: "center",
            gap:            "1rem",
            marginTop:      "1.5rem",
          }}
        >
          {["←", "→"].map((arrow, i) => (
            <button
              key={i}
              onClick={() =>
                goTo(
                  i === 0
                    ? (active - 1 + testimonials.length) % testimonials.length
                    : (active + 1) % testimonials.length
                )
              }
              style={{
                width:      isMobile ? "38px" : "44px",
                height:     isMobile ? "38px" : "44px",
                background: "rgba(255,255,255,0.03)",
                border:     "1px solid rgba(0,245,196,0.15)",
                color:      "#00f5c4",
                fontSize:   isMobile ? "0.95rem" : "1.1rem",
                cursor:     "pointer",
                clipPath:
                  "polygon(6px 0%, 100% 0%, calc(100% - 6px) 100%, 0% 100%)",
                transition: "all 0.3s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background   = "rgba(0,245,196,0.1)";
                e.currentTarget.style.borderColor  = "#00f5c4";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background   = "rgba(255,255,255,0.03)";
                e.currentTarget.style.borderColor  = "rgba(0,245,196,0.15)";
              }}
            >
              {arrow}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}