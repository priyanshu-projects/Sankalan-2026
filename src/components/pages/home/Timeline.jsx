import { useEffect, useRef } from "react";

const events = [
  {
    year: "2005",
    title: "Inception of Sankalan",
    desc: "Sankalan began as a small coding fest with a vision to empower tech enthusiasts.",
    color: "#00f5c4",
    side: "left",
  },
  {
    year: "2012",
    title: "Introduction of AI and Big Data",
    desc: "Expanded into AI and Big Data domains, attracting national-level participants.",
    color: "#00f5c4",
    side: "right",
  },
  {
    year: "2017",
    title: "Launching the Extraordinary",
    desc: "Entered \"ALACRITY\" the photography competition of DUCS where every click is your chance to shine.",
    color: "#00f5c4",
    side: "left",
  },
  {
    year: "2023",
    title: "Participation That Spoke Volumes",
    desc: "SANKALAN'23 saw an outstanding participation, showcasing passion, energy, and a commitment that went above and beyond expectations. Empowered by the support and funding from DRDO.",
    color: "#00f5c4",
    side: "right",
  },
  {
    year: "2025",
    title: "Sankalan 21st Edition",
    desc: "Celebrating 20 years of tech brilliance, expanding into AI, Cyber Security and Quantum Computing domains.",
    color: "#00f5c4",
    side: "left",
  },
];

export default function Timeline() {
  const sectionRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.style.opacity = "1";
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
          Our Journey
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
          Sankalan{" "}
          <span style={{ color: "#00f5c4" }}>Timeline</span>
        </h2>

        <p
          style={{
            fontSize: "1rem",
            color: "rgba(232,234,240,0.6)",
            maxWidth: "500px",
            lineHeight: 1.8,
            marginBottom: "5rem",
          }}
        >
          Two decades of innovation, passion and technology — from a small
          coding fest to a national-level phenomenon.
        </p>

        {/* TIMELINE WRAPPER */}
        <div style={{ position: "relative" }}>

          {/* CENTER LINE */}
          <div
            style={{
              position: "absolute",
              left: "50%",
              top: 0,
              bottom: 0,
              width: "2px",
              background:
                "linear-gradient(to bottom, transparent, #00f5c4 8%, #7b5fff 92%, transparent)",
              transform: "translateX(-50%)",
              zIndex: 0,
            }}
          />

          {/* ITEMS */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "3.5rem",
            }}
          >
            {events.map((ev, i) => (
              <div
                key={i}
                className="tl-item"
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 60px 1fr",
                  alignItems: "center",
                  opacity: 0,
                  transform: `translateX(${
                    ev.side === "left" ? "-50px" : "50px"
                  })`,
                  transition: `opacity 0.7s ${i * 0.15}s ease,
                               transform 0.7s ${i * 0.15}s ease`,
                }}
              >
                {/* LEFT SLOT */}
                <div style={{ padding: "0 2.5rem 0 0" }}>
                  {ev.side === "left" ? (
                    <EventCard ev={ev} align="right" />
                  ) : (
                    <div /> /* empty */
                  )}
                </div>

                {/* CENTER DOT */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    position: "relative",
                    zIndex: 1,
                  }}
                >
                  {/* OUTER RING */}
                  <div
                    style={{
                      width: "22px",
                      height: "22px",
                      borderRadius: "50%",
                      border: `2px solid #00f5c4`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background: "#03040a",
                      boxShadow: `0 0 20px rgba(0,245,196,0.4)`,
                      flexShrink: 0,
                    }}
                  >
                    {/* INNER DOT */}
                    <div
                      style={{
                        width: "9px",
                        height: "9px",
                        borderRadius: "50%",
                        background: "#00f5c4",
                        boxShadow: `0 0 10px #00f5c4`,
                      }}
                    />
                  </div>
                </div>

                {/* RIGHT SLOT */}
                <div style={{ padding: "0 0 0 2.5rem" }}>
                  {ev.side === "right" ? (
                    <EventCard ev={ev} align="left" />
                  ) : (
                    <div /> /* empty */
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function EventCard({ ev, align }) {
  return (
    <div
      style={{
        padding: "1.8rem 2rem",
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(0,245,196,0.15)",
        clipPath:
          "polygon(10px 0%, 100% 0%, calc(100% - 10px) 100%, 0% 100%)",
        transition: "all 0.3s",
        textAlign: align,
        position: "relative",
        overflow: "hidden",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "#00f5c4";
        e.currentTarget.style.background = "rgba(0,245,196,0.05)";
        e.currentTarget.style.boxShadow =
          "0 0 40px rgba(0,245,196,0.12)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "rgba(0,245,196,0.15)";
        e.currentTarget.style.background = "rgba(255,255,255,0.03)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      {/* SUBTLE BG YEAR WATERMARK */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          right: align === "right" ? "1rem" : "auto",
          left: align === "left" ? "1rem" : "auto",
          transform: "translateY(-50%)",
          fontFamily: "'Orbitron', monospace",
          fontSize: "5rem",
          fontWeight: 900,
          color: "rgba(0,245,196,0.04)",
          pointerEvents: "none",
          userSelect: "none",
          lineHeight: 1,
        }}
      >
        {ev.year}
      </div>

      {/* YEAR */}
      <div
        style={{
          fontFamily: "'Orbitron', monospace",
          fontSize: "1.3rem",
          fontWeight: 900,
          color: "#00f5c4",
          textShadow: "0 0 20px rgba(0,245,196,0.5)",
          marginBottom: "0.6rem",
          letterSpacing: "0.08em",
          position: "relative",
          zIndex: 1,
        }}
      >
        {ev.year}
      </div>

      {/* TITLE */}
      <h3
        style={{
          fontFamily: "'Orbitron', monospace",
          fontSize: "0.95rem",
          fontWeight: 700,
          color: "#e8eaf0",
          marginBottom: "0.8rem",
          letterSpacing: "0.03em",
          lineHeight: 1.4,
          position: "relative",
          zIndex: 1,
        }}
      >
        {ev.title}
      </h3>

      {/* DIVIDER */}
      <div
        style={{
          width: "40px",
          height: "1px",
          background: "linear-gradient(90deg, #00f5c4, transparent)",
          marginBottom: "0.8rem",
          marginLeft: align === "right" ? "auto" : "0",
          marginRight: align === "right" ? "0" : "auto",
          transform: align === "right" ? "scaleX(-1)" : "none",
          position: "relative",
          zIndex: 1,
        }}
      />

      {/* DESC */}
      <p
        style={{
          fontSize: "0.85rem",
          color: "rgba(232,234,240,0.6)",
          lineHeight: 1.8,
          position: "relative",
          zIndex: 1,
        }}
      >
        {ev.desc}
      </p>
    </div>
  );
}