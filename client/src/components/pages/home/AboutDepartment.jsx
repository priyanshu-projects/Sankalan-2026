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

// ── CountUp ──────────────────────────────────────────────────────────────────
function CountUp({ target, suffix = "" }) {
  const [count, setCount] = useState(0);
  const ref     = useRef();
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const isNum = !isNaN(parseInt(target));
          if (!isNum) { setCount(target); return; }

          const end      = parseInt(target);
          const duration = 1500;
          const step     = Math.ceil(end / (duration / 16));
          let current    = 0;

          const timer = setInterval(() => {
            current += step;
            if (current >= end) {
              setCount(end);
              clearInterval(timer);
            } else {
              setCount(current);
            }
          }, 16);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return (
    <span ref={ref}>
      {typeof count === "number" ? count : target}
      {suffix}
    </span>
  );
}

// ── StatCard ─────────────────────────────────────────────────────────────────
function StatCard({ stat, isMobile }) {
  return (
    <div
      style={{
        padding: isMobile ? "1.2rem 1rem" : "1.5rem",
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(0,245,196,0.15)",
        clipPath:
          "polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)",
        transition: "border-color 0.3s, box-shadow 0.3s",
        position: "relative",
        overflow: "hidden",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "#00f5c4";
        e.currentTarget.style.boxShadow   = "0 0 40px rgba(0,245,196,0.18)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "rgba(0,245,196,0.15)";
        e.currentTarget.style.boxShadow   = "none";
      }}
    >
      {/* top accent */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0,
        height: "2px",
        background: "linear-gradient(90deg, #00f5c4, transparent)",
      }} />

      <div
        style={{
          fontFamily:  "'Orbitron', monospace",
          fontSize:    isMobile ? "1.8rem" : "2.5rem",
          fontWeight:  900,
          color:       "#00f5c4",
          textShadow:  "0 0 20px rgba(0,245,196,0.4)",
          lineHeight:  1,
        }}
      >
        {typeof stat.num === "number" ? (
          <CountUp target={stat.num} suffix={stat.suffix} />
        ) : (
          stat.num
        )}
      </div>

      <div
        style={{
          fontFamily: "'Space Mono', monospace",
          color:      "#7a7f99",
          fontSize:   isMobile ? "0.72rem" : "0.85rem",
          marginTop:  "0.5rem",
          lineHeight: 1.5,
        }}
      >
        {stat.desc}
      </div>
    </div>
  );
}

// ── About ─────────────────────────────────────────────────────────────────────
export default function About() {
  const sectionRef = useRef();
  const width      = useWindowWidth();
  const isMobile   = width < 600;
  const isTablet   = width >= 600 && width < 1024;

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
    const els = sectionRef.current?.querySelectorAll(".about-reveal");
    els?.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const stats = [
    { num: 500,    suffix: "+", desc: "Registered Participants" },
    { num: 30,     suffix: "+", desc: "Colleges Across India"   },
    { num: "₹2L+", suffix: "",  desc: "Prize Pool"              },
    { num: "36H",  suffix: "",  desc: "Of Pure Adrenaline"      },
  ];

  return (
    <section
      id="about"
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
        {/* ── MAIN GRID ── */}
        <div
          className="about-reveal"
          style={{
            opacity:    0,
            transform:  "translateY(30px)",
            transition: "opacity 0.7s ease, transform 0.7s ease",
            display:    "grid",
            gridTemplateColumns: isMobile
              ? "1fr"
              : isTablet
              ? "1fr"
              : "1fr 1fr",
            gap:        isMobile ? "2.5rem" : isTablet ? "3rem" : "4rem",
            alignItems: "center",
          }}
        >
          {/* ── LEFT TEXT ── */}
          <div>
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
              About the Event
            </p>

            {/* TITLE */}
            <h2
              style={{
                fontFamily:   "'Orbitron', monospace",
                fontSize:     "clamp(1.8rem, 5vw, 3.5rem)",
                fontWeight:   900,
                lineHeight:   1.1,
                margin:       "0 0 1.5rem 0",
                color:        "#e8eaf0",
              }}
            >
              The Grand{" "}
              <span style={{ color: "#00f5c4" }}>Convergence</span>
            </h2>

            <p
              style={{
                fontFamily:   "'Space Mono', monospace",
                fontSize:     isMobile ? "0.8rem" : "0.95rem",
                lineHeight:   1.9,
                color:        "rgba(232,234,240,0.7)",
                margin:       "0 0 1rem 0",
              }}
            >
              Sankalan is the flagship annual technical festival of the{" "}
              <strong style={{ color: "#e8eaf0", fontWeight: 700 }}>
                Department of Computer Science (DUCS), University of Delhi
              </strong>
              . It brings together the brightest minds in technology,
              innovation, and design under one roof.
            </p>

            <p
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize:   isMobile ? "0.8rem" : "0.95rem",
                lineHeight: 1.9,
                color:      "rgba(232,234,240,0.7)",
                margin:     "0 0 1rem 0",
              }}
            >
              From high-octane hackathons to thought-provoking paper
              presentations, coding contests to UI/UX challenges — Sankalan
              is where talent meets opportunity and friendships are forged
              in the fire of competition.
            </p>

            <p
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize:   isMobile ? "0.8rem" : "0.95rem",
                lineHeight: 1.9,
                color:      "rgba(232,234,240,0.7)",
                margin:     0,
              }}
            >
              This year, we go bigger, faster, and more ambitious than ever
              before. Are you ready?
            </p>

            {/* CTA */}
            <a
              href="https://unstop.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display:        "inline-block",
                marginTop:      "2rem",
                fontFamily:     "'Orbitron', monospace",
                clipPath:
                  "polygon(12px 0%, 100% 0%, calc(100% - 12px) 100%, 0% 100%)",
                background:     "#00f5c4",
                color:          "#03040a",
                padding:        isMobile ? "0.85rem 1.8rem" : "1rem 2.5rem",
                fontSize:       isMobile ? "0.7rem" : "0.8rem",
                fontWeight:     700,
                letterSpacing:  "0.15em",
                textTransform:  "uppercase",
                textDecoration: "none",
                boxShadow:      "0 0 30px rgba(0,245,196,0.3)",
                transition:     "all 0.3s",
                width:          isMobile ? "100%" : "auto",
                textAlign:      isMobile ? "center" : "left",
                boxSizing:      "border-box",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow =
                  "0 0 50px rgba(0,245,196,0.5)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow =
                  "0 0 30px rgba(0,245,196,0.3)";
              }}
            >
              Join the Movement →
            </a>
          </div>

          {/* ── RIGHT STATS ── */}
          <div
            style={{
              display:             "grid",
              gridTemplateColumns: "1fr 1fr",
              gap:                 isMobile ? "0.8rem" : "1.2rem",
            }}
          >
            {stats.map((stat, i) => (
              <StatCard key={i} stat={stat} isMobile={isMobile} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}