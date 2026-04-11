import { useEffect, useRef } from "react";

// ── custom hook ──────────────────────────────────────────────────────────────
function useWindowWidth() {
  const [width, setWidth] = [
    typeof window !== "undefined" ? window.innerWidth : 1200,
    () => {},
  ];
  // We need useState here — use a real implementation
  return width;
}