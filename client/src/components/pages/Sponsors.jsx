import { useEffect, useRef, useState } from "react";
import { ENQUIRY_EMAIL } from "../../constants/siteConfig";

const CARD_COLOR     = "#00f5c4";
const CARD_COLOR_RGB = "0,245,196";

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

// ── Single Sponsor Card ──────────────────────────────────────────────────────
function SponsorCard({ sponsor, index, cardSize }) {
  const wrapRef = useRef();
  const boxRef  = useRef();
  const nameRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity   = "1";
          entry.target.style.transform = "translateY(0) scale(1)";
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );
    if (wrapRef.current) observer.observe(wrapRef.current);
    return () => observer.disconnect();
  }, []);

  const handleEnter = () => {
    if (boxRef.current) {
      boxRef.current.style.borderColor = CARD_COLOR;
      boxRef.current.style.background  = `rgba(${CARD_COLOR_RGB},0.08)`;
      boxRef.current.style.boxShadow   = `0 0 25px rgba(${CARD_COLOR_RGB},0.2)`;
      boxRef.current.style.transform   = "translateY(-3px)";
    }
    if (nameRef.current) {
      nameRef.current.style.color = CARD_COLOR;
    }
  };

  const handleLeave = () => {
    if (boxRef.current) {
      boxRef.current.style.borderColor = `rgba(${CARD_COLOR_RGB},0.2)`;
      boxRef.current.style.background  = "rgba(255,255,255,0.03)";
      boxRef.current.style.boxShadow   = "none";
      boxRef.current.style.transform   = "translateY(0)";
    }
    if (nameRef.current) {
      nameRef.current.style.color = "#7a7f99";
    }
  };

  const Tag = sponsor.website_url ? "a" : "div";

  return (
    <div
      ref={wrapRef}
      style={{
        opacity:    0,
        transform:  "translateY(20px) scale(0.95)",
        transition: `opacity 0.5s ${index * 0.04}s ease,
                     transform 0.5s ${index * 0.04}s ease`,
      }}
    >
      <Tag
        {...(sponsor.website_url
          ? { href: sponsor.website_url, target: "_blank", rel: "noopener noreferrer" }
          : {})}
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
        style={{
          display:        "flex",
          flexDirection:  "column",
          alignItems:     "center",
          gap:            "0.7rem",
          textDecoration: "none",
          cursor:         sponsor.website_url ? "pointer" : "default",
        }}
      >
        {/* LOGO BOX */}
        <div
          ref={boxRef}
          style={{
            width:          cardSize,
            height:         cardSize,
            background:     "rgba(255,255,255,0.03)",
            border:         `1px solid rgba(${CARD_COLOR_RGB},0.2)`,
            clipPath:       "polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)",
            display:        "flex",
            alignItems:     "center",
            justifyContent: "center",
            padding:        "0.8rem",
            transition:     "all 0.3s",
            overflow:       "hidden",
          }}
        >
          {sponsor.logo_url ? (
            <img
              src={sponsor.logo_url}
              alt={sponsor.name}
              onError={(e) => {
                e.currentTarget.style.display = "none";
                if (e.currentTarget.nextSibling) {
                  e.currentTarget.nextSibling.style.display = "flex";
                }
              }}
              style={{
                width:      "100%",
                height:     "100%",
                objectFit:  "contain",
                filter:     "brightness(0.9)",
                transition: "filter 0.3s",
              }}
            />
          ) : (
            <div style={{
              width:          "100%",
              height:         "100%",
              display:        "none",
              alignItems:     "center",
              justifyContent: "center",
              fontFamily:     "'Orbitron', monospace",
              fontSize:       "0.5rem",
              fontWeight:     700,
              color:          `rgba(${CARD_COLOR_RGB},0.35)`,
              letterSpacing:  "0.1em",
              textAlign:      "center",
              textTransform:  "uppercase",
              lineHeight:     1.4,
            }}>
              {sponsor.name
                .split(" ")
                .map((w) => w[0])
                .join("")
                .slice(0, 3)}
            </div>
          )}
        </div>

        {/* NAME */}
        <span
          ref={nameRef}
          style={{
            fontFamily:    "'Space Mono', monospace",
            fontSize:      "0.62rem",
            color:         "#7a7f99",
            letterSpacing: "0.05em",
            textAlign:     "center",
            lineHeight:    1.4,
            maxWidth:      cardSize,
            transition:    "color 0.2s",
          }}
        >
          {sponsor.name}
        </span>
      </Tag>
    </div>
  );
}

// ── Skeleton ─────────────────────────────────────────────────────────────────
function SponsorSkeleton({ index, cardSize }) {
  return (
    <div style={{
      display:       "flex",
      flexDirection: "column",
      alignItems:    "center",
      gap:           "0.7rem",
      animation:     `sponsorPulse 1.5s ${index * 0.04}s ease-in-out infinite`,
    }}>
      <div style={{
        width:      cardSize,
        height:     cardSize,
        background: "rgba(0,245,196,0.06)",
        clipPath:   "polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)",
      }} />
      <div style={{
        width:        "60px",
        height:       "8px",
        background:   "rgba(0,245,196,0.06)",
        borderRadius: "2px",
      }} />
    </div>
  );
}

// ── Main ─────────────────────────────────────────────────────────────────────
export default function Sponsors() {
  const [sponsors, setSponsors] = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [error,    setError]    = useState(null);

  const width    = useWindowWidth();
  const isMobile = width < 600;
  const isTablet = width >= 600 && width < 1024;

  // card size responsive
  const cardSize = isMobile ? "68px" : isTablet ? "76px" : "82px";

  // grid gap responsive
  const gridGap = isMobile ? "1rem" : isTablet ? "1.2rem" : "1.5rem";

  useEffect(() => {
    fetch("https://sankalan-2026-production.up.railway.app/api/sponsors")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch sponsors");
        return res.json();
      })
      .then((data) => {
        setSponsors(data.data ?? data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <section id="sponsors" style={{ position: "relative", zIndex: 1 }}>
      <style>{`
        @keyframes sponsorPulse {
          0%, 100% { opacity: 1;   }
          50%       { opacity: 0.4; }
        }
        @keyframes glitch {
          0%, 90%, 100% { opacity: 0;    clip-path: none; transform: none; }
          92%           { opacity: 0.06; clip-path: inset(20% 0 60% 0); transform: translateX(-3px); }
          94%           { opacity: 0.06; clip-path: inset(60% 0 10% 0); transform: translateX(3px);  }
          96%           { opacity: 0.04; clip-path: inset(40% 0 40% 0); transform: translateX(-2px); }
        }
      `}</style>

      <div style={{
        maxWidth: "1200px",
        margin:   "0 auto",
        padding:  isMobile
          ? "4rem 1rem 3rem"
          : isTablet
          ? "5rem 1.5rem 4rem"
          : "6rem 2rem",
      }}>

        {/* ── SECTION TAG ── */}
        <p style={{
          display:       "flex",
          alignItems:    "center",
          gap:           "0.8rem",
          fontFamily:    "'Space Mono', monospace",
          fontSize:      "0.72rem",
          letterSpacing: "0.3em",
          textTransform: "uppercase",
          color:         "#00f5c4",
          margin:        "0 0 0.8rem 0",
        }}>
          <span style={{
            display:    "block",
            width:      "30px",
            height:     "1px",
            background: "#00f5c4",
            flexShrink: 0,
          }} />
          Powered By
        </p>

        {/* ── BIG TITLE ── */}
        <h2 style={{
          fontFamily:    "'Orbitron', monospace",
          fontSize:      isMobile
            ? "clamp(2.5rem, 14vw, 4rem)"
            : "clamp(3rem, 10vw, 7rem)",
          fontWeight:    900,
          lineHeight:    1,
          margin:        "0 0 1rem 0",
          letterSpacing: "-0.02em",
          background:
            "linear-gradient(135deg, #ffffff 0%, #00f5c4 40%, #7b5fff 80%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor:  "transparent",
          backgroundClip:       "text",
          position:             "relative",
          wordBreak:            "break-word",
        }}>
          SPONSORS
          {/* GLITCH LAYER */}
          <span
            aria-hidden="true"
            style={{
              position:      "absolute",
              top:           0,
              left:          0,
              fontFamily:    "'Orbitron', monospace",
              fontSize:      "inherit",
              fontWeight:    900,
              lineHeight:    1,
              letterSpacing: "-0.02em",
              background:    "linear-gradient(135deg, #ff3e6c, transparent)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor:  "transparent",
              backgroundClip:       "text",
              animation:     "glitch 4s infinite",
              pointerEvents: "none",
            }}
          >
            SPONSORS
          </span>
        </h2>

        {/* ── SUBTITLE ── */}
        <p style={{
          fontFamily:   "'Space Mono', monospace",
          fontSize:     isMobile ? "0.75rem" : "0.9rem",
          color:        "rgba(232,234,240,0.6)",
          maxWidth:     "500px",
          lineHeight:   1.8,
          margin:       "0 0 3rem 0",
        }}>
          Sankalan 2026 is proudly supported by these amazing organisations
          who believe in the power of technology and student innovation.
        </p>

        {/* ── BECOME A SPONSOR CTA ── */}
        <div style={{
          padding:    isMobile ? "1.2rem 1rem" : "1.5rem 2rem",
          background: "rgba(0,245,196,0.03)",
          border:     "1px solid rgba(0,245,196,0.15)",
          clipPath:
            "polygon(10px 0%, 100% 0%, calc(100% - 10px) 100%, 0% 100%)",
          display:        "flex",
          flexDirection:  isMobile ? "column" : "row",
          alignItems:     isMobile ? "flex-start" : "center",
          justifyContent: "space-between",
          flexWrap:       "wrap",
          gap:            isMobile ? "1.2rem" : "1.5rem",
          marginBottom:   isMobile ? "3rem" : "5rem",
        }}>
          <div>
            <p style={{
              fontFamily:    "'Orbitron', monospace",
              fontSize:      isMobile ? "0.72rem" : "0.82rem",
              fontWeight:    700,
              color:         "#e8eaf0",
              margin:        "0 0 0.3rem 0",
              letterSpacing: "0.05em",
              lineHeight:    1.5,
            }}>
              Interested in sponsoring{" "}
              <span style={{ color: "#00f5c4" }}>Sankalan 2026?</span>
            </p>
            <p style={{
              fontFamily: "'Space Mono', monospace",
              fontSize:   isMobile ? "0.68rem" : "0.72rem",
              color:      "#7a7f99",
              lineHeight: 1.7,
              margin:     0,
            }}>
              Reach 500+ students and 30+ colleges. Get in touch with us
              for sponsorship packages.
            </p>
          </div>

          <a
            href={`mailto:${ENQUIRY_EMAIL}`}
            style={{
              fontFamily:     "'Orbitron', monospace",
              fontSize:       isMobile ? "0.65rem" : "0.72rem",
              fontWeight:     900,
              letterSpacing:  "0.15em",
              textTransform:  "uppercase",
              color:          "#03040a",
              background:     "#00f5c4",
              padding:        isMobile ? "0.8rem 1.2rem" : "0.8rem 1.8rem",
              textDecoration: "none",
              clipPath:
                "polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)",
              boxShadow:   "0 0 25px rgba(0,245,196,0.3)",
              transition:  "all 0.3s",
              flexShrink:  0,
              width:       isMobile ? "100%" : "auto",
              textAlign:   isMobile ? "center" : "left",
              display:     "inline-block",
              boxSizing:   "border-box",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 0 45px rgba(0,245,196,0.5)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 0 25px rgba(0,245,196,0.3)";
            }}
          >
            Partner With Us →
          </a>
        </div>

        {/* ── LOADING ── */}
        {loading && (
          <div style={{
            display:        "flex",
            flexWrap:       "wrap",
            gap:            gridGap,
            justifyContent: "flex-start",
            alignItems:     "flex-start",
          }}>
            {Array.from({ length: 12 }).map((_, i) => (
              <SponsorSkeleton key={i} index={i} cardSize={cardSize} />
            ))}
          </div>
        )}

        {/* ── ERROR ── */}
        {!loading && error && (
          <div style={{
            border:     "1px solid rgba(255,62,108,0.3)",
            background: "rgba(255,62,108,0.07)",
            color:      "#ff3e6c",
            padding:    isMobile ? "1rem" : "1.2rem 1.8rem",
            clipPath:
              "polygon(10px 0%, 100% 0%, calc(100% - 10px) 100%, 0% 100%)",
            fontFamily: "'Space Mono', monospace",
            fontSize:   "0.8rem",
          }}>
            ⚠ Could not load sponsors — {error}
          </div>
        )}

        {/* ── EMPTY ── */}
        {!loading && !error && sponsors.length === 0 && (
          <p style={{
            fontFamily: "'Space Mono', monospace",
            fontSize:   "0.8rem",
            color:      "#7a7f99",
            textAlign:  "center",
            padding:    "4rem 0",
            margin:     0,
          }}>
            — Sponsors will be announced soon —
          </p>
        )}

        {/* ── SPONSOR GRID ── */}
        {!loading && !error && sponsors.length > 0 && (
          <>
            {/* SECTION HEADER */}
            <div style={{
              display:      "flex",
              alignItems:   "center",
              gap:          "1rem",
              marginBottom: "2rem",
              flexWrap:     "wrap",
            }}>
              <div style={{
                width:        "10px",
                height:       "10px",
                borderRadius: "50%",
                background:   CARD_COLOR,
                boxShadow:    `0 0 15px ${CARD_COLOR}`,
                flexShrink:   0,
              }} />
              <span style={{
                fontFamily:    "'Orbitron', monospace",
                fontSize:      isMobile ? "0.65rem" : "0.75rem",
                fontWeight:    700,
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                color:         CARD_COLOR,
                whiteSpace:    "nowrap",
              }}>
                Our Sponsors
              </span>
              <div style={{
                flex:       1,
                height:     "1px",
                background: `linear-gradient(90deg, rgba(${CARD_COLOR_RGB},0.4), transparent)`,
                minWidth:   "20px",
              }} />
              <span style={{
                fontFamily:    "'Space Mono', monospace",
                fontSize:      isMobile ? "0.58rem" : "0.65rem",
                color:         "#7a7f99",
                letterSpacing: "0.1em",
                whiteSpace:    "nowrap",
              }}>
                {sponsors.length} sponsors
              </span>
            </div>

            {/* ── GRID ── */}
            <div style={{
              display:        "grid",
              gridTemplateColumns: isMobile
                ? "repeat(3, 1fr)"        // 3 cols on mobile
                : isTablet
                ? "repeat(5, 1fr)"        // 5 cols on tablet
                : "repeat(7, 1fr)",       // 7 cols on desktop
              gap:            gridGap,
              justifyItems:   "center",
              alignItems:     "start",
            }}>
              {sponsors.map((sponsor, i) => (
                <SponsorCard
                  key={sponsor.id}
                  sponsor={sponsor}
                  index={i}
                  cardSize={cardSize}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}