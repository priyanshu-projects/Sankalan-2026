import { useEffect, useRef } from "react";

export default function Hero() {
  const daysRef = useRef();
  const hoursRef = useRef();
  const minsRef = useRef();
  const secsRef = useRef();

  useEffect(() => {
    const target = new Date("2025-11-08T09:00:00");
    const tick = () => {
      const diff = target - new Date();
      if (diff <= 0) return;
      const d = Math.floor(diff / 86400000);
      const h = Math.floor((diff % 86400000) / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      const s = Math.floor((diff % 60000) / 1000);
      if (daysRef.current) daysRef.current.textContent = String(d).padStart(2, "0");
      if (hoursRef.current) hoursRef.current.textContent = String(h).padStart(2, "0");
      if (minsRef.current) minsRef.current.textContent = String(m).padStart(2, "0");
      if (secsRef.current) secsRef.current.textContent = String(s).padStart(2, "0");
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <section
      id="home"
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "6rem 2rem 4rem", // top padding for navbar
        overflow: "hidden",
        zIndex: 1,
      }}
    >
      {/* GRID BG */}
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
          maskImage: "radial-gradient(ellipse 80% 60% at 50% 0%, black 30%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 80% 60% at 50% 0%, black 30%, transparent 100%)",
          zIndex: 0,
        }}
      />

      {/* BADGE */}
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "0.6rem",
          border: "1px solid rgba(0,245,196,0.15)",
          padding: "0.4rem 1rem",
          marginBottom: "2rem",
          fontFamily: "'Space Mono', monospace",
          fontSize: "0.72rem",
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          color: "#00f5c4",
          background: "rgba(0,245,196,0.06)",
          animation: "fadeInDown 1s ease both",
          position: "relative",
          zIndex: 1,
        }}
      >
        <span
          style={{
            width: "6px",
            height: "6px",
            borderRadius: "50%",
            background: "#00f5c4",
            display: "inline-block",
            animation: "pulse 1.5s infinite",
          }}
        />
        DUCS Annual Tech Fest · University of Delhi
      </div>

      {/* TITLE WRAPPER — needed for glitch positioning */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          animation: "fadeInUp 1s 0.2s ease both",
          lineHeight: 0.9,
        }}
      >
        {/* MAIN TITLE */}
        <h1
          style={{
            fontFamily: "'Orbitron', monospace",
            fontSize: "clamp(4rem, 11vw, 9rem)",
            fontWeight: 900,
            letterSpacing: "-0.02em",
            lineHeight: 0.9,
            background: "linear-gradient(135deg, #ffffff 0%, #00f5c4 40%, #7b5fff 80%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            margin: 0,
            padding: 0,
            position: "relative",
          }}
        >
          SANKALAN

          {/* GLITCH LAYER */}
          <span
            aria-hidden="true"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              fontFamily: "'Orbitron', monospace",
              fontSize: "clamp(4rem, 11vw, 9rem)",
              fontWeight: 900,
              letterSpacing: "-0.02em",
              lineHeight: 0.9,
              background: "linear-gradient(135deg, #ff3e6c, transparent)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              animation: "glitch 4s infinite",
              pointerEvents: "none",
            }}
          >
            SANKALAN
          </span>
        </h1>
      </div>

      {/* SUB HEADING */}
      <p
        style={{
          fontFamily: "'Space Mono', monospace",
          fontSize: "clamp(0.8rem, 2vw, 1rem)",
          color: "#7a7f99",
          letterSpacing: "0.25em",
          textTransform: "uppercase",
          marginTop: "1rem",
          animation: "fadeInUp 1s 0.4s ease both",
          position: "relative",
          zIndex: 1,
        }}
      >
        <span style={{ color: "#00f5c4" }}>2025</span>
        &nbsp;·&nbsp; Department of Computer Science
      </p>

      {/* DESC */}
      <p
        style={{
          maxWidth: "600px",
          margin: "1.5rem auto 0",
          fontSize: "1.05rem",
          lineHeight: 1.7,
          color: "rgba(232,234,240,0.7)",
          animation: "fadeInUp 1s 0.6s ease both",
          position: "relative",
          zIndex: 1,
        }}
      >
        Where code meets creativity. India's most electrifying college tech
        festival returns — 36 hours, infinite ideas, one legendary weekend.
      </p>

      {/* BUTTONS */}
      <div
        style={{
          display: "flex",
          gap: "1rem",
          justifyContent: "center",
          flexWrap: "wrap",
          marginTop: "2rem",
          animation: "fadeInUp 1s 0.8s ease both",
          position: "relative",
          zIndex: 1,
        }}
      >
        <a
          href="#register"
          style={{
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
            display: "inline-block",
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
            fontFamily: "'Orbitron', monospace",
            clipPath: "polygon(12px 0%, 100% 0%, calc(100% - 12px) 100%, 0% 100%)",
            border: "1.5px solid rgba(255,255,255,0.2)",
            color: "#e8eaf0",
            padding: "1rem 2.5rem",
            fontSize: "0.8rem",
            fontWeight: 700,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            textDecoration: "none",
            transition: "all 0.3s",
            display: "inline-block",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "#7b5fff";
            e.currentTarget.style.color = "#7b5fff";
            e.currentTarget.style.boxShadow = "0 0 30px rgba(123,95,255,0.3)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)";
            e.currentTarget.style.color = "#e8eaf0";
            e.currentTarget.style.boxShadow = "none";
          }}
        >
          Explore More
        </a>
      </div>

      {/* COUNTDOWN */}
      <div
        style={{
          display: "flex",
          gap: "1.5rem",
          justifyContent: "center",
          marginTop: "3rem",
          animation: "fadeInUp 1s 1s ease both",
          position: "relative",
          zIndex: 1,
        }}
      >
        {[
          { ref: daysRef, label: "Days" },
          { ref: hoursRef, label: "Hours" },
          { ref: minsRef, label: "Mins" },
          { ref: secsRef, label: "Secs" },
        ].map((unit, i) => (
          <div
            key={i}
            style={{
              textAlign: "center",
              minWidth: "80px",
              padding: "1rem 0.5rem",
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(0,245,196,0.15)",
              clipPath: "polygon(6px 0%, 100% 0%, calc(100% - 6px) 100%, 0% 100%)",
            }}
          >
            <div
              ref={unit.ref}
              style={{
                fontFamily: "'Orbitron', monospace",
                fontSize: "2.2rem",
                fontWeight: 900,
                color: "#00f5c4",
                textShadow: "0 0 20px rgba(0,245,196,0.4)",
                lineHeight: 1,
              }}
            >
              00
            </div>
            <div
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: "0.6rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "#7a7f99",
                marginTop: "0.4rem",
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