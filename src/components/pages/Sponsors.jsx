import { useEffect, useRef } from "react";

// ── Import your sponsor logos here ─────────────────────────────
// import aspireStudy    from "../../../assets/sponsors/aspire-study.png";
// import xyz            from "../../../assets/sponsors/xyz.png";
// ... etc
// Then replace src: null with src: aspireStudy etc.

const sponsors = [
  { name: "Aspire Study",        src: null, tier: "gold"   },
  { name: ".XYZ",                src: null, tier: "gold"   },
  { name: "Interview Cake",      src: null, tier: "gold"   },
  { name: "Interview Buddy",     src: null, tier: "gold"   },
  { name: "Acme Academy",        src: null, tier: "gold"   },
  { name: "Axure",               src: null, tier: "gold"   },
  { name: "Cafe Coffee Day",     src: null, tier: "silver" },
  { name: "Ciena",               src: null, tier: "silver" },
  { name: "Coca-Cola",           src: null, tier: "silver" },
  { name: "Coding Blocks",       src: null, tier: "silver" },
  { name: "Coding Ninjas",       src: null, tier: "silver" },
  { name: "Coding Minutes",      src: null, tier: "silver" },
  { name: "Devfolio",            src: null, tier: "silver" },
  { name: "DRDO",                src: null, tier: "silver" },
  { name: "DU Updates",          src: null, tier: "silver" },
  { name: "DU Beats",            src: null, tier: "silver" },
  { name: "Delhi University Club",src: null, tier: "silver"},
  { name: "DU Express",          src: null, tier: "silver" },
  { name: "DU Fest",             src: null, tier: "bronze" },
  { name: "DU India",            src: null, tier: "bronze" },
  { name: "DU Vibes",            src: null, tier: "bronze" },
  { name: "Echo3D",              src: null, tier: "bronze" },
  { name: "ETH India",           src: null, tier: "bronze" },
  { name: "Final Revise",        src: null, tier: "bronze" },
  { name: "GigaByte",            src: null, tier: "bronze" },
  { name: "Insight One",         src: null, tier: "bronze" },
  { name: "Lenskart",            src: null, tier: "bronze" },
  { name: "Polygon",             src: null, tier: "bronze" },
  { name: "Red FM India",        src: null, tier: "bronze" },
  { name: "Sportsun",            src: null, tier: "bronze" },
  { name: "Starbucks",           src: null, tier: "bronze" },
  { name: "The Education Tree",  src: null, tier: "bronze" },
  { name: "Wolfram",             src: null, tier: "bronze" },
  { name: "Youth India",         src: null, tier: "bronze" },
  { name: "Zebronics",           src: null, tier: "bronze" },
  { name: "DU Competitions",     src: null, tier: "bronze" },
];

const tierConfig = {
  gold:   { color: "#FFD700", rgb: "255,215,0",   label: "Gold Sponsors",   size: "90px"  },
  silver: { color: "#00f5c4", rgb: "0,245,196",   label: "Silver Sponsors", size: "80px"  },
  bronze: { color: "#7b5fff", rgb: "123,95,255",  label: "Bronze Sponsors", size: "72px"  },
};

function SponsorCard({ sponsor, index }) {
  const ref = useRef();
  const tier = tierConfig[sponsor.tier];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0) scale(1)";
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        opacity: 0,
        transform: "translateY(20px) scale(0.95)",
        transition: `opacity 0.5s ${index * 0.04}s ease,
                     transform 0.5s ${index * 0.04}s ease`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "0.7rem",
        cursor: "default",
      }}
    >
      {/* LOGO BOX */}
      <div
        style={{
          width: tier.size,
          height: tier.size,
          background: "rgba(255,255,255,0.03)",
          border: `1px solid rgba(${tier.rgb},0.2)`,
          clipPath:
            "polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "0.8rem",
          transition: "all 0.3s",
          position: "relative",
          overflow: "hidden",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = tier.color;
          e.currentTarget.style.background = `rgba(${tier.rgb},0.08)`;
          e.currentTarget.style.boxShadow = `0 0 25px rgba(${tier.rgb},0.2)`;
          e.currentTarget.style.transform = "translateY(-3px)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = `rgba(${tier.rgb},0.2)`;
          e.currentTarget.style.background = "rgba(255,255,255,0.03)";
          e.currentTarget.style.boxShadow = "none";
          e.currentTarget.style.transform = "translateY(0)";
        }}
      >
        {sponsor.src ? (
          <img
            src={sponsor.src}
            alt={sponsor.name}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
              filter: "brightness(0.9)",
              transition: "filter 0.3s",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.filter = "brightness(1)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.filter = "brightness(0.9)")
            }
          />
        ) : (
          /* PLACEHOLDER until logo added */
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "'Orbitron', monospace",
              fontSize: "0.5rem",
              fontWeight: 700,
              color: `rgba(${tier.rgb},0.35)`,
              letterSpacing: "0.1em",
              textAlign: "center",
              textTransform: "uppercase",
              lineHeight: 1.4,
            }}
          >
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
        style={{
          fontFamily: "'Space Mono', monospace",
          fontSize: "0.62rem",
          color: "#7a7f99",
          letterSpacing: "0.05em",
          textAlign: "center",
          lineHeight: 1.4,
          maxWidth: tier.size,
          transition: "color 0.2s",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.color = tier.color)}
        onMouseLeave={(e) => (e.currentTarget.style.color = "#7a7f99")}
      >
        {sponsor.name}
      </span>
    </div>
  );
}

export default function Sponsors() {
  const goldSponsors   = sponsors.filter((s) => s.tier === "gold");
  const silverSponsors = sponsors.filter((s) => s.tier === "silver");
  const bronzeSponsors = sponsors.filter((s) => s.tier === "bronze");

  return (
    <section
      id="sponsors"
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
          Powered By
        </p>

        {/* BIG TITLE */}
        <h2
          style={{
            fontFamily: "'Orbitron', monospace",
            fontSize: "clamp(3rem, 10vw, 7rem)",
            fontWeight: 900,
            lineHeight: 1,
            marginBottom: "1rem",
            letterSpacing: "-0.02em",
            background:
              "linear-gradient(135deg, #ffffff 0%, #00f5c4 40%, #7b5fff 80%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            position: "relative",
          }}
        >
          SPONSORS
          {/* GLITCH LAYER */}
          <span
            aria-hidden="true"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              fontFamily: "'Orbitron', monospace",
              fontSize: "clamp(3rem, 10vw, 7rem)",
              fontWeight: 900,
              lineHeight: 1,
              letterSpacing: "-0.02em",
              background:
                "linear-gradient(135deg, #ff3e6c, transparent)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              animation: "glitch 4s infinite",
              pointerEvents: "none",
            }}
          >
            SPONSORS
          </span>
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
          Sankalan 2025 is proudly supported by these amazing organisations
          who believe in the power of technology and student innovation.
        </p>

        {/* ── BECOME A SPONSOR CTA ── */}
        <div
          style={{
            padding: "1.5rem 2rem",
            background: "rgba(0,245,196,0.03)",
            border: "1px solid rgba(0,245,196,0.15)",
            clipPath:
              "polygon(10px 0%, 100% 0%, calc(100% - 10px) 100%, 0% 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "1.5rem",
            marginBottom: "5rem",
          }}
        >
          <div>
            <p
              style={{
                fontFamily: "'Orbitron', monospace",
                fontSize: "0.82rem",
                fontWeight: 700,
                color: "#e8eaf0",
                marginBottom: "0.3rem",
                letterSpacing: "0.05em",
              }}
            >
              Interested in sponsoring{" "}
              <span style={{ color: "#00f5c4" }}>Sankalan 2025?</span>
            </p>
            <p
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: "0.72rem",
                color: "#7a7f99",
                lineHeight: 1.7,
              }}
            >
              Reach 500+ students and 30+ colleges. Get in touch with us
              for sponsorship packages.
            </p>
          </div>
          <a
            href="mailto:sankalan@cs.du.ac.in"
            style={{
              fontFamily: "'Orbitron', monospace",
              fontSize: "0.72rem",
              fontWeight: 900,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "#03040a",
              background: "#00f5c4",
              padding: "0.8rem 1.8rem",
              textDecoration: "none",
              clipPath:
                "polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)",
              boxShadow: "0 0 25px rgba(0,245,196,0.3)",
              transition: "all 0.3s",
              flexShrink: 0,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow =
                "0 0 45px rgba(0,245,196,0.5)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow =
                "0 0 25px rgba(0,245,196,0.3)";
            }}
          >
            Partner With Us →
          </a>
        </div>

        {/* ── GOLD SPONSORS ── */}
        <SponsorTier
          tier="gold"
          label={tierConfig.gold.label}
          sponsors={goldSponsors}
          startIndex={0}
        />

        {/* ── SILVER SPONSORS ── */}
        <SponsorTier
          tier="silver"
          label={tierConfig.silver.label}
          sponsors={silverSponsors}
          startIndex={goldSponsors.length}
        />

        {/* ── BRONZE SPONSORS ── */}
        <SponsorTier
          tier="bronze"
          label={tierConfig.bronze.label}
          sponsors={bronzeSponsors}
          startIndex={goldSponsors.length + silverSponsors.length}
        />
      </div>
    </section>
  );
}

function SponsorTier({ tier, label, sponsors, startIndex }) {
  const cfg = tierConfig[tier];

  return (
    <div style={{ marginBottom: "4rem" }}>
      {/* TIER HEADER */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "1rem",
          marginBottom: "2rem",
        }}
      >
        {/* COLOR DOT */}
        <div
          style={{
            width: "10px",
            height: "10px",
            borderRadius: "50%",
            background: cfg.color,
            boxShadow: `0 0 15px ${cfg.color}`,
            flexShrink: 0,
          }}
        />

        {/* LABEL */}
        <span
          style={{
            fontFamily: "'Orbitron', monospace",
            fontSize: "0.75rem",
            fontWeight: 700,
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            color: cfg.color,
          }}
        >
          {label}
        </span>

        {/* LINE */}
        <div
          style={{
            flex: 1,
            height: "1px",
            background: `linear-gradient(90deg, rgba(${cfg.rgb},0.4), transparent)`,
          }}
        />

        {/* COUNT */}
        <span
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: "0.65rem",
            color: "#7a7f99",
            letterSpacing: "0.1em",
          }}
        >
          {sponsors.length} sponsors
        </span>
      </div>

      {/* SPONSOR GRID */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "1.5rem",
          justifyContent: tier === "gold" ? "center" : "flex-start",
          alignItems: "flex-start",
        }}
      >
        {sponsors.map((sponsor, i) => (
          <SponsorCard
            key={sponsor.name}
            sponsor={sponsor}
            index={startIndex + i}
          />
        ))}
      </div>
    </div>
  );
}