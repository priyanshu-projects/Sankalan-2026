import { useEffect, useState } from "react";

export default function Intro({ onFinish }) {
  const [showImage, setShowImage] = useState(false);
  const [zoom, setZoom] = useState(false);

  useEffect(() => {
    // 1. black screen → image flash
    const t1 = setTimeout(() => setShowImage(true), 600);

    // 2. zoom start
    const t2 = setTimeout(() => setZoom(true), 1200);

    // 3. finish intro
    const t3 = setTimeout(() => onFinish(), 2500);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [onFinish]);

  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center z-[9999] overflow-hidden">
      
      {/* Image */}
      {showImage && (
        <img
          src="/ironman.jpeg"   // ⚠️ image public folder me honi chahiye
          alt="intro"
          className={`
            transition-all duration-[1200ms] ease-in-out
            ${zoom ? "scale-[3]" : "scale-100"}
            origin-[50%_60%]   // arc reactor approx center ke liye
            object-cover
          `}
        />
      )}

      {/* Glow effect (optional but sexy) */}
      {zoom && (
        <div className="absolute w-40 h-40 bg-cyan-400 rounded-full blur-3xl opacity-70 animate-pulse"></div>
      )}
    </div>
  );
}