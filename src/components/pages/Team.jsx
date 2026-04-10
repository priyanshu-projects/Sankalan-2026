// src/components/pages/Team.jsx
import { useState, useEffect, useRef } from "react";

// ── Data ──────────────────────────────────────────────────────────────────────

const adminPanel = [
  {
    id: 1,
    name: "Dr. Aakash Singh",
    role: "Faculty Advisor",
    tag: "DUCSS",
    color: "#00f5c4",
    rgb: "0,245,196",
    image: null,
    linkedin: null,
    email: null,
  },
  {
    id: 2,
    name: "Dr. Kuldeep Singh",
    role: "Faculty Advisor",
    tag: "DUCSS",
    color: "#00f5c4",
    rgb: "0,245,196",
    image: null,
    linkedin: null,
    email: null,
  },
  {
    id: 3,
    name: "Dhruv Bhardwaj",
    role: "President",
    tag: "DUCSS",
    color: "#00f5c4",
    rgb: "0,245,196",
    image: null,
    linkedin: null,
    email: null,
  },
  {
    id: 4,
    name: "Pardeep Singh",
    role: "Vice President",
    tag: "DUCSS",
    color: "#00f5c4",
    rgb: "0,245,196",
    image: null,
    linkedin: null,
    email: null,
  },
  {
    id: 5,
    name: "Ritik Kumar",
    role: "Treasurer",
    tag: "DUCSS",
    color: "#00f5c4",
    rgb: "0,245,196",
    image: null,
    linkedin: null,
    email: null,
  },
  {
    id: 6,
    name: "Anish Mukherjee",
    role: "Joint Treasurer",
    tag: "DUCSS",
    color: "#00f5c4",
    rgb: "0,245,196",
    image: null,
    linkedin: null,
    email: null,
  },
  {
    id: 7,
    name: "Priyanshu Gupta",
    role: "Junior Joint Secretary",
    tag: "DUCSS",
    color: "#00f5c4",
    rgb: "0,245,196",
    image: null,
    linkedin: null,
    email: null,
  },
];

const eventHeads = [
  {
    id: 101,
    name: "Priyanshu Gupta",
    role: "Head of Website Team",
    tag: "Tech",
    color: "#7b5fff",
    rgb: "123,95,255",
    image: null,
    linkedin: null,
    email: null,
  },
  ...Array.from({ length: 24 }, (_, i) => ({
    id: 102 + i,
    name: null,
    role: null,
    tag: "TBA",
    color: "#7b5fff",
    rgb: "123,95,255",
    image: null,
    linkedin: null,
    email: null,
  })),
];

// ── Initials Avatar ───────────────────────────────────────────────────────────
function InitialsAvatar({ name, color, rgb, size = 90 }) {
  const initials = name
    ? name
        .split(" ")
        .slice(0, 2)
        .map((w) => w[0].toUpperCase())
        .join("")
    : "?";

  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        background: `radial-gradient(circle at 35% 35%,
          rgba(${rgb},0.22) 0%,
          rgba(${rgb},0.05) 100%)`,
        border: `1.5px solid rgba(${rgb},0.4)`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'Orbitron', monospace",
        fontSize: size * 0.27 + "px",
        fontWeight: 900,
        color: color,
        textShadow: `0 0 15px rgba(${rgb},0.6)`,
        flexShrink: 0,
        position: "relative",
      }}
    >
      {/* inner subtle ring */}
      <div
        style={{
          position: "absolute",
          inset: 5,
          borderRadius: "50%",
          border: `1px solid rgba(${rgb},0.12)`,
          pointerEvents: "none",
        }}
      />
      {initials}
    </div>
  );
}

// ── Avatar Frame ──────────────────────────────────────────────────────────────
function AvatarFrame({ member, size = 90 }) {
  const { name, image, color, rgb } = member;

  if (image) {
    return (
      <div
        style={{
          width: size,
          height: size,
          borderRadius: "50%",
          border: `2px solid rgba(${rgb},0.45)`,
          overflow: "hidden",
          flexShrink: 0,
          boxShadow: `0 0 20px rgba(${rgb},0.25)`,
        }}
      >
        <img
          src={image}
          alt={name}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>
    );
  }

  if (name) {
    return (
      <div style={{ position: "relative", flexShrink: 0 }}>
        <InitialsAvatar name={name} color={color} rgb={rgb} size={size} />
        <div
          style={{
            position: "absolute",
            inset: -4,
            borderRadius: "50%",
            border: `1px dashed rgba(${rgb},0.18)`,
            pointerEvents: "none",
          }}
        />
      </div>
    );
  }

  // TBA ghost
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        background: "rgba(255,255,255,0.015)",
        border: "1.5px dashed rgba(255,255,255,0.07)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
      }}
    >
      <span style={{ fontSize: size * 0.3 + "px", opacity: 0.18 }}>?</span>
    </div>
  );
}

// ── Social Links ──────────────────────────────────────────────────────────────
function SocialLinks({ linkedin, email, color, rgb }) {
  const baseStyle = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: "32px",
    height: "32px",
    border: `1px solid rgba(${rgb},0.22)`,
    background: `rgba(${rgb},0.06)`,
    clipPath: "polygon(4px 0%,100% 0%,calc(100% - 4px) 100%,0% 100%)",
    textDecoration: "none",
    fontSize: "0.78rem",
    transition: "all 0.25s",
    color: "#7a7f99",
  };

  return (
    <div style={{ display: "flex", gap: "0.45rem", marginTop: "0.9rem" }}>
      <a
        href={linkedin || "#"}
        target="_blank"
        rel="noopener noreferrer"
        title="LinkedIn"
        style={baseStyle}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = color;
          e.currentTarget.style.color = color;
          e.currentTarget.style.background = `rgba(${rgb},0.15)`;
          e.currentTarget.style.boxShadow = `0 0 12px rgba(${rgb},0.3)`;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = `rgba(${rgb},0.22)`;
          e.currentTarget.style.color = "#7a7f99";
          e.currentTarget.style.background = `rgba(${rgb},0.06)`;
          e.currentTarget.style.boxShadow = "none";
        }}
      >
        <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853
            0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9
            1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337
            7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063
            2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225
            0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24
            1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24
            .774 23.2 0 22.222 0h.003z" />
        </svg>
      </a>

      <a
        href={email ? `mailto:${email}` : "mailto:sankalan@cs.du.ac.in"}
        title="Email"
        style={baseStyle}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = color;
          e.currentTarget.style.color = color;
          e.currentTarget.style.background = `rgba(${rgb},0.15)`;
          e.currentTarget.style.boxShadow = `0 0 12px rgba(${rgb},0.3)`;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = `rgba(${rgb},0.22)`;
          e.currentTarget.style.color = "#7a7f99";
          e.currentTarget.style.background = `rgba(${rgb},0.06)`;
          e.currentTarget.style.boxShadow = "none";
        }}
      >
        <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1
            0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
        </svg>
      </a>
    </div>
  );
}

// ── Detail Card (right panel) ─────────────────────────────────────────────────
function DetailCard({ member }) {
  const { name, role, tag, color, rgb } = member;
  const isTBA = !name;

  return (
    <div
      style={{
        background: "rgba(255,255,255,0.02)",
        border: `1px solid rgba(${rgb},0.2)`,
        clipPath:
          "polygon(16px 0%,100% 0%,calc(100% - 16px) 100%,0% 100%)",
        padding: "2.8rem 2.5rem",
        position: "relative",
        overflow: "hidden",
        animation: "fadeInUp 0.45s ease both",
      }}
    >
      {/* Top accent line */}
      <div
        style={{
          position: "absolute",
          top: 0, left: 0, right: 0,
          height: "2px",
          background: `linear-gradient(90deg, ${color}, transparent)`,
        }}
      />

      {/* Corner bracket TL */}
      <div
        style={{
          position: "absolute",
          top: 12, left: 12,
          width: 18, height: 18,
          borderTop: `1px solid rgba(${rgb},0.3)`,
          borderLeft: `1px solid rgba(${rgb},0.3)`,
          pointerEvents: "none",
        }}
      />
      {/* Corner bracket BR */}
      <div
        style={{
          position: "absolute",
          bottom: 12, right: 12,
          width: 18, height: 18,
          borderBottom: `1px solid rgba(${rgb},0.3)`,
          borderRight: `1px solid rgba(${rgb},0.3)`,
          pointerEvents: "none",
        }}
      />

      {/* Ambient glow */}
      <div
        style={{
          position: "absolute",
          top: "40%", left: "50%",
          transform: "translate(-50%,-50%)",
          width: "280px", height: "200px",
          background: `radial-gradient(ellipse,
            rgba(${rgb},0.08) 0%, transparent 70%)`,
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        {/* Avatar with spinning ring */}
        <div style={{ position: "relative", marginBottom: "1.5rem" }}>
          <AvatarFrame member={member} size={120} />
          {/* spinning outer ring */}
          <div
            style={{
              position: "absolute",
              inset: -10,
              borderRadius: "50%",
              border: `1px solid rgba(${rgb},0.12)`,
              borderTopColor: color,
              animation: "spin 8s linear infinite",
              pointerEvents: "none",
            }}
          />
          {/* static outer ring */}
          <div
            style={{
              position: "absolute",
              inset: -18,
              borderRadius: "50%",
              border: `1px solid rgba(${rgb},0.06)`,
              pointerEvents: "none",
            }}
          />
        </div>

        {isTBA ? (
          <>
            <div
              style={{
                fontFamily: "'Orbitron', monospace",
                fontSize: "1rem",
                fontWeight: 900,
                color: "rgba(255,255,255,0.12)",
                letterSpacing: "0.3em",
                marginBottom: "0.5rem",
              }}
            >
              TBA
            </div>
            <div
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: "0.65rem",
                color: "rgba(255,255,255,0.08)",
                letterSpacing: "0.15em",
              }}
            >
              To be announced
            </div>
          </>
        ) : (
          <>
            {/* Name */}
            <h3
              style={{
                fontFamily: "'Orbitron', monospace",
                fontSize: "1.15rem",
                fontWeight: 900,
                color: "#e8eaf0",
                letterSpacing: "0.04em",
                marginBottom: "0.5rem",
                lineHeight: 1.2,
              }}
            >
              {name}
            </h3>

            {/* Role */}
            <p
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: "0.68rem",
                color: color,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                marginBottom: "0.6rem",
              }}
            >
              {role}
            </p>

            {/* Tag pill */}
            <span
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: "0.55rem",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "#7a7f99",
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                padding: "0.25rem 0.8rem",
                clipPath:
                  "polygon(4px 0%,100% 0%,calc(100% - 4px) 100%,0% 100%)",
              }}
            >
              {tag}
            </span>

            {/* Socials */}
            <SocialLinks
              linkedin={member.linkedin}
              email={member.email}
              color={color}
              rgb={rgb}
            />

            {/* Divider */}
            <div
              style={{
                width: "100%",
                height: "1px",
                background: `linear-gradient(90deg,
                  transparent, rgba(${rgb},0.25), transparent)`,
                margin: "1.4rem 0 1rem",
              }}
            />

            {/* Footer label */}
            <p
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: "0.58rem",
                color: "rgba(232,234,240,0.25)",
                letterSpacing: "0.08em",
                lineHeight: 1.6,
              }}
            >
              Sankalan 2025 · DUCS
              <br />
              University of Delhi
            </p>
          </>
        )}
      </div>
    </div>
  );
}

// ── List Row (left panel) ─────────────────────────────────────────────────────
function ListRow({ member, isActive, onClick, index }) {
  const ref = useRef();

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateX(0)";
          obs.unobserve(entry.target);
        }
      },
      { threshold: 0.05 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const isTBA = !member.name;
  const { color, rgb } = member;

  return (
    <div
      ref={ref}
      onClick={() => !isTBA && onClick()}
      style={{
        opacity: 0,
        transform: "translateX(-20px)",
        transition: `opacity 0.45s ${Math.min(index, 12) * 0.05}s ease,
                     transform 0.45s ${Math.min(index, 12) * 0.05}s ease,
                     border-color 0.25s, background 0.25s`,
        padding: isTBA ? "0.65rem 1.1rem" : "0.9rem 1.2rem",
        background: isActive
          ? `rgba(${rgb},0.1)`
          : isTBA
          ? "rgba(255,255,255,0.01)"
          : "rgba(255,255,255,0.025)",
        border: `1px solid ${
          isActive
            ? color
            : isTBA
            ? "rgba(255,255,255,0.05)"
            : `rgba(${rgb},0.12)`
        }`,
        clipPath:
          "polygon(8px 0%,100% 0%,calc(100% - 8px) 100%,0% 100%)",
        cursor: isTBA ? "default" : "pointer",
        display: "flex",
        alignItems: "center",
        gap: "1rem",
        position: "relative",
        overflow: "hidden",
      }}
      onMouseEnter={(e) => {
        if (!isActive && !isTBA) {
          e.currentTarget.style.borderColor = `rgba(${rgb},0.4)`;
          e.currentTarget.style.background = `rgba(${rgb},0.05)`;
        }
      }}
      onMouseLeave={(e) => {
        if (!isActive && !isTBA) {
          e.currentTarget.style.borderColor = `rgba(${rgb},0.12)`;
          e.currentTarget.style.background = "rgba(255,255,255,0.025)";
        }
      }}
    >
      {/* Active left bar */}
      {isActive && (
        <div
          style={{
            position: "absolute",
            left: 0, top: 0, bottom: 0,
            width: "3px",
            background: `linear-gradient(180deg, ${color}, transparent)`,
          }}
        />
      )}

      {/* Avatar */}
      <AvatarFrame member={member} size={isTBA ? 34 : 44} />

      {/* Text */}
      <div style={{ flex: 1, minWidth: 0 }}>
        {isTBA ? (
          <div
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: "0.6rem",
              color: "rgba(255,255,255,0.12)",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
            }}
          >
            To be announced
          </div>
        ) : (
          <>
            <div
              style={{
                fontFamily: "'Orbitron', monospace",
                fontSize: "0.75rem",
                fontWeight: 700,
                color: isActive ? color : "#e8eaf0",
                letterSpacing: "0.04em",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                transition: "color 0.25s",
              }}
            >
              {member.name}
            </div>
            <div
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: "0.58rem",
                color: "#7a7f99",
                marginTop: "0.18rem",
                letterSpacing: "0.05em",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {member.role}
            </div>
          </>
        )}
      </div>

      {/* Arrow indicator */}
      {!isTBA && (
        <div
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: "0.8rem",
            color: isActive ? color : "rgba(255,255,255,0.12)",
            transition: "color 0.25s",
            flexShrink: 0,
          }}
        >
          ›
        </div>
      )}
    </div>
  );
}

// ── Split Panel Layout ────────────────────────────────────────────────────────
function SplitPanel({ members, accentColor, accentRgb }) {
  const firstNamed = members.find((m) => m.name) || members[0];
  const [selected, setSelected] = useState(firstNamed);

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "2rem",
        alignItems: "start",
      }}
    >
      {/* ── Left — list ── */}
      <div>
        {/* "Select a member" label */}
        <div
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: "0.58rem",
            letterSpacing: "0.28em",
            textTransform: "uppercase",
            color: "#7a7f99",
            marginBottom: "1rem",
            display: "flex",
            alignItems: "center",
            gap: "0.8rem",
          }}
        >
          <span>Select a member</span>
          <div
            style={{
              flex: 1,
              height: "1px",
              background: `linear-gradient(90deg,
                rgba(${accentRgb},0.2), transparent)`,
            }}
          />
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
            maxHeight: "70vh",
            overflowY: "auto",
            paddingRight: "4px",
          }}
        >
          {members.map((member, i) => (
            <ListRow
              key={member.id}
              member={member}
              isActive={selected?.id === member.id}
              onClick={() => setSelected(member)}
              index={i}
            />
          ))}
        </div>
      </div>

      {/* ── Right — detail ── */}
      <div style={{ position: "sticky", top: "6rem" }}>
        {/* Top accent bar (matches image) */}
        <div
          style={{
            height: "2px",
            background: `linear-gradient(90deg,
              ${accentColor}, rgba(${accentRgb},0.1))`,
            marginBottom: "1.5rem",
          }}
        />
        {selected && <DetailCard key={selected.id} member={selected} />}
      </div>
    </div>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────
export default function Team() {
  const [activeTab, setActiveTab] = useState("admin");
  const headerRef = useRef();

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
          obs.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );
    if (headerRef.current) obs.observe(headerRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="team" style={{ position: "relative", zIndex: 1 }}>
      {/* ── Grid BG ── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          backgroundImage: `
            linear-gradient(rgba(0,245,196,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,245,196,0.03) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
          maskImage:
            "radial-gradient(ellipse 80% 50% at 50% 0%, black 30%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 50% at 50% 0%, black 30%, transparent 100%)",
          zIndex: 0,
        }}
      />

      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "6rem 2rem",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* ── Header ── */}
        <div
          ref={headerRef}
          style={{
            opacity: 0,
            transform: "translateY(30px)",
            transition: "opacity 0.7s ease, transform 0.7s ease",
            marginBottom: "3rem",
          }}
        >
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
            The People Behind It
          </p>

          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "1.5rem",
            }}
          >
            <h2
              style={{
                fontFamily: "'Orbitron', monospace",
                fontSize: "clamp(2rem, 5vw, 3.5rem)",
                fontWeight: 900,
                lineHeight: 1.1,
                color: "#e8eaf0",
              }}
            >
              Meet the{" "}
              <span style={{ color: "#00f5c4" }}>Team</span>
            </h2>

            <div
              style={{
                display: "flex",
                gap: "1.5rem",
                fontFamily: "'Space Mono', monospace",
                fontSize: "0.72rem",
                color: "#7a7f99",
              }}
            >
              <span>
                <span
                  style={{
                    fontFamily: "'Orbitron', monospace",
                    color: "#00f5c4",
                    fontWeight: 700,
                    fontSize: "1rem",
                  }}
                >
                  {adminPanel.length}
                </span>{" "}
                Admin
              </span>
              <span>
                <span
                  style={{
                    fontFamily: "'Orbitron', monospace",
                    color: "#7b5fff",
                    fontWeight: 700,
                    fontSize: "1rem",
                  }}
                >
                  {eventHeads.filter((e) => e.name).length}
                </span>{" "}
                / {eventHeads.length} Event Heads
              </span>
            </div>
          </div>
        </div>

        {/* ── Tab Switcher ── */}
        <div
          style={{
            display: "inline-flex",
            marginBottom: "3rem",
            border: "1px solid rgba(0,245,196,0.15)",
            clipPath:
              "polygon(8px 0%,100% 0%,calc(100% - 8px) 100%,0% 100%)",
            overflow: "hidden",
          }}
        >
          {[
            {
              key: "admin",
              label: "🏛️ Administrative & DUCSS",
              color: "#00f5c4",
              rgb: "0,245,196",
            },
            {
              key: "events",
              label: "⚡ Event Heads",
              color: "#7b5fff",
              rgb: "123,95,255",
            },
          ].map((tab, i) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              style={{
                fontFamily: "'Orbitron', monospace",
                fontSize: "0.68rem",
                fontWeight: 700,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                padding: "0.9rem 1.8rem",
                border: "none",
                cursor: "pointer",
                transition: "all 0.3s",
                background:
                  activeTab === tab.key
                    ? `rgba(${tab.rgb},0.12)`
                    : "transparent",
                color:
                  activeTab === tab.key ? tab.color : "#7a7f99",
                borderRight:
                  i === 0
                    ? "1px solid rgba(0,245,196,0.15)"
                    : "none",
                boxShadow:
                  activeTab === tab.key
                    ? `inset 0 -2px 0 ${tab.color}`
                    : "none",
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* ── Admin Tab ── */}
        {activeTab === "admin" && (
          <SplitPanel
            members={adminPanel}
            accentColor="#00f5c4"
            accentRgb="0,245,196"
          />
        )}

        {/* ── Event Heads Tab ── */}
        {activeTab === "events" && (
          <SplitPanel
            members={eventHeads}
            accentColor="#7b5fff"
            accentRgb="123,95,255"
          />
        )}
      </div>

      {/* ── Styles ── */}
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse {
          0%,100% { opacity:1; transform:scale(1); }
          50%      { opacity:0.4; transform:scale(1.4); }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }

        /* custom scrollbar for member list */
        #team ::-webkit-scrollbar { width: 3px; }
        #team ::-webkit-scrollbar-track { background: transparent; }
        #team ::-webkit-scrollbar-thumb {
          background: rgba(0,245,196,0.2);
          border-radius: 2px;
        }

        @media (max-width: 768px) {
          #team .split-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}