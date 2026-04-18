import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

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

const sections = [
  {
    title: "1. Introduction",
    content:
      "These terms and conditions outline the rules and regulations for the Sankalan web portal. By accessing this website, we assume you accept these terms and conditions. Do not continue to use Sankalan if you do not agree to take all of the terms and conditions stated on this page.",
  },
  {
    title: "2. Privacy Policy",
    content:
      "This page informs website visitors about our policies regarding the collection, use, and disclosure of Personal Information if anyone decides to use our Service. If you choose to use our Service, you agree to the collection and use of information with this policy. We use this personal information to provide and improve our services. We will not use or share your information with anyone except as described in this Privacy Policy.",
  },
  {
    title: "3. Information Collection and Use",
    content:
      "For a better experience, we may require some of your personal information, including but not limited to your name, phone number, email, and organization you work with. We will only use the collected data to contact or identify you.",
  },
  {
    title: "4. Log Data",
    content:
      "Whenever you visit our Service, we collect information that your browser sends to us, known as Log Data. This log data may include your IP address, browser version, pages visited, time and date of your visit, and other statistics. We also use Google Analytics and Amazon Cloudwatch to monitor user behavior.",
  },
  {
    title: "5. Cookies and Tracking Technologies",
    content:
      "Our website uses cookies as a unique anonymous identifier to improve our Service. You have the option to either accept or refuse these cookies. If you choose to refuse our cookies, you may not be able to use some portions of our Service.",
  },
  {
    title: "6. Service Providers",
    content:
      "We may employ third-party companies and individuals to facilitate our Service, provide the Service on our behalf, perform Service-related services, or assist us in analyzing how our Service is used. These third-party partners have access to your Personal Information only to perform assigned tasks on our behalf.",
  },
  {
    title: "7. Security",
    content:
      "We value your trust in providing us with your Personal Information. Thus, we strive to use commercially acceptable means of protecting it. However, no method of transmission over the Internet or electronic storage is 100% secure.",
  },
  {
    title: "8. Links to Other Sites",
    content:
      "Our Service may contain links to other sites; if you click on a third-party link, you will get directed to that site. We are not responsible for the content, privacy policies, or practices of any third-party sites or services.",
  },
  {
    title: "9. Changes to This Privacy Policy",
    content:
      "We may update our Privacy Policy from time to time. Thus, we advise you to review this page periodically for any changes. These changes are effective immediately after they get posted on this page.",
  },
  {
    title: "10. Terms of Use for Website",
    content: null,
    bullets: [
      "We try our best to protect your private information.",
      "Your name and content you create can be used for promotional purposes.",
      "You must not misuse or exploit any vulnerabilities in the website.",
      "You are free to review the source code available at the Sankalan Website.",
    ],
    intro:
      "By using our website (*.ducs.in), you agree to the privacy policy and the following terms:",
  },
  {
    title: "11. Terms of Service for Sankalan",
    content: null,
    bullets: [
      "You must not misuse technology to cause damage to Sankalan.",
      "You must follow the guidelines provided during the event.",
      "You will respect the organizers and other participants.",
      "Violation of terms can result in disqualification and potential future bans.",
    ],
    intro:
      "By registering for Sankalan through our website or registration desk you agree to the following terms:",
  },
  {
    title: "12. Non-discrimination Policy",
    content:
      "Sankalan prohibits discrimination, harassment, and bullying against any person based on age, gender, race, nationality, disability, and other protected characteristics.",
  },
  {
    title: "13. Event Conduct and Safety",
    content:
      "Sankalan is committed to providing a safe, productive, and welcoming environment to all participants. Participants are expected to adhere to these principles and respect the rights of others. Violations may result in disqualification.",
  },
  {
    title: "14. Contact Us",
    content: null,
    isContact: true,
  },
];

export default function Privacy() {
  const width = useWindowWidth();
  const isMobile = width < 600;
  const isTablet = width >= 600 && width < 1024;

  // scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <section
      style={{
        position: "relative",
        minHeight: "100vh",
        background: "#03040a",
        padding: isMobile
          ? "6rem 1.25rem 4rem"
          : isTablet
          ? "7rem 2rem 5rem"
          : "8rem 2rem 6rem",
        boxSizing: "border-box",
        overflow: "hidden",
      }}
    >
      {/* ── GRID BG ── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          backgroundImage: `
            linear-gradient(rgba(0,245,196,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,245,196,0.03) 1px, transparent 1px)
          `,
          backgroundSize: isMobile ? "40px 40px" : "60px 60px",
          maskImage:
            "radial-gradient(ellipse 80% 60% at 50% 0%, black 30%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 60% at 50% 0%, black 30%, transparent 100%)",
          zIndex: 0,
        }}
      />

      {/* ── GLOW ORBS ── */}
      <div
        style={{
          position: "absolute",
          top: "10%",
          left: "50%",
          transform: "translateX(-50%)",
          width: isMobile ? "300px" : "600px",
          height: isMobile ? "300px" : "600px",
          background:
            "radial-gradient(circle, rgba(0,245,196,0.05) 0%, transparent 70%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "20%",
          right: "10%",
          width: isMobile ? "200px" : "400px",
          height: isMobile ? "200px" : "400px",
          background:
            "radial-gradient(circle, rgba(123,95,255,0.06) 0%, transparent 70%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* ── CONTENT WRAPPER ── */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: "860px",
          margin: "0 auto",
        }}
      >
        {/* ── BACK LINK ── */}
        <Link
          to="/"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            fontFamily: "'Space Mono', monospace",
            fontSize: "0.72rem",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "#7a7f99",
            textDecoration: "none",
            marginBottom: isMobile ? "2rem" : "2.5rem",
            transition: "color 0.2s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#00f5c4")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "#7a7f99")}
        >
          ‹ Back to Home
        </Link>

        {/* ── BADGE ── */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.6rem",
            border: "1px solid rgba(0,245,196,0.15)",
            padding: "0.4rem 1rem",
            marginBottom: isMobile ? "1.5rem" : "2rem",
            fontFamily: "'Space Mono', monospace",
            fontSize: isMobile ? "0.6rem" : "0.72rem",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "#00f5c4",
            background: "rgba(0,245,196,0.06)",
          }}
        >
          <span
            style={{
              width: "6px",
              height: "6px",
              borderRadius: "50%",
              background: "#00f5c4",
              display: "inline-block",
              flexShrink: 0,
            }}
          />
          Legal · Sankalan 2026
        </div>

        {/* ── TITLE ── */}
        <h1
          style={{
            fontFamily: "'Orbitron', monospace",
            fontSize: isMobile
              ? "clamp(1.6rem, 8vw, 2.4rem)"
              : isTablet
              ? "clamp(2rem, 5vw, 3rem)"
              : "clamp(2.4rem, 4vw, 3.5rem)",
            fontWeight: 900,
            letterSpacing: isMobile ? "0.02em" : "-0.01em",
            lineHeight: 1.15,
            background:
              "linear-gradient(135deg, #ffffff 0%, #00f5c4 40%, #7b5fff 80%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            margin: "0 0 0.75rem 0",
          }}
        >
          Privacy Policy &<br />Terms of Service
        </h1>

        {/* ── LAST UPDATED ── */}
        <p
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: isMobile ? "0.68rem" : "0.78rem",
            color: "#7a7f99",
            letterSpacing: "0.08em",
            margin: "0 0 3rem 0",
          }}
        >
          Last Updated:{" "}
          <span style={{ color: "#00f5c4" }}>March 22, 2025</span>
        </p>

        {/* ── CARD ── */}
        <div
          style={{
            background: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(0,245,196,0.12)",
            padding: isMobile ? "1.5rem 1.25rem" : isTablet ? "2.5rem" : "3rem",
            clipPath: isMobile
              ? "none"
              : "polygon(16px 0%, 100% 0%, calc(100% - 16px) 100%, 0% 100%)",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
          }}
        >
          {sections.map((sec, i) => (
            <PolicySection
              key={i}
              section={sec}
              isMobile={isMobile}
              isLast={i === sections.length - 1}
            />
          ))}
        </div>

        {/* ── BOTTOM NOTE ── */}
        <p
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: isMobile ? "0.65rem" : "0.72rem",
            color: "#7a7f99",
            textAlign: "center",
            marginTop: "2.5rem",
            lineHeight: 1.8,
          }}
        >
          © 2026 Sankalan — Department of Computer Science Society,
          University of Delhi
        </p>
      </div>
    </section>
  );
}

// ── Section component ──────────────────────────────────────────────────────
function PolicySection({ section, isMobile, isLast }) {
  return (
    <div
      style={{
        marginBottom: isLast ? 0 : isMobile ? "2rem" : "2.5rem",
      }}
    >
      {/* Section heading */}
      <h2
        style={{
          fontFamily: "'Orbitron', monospace",
          fontSize: isMobile ? "0.78rem" : "0.92rem",
          fontWeight: 700,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: "#00f5c4",
          margin: "0 0 0.75rem 0",
        }}
      >
        {section.title}
      </h2>

      {/* Divider */}
      <div
        style={{
          height: "1px",
          background:
            "linear-gradient(90deg, rgba(0,245,196,0.4), rgba(123,95,255,0.2), transparent)",
          marginBottom: "1rem",
        }}
      />

      {/* Intro line (for bullet sections) */}
      {section.intro && (
        <p
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: isMobile ? "0.72rem" : "0.82rem",
            color: "rgba(232,234,240,0.65)",
            lineHeight: 1.9,
            margin: "0 0 0.75rem 0",
          }}
        >
          {section.intro}
        </p>
      )}

      {/* Paragraph content */}
      {section.content && (
        <p
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: isMobile ? "0.72rem" : "0.82rem",
            color: "rgba(232,234,240,0.65)",
            lineHeight: 1.9,
            margin: 0,
          }}
        >
          {section.content}
        </p>
      )}

      {/* Bullet list */}
      {section.bullets && (
        <ul
          style={{
            margin: "0.5rem 0 0 0",
            paddingLeft: "1.2rem",
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
          }}
        >
          {section.bullets.map((b, bi) => (
            <li
              key={bi}
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: isMobile ? "0.72rem" : "0.82rem",
                color: "rgba(232,234,240,0.65)",
                lineHeight: 1.8,
                listStyleType: "none",
                display: "flex",
                alignItems: "flex-start",
                gap: "0.6rem",
              }}
            >
              <span
                style={{
                  color: "#00f5c4",
                  flexShrink: 0,
                  marginTop: "0.2rem",
                  fontSize: "0.65rem",
                }}
              >
                ◆
              </span>
              {b}
            </li>
          ))}
        </ul>
      )}

      {/* Contact section special render */}
      {section.isContact && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "0.6rem",
          }}
        >
          <p
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: isMobile ? "0.72rem" : "0.82rem",
              color: "rgba(232,234,240,0.65)",
              lineHeight: 1.9,
              margin: 0,
            }}
          >
            If you have any questions about these policies, please contact us:
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
            <span
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: isMobile ? "0.72rem" : "0.82rem",
                color: "rgba(232,234,240,0.65)",
              }}
            >
              Email:{" "}
              <a
                href="mailto:ducss@cs.du.ac.in"
                style={{
                  color: "#00f5c4",
                  textDecoration: "none",
                  transition: "opacity 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.7")}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
              >
                ducss@cs.du.ac.in
              </a>
            </span>
            <span
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: isMobile ? "0.72rem" : "0.82rem",
                color: "rgba(232,234,240,0.65)",
              }}
            >
              Address:{" "}
              <span style={{ color: "#7b5fff" }}>
                Department of Computer Science, University of Delhi, Delhi, India
              </span>
            </span>
          </div>
        </div>
      )}
    </div>
  );
}