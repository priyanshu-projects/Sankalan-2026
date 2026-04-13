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

// ── Main Component ────────────────────────────────────────────────────────────
export default function AboutDept() {
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
    const els = sectionRef.current?.querySelectorAll(".dept-reveal");
    els?.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const highlights = [
    { icon: "🎓", label: "Est. 1981",         desc: "Over 4 decades of excellence" },
    { icon: "🔬", label: "Research Driven",    desc: "Cutting-edge CS research"     },
    { icon: "🤝", label: "Industry Connect",   desc: "Strong alumni & industry ties" },
    { icon: "🏆", label: "Sankalan Annual",    desc: "Flagship technical fest"       },
  ];

  return (
    <section
      id="about-dept"
      ref={sectionRef}
      style={{ position: "relative", zIndex: 1, overflow: "hidden" }}
    >
      {/* ── GRID BG ── */}
      <div style={{
        position:        "absolute",
        inset:           0,
        pointerEvents:   "none",
        backgroundImage: `
          linear-gradient(rgba(123,95,255,0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(123,95,255,0.03) 1px, transparent 1px)
        `,
        backgroundSize:  "60px 60px",
        maskImage:
          "radial-gradient(ellipse 80% 60% at 50% 50%, black 30%, transparent 100%)",
        WebkitMaskImage:
          "radial-gradient(ellipse 80% 60% at 50% 50%, black 30%, transparent 100%)",
        zIndex: 0,
      }} />

      <div style={{
        maxWidth: "1200px",
        margin:   "0 auto",
        padding:  isMobile
          ? "4rem 1rem"
          : isTablet
          ? "5rem 1.5rem"
          : "6rem 2rem",
        position: "relative",
        zIndex:   1,
      }}>

        {/* ── SECTION TAG ── */}
        <div
          className="dept-reveal"
          style={{
            opacity:    0,
            transform:  "translateY(30px)",
            transition: "opacity 0.7s ease, transform 0.7s ease",
            marginBottom: isMobile ? "2rem" : "3rem",
          }}
        >
          <p style={{
            display:       "flex",
            alignItems:    "center",
            gap:           "0.8rem",
            fontFamily:    "'Space Mono', monospace",
            fontSize:      "0.72rem",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color:         "#7b5fff",
            margin:        "0 0 0.8rem 0",
          }}>
            <span style={{
              display:    "block",
              width:      "30px",
              height:     "1px",
              background: "#7b5fff",
              flexShrink: 0,
            }} />
            The Institution
          </p>

          <h2 style={{
            fontFamily: "'Orbitron', monospace",
            fontSize:   "clamp(1.8rem, 5vw, 3.5rem)",
            fontWeight: 900,
            lineHeight: 1.1,
            color:      "#e8eaf0",
            margin:     0,
          }}>
            Department of{" "}
            <span style={{ color: "#7b5fff" }}>Computer Science</span>
          </h2>
        </div>

        {/* ── MAIN GRID: image + text ── */}
        <div
          className="dept-reveal"
          style={{
            opacity:    0,
            transform:  "translateY(30px)",
            transition: "opacity 0.7s 0.15s ease, transform 0.7s 0.15s ease",
            display:    "grid",
            gridTemplateColumns: isMobile
              ? "1fr"
              : isTablet
              ? "1fr"
              : "1fr 1fr",
            gap:        isMobile ? "2rem" : "4rem",
            alignItems: "center",
            marginBottom: isMobile ? "2.5rem" : "4rem",
          }}
        >
          {/* ── LEFT: TEXT ── */}
          <div style={{ order: isMobile ? 2 : 1 }}>
            <p style={{
              fontFamily: "'Space Mono', monospace",
              fontSize:   isMobile ? "0.8rem" : "0.92rem",
              lineHeight: 1.9,
              color:      "rgba(232,234,240,0.75)",
              margin:     "0 0 1.2rem 0",
            }}>
              The{" "}
              <strong style={{ color: "#e8eaf0", fontWeight: 700 }}>
                Delhi University Computer Science Society
              </strong>{" "}
              is proud to represent the{" "}
              <strong style={{ color: "#7b5fff", fontWeight: 700 }}>
                Department of Computer Science
              </strong>{" "}
              at the University of Delhi — one of India's most prestigious
              academic institutions.
            </p>

            <p style={{
              fontFamily: "'Space Mono', monospace",
              fontSize:   isMobile ? "0.8rem" : "0.92rem",
              lineHeight: 1.9,
              color:      "rgba(232,234,240,0.75)",
              margin:     "0 0 1.2rem 0",
            }}>
              We are committed to encouraging{" "}
              <strong style={{ color: "#e8eaf0" }}>innovation</strong> and{" "}
              <strong style={{ color: "#e8eaf0" }}>research</strong>, providing
              students with valuable opportunities for{" "}
              <strong style={{ color: "#e8eaf0" }}>skill development</strong> and{" "}
              <strong style={{ color: "#e8eaf0" }}>collaboration</strong>.
            </p>

            <p style={{
              fontFamily: "'Space Mono', monospace",
              fontSize:   isMobile ? "0.8rem" : "0.92rem",
              lineHeight: 1.9,
              color:      "rgba(232,234,240,0.75)",
              margin:     0,
            }}>
              Our engaging technical events create remarkable avenues for{" "}
              <strong style={{ color: "#e8eaf0" }}>personal</strong> and{" "}
              <strong style={{ color: "#e8eaf0" }}>professional growth</strong>.
              The annual technical fest,{" "}
              <strong style={{ color: "#7b5fff" }}>Sankalan</strong>, brings
              together tech enthusiasts and talented individuals from esteemed
              institutions across the country.
            </p>

            {/* ── DEPT LINK ── */}
            <a
              href="http://cs.du.ac.in"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display:        "inline-block",
                marginTop:      "2rem",
                fontFamily:     "'Orbitron', monospace",
                clipPath:
                  "polygon(12px 0%, 100% 0%, calc(100% - 12px) 100%, 0% 100%)",
                border:         "1.5px solid rgba(123,95,255,0.4)",
                color:          "#7b5fff",
                padding:        isMobile ? "0.85rem 1.8rem" : "1rem 2.5rem",
                fontSize:       isMobile ? "0.7rem" : "0.78rem",
                fontWeight:     700,
                letterSpacing:  "0.15em",
                textTransform:  "uppercase",
                textDecoration: "none",
                transition:     "all 0.3s",
                width:          isMobile ? "100%" : "auto",
                textAlign:      "center",
                boxSizing:      "border-box",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background  = "rgba(123,95,255,0.12)";
                e.currentTarget.style.borderColor = "#7b5fff";
                e.currentTarget.style.boxShadow   = "0 0 30px rgba(123,95,255,0.3)";
                e.currentTarget.style.transform   = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background  = "transparent";
                e.currentTarget.style.borderColor = "rgba(123,95,255,0.4)";
                e.currentTarget.style.boxShadow   = "none";
                e.currentTarget.style.transform   = "translateY(0)";
              }}
            >
              Visit Department →
            </a>
          </div>

          {/* ── RIGHT: IMAGE ── */}
          <div
            style={{
              order:    isMobile ? 1 : 2,
              position: "relative",
            }}
          >
            {/* Glow behind image */}
            <div style={{
              position:   "absolute",
              inset:      "-20px",
              background: "radial-gradient(ellipse, rgba(123,95,255,0.12) 0%, transparent 70%)",
              pointerEvents: "none",
              zIndex:     0,
            }} />

            {/* Image frame */}
            <div style={{
              position:  "relative",
              zIndex:    1,
              border:    "1px solid rgba(123,95,255,0.25)",
              clipPath:  isMobile
                ? "polygon(14px 0%, 100% 0%, calc(100% - 14px) 100%, 0% 100%)"
                : "polygon(20px 0%, 100% 0%, calc(100% - 20px) 100%, 0% 100%)",
              overflow:  "hidden",
              background: "rgba(123,95,255,0.05)",
            }}>
              {/* Top accent line */}
              <div style={{
                position:   "absolute",
                top:        0, left: 0, right: 0,
                height:     "2px",
                background: "linear-gradient(90deg, #7b5fff, transparent)",
                zIndex:     2,
              }} />

              <img
                src="/dept.png"
                alt="Department of Computer Science, University of Delhi"
                style={{
                  width:      "100%",
                  height:     isMobile ? "220px" : "320px",
                  objectFit:  "cover",
                  display:    "block",
                  filter:     "brightness(0.9) saturate(0.85)",
                  transition: "filter 0.4s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.filter = "brightness(1) saturate(1)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.filter = "brightness(0.9) saturate(0.85)";
                }}
              />

              {/* Bottom caption bar */}
              <div style={{
                position:   "absolute",
                bottom:     0, left: 0, right: 0,
                padding:    "0.6rem 1rem",
                background: "linear-gradient(0deg, rgba(3,4,10,0.85), transparent)",
                fontFamily: "'Space Mono', monospace",
                fontSize:   "0.58rem",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color:      "#7b5fff",
                zIndex:     2,
              }}>
                📍 University of Delhi · North Campus
              </div>
            </div>

            {/* Corner decorations */}
            <div style={{
              position:    "absolute",
              top:         "-8px", right: "-8px",
              width:       "20px", height: "20px",
              borderTop:   "2px solid #7b5fff",
              borderRight: "2px solid #7b5fff",
              zIndex:      2,
            }} />
            <div style={{
              position:     "absolute",
              bottom:       "-8px", left: "-8px",
              width:        "20px", height: "20px",
              borderBottom: "2px solid #7b5fff",
              borderLeft:   "2px solid #7b5fff",
              zIndex:       2,
            }} />
          </div>
        </div>

        {/* ── HIGHLIGHT CARDS ── */}
        <div
          className="dept-reveal"
          style={{
            opacity:    0,
            transform:  "translateY(30px)",
            transition: "opacity 0.7s 0.3s ease, transform 0.7s 0.3s ease",
            display:    "grid",
            gridTemplateColumns: isMobile
              ? "1fr 1fr"
              : isTablet
              ? "repeat(4, 1fr)"
              : "repeat(4, 1fr)",
            gap: isMobile ? "0.8rem" : "1.2rem",
          }}
        >
          {highlights.map((h, i) => (
            <div
              key={i}
              style={{
                padding:    isMobile ? "1rem 0.8rem" : "1.4rem 1.2rem",
                background: "rgba(255,255,255,0.02)",
                border:     "1px solid rgba(123,95,255,0.15)",
                clipPath:
                  "polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)",
                transition: "border-color 0.3s, box-shadow 0.3s, background 0.3s",
                position:   "relative",
                overflow:   "hidden",
                cursor:     "default",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "#7b5fff";
                e.currentTarget.style.background  = "rgba(123,95,255,0.07)";
                e.currentTarget.style.boxShadow   = "0 0 30px rgba(123,95,255,0.15)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(123,95,255,0.15)";
                e.currentTarget.style.background  = "rgba(255,255,255,0.02)";
                e.currentTarget.style.boxShadow   = "none";
              }}
            >
              {/* top accent */}
              <div style={{
                position:   "absolute",
                top: 0, left: 0, right: 0,
                height:     "2px",
                background: "linear-gradient(90deg, #7b5fff, transparent)",
              }} />

              <div style={{ fontSize: isMobile ? "1.4rem" : "1.8rem", marginBottom: "0.6rem" }}>
                {h.icon}
              </div>

              <div style={{
                fontFamily:    "'Orbitron', monospace",
                fontSize:      isMobile ? "0.62rem" : "0.72rem",
                fontWeight:    700,
                color:         "#7b5fff",
                letterSpacing: "0.05em",
                marginBottom:  "0.3rem",
                lineHeight:    1.3,
              }}>
                {h.label}
              </div>

              <div style={{
                fontFamily: "'Space Mono', monospace",
                fontSize:   isMobile ? "0.58rem" : "0.65rem",
                color:      "#7a7f99",
                lineHeight: 1.5,
              }}>
                {h.desc}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}