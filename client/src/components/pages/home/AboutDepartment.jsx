// src/components/pages/home/AboutDept.jsx

import { useEffect, useRef } from "react";
import deptImage from "../../../assets/dept.png"; // 👈 place your image as src/assets/dept.jpg

export default function AboutDept() {
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

  return (
    <section
      id="department"
      ref={sectionRef}
      style={{
        position: "relative",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "6rem 2rem",
        }}
      >
        <div
          className="reveal"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "4rem",
            alignItems: "center",
          }}
        >
          {/* LEFT — TEXT */}
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
              Our Department
            </p>

            {/* TITLE */}
            <h2
              style={{
                fontFamily: "'Orbitron', monospace",
                fontSize: "clamp(1.8rem, 4vw, 3rem)",
                fontWeight: 900,
                lineHeight: 1.15,
                marginBottom: "1.5rem",
                color: "#e8eaf0",
              }}
            >
              About Department of{" "}
              <span style={{ color: "#00f5c4" }}>Computer Science</span>
            </h2>

            {/* DESCRIPTION */}
            <p
              style={{
                fontSize: "1.05rem",
                lineHeight: 1.9,
                color: "rgba(232,234,240,0.7)",
              }}
            >
              The{" "}
              <strong style={{ color: "#e8eaf0" }}>
                Department of Computer Science Society (DUCSS)
              </strong>{" "}
              is proud to represent the{" "}
              <strong style={{ color: "#e8eaf0" }}>
                Department of Computer Science
              </strong>{" "}
              at the University of Delhi. We are committed to encouraging{" "}
              <strong style={{ color: "#00f5c4" }}>innovation</strong> and{" "}
              <strong style={{ color: "#00f5c4" }}>research</strong>, providing
              students with valuable opportunities for{" "}
              <strong style={{ color: "#00f5c4" }}>skill development</strong>{" "}
              and{" "}
              <strong style={{ color: "#00f5c4" }}>collaboration</strong>. Our
              engaging technical events create remarkable avenues for{" "}
              <strong style={{ color: "#7b5fff" }}>personal</strong> and{" "}
              <strong style={{ color: "#7b5fff" }}>professional growth</strong>.
              The annual technical fest,{" "}
              <strong style={{ color: "#e8eaf0" }}>Sankalan</strong>, brings
              together tech enthusiasts and talented individuals from esteemed
              institutions across the country.
            </p>

            {/* DIVIDER LINE */}
            <div
              style={{
                marginTop: "2rem",
                height: "1px",
                background:
                  "linear-gradient(90deg, #00f5c4 0%, rgba(123,95,255,0.3) 60%, transparent 100%)",
                width: "80%",
              }}
            />

            {/* TAGS */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "0.75rem",
                marginTop: "1.5rem",
              }}
            >
              {[
                "Innovation",
                "Research",
                "Skill Dev",
                "Collaboration",
                "Tech Fest",
              ].map((tag) => (
                <span
                  key={tag}
                  style={{
                    fontFamily: "'Space Mono', monospace",
                    fontSize: "0.65rem",
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    color: "#00f5c4",
                    background: "rgba(0,245,196,0.08)",
                    border: "1px solid rgba(0,245,196,0.2)",
                    padding: "0.35rem 0.85rem",
                    clipPath:
                      "polygon(6px 0%, 100% 0%, calc(100% - 6px) 100%, 0% 100%)",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* RIGHT — IMAGE */}
          <div
            className="reveal"
            style={{
              position: "relative",
            }}
          >
            {/* GLOW BEHIND IMAGE */}
            <div
              style={{
                position: "absolute",
                inset: "-2px",
                background:
                  "linear-gradient(135deg, rgba(0,245,196,0.25), rgba(123,95,255,0.15))",
                clipPath:
                  "polygon(10px 0%, 100% 0%, calc(100% - 10px) 100%, 0% 100%)",
                zIndex: 0,
                filter: "blur(1px)",
              }}
            />

            {/* IMAGE CONTAINER */}
            <div
              style={{
                position: "relative",
                zIndex: 1,
                clipPath:
                  "polygon(10px 0%, 100% 0%, calc(100% - 10px) 100%, 0% 100%)",
                overflow: "hidden",
                border: "1px solid rgba(0,245,196,0.2)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow =
                  "0 0 60px rgba(0,245,196,0.2)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <img
                src={deptImage}
                alt="Department of Computer Science, University of Delhi"
                style={{
                  width: "100%",
                  height: "380px",
                  objectFit: "cover",
                  display: "block",
                  transition: "transform 0.5s ease",
                  filter: "brightness(0.9) saturate(0.85)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.04)";
                  e.currentTarget.style.filter =
                    "brightness(1) saturate(1)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.filter =
                    "brightness(0.9) saturate(0.85)";
                }}
              />

              {/* OVERLAY CORNER LABEL */}
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: "0.8rem 1.2rem",
                  background:
                    "linear-gradient(transparent, rgba(3,4,10,0.85))",
                  fontFamily: "'Space Mono', monospace",
                  fontSize: "0.65rem",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "rgba(232,234,240,0.6)",
                }}
              >
                DUCS · University of Delhi · North Campus
              </div>
            </div>

            {/* CORNER ACCENTS */}
            {/* Top-left */}
            <span
              style={{
                position: "absolute",
                top: "-6px",
                left: "-6px",
                width: "20px",
                height: "20px",
                borderTop: "2px solid #00f5c4",
                borderLeft: "2px solid #00f5c4",
                zIndex: 2,
              }}
            />
            {/* Bottom-right */}
            <span
              style={{
                position: "absolute",
                bottom: "-6px",
                right: "-6px",
                width: "20px",
                height: "20px",
                borderBottom: "2px solid #7b5fff",
                borderRight: "2px solid #7b5fff",
                zIndex: 2,
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}