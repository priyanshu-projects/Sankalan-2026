import { useState, useEffect, useRef } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import Header      from "./components/common/Header";
import Footer      from "./components/common/Footer";
import Intro       from "./components/common/Intro";
import PageWrapper from "./components/common/PageWrapper";

import Home     from "./components/pages/home/Home";
import Privacy  from "./components/pages/home/Privacy";
import Events   from "./components/pages/Events";
import Sponsors from "./components/pages/Sponsors";
import Team     from "./components/pages/Team";
import FAQ      from "./components/pages/FAQ";
import Updates  from "./components/pages/Updates";
import Results  from "./components/pages/Results";


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

// ── App ───────────────────────────────────────────────────────────────────────
function App() {
  const [introDone, setIntroDone] = useState(false);
  const location  = useLocation();
  const canvasRef = useRef(null);
  const cursorRef = useRef(null);
  const ringRef   = useRef(null);

  const width    = useWindowWidth();
  const isMobile = width < 768;

  // ── Stars canvas ──
  useEffect(() => {
    if (!introDone) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let stars  = [];
    let animId;

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
      initStars();
    };

    const initStars = () => {
      stars = [];
      const count = window.innerWidth < 600
        ? 60
        : window.innerWidth < 1024
        ? 120
        : 200;

      for (let i = 0; i < count; i++) {
        stars.push({
          x:       Math.random() * canvas.width,
          y:       Math.random() * canvas.height,
          r:       Math.random() * 1.5 + 0.2,
          speed:   Math.random() * 0.3 + 0.05,
          opacity: Math.random(),
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      stars.forEach((s) => {
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0,245,196,${s.opacity * 0.6})`;
        ctx.fill();
        s.y       += s.speed;
        s.opacity += (Math.random() - 0.5) * 0.02;
        s.opacity  = Math.max(0.1, Math.min(1, s.opacity));
        if (s.y > canvas.height) {
          s.y = 0;
          s.x = Math.random() * canvas.width;
        }
      });
      animId = requestAnimationFrame(draw);
    };

    window.addEventListener("resize", resize);
    resize();
    draw();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animId);
    };
  }, [introDone]);

  // ── Custom cursor — desktop only ──
  useEffect(() => {
    if (!introDone || isMobile) return;

    let mx = 0, my = 0, rx = 0, ry = 0;
    let animId;

    const onMove = (e) => {
      mx = e.clientX;
      my = e.clientY;
      if (cursorRef.current) {
        cursorRef.current.style.left = mx - 6 + "px";
        cursorRef.current.style.top  = my - 6 + "px";
      }
    };

    const animRing = () => {
      rx += (mx - rx) * 0.15;
      ry += (my - ry) * 0.15;
      if (ringRef.current) {
        ringRef.current.style.left = rx - 18 + "px";
        ringRef.current.style.top  = ry - 18 + "px";
      }
      animId = requestAnimationFrame(animRing);
    };

    document.addEventListener("mousemove", onMove);
    animRing();

    return () => {
      document.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(animId);
    };
  }, [introDone, isMobile]);

  return (
    <>
      {/* ── INTRO ── */}
      {!introDone && <Intro onFinish={() => setIntroDone(true)} />}

      {introDone && (
        <>
          {/* ── LAYER 0 : stars (fixed, behind everything) ── */}
          <canvas
            ref={canvasRef}
            style={{
              position:      "fixed",
              top:           0,
              left:          0,
              width:         "100%",
              height:        "100%",
              zIndex:        0,
              pointerEvents: "none",
            }}
          />

          {/* ── LAYER 1 : scanline (fixed, above stars) ── */}
          <div
            style={{
              position:      "fixed",
              inset:         0,
              zIndex:        1,
              pointerEvents: "none",
              backgroundImage:
                "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.03) 2px, rgba(0,0,0,0.03) 4px)",
              backgroundSize: "100% 4px",
            }}
          />

          {/* ── LAYER 2 : all page content ── */}
          <div
            style={{
              position:  "relative",
              zIndex:    2,
              minHeight: "100vh",
              paddingTop: "0",
            }}
          >
            <Header />

            <main
              style={{
                paddingTop: isMobile ? "60px" : "72px",
                minHeight:  "calc(100vh - 60px)",
              }}
            >
              <AnimatePresence mode="wait">
                <Routes location={location} key={location.pathname}>
                  <Route path="/"               element={<PageWrapper><Home /></PageWrapper>}     />
                  <Route path="/privacy-policy" element={<PageWrapper><Privacy /></PageWrapper>}  />
                  <Route path="/events"         element={<PageWrapper><Events /></PageWrapper>}   />
                  <Route path="/sponsors"       element={<PageWrapper><Sponsors /></PageWrapper>} />
                  <Route path="/team"           element={<PageWrapper><Team /></PageWrapper>}     />
                  <Route path="/faq"            element={<PageWrapper><FAQ /></PageWrapper>}      />
                  <Route path="/updates"        element={<PageWrapper><Updates /></PageWrapper>}  />
                  <Route path="/results"        element={<PageWrapper><Results /></PageWrapper>}  />
                </Routes>
              </AnimatePresence>
            </main>

            <Footer />
          </div>

          {/* ── LAYER 9999 : cursor — desktop only ── */}
          {!isMobile && (
            <>
              <div
                ref={cursorRef}
                style={{
                  position:      "fixed",
                  width:         "12px",
                  height:        "12px",
                  borderRadius:  "50%",
                  background:    "#00f5c4",
                  pointerEvents: "none",
                  zIndex:        9999,
                  transform:     "translate(0,0)",
                  mixBlendMode:  "difference",
                  transition:    "opacity 0.3s",
                }}
              />
              <div
                ref={ringRef}
                style={{
                  position:      "fixed",
                  width:         "36px",
                  height:        "36px",
                  borderRadius:  "50%",
                  border:        "1px solid rgba(0,245,196,0.5)",
                  pointerEvents: "none",
                  zIndex:        9998,
                  transition:    "opacity 0.3s",
                }}
              />
            </>
          )}
        </>
      )}
    </>
  );
}

export default App;