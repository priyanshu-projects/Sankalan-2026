import { useEffect, useRef, useState } from "react";

function CountUp({ target, suffix = "" }) {
  const [count, setCount] = useState(0);
  const ref = useRef();
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const isNum = !isNaN(parseInt(target));
          if (!isNum) { setCount(target); return; }

          const end = parseInt(target);
          const duration = 1500;
          const step = Math.ceil(end / (duration / 16));
          let current = 0;

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

export default function About() {
  const sectionRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            observer.unobserve(e.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    const els = sectionRef.current?.querySelectorAll(".reveal");
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
      style={{
        position: "relative",
        // ❌ NO background here — stars show through!
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "6rem 2rem",
        }}
      >
        <div className="reveal grid md:grid-cols-2 gap-16 items-center">

          {/* LEFT TEXT */}
          <div>
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
              About the Event
            </p>

            {/* TITLE */}
            <h2
              style={{
                fontFamily: "'Orbitron', monospace",
                fontSize: "clamp(2rem, 5vw, 3.5rem)",
                fontWeight: 900,
                lineHeight: 1.1,
                marginBottom: "1.5rem",
                color: "#e8eaf0",
              }}
            >
              The Grand{" "}
              <span style={{ color: "#00f5c4" }}>Convergence</span>
            </h2>

            <p style={{ fontSize: "1.05rem", lineHeight: 1.8, color: "rgba(232,234,240,0.7)", marginBottom: "1rem" }}>
              Sankalan is the flagship annual technical festival of the{" "}
              <strong style={{ color: "#e8eaf0" }}>
                Department of Computer Science (DUCS), University of Delhi
              </strong>
              . It brings together the brightest minds in technology,
              innovation, and design under one roof.
            </p>

            <p style={{ fontSize: "1.05rem", lineHeight: 1.8, color: "rgba(232,234,240,0.7)", marginBottom: "1rem" }}>
              From high-octane hackathons to thought-provoking paper
              presentations, coding contests to UI/UX challenges — Sankalan is
              where talent meets opportunity and friendships are forged in the
              fire of competition.
            </p>

            <p style={{ fontSize: "1.05rem", lineHeight: 1.8, color: "rgba(232,234,240,0.7)" }}>
              This year, we go bigger, faster, and more ambitious than ever
              before. Are you ready?
            </p>

            {/* CTA */}
            <a
              href="#register"
              style={{
                display: "inline-block",
                marginTop: "2rem",
                fontFamily: "'Orbitron', monospace",
                clipPath: "polygon(12px 0%, 100% 0%, calc(100% - 12px) 100%, 0% 100%)",
                background: "#00f5c4",
                color: "#03040a",
                padding: "1rem 2.5rem",
                fontSize: "0.8rem",
                fontWeight: 700,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                textDecoration: "none",
                boxShadow: "0 0 30px rgba(0,245,196,0.3)",
                transition: "all 0.3s",
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
              Join the Movement
            </a>
          </div>

          {/* RIGHT STATS */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
            {stats.map((stat, i) => (
              <div
                key={i}
                style={{
                  padding: "1.5rem",
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(0,245,196,0.15)",
                  clipPath: "polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)",
                  transition: "border-color 0.3s, box-shadow 0.3s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "#00f5c4";
                  e.currentTarget.style.boxShadow = "0 0 40px rgba(0,245,196,0.18)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(0,245,196,0.15)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <div
                  style={{
                    fontFamily: "'Orbitron', monospace",
                    fontSize: "2.5rem",
                    fontWeight: 900,
                    color: "#00f5c4",
                    textShadow: "0 0 20px rgba(0,245,196,0.4)",
                    lineHeight: 1,
                  }}
                >
                  {typeof stat.num === "number" ? (
                    <CountUp target={stat.num} suffix={stat.suffix} />
                  ) : (
                    stat.num
                  )}
                </div>
                <div style={{ color: "#7a7f99", fontSize: "0.9rem", marginTop: "0.5rem" }}>
                  {stat.desc}
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}