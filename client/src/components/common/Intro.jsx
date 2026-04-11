import { useEffect, useState } from "react";

export default function Intro({ onFinish }) {
  const [phase, setPhase] = useState(0);
  // phase 0 = black
  // phase 1 = show text
  // phase 2 = fade out

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 500);
    const t2 = setTimeout(() => setPhase(2), 2500);
    const t3 = setTimeout(() => onFinish(), 3200);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [onFinish]);

  return (
    <div
      style={{ fontFamily: "'Orbitron', monospace" }}
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#03040a] transition-opacity duration-700 ${
        phase === 2 ? "opacity-0" : "opacity-100"
      }`}
    >
      {/* GRID BG */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,245,196,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,245,196,0.04) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
          maskImage: "radial-gradient(ellipse 80% 60% at 50% 50%, black 30%, transparent 100%)",
        }}
      />

      {/* CONTENT */}
      <div
        className={`flex flex-col items-center gap-4 transition-all duration-700 ${
          phase >= 1 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        {/* top line */}
        <p
          style={{ fontFamily: "'Space Mono', monospace" }}
          className="text-[#7a7f99] text-[0.72rem] tracking-[0.4em] uppercase"
        >
          DUCS · University of Delhi
        </p>

        {/* main title */}
        <h1
          className="text-[clamp(3rem,12vw,8rem)] font-black leading-none tracking-tight"
          style={{
            background: "linear-gradient(135deg, #ffffff 0%, #00f5c4 40%, #7b5fff 80%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          SANKALAN
        </h1>

        {/* year */}
        <p
          style={{ fontFamily: "'Space Mono', monospace" }}
          className="text-[#00f5c4] text-[1rem] tracking-[0.5em]"
        >
          2 0 2 6
        </p>

        {/* loading bar */}
        <div className="w-48 h-[1px] bg-[rgba(0,245,196,0.15)] mt-4 overflow-hidden">
          <div
            className="h-full bg-[#00f5c4] transition-all duration-[2000ms] ease-out"
            style={{ width: phase >= 1 ? "100%" : "0%" }}
          />
        </div>
      </div>
    </div>
  );
}