"use client"
import { useEffect, useState, useMemo } from "react";

import {Card, CardContent} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {Button} from "@/components/ui/button";


const GOLD = "#C9A84C";
const SURFACE = "#111520";
const SURFACE2 = "#161B2C";
const MUTED = "rgba(240,237,230,0.5)";
const BORDER = "rgba(255,255,255,0.07)";

export default function MainPage() {
  const [, setIsVisible] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsVisible(true);
  }, []);

  const features = useMemo(() => [
    {
      title: "Instant Matchmaking",
      description: "Get into ranked matches in under 30 seconds with our skill-based queuing system.",
      icon: (
          <svg viewBox="0 0 24 24" fill="none" stroke={GOLD} strokeWidth="1.5" width="16" height="16">
            <polygon points="13,2 3,14 12,14 11,22 21,10 12,10" />
          </svg>
      ),
    },
    {
      title: "Build Your Profile",
      description: "Showcase your stats, highlight reels, and achievements to scouts and teammates.",
      icon: (
          <svg viewBox="0 0 24 24" fill="none" stroke={GOLD} strokeWidth="1.5" width="16" height="16">
            <path d="M12 20h9M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" />
          </svg>
      ),
    },
    {
      title: "Team Management",
      description: "Organize rosters, schedule scrimmages, and communicate with your squad in one place.",
      icon: (
          <svg viewBox="0 0 24 24" fill="none" stroke={GOLD} strokeWidth="1.5" width="16" height="16">
            <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
          </svg>
      ),
    },
    {
      title: "Performance Analytics",
      description: "Deep-dive stats and heatmaps that reveal exactly where you need to improve.",
      icon: (
          <svg viewBox="0 0 24 24" fill="none" stroke={GOLD} strokeWidth="1.5" width="16" height="16">
            <polyline points="22,12 18,12 15,21 9,3 6,12 2,12" />
          </svg>
      ),
    },
    {
      title: "Anti-Cheat Protection",
      description: "Multi-layer detection keeps lobbies clean and rankings trustworthy at all times.",
      icon: (
          <svg viewBox="0 0 24 24" fill="none" stroke={GOLD} strokeWidth="1.5" width="16" height="16">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          </svg>
      ),
    },
    {
      title: "Tournament Hub",
      description: "Browse and register for open brackets, leagues, and sponsored prize-pool events.",
      icon: (
          <svg viewBox="0 0 24 24" fill="none" stroke={GOLD} strokeWidth="1.5" width="16" height="16">
            <rect x="2" y="3" width="20" height="14" rx="2" />
            <path d="M8 21h8M12 17v4" />
          </svg>
      ),
    },
  ], []);

  const testimonials = useMemo(() => [
    {
      name: "Alex Johnson",
      role: "Valorant — Radiant",
      initials: "AJ",
      content: "Finally a platform that understands what competitive players actually need. The analytics alone are worth it.",
      rating: 5,
    },
    {
      name: "Peter John",
      role: "Valorant — Immortal 3",
      initials: "PJ",
      content: "Found my current team through the platform in less than a week. The matchmaking is genuinely impressive.",
      rating: 5,
    },
    {
      name: "Iris Chan",
      role: "Valorant — Diamond 1",
      initials: "IC",
      content: "The profile system got me noticed by a sponsor. No other platform comes close to this level of exposure.",
      rating: 5,
    },
  ], []);

  const stats = useMemo(() => [
    { value: "10K+", label: "Active players" },
    { value: "$500K", label: "Prizes won" },
    { value: "100%", label: "Secure platform" },
    { value: "24/7", label: "Live support" },
  ], []);

  const techStack = [
    "React", "TypeScript", "Tailwind CSS", "Node.js",
    "PostgreSQL", "Redis", "Docker", "AWS",
  ];

  return (
      <>
        <style>{`
        .gp-root {
          font-family: var(--font-dm-sans, 'DM Sans', sans-serif);
          background: #0A0C12;
          color: #F0EDE6;
          font-size: 15px;
          line-height: 1.65;
          overflow-x: hidden;
        }

        /* ── HERO ── */
        .gp-hero {
          min-height: 100svh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 5rem 1.25rem 3rem;
          text-align: center;
          position: relative;
          border-bottom: 1px solid ${BORDER};
        }
        .gp-hero-glow {
          position: absolute;
          inset: 0;
          background:
            radial-gradient(ellipse 80% 60% at 50% 0%, rgba(59,125,216,0.12) 0%, transparent 70%),
            radial-gradient(ellipse 60% 40% at 80% 80%, rgba(201,168,76,0.06) 0%, transparent 60%);
          pointer-events: none;
        }
        .gp-eyebrow-dot {
          width: 5px; height: 5px;
          background: ${GOLD};
          border-radius: 50%;
          display: inline-block;
          flex-shrink: 0;
        }
        .gp-hero-title {
          font-family: var(--font-bebas, 'Bebas Neue', sans-serif);
          font-size: clamp(46px, 12vw, 110px);
          line-height: 0.95;
          letter-spacing: 0.04em;
          margin-bottom: 1.25rem;
          max-width: 900px;
        }
        .gp-hero-sub {
          font-size: clamp(14px, 2.5vw, 16px);
          color: ${MUTED};
          font-weight: 300;
          max-width: 520px;
          margin: 0 auto 2rem;
          line-height: 1.75;
          padding: 0 0.5rem;
        }

        /* ── BUTTONS ── */
        .gp-btn-row {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
          justify-content: center;
          margin-bottom: 2.5rem;
          width: 100%;
        }
        .gp-btn-primary {
          background: ${GOLD} !important;
          color: #0A0C12 !important;
          font-size: 11px !important;
          font-weight: 500 !important;
          letter-spacing: 0.08em !important;
          text-transform: uppercase !important;
          border-radius: 2px !important;
          border: none !important;
          height: auto !important;
          padding: 12px 20px !important;
          white-space: nowrap;
          flex: 1 1 auto;
          max-width: 260px;
        }
        .gp-btn-ghost {
          background: transparent !important;
          color: #F0EDE6 !important;
          font-size: 11px !important;
          font-weight: 500 !important;
          letter-spacing: 0.08em !important;
          text-transform: uppercase !important;
          border-radius: 2px !important;
          border-color: ${BORDER} !important;
          height: auto !important;
          padding: 12px 20px !important;
          white-space: nowrap;
          flex: 1 1 auto;
          max-width: 260px;
        }

        /* ── STATS ── */
        .gp-stats {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1px;
          background: ${BORDER};
          border: 1px solid ${BORDER};
          border-radius: 2px;
          width: 100%;
          max-width: 820px;
          overflow: hidden;
        }
        .gp-stat {
          background: ${SURFACE};
          padding: 1.1rem 0.75rem;
          text-align: center;
        }
        .gp-stat-val {
          font-family: var(--font-bebas, 'Bebas Neue', sans-serif);
          font-size: clamp(26px, 5vw, 36px);
          letter-spacing: 0.04em;
          color: #fff;
          display: block;
          margin-bottom: 3px;
        }
        .gp-stat-label {
          font-size: 10px;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: ${MUTED};
        }

        /* ── SECTIONS ── */
        .gp-section {
          max-width: 1100px;
          margin: 0 auto;
          padding: 3.5rem 1.25rem;
        }
        .gp-section-head { margin-bottom: 2rem; }
        .gp-section-label {
          font-size: 11px;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: ${GOLD};
          font-weight: 500;
          margin-bottom: 0.75rem;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .gp-section-label-line {
          display: inline-block;
          width: 24px; height: 1px;
          background: ${GOLD};
          flex-shrink: 0;
        }
        .gp-section-title {
          font-family: var(--font-bebas, 'Bebas Neue', sans-serif);
          font-size: clamp(28px, 5vw, 54px);
          line-height: 1.0;
          letter-spacing: 0.04em;
        }
        .gp-divider { height: 1px; background: ${BORDER}; }

        /* ── FEATURES ── */
        .gp-features-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1px;
          background: ${BORDER};
          border: 1px solid ${BORDER};
        }
        .gp-feature-card {
          background: ${SURFACE} !important;
          border: none !important;
          border-radius: 0 !important;
          transition: background 0.2s;
          cursor: default;
        }
        .gp-feature-card:hover { background: ${SURFACE2} !important; }
        .gp-feature-icon {
          width: 36px; height: 36px;
          border: 1px solid rgba(201,168,76,0.35);
          display: flex; align-items: center; justify-content: center;
          margin-bottom: 1.25rem;
          border-radius: 2px;
          flex-shrink: 0;
        }
        .gp-feature-title {
          font-family: var(--font-bebas, 'Bebas Neue', sans-serif);
          font-size: 22px;
          letter-spacing: 0.05em;
          margin-bottom: 0.5rem;
          color: #F0EDE6;
        }
        .gp-feature-desc {
          font-size: 14px;
          color: ${MUTED};
          line-height: 1.7;
          font-weight: 300;
          margin: 0;
        }

        /* ── TECH ── */
        .gp-tech-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1px;
          background: ${BORDER};
          border: 1px solid ${BORDER};
        }
        .gp-tech-card {
          background: ${SURFACE} !important;
          border: none !important;
          border-radius: 0 !important;
          transition: background 0.2s;
        }
        .gp-tech-card:hover { background: ${SURFACE2} !important; }
        .gp-tech-label {
          padding: 1.1rem 1rem !important;
          text-align: center;
          font-size: 13px;
          font-weight: 500;
          letter-spacing: 0.04em;
          color: ${MUTED};
        }

        /* ── TESTIMONIALS ── */
        .gp-testimonials-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 12px;
        }
        .gp-tcard {
          background: ${SURFACE} !important;
          border: 1px solid ${BORDER} !important;
          border-radius: 2px !important;
        }
        .gp-avatar {
          width: 42px; height: 42px;
          border-radius: 50%;
          background: linear-gradient(135deg, #3B7DD8 0%, #C9A84C 100%);
          display: flex; align-items: center; justify-content: center;
          font-family: var(--font-bebas, 'Bebas Neue', sans-serif);
          font-size: 16px; letter-spacing: 0.05em;
          color: #0A0C12;
          flex-shrink: 0;
        }

        /* ── CTA ── */
        .gp-cta-wrap {
          max-width: 1100px;
          margin: 0 auto;
          padding: 0 1.25rem 3.5rem;
        }
        .gp-cta-card {
          background: ${SURFACE} !important;
          border: 1px solid ${BORDER} !important;
          border-radius: 2px !important;
          overflow: hidden;
          position: relative;
        }
        .gp-cta-glow {
          position: absolute; inset: 0;
          background: radial-gradient(ellipse 70% 60% at 50% 0%, rgba(59,125,216,0.08) 0%, transparent 70%);
          pointer-events: none;
        }
        .gp-cta-content {
          padding: 2.5rem 1.25rem !important;
          text-align: center;
          position: relative;
        }
        .gp-cta-title {
          font-family: var(--font-bebas, 'Bebas Neue', sans-serif);
          font-size: clamp(34px, 7vw, 68px);
          line-height: 1.0;
          letter-spacing: 0.04em;
          margin-bottom: 1rem;
          color: #F0EDE6;
        }
        .gp-cta-sub {
          font-size: 15px;
          color: ${MUTED};
          font-weight: 300;
          max-width: 440px;
          margin: 0 auto 2rem;
          line-height: 1.75;
        }
        .gp-trust-row {
          display: flex;
          justify-content: center;
          gap: 0.75rem 1.5rem;
          flex-wrap: wrap;
          margin-top: 1.5rem;
        }
        .gp-trust-item {
          display: flex; align-items: center; gap: 6px;
          font-size: 12px; color: ${MUTED};
        }

        /* ── TABLET 640px+ ── */
        @media (min-width: 640px) {
          .gp-hero { padding: 6rem 2rem 4rem; }
          .gp-btn-primary { font-size: 13px !important; padding: 14px 28px !important; flex: 0 0 auto; }
          .gp-btn-ghost   { font-size: 13px !important; padding: 14px 28px !important; flex: 0 0 auto; }
          .gp-btn-row { margin-bottom: 3.5rem; }
          .gp-stats { grid-template-columns: repeat(4, 1fr); }
          .gp-stat { padding: 1.5rem 1rem; }
          .gp-section { padding: 5rem 2rem; }
          .gp-section-head { margin-bottom: 3rem; }
          .gp-tech-grid { grid-template-columns: repeat(4, 1fr); }
          .gp-testimonials-grid { grid-template-columns: repeat(3, 1fr); gap: 16px; }
          .gp-cta-content { padding: 4rem 3rem !important; }
          .gp-cta-wrap { padding: 0 2rem 5rem; }
        }

        /* ── DESKTOP 1024px+ ── */
        @media (min-width: 1024px) {
          .gp-features-grid { grid-template-columns: repeat(3, 1fr); }
          .gp-section { padding: 6rem 2rem; }
          .gp-section-head { margin-bottom: 3.5rem; }
          .gp-cta-content { padding: 5rem 4rem !important; }
          .gp-cta-wrap { padding: 0 2rem 6rem; }
        }
      `}</style>

        <div className="gp-root">

          {/* ── HERO ── */}
          <section className="gp-hero">
            <div className="gp-hero-glow" />

            <Badge
                variant="outline"
                style={{
                  fontSize: "11px",
                  fontWeight: 500,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: GOLD,
                  borderColor: "rgba(201,168,76,0.3)",
                  borderRadius: "2px",
                  padding: "6px 16px",
                  marginBottom: "2rem",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  background: "transparent",
                }}
            >
              <span className="gp-eyebrow-dot" />
              Platform for gamers, by gamers
            </Badge>

            <h1 className="gp-hero-title">
              Built for the future of{" "}
              <span style={{ color: GOLD }}>competitive</span> gaming
            </h1>

            <p className="gp-hero-sub">
              The ultimate platform to build your competitive profile, find tournaments,
              and connect with the best players in the world.
            </p>

            <div className="gp-btn-row">
              <Button size="lg" className="gp-btn-primary">
                Create your profile →
              </Button>
              <Button size="lg" variant="outline" className="gp-btn-ghost">
                ▶ Watch demo
              </Button>
            </div>

            <div className="gp-stats">
              {stats.map((s) => (
                  <div key={s.label} className="gp-stat">
                    <span className="gp-stat-val">{s.value}</span>
                    <span className="gp-stat-label">{s.label}</span>
                  </div>
              ))}
            </div>
          </section>

          {/* ── FEATURES ── */}
          <div className="gp-section">
            <div className="gp-section-head">
              <div className="gp-section-label">
                <span className="gp-section-label-line" />
                Why us
              </div>
              <h2 className="gp-section-title">
                Everything you need to <span style={{ color: GOLD }}>compete</span> at your best
              </h2>
            </div>
            <div className="gp-features-grid">
              {features.map((f) => (
                  <Card key={f.title} className="gp-feature-card">
                    <CardContent style={{ padding: "2rem 1.75rem" }}>
                      <div className="gp-feature-icon">{f.icon}</div>
                      <div className="gp-feature-title">{f.title}</div>
                      <p className="gp-feature-desc">{f.description}</p>
                    </CardContent>
                  </Card>
              ))}
            </div>
          </div>

          <div className="gp-divider" />

          {/* ── TECH STACK ── */}
          <div className="gp-section">
            <div className="gp-section-head">
              <div className="gp-section-label">
                <span className="gp-section-label-line" />
                Infrastructure
              </div>
              <h2 className="gp-section-title">
                Powered by <span style={{ color: GOLD }}>best-in-class</span> technology
              </h2>
            </div>
            <div className="gp-tech-grid">
              {techStack.map((t) => (
                  <Card key={t} className="gp-tech-card">
                    <CardContent className="gp-tech-label">{t}</CardContent>
                  </Card>
              ))}
            </div>
          </div>

          <div className="gp-divider" />

          {/* ── TESTIMONIALS ── */}
          <div className="gp-section">
            <div className="gp-section-head">
              <div className="gp-section-label">
                <span className="gp-section-label-line" />
                Community
              </div>
              <h2 className="gp-section-title">
                Trusted by <span style={{ color: GOLD }}>pro players</span>
              </h2>
            </div>
            <div className="gp-testimonials-grid">
              {testimonials.map((t) => (
                  <Card key={t.name} className="gp-tcard">
                    <CardContent style={{ padding: "1.75rem" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "1.25rem" }}>
                        <div className="gp-avatar">{t.initials}</div>
                        <div>
                          <div style={{ fontWeight: 500, fontSize: "14px", color: "#F0EDE6" }}>{t.name}</div>
                          <div style={{ fontSize: "12px", color: MUTED }}>{t.role}</div>
                        </div>
                      </div>
                      <p style={{ fontSize: "14px", color: MUTED, lineHeight: 1.75, fontWeight: 300, fontStyle: "italic", marginBottom: "1rem" }}>
                        &ldquo;{t.content}&rdquo;
                      </p>
                      <div style={{ color: GOLD, fontSize: "13px", letterSpacing: "2px" }}>
                        {"★".repeat(t.rating)}
                      </div>
                    </CardContent>
                  </Card>
              ))}
            </div>
          </div>

          {/* ── CTA ── */}
          <div className="gp-cta-wrap">
            <Card className="gp-cta-card">
              <div className="gp-cta-glow" />
              <CardContent className="gp-cta-content">
                <h2 className="gp-cta-title">
                  Are you up for the <span style={{ color: GOLD }}>challenge?</span>
                </h2>
                <p className="gp-cta-sub">
                  Join thousands of players already competing in tournaments. Build your profile today.
                </p>
                <div className="gp-btn-row" style={{ marginBottom: 0 }}>
                  <Button size="lg" className="gp-btn-primary">
                    Sign up — it&apos;s free →
                  </Button>
                  <Button size="lg" variant="outline" className="gp-btn-ghost">
                    Contact us
                  </Button>
                </div>
                <div className="gp-trust-row">
                  {["No credit card required", "14-day free trial", "Cancel anytime"].map((item) => (
                      <span key={item} className="gp-trust-item">
                    <span style={{ color: "#4CAF78" }}>✓</span> {item}
                  </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

        </div>
      </>
  );
}