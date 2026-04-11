import { useEffect, useRef } from "react";

const reasons = [
  {
    icon: "⚡",
    title: "High-Octane Competitions",
    desc: "From hackathons to coding contests, every event is designed to push your limits and bring out the best in you.",
    color: "#00f5c4",
  },
  {
    icon: "🧠",
    title: "Learn from the Best",
    desc: "Workshops, talks and sessions led by industry experts, researchers and senior developers from top tech companies.",
    color: "#7b5fff",
  },
  {
    icon: "🤝",
    title: "Network & Collaborate",
    desc: "Meet like-minded tech enthusiasts from 30+ colleges across India. Build friendships and teams that last beyond the fest.",
    color: "#00f5c4",
  },
  {
    icon: "🏆",
    title: "Win Big",
    desc: "A prize pool of ₹2L+ across events. Certificates, goodies, internship opportunities and recognition await.",
    color: "#7b5fff",
  },
  {
    icon: "🚀",
    title: "Launch Your Ideas",
    desc: "Pitch your startup ideas, showcase projects and get feedback from mentors who've built real products.",
    color: "#00f5c4",
  },
  {
    icon: "🎨",
    title: "More Than Just Code",
    desc: "UI/UX battles, design sprints, paper presentations — Sankalan celebrates every dimension of technology.",
    color: "#7b5fff",
  },
];

export default function WhySankalan() {
  const sectionRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.style.opacity = "1";
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

  return (
    <section
      id="why"
      ref={sectionRef}
      style={{ position: "relative", zIndex: 1 }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "6rem 2rem",
        }}
      >
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
          Reasons to Join
        </p>

        {/* TITLE */}
        <h2
          style={{
            fontFamily: "'Orbitron', monospace",
            fontSize: "clamp(2rem, 5vw, 3.5rem)",
            fontWeight: 900,
            lineHeight: 1.1,
            marginBottom: "1rem",
            color: "#e8eaf0",
          }}
        >
          Why{" "}
          <span style={{ color: "#00f5c4" }}>Sankalan?</span>
        </h2>

        <p
          style={{
            fontSize: "1rem",
            color: "rgba(232,234,240,0.6)",
            maxWidth: "560px",
            lineHeight: 1.8,
            marginBottom: "4rem",
          }}
        >
          More than a tech fest — Sankalan is an experience that transforms
          students into innovators, competitors into collaborators.
        </p>

        {/* GRID */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {reasons.map((r, i) => (
            <div
              key={i}
              className="why-card"
              style={{
                padding: "2rem",
                background: "rgba(255,255,255,0.02)",
                border: `1px solid rgba(0,245,196,0.12)`,
                clipPath:
                  "polygon(10px 0%, 100% 0%, calc(100% - 10px) 100%, 0% 100%)",
                opacity: 0,
                transform: "translateY(30px)",
                transition: `opacity 0.6s ${i * 0.1}s ease, transform 0.6s ${i * 0.1}s ease`,
                cursor: "default",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = r.color;
                e.currentTarget.style.background = `rgba(${
                  r.color === "#00f5c4" ? "0,245,196" : "123,95,255"
                },0.05)`;
                e.currentTarget.style.boxShadow = `0 0 40px rgba(${
                  r.color === "#00f5c4" ? "0,245,196" : "123,95,255"
                },0.12)`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(0,245,196,0.12)";
                e.currentTarget.style.background = "rgba(255,255,255,0.02)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              {/* ICON */}
              <div
                style={{
                  fontSize: "2.2rem",
                  marginBottom: "1rem",
                  lineHeight: 1,
                }}
              >
                {r.icon}
              </div>

              {/* TITLE */}
              <h3
                style={{
                  fontFamily: "'Orbitron', monospace",
                  fontSize: "0.95rem",
                  fontWeight: 700,
                  color: r.color,
                  letterSpacing: "0.05em",
                  marginBottom: "0.8rem",
                  textShadow: `0 0 20px ${r.color}66`,
                }}
              >
                {r.title}
              </h3>

              {/* DESC */}
              <p
                style={{
                  fontSize: "0.9rem",
                  color: "rgba(232,234,240,0.6)",
                  lineHeight: 1.8,
                }}
              >
                {r.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}