import { motion, useTransform, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import PillNav from './components/PillNav';
import wolfLogo from './assets/wolf.png';
import endwolfImg from './assets/endwolf.png';
import peep1 from "./assets/peep/peep-standing-1.png";
import peep2 from "./assets/peep/peep-standing-2.png";
import peep3 from "./assets/peep/peep-standing-3.png";
import peep4 from "./assets/peep/peep-standing-4.png";
import peep5 from "./assets/peep/peep-standing-5.png";
import peep6 from "./assets/peep/peep-standing-6.png";
import peep7 from "./assets/peep/peep-standing-7.png";
import peep8 from "./assets/peep/peep-standing-8.png";
import peep9 from "./assets/peep/peep-standing-9.png";
import peep10 from "./assets/peep/peep-standing-10.png";
import peep11 from "./assets/peep/peep-standing-11.png";
import peep12 from "./assets/peep/peep-standing-12.png";
import peep13 from "./assets/peep/peep-standing-13.png";
import peep14 from "./assets/peep/peep-standing-14.png";
import peep15 from "./assets/peep/peep-standing-15.png";
import peep16 from "./assets/peep/peep-standing-16.png";
import peep17 from "./assets/peep/peep-standing-17.png";
import peep18 from "./assets/peep/peep-standing-18.png";
import peep19 from "./assets/peep/peep-standing-19.png";
import peep20 from "./assets/peep/peep-standing-20.png";
import peep21 from "./assets/peep/peep-standing-21.png";
import peep22 from "./assets/peep/peep-standing-22.png";
import peep23 from "./assets/peep/peep-standing-23.png";
import peep24 from "./assets/peep/peep-standing-24.png";
import peep25 from "./assets/peep/peep-standing-25.png";
import peep26 from "./assets/peep/peep-standing-26.png";
import peep27 from "./assets/peep/peep-standing-27.png";
import peep28 from "./assets/peep/peep-standing-28.png";
import peep29 from "./assets/peep/peep-standing-29.png";
import peep30 from "./assets/peep/peep-standing-30.png";

const PEEP_SRCS = [
  peep1, peep2, peep3, peep4, peep5, peep6, peep7, peep8, peep9, peep10,
  peep11, peep12, peep13, peep14, peep15, peep16, peep17, peep18, peep19, peep20,
  peep21, peep22, peep23, peep24, peep25, peep26, peep27, peep28, peep29, peep30,
];
gsap.registerPlugin(ScrollTrigger);
// ─── WOLF SVG LOGO ────────────────────────────────────────────────────────────
const WolfLogo = ({ size = 48, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Wolf head silhouette */}
    <path d="M15 85 L20 55 L10 30 L25 40 L30 20 L40 45 L50 38 L60 45 L70 20 L75 40 L90 30 L80 55 L85 85 L65 75 L60 90 L50 78 L40 90 L35 75 Z" fill="#E8F020" />
    <path d="M30 20 L25 5 L38 28 Z" fill="#E8F020" />
    <path d="M70 20 L75 5 L62 28 Z" fill="#E8F020" />
    {/* Eyes */}
    <ellipse cx="38" cy="52" rx="4" ry="5" fill="#0a0a0a" />
    <ellipse cx="62" cy="52" rx="4" ry="5" fill="#0a0a0a" />
    <circle cx="37" cy="51" r="1.5" fill="#E8F020" />
    <circle cx="61" cy="51" r="1.5" fill="#E8F020" />
    {/* Nose */}
    <ellipse cx="50" cy="63" rx="5" ry="3.5" fill="#0a0a0a" />
    {/* Mouth */}
    <path d="M45 66 Q50 72 55 66" stroke="#0a0a0a" strokeWidth="1.5" fill="none" />
  </svg>
);

// ─── DATA ─────────────────────────────────────────────────────────────────────
const PROJECTS = [
  {
    id: 1,
    title: "CIPHER DASHBOARD",
    tags: ["React", "Node.js", "PostgreSQL"],
    desc: "Real-time analytics at scale — 2M+ events processed daily, sub-50ms query latency. Built for teams that can't afford slow data.",
    year: "2024",
    color: "#E8F020",
  },
  {
    id: 2,
    title: "LUNA ECOMMERCE",
    tags: ["Next.js", "Shopify API", "Tailwind"],
    desc: "Headless storefront with 3D product viewing and AR try-on. Conversion rate tripled in 60 days post-launch.",
    year: "2024",
    color: "#20F0D4",
  },
  {
    id: 3,
    title: "WRAITH MOBILE",
    tags: ["React Native", "Firebase", "ML Kit"],
    desc: "AI fitness companion with real-time pose estimation and adaptive workout generation. Zero compromise on native feel.",
    year: "2023",
    color: "#F020A0",
  },
  {
    id: 4,
    title: "VAULT PROTOCOL",
    tags: ["Solidity", "Web3.js", "Hardhat"],
    desc: "DeFi smart contract vault. $4M TVL. Automated yield optimization. Audited. Secure. Running in production.",
    year: "2023",
    color: "#20A0F0",
  },
  {
    id: 5,
    title: "ECHO CMS",
    tags: ["TypeScript", "GraphQL", "Redis"],
    desc: "Headless content infrastructure powering 50+ media brands. Custom block editor with live multi-user collaboration.",
    year: "2023",
    color: "#F08020",
  },
];

const SERVICES = [
  { icon: "⬡", label: "Web Applications", desc: "Full-stack products built on React and Node — fast, scalable, and production-ready from day one." },
  { icon: "◈", label: "Mobile", desc: "React Native apps with genuine native performance. Cross-platform without compromise." },
  { icon: "◉", label: "3D & Motion", desc: "Three.js environments, scroll-driven sequences, and micro-interactions that make interfaces unforgettable." },
  { icon: "◆", label: "Design Systems", desc: "Token-based component libraries. Figma-to-code pipelines that eliminate the design-dev gap entirely." },
  { icon: "◊", label: "Web3", desc: "Smart contracts, dApp frontends, wallet integrations. Built for the infrastructure shift, not the hype cycle." },
  { icon: "○", label: "Strategy & Consulting", desc: "Architecture audits, technical roadmaps, and performance reviews for teams that need clarity before they build." },
];

const STACK = ["React", "TypeScript", "Framer Motion", "Three.js", "Node.js", "PostgreSQL", "React Native", "Figma", "AWS"];

// ─── CURSOR ───────────────────────────────────────────────────────────────────
const CustomCursor = () => {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springX = useSpring(cursorX, { stiffness: 500, damping: 28 });
  const springY = useSpring(cursorY, { stiffness: 500, damping: 28 });
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const move = (e) => { cursorX.set(e.clientX); cursorY.set(e.clientY); };
    const over = (e) => { if (e.target.closest("a,button,[data-hover]")) setHovered(true); };
    const out = () => setHovered(false);
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    window.addEventListener("mouseout", out);
    return () => { window.removeEventListener("mousemove", move); window.removeEventListener("mouseover", over); window.removeEventListener("mouseout", out); };
  }, []);

  return (
    <motion.div
      style={{ x: springX, y: springY, translateX: "-50%", translateY: "-50%", position: "fixed", top: 0, left: 0, pointerEvents: "none", zIndex: 9999 }}
      animate={{ scale: hovered ? 2.5 : 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#DCDCDC", mixBlendMode: "difference" }} />
    </motion.div>
  );
};

// ─── NOISE TEXTURE OVERLAY ────────────────────────────────────────────────────
const NoiseOverlay = () => (
  <div style={{
    position: "fixed", inset: 0, zIndex: 1, pointerEvents: "none", opacity: 0.035,
    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
    backgroundSize: "256px",
  }} />
);

// ─── NAV ITEMS ────────────────────────────────────────────────────────────────
const NAV_ITEMS = [
  { label: 'Work', href: '#work' },
  { label: 'Services', href: '#services' },
  { label: 'Stack', href: '#stack' },
  { label: 'Contact', href: '#contact' },
];

// ─── HERO ─────────────────────────────────────────────────────────────────────
const Hero = () => {
  const targetRef = useRef(null);

  // Manual scroll progress — avoids Framer Motion v12 + Lenis v1.3.x useScroll bug.
  // Lenis calls window.scrollTo() which fires native scroll events we can listen to.
  const progress = useMotionValue(0);

  useEffect(() => {
    const onScroll = () => {
      const el = targetRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = el.offsetHeight - window.innerHeight;
      if (total <= 0) return;
      progress.set(Math.max(0, Math.min(1, -rect.top / total)));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [progress]);

  // Wolf logo: fully visible at page load, fades to ~45% as user scrolls
  const wolfOpacity = useTransform(progress, [0, 0.45], [1, 0.45]);

  // Text: invisible at load, fades in + rises from below
  const textOpacity = useTransform(progress, [0.12, 0.42, 0.62, 0.78], [0, 1, 1, 0]);
  const textY = useTransform(progress, [0.12, 0.42], [60, 0]);

  // Tagline: appears after text
  const taglineOpacity = useTransform(progress, [0.22, 0.46, 0.62, 0.78], [0, 1, 1, 0]);
  const taglineY = useTransform(progress, [0.22, 0.46], [24, 0]);

  // Buttons: last to appear
  const btnsOpacity = useTransform(progress, [0.32, 0.52, 0.62, 0.78], [0, 1, 1, 0]);

  return (
    <div
      ref={targetRef}
      style={{ position: "relative", height: "320vh", width: "100%", background: "#080808" }}
    >
      {/* background grid */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage: "linear-gradient(rgba(232,240,32,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(232,240,32,0.035) 1px, transparent 1px)",
        backgroundSize: "80px 80px",
      }} />

      {/* sticky viewport */}
      <div style={{
        position: "sticky", top: 0, height: "100vh",
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        overflow: "hidden",
      }}>

        {/* Wolf logo — centered behind text, fades as user scrolls */}
        <motion.div style={{
          position: "absolute",
          top: "50%", left: "50%",
          translateX: "-50%", translateY: "-50%",
          opacity: wolfOpacity,
          pointerEvents: "none",
        }}>
          <img
            src={endwolfImg}
            alt=""
            style={{ width: "min(52vw, 480px)", height: "auto", display: "block" }}
          />
        </motion.div>

        {/* THE WOLF AGE — fades in + rises from below as user scrolls */}
        <motion.div style={{ opacity: textOpacity, y: textY, position: "relative", zIndex: 2 }}>
          <h1 style={{
            fontFamily: "'Bebas Neue', 'Anton', sans-serif",
            fontSize: "clamp(5rem, 12.5vw, 13rem)",
            color: "#E8F020",
            lineHeight: "88%",
            // letterSpacing: "0.06em",
            letterSpacing: "1%",
            textAlign: "center",
            margin: 0,
          }}>
            THE 
            <span style={{ color: "#fff", WebkitTextStroke: "2px #E8F020" }}>WOLF</span> 
             AGE
          </h1>
        </motion.div>

        {/* Tagline */}
        <motion.p style={{
          opacity: taglineOpacity, y: taglineY,
          fontFamily: "'Space Grotesk', sans-serif",
          color: "#555", fontSize: "0.92rem",
          letterSpacing: "0.34em", marginTop: "2.2rem",
          textTransform: "uppercase",
          // paddingTop: "28rem",
          paddingTop: "28%",
          position: "relative", zIndex: 2,
        }}>
          Digital Craft · Fearless Execution
        </motion.p>

        {/* CTA buttons */}
        <motion.div style={{
          opacity: btnsOpacity,
          display: "flex", justifyContent: "center",
          marginTop: "2.6rem", gap: "1.2rem",
          position: "relative", zIndex: 2,
        }}>
          <a href="#work" data-hover style={{
            padding: "0.9rem 2.5rem", background: "#E8F020", color: "#080808",
            fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700,
            fontSize: "0.82rem", letterSpacing: "0.2em", textDecoration: "none",
            textTransform: "uppercase",
            clipPath: "polygon(8px 0, 100% 0, calc(100% - 8px) 100%, 0 100%)",
          }}>View Our Work</a>
          <a href="#contact" data-hover style={{
            padding: "0.9rem 2.5rem", border: "1px solid rgba(232,240,32,0.3)",
            color: "#E8F020", fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 600, fontSize: "0.82rem", letterSpacing: "0.2em",
            textDecoration: "none", textTransform: "uppercase", background: "transparent",
            clipPath: "polygon(8px 0, 100% 0, calc(100% - 8px) 100%, 0 100%)",
          }}>Start a Project</a>
        </motion.div>

      </div>
    </div>
  );
};

// ─── HERO REVEAL ─────────────────────────────────────────────────────────────
const heroRevealStatements = [
  "Most agencies build websites.",
  "We build market presence.",
  "Every brand has a potential.",
  "We make it undeniable.",
  "This is The Wolf Age.",
];

const REVEAL_COLORS = ["#E8F020", "#ffffff", "#20F0D4", "#ffffff", "#E8F020"];

const HeroReveal = () => {
  const containerRef = useRef(null);
  const textRefs = useRef([]);
  const counterRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: `+=${heroRevealStatements.length * 100}%`,
        pin: true,
        scrub: 1,
        onUpdate: (self) => {
          const index = Math.min(
            Math.floor(self.progress * heroRevealStatements.length),
            heroRevealStatements.length - 1
          );

          textRefs.current.forEach((el, i) => {
            if (!el) return;
            if (i === index) {
              gsap.to(el, { opacity: 1, scale: 1, filter: "blur(0px)", duration: 0.45, ease: "power2.out" });
            } else {
              gsap.to(el, { opacity: 0, scale: 0.92, filter: "blur(14px)", duration: 0.45, ease: "power2.out" });
            }
          });

          if (counterRef.current) {
            const n = String(index + 1).padStart(2, "0");
            const t = String(heroRevealStatements.length).padStart(2, "0");
            counterRef.current.textContent = `${n} / ${t}`;
          }
        },
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      style={{
        height: "100vh",
        background: "#080808",
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      {/* Grid */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage: "linear-gradient(rgba(232,240,32,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(232,240,32,0.03) 1px, transparent 1px)",
        backgroundSize: "80px 80px",
      }} />

      {/* Ambient glow */}
      <div style={{
        position: "absolute",
        top: "50%", left: "50%",
        transform: "translate(-50%, -50%)",
        width: "60vw", height: "60vw",
        background: "radial-gradient(ellipse, rgba(232,240,32,0.06) 0%, transparent 68%)",
        borderRadius: "50%",
        pointerEvents: "none",
      }} />

      {/* Statements */}
      <div style={{ position: "relative", zIndex: 10, width: "100%", textAlign: "center" }}>
        {heroRevealStatements.map((text, i) => (
          <h2
            key={i}
            ref={el => { textRefs.current[i] = el; }}
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "90%",
              fontFamily: "'Bebas Neue', 'Anton', sans-serif",
              fontSize: "clamp(3.5rem, 9vw, 9rem)",
              color: REVEAL_COLORS[i],
              letterSpacing: "0.04em",
              textTransform: "uppercase",
              margin: 0,
              lineHeight: 1.05,
              opacity: i === 0 ? 1 : 0,
              filter: i === 0 ? "blur(0px)" : "blur(14px)",
            }}
          >
            {text}
          </h2>
        ))}
      </div>

      {/* Counter */}
      {/* <div
        ref={counterRef}
        style={{
          position: "absolute",
          top: "2.5rem",
          right: "2.5rem",
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: "0.68rem",
          letterSpacing: "0.28em",
          color: "rgba(232,240,32,0.45)",
          zIndex: 10,
        }}
      >
        01 / 05
      </div> */}

      {/* Vertical accent */}
      <div style={{
        position: "absolute",
        left: "2.5rem",
        top: "50%",
        transform: "translateY(-50%)",
        width: "1px",
        height: "28vh",
        background: "linear-gradient(to bottom, transparent, rgba(232,240,32,0.25), transparent)",
        zIndex: 10,
      }} />

      {/* Bottom label */}
      <div style={{
        position: "absolute",
        bottom: "2.8rem",
        left: "50%",
        transform: "translateX(-50%)",
        fontFamily: "'Space Grotesk', sans-serif",
        fontSize: "0.62rem",
        letterSpacing: "0.4em",
        color: "rgba(232,240,32,0.3)",
        textTransform: "uppercase",
        zIndex: 10,
        whiteSpace: "nowrap",
      }}>
        ( THE WOLF AGE )
      </div>
    </section>
  );
};

// ─── MARQUEE ──────────────────────────────────────────────────────────────────
const Marquee = () => {
  const items = ["REACT", "◆", "TYPESCRIPT", "◆", "THREE.JS", "◆", "FRAMER", "◆", "NODE.JS", "◆", "WEB3", "◆", "REACT NATIVE", "◆", "FIGMA", "◆"];
  return (
    <div style={{ background: "#E8F020", overflow: "hidden", padding: "0.8rem 0", borderTop: "1px solid rgba(0,0,0,0.1)", borderBottom: "1px solid rgba(0,0,0,0.1)" }}>
      <motion.div
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        style={{ display: "flex", gap: "2rem", whiteSpace: "nowrap", width: "max-content" }}
      >
        {[...items, ...items].map((item, i) => (
          <span key={i} style={{
            fontFamily: "'Bebas Neue', 'Anton', sans-serif",
            fontSize: "1.1rem",
            letterSpacing: "0.2em",
            color: "#080808",
          }}>{item}</span>
        ))}
      </motion.div>
    </div>
  );
};

// ─── PROJECTS (Skiper19 scroll path adapted) ──────────────────────────────────
const Projects = () => {
  const ref = useRef(null);
  const sectionProgress = useMotionValue(0);

  useEffect(() => {
    const onScroll = () => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = el.offsetHeight - window.innerHeight;
      if (total <= 0) return;
      sectionProgress.set(Math.max(0, Math.min(1, -rect.top / total)));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [sectionProgress]);

  const pathLength = useTransform(sectionProgress, [0, 1], [0, 1]);

  return (
    <section id="work" ref={ref} style={{ background: "#080808", padding: "8rem 0", position: "relative" }}>
      {/* Decorative SVG line path */}
      <svg style={{ position: "absolute", right: "5%", top: 0, height: "100%", width: "500px", overflow: "visible", pointerEvents: "none" }}
        viewBox="0 0 300 2000" fill="none" xmlns="http://www.w3.org/2000/svg">
        <motion.path
          d="M150 0 C200 200 50 300 150 500 C250 700 100 800 150 1000 C200 1200 50 1300 150 1500 C250 1700 100 1800 150 2000"
          stroke="#e7ef15ff"
          strokeWidth="6.5"
          fill="none"
          strokeDasharray="8 4"
          style={{ pathLength, opacity: 0.25 }}
        />
      </svg>

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 2.5rem" }}>
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{ marginBottom: "5rem" }}
        >
          <p style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#E8F020", fontSize: "0.75rem", letterSpacing: "0.35em", textTransform: "uppercase", marginBottom: "1rem" }}>[ 01 ] Selected Work</p>
          <h2 style={{ fontFamily: "'Bebas Neue', 'Anton', sans-serif", fontSize: "clamp(3.5rem, 7vw, 7rem)", color: "#fff", lineHeight: 0.9, margin: 0, letterSpacing: "-0.01em" }}>
            WORK THAT<br /><span style={{ color: "#E8F020" }}>MOVES MARKETS</span>
          </h2>
        </motion.div>

        <div style={{ display: "flex", flexDirection: "column", gap: "1px" }}>
          {PROJECTS.map((project, i) => (
            <ProjectRow key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

const ProjectRow = ({ project, index }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      data-hover
      style={{
        borderTop: "1px solid rgba(255,255,255,0.07)",
        padding: "2.5rem 0",
        display: "grid",
        gridTemplateColumns: "60px 1fr auto",
        alignItems: "center",
        gap: "2rem",
        cursor: "pointer",
        transition: "background 0.3s",
        background: hovered ? "rgba(232,240,32,0.03)" : "transparent",
        paddingLeft: hovered ? "1rem" : "0",
      }}
    >
      <span style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#333", fontSize: "0.75rem", letterSpacing: "0.2em" }}>0{index + 1}</span>
      <div>
        <div style={{ display: "flex", alignItems: "baseline", gap: "1.5rem", marginBottom: "0.5rem" }}>
          <h3 style={{
            fontFamily: "'Bebas Neue', 'Anton', sans-serif",
            fontSize: "clamp(1.8rem, 3.5vw, 3rem)",
            color: hovered ? project.color : "#fff",
            margin: 0,
            letterSpacing: "0.03em",
            transition: "color 0.3s",
          }}>{project.title}</h3>
          <span style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#444", fontSize: "0.75rem" }}>{project.year}</span>
        </div>
        <AnimatePresence>
          {hovered && (
            <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
              style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#888", fontSize: "0.9rem", margin: "0.3rem 0 0.8rem", lineHeight: 1.5 }}>
              {project.desc}
            </motion.p>
          )}
        </AnimatePresence>
        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
          {project.tags.map(t => (
            <span key={t} style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "0.65rem",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              padding: "0.2rem 0.7rem",
              border: `1px solid ${hovered ? project.color + "55" : "rgba(255,255,255,0.1)"}`,
              color: hovered ? project.color : "#555",
              transition: "all 0.3s",
            }}>{t}</span>
          ))}
        </div>
      </div>
      <motion.div animate={{ x: hovered ? 0 : 10, opacity: hovered ? 1 : 0 }} transition={{ duration: 0.3 }}>
        <div style={{ width: 48, height: 48, borderRadius: "50%", border: `1px solid ${project.color}`, display: "flex", alignItems: "center", justifyContent: "center", color: project.color, fontSize: "1.2rem" }}>→</div>
      </motion.div>
    </motion.div>
  );
};

// ─── SERVICES (Skiper31 — fixed) ──────────────────────────────────────────────
// Key fix: useTransform was called inside .map() — that violates Rules of Hooks.
// Solution: extract each animated character into its own component so every
// hook call is at the top level of a component, never inside a loop.
const AnimatedChar = React.memo(({ char, index, centerIndex, scrollYProgress }) => {
  const distanceFromCenter = index - centerIndex;
  const x = useTransform(scrollYProgress, [0, 0.4], [distanceFromCenter * 60, 0]);
  const rotateX = useTransform(scrollYProgress, [0, 0.4], [distanceFromCenter * 40, 0]);
  const opacity = useTransform(scrollYProgress, [0.32, 0.4], [0, 1]);
  return (
    <motion.span
      style={{ x, rotateX, opacity, display: "inline-block", color: index < centerIndex ? "#E8F020" : "#fff" }}
    >
      {char === " " ? " " : char}
    </motion.span>
  );
});

const Services = () => {
  const targetRef = useRef(null);
  const scrollYProgress = useMotionValue(0);

  useEffect(() => {
    const onScroll = () => {
      const el = targetRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = el.offsetHeight - window.innerHeight;
      if (total <= 0) return;
      scrollYProgress.set(Math.max(0, Math.min(1, -rect.top / total)));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [scrollYProgress]);

  const text = "EVERY TOOL. ONE STANDARD.";
  const chars = text.split("");
  const centerIndex = Math.floor(chars.length / 2);

  return (
    <section id="services" ref={targetRef} style={{ background: "#0e0e0e", padding: "8rem 0 6rem", position: "relative", minHeight: "180vh" }}>
      {/* Sticky scroll text reveal */}
      <div style={{ position: "sticky", top: "18vh", zIndex: 2, paddingBottom: "4rem" }}>
        <div style={{
          fontFamily: "'Bebas Neue', 'Anton', sans-serif",
          fontSize: "clamp(2rem, 5vw, 5.5rem)",
          textAlign: "center",
          letterSpacing: "-0.01em",
          perspective: "600px",
          // display: "none",
        }}>
          {chars.map((char, index) => (
            <AnimatedChar
              key={index}
              char={char}
              index={index}
              centerIndex={centerIndex}
              scrollYProgress={scrollYProgress}
            />
          ))}
        </div>
      </div>

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 2.5rem" }}>
        <p style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#E8F020", fontSize: "0.75rem", letterSpacing: "0.35em", textTransform: "uppercase", marginBottom: "3rem" }}>[ 02 ] What We Build</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1px", background: "rgba(255,255,255,0.05)" }}>
          {SERVICES.map((service, i) => (
            <ServiceCard key={i} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

const ServiceCard = ({ service, index }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.07 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      data-hover
      style={{
        padding: "3rem 2.5rem",
        background: hovered ? "rgba(232,240,32,0.04)" : "#0e0e0e",
        transition: "background 0.4s",
        cursor: "pointer",
      }}
    >
      <div style={{ fontSize: "2rem", color: "#E8F020", marginBottom: "1.5rem", transition: "transform 0.3s", transform: hovered ? "scale(1.2)" : "scale(1)" }}>{service.icon}</div>
      <h3 style={{ fontFamily: "'Bebas Neue', 'Anton', sans-serif", fontSize: "1.8rem", color: "#fff", margin: "0 0 0.75rem", letterSpacing: "0.05em" }}>{service.label}</h3>
      <p style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#666", fontSize: "0.9rem", lineHeight: 1.6, margin: 0 }}>{service.desc}</p>
      <motion.div animate={{ scaleX: hovered ? 1 : 0 }} style={{ height: 1, background: "#E8F020", marginTop: "1.5rem", transformOrigin: "left" }} transition={{ duration: 0.4 }} />
    </motion.div>
  );
};

// ─── PARALLAX GALLERY (Skiper30 — fixed) ─────────────────────────────────────
// Key fix: overflow:hidden was clipping the column motion — parallax REQUIRES
// the content to overflow. The ref target needs real scroll height so
// scrollYProgress has range to work with. Columns use absolute positioning
// within a tall scroll container; the inner "viewport" window is sticky.
const ParallaxColumn = ({ color, yOffset, paddingTop }) => {
  return (
    <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: "1.5rem", paddingTop }}>
      {[0, 1, 2].map((i) => (
        <div key={i} style={{
          width: "100%", aspectRatio: "3/4",
          background: `linear-gradient(135deg, ${color}22, ${color}06)`,
          border: `1px solid ${color}18`,
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <WolfLogo size={36} />
        </div>
      ))}
    </div>
  );
};

const ParallaxSection = () => {
  const ref = useRef(null);
  const scrollYProgress = useMotionValue(0);

  useEffect(() => {
    const onScroll = () => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const viewH = window.innerHeight;
      // offset ["start end", "end start"]: 0 when top enters bottom, 1 when bottom exits top
      const total = el.offsetHeight + viewH;
      const scrolled = viewH - rect.top;
      scrollYProgress.set(Math.max(0, Math.min(1, scrolled / total)));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [scrollYProgress]);

  // Different speeds per column — same as Skiper30 source pattern
  const y1 = useTransform(scrollYProgress, [0, 1], ["0%", "-22%"]);
  const y2 = useTransform(scrollYProgress, [0, 1], ["0%", "-38%"]);
  const y3 = useTransform(scrollYProgress, [0, 1], ["0%", "-15%"]);
  const y4 = useTransform(scrollYProgress, [0, 1], ["0%", "-32%"]);

  const cols = [
    { y: y1, color: "#E8F020", top: "-10%" },
    { y: y2, color: "#20F0D4", top: "-30%" },
    { y: y3, color: "#F020A0", top: "-10%" },
    { y: y4, color: "#20A0F0", top: "-22%" },
  ];

  return (
    // Tall scroll target — gives scrollYProgress full range
    <div id="stack" ref={ref} style={{ position: "relative", height: "180vh", background: "#080808" }}>

      {/* Label overlay — centered, non-interactive */}
      <div style={{
        position: "absolute", top: "50%", left: "50%",
        transform: "translate(-50%,-50%)",
        zIndex: 10, textAlign: "center", pointerEvents: "none",
      }}>
        <p style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#E8F020", fontSize: "0.75rem", letterSpacing: "0.35em", textTransform: "uppercase", marginBottom: "0.75rem" }}>[ 03 ] Tech Stack</p>
        <h2 style={{ fontFamily: "'Bebas Neue', 'Anton', sans-serif", fontSize: "clamp(3rem, 7vw, 7rem)", color: "#fff", margin: 0, lineHeight: 0.9 }}>
          BUILT WITH<br /><span style={{ color: "#E8F020" }}>PRECISION</span>
        </h2>
      </div>

      {/* Sticky clipping window — overflow:hidden here is fine because
          the motion.div columns sit INSIDE the sticky, not outside it.
          The key insight: motion values drive translateY on the columns
          relative to the sticky container, so clipping works correctly. */}
      <div style={{ position: "sticky", top: 0, height: "100vh", overflow: "hidden" }}>
        <div style={{ display: "flex", gap: "1.5rem", padding: "2rem", height: "100%", alignItems: "flex-start" }}>
          {cols.map(({ y, color, top }, i) => (
            <motion.div
              key={i}
              style={{ y, flex: 1, minWidth: 0, position: "relative", top }}
            >
              {[0, 1, 2].map((j) => (
                <div key={j} style={{
                  width: "100%", aspectRatio: "3/4", marginBottom: "1.5rem",
                  background: `linear-gradient(135deg, ${color}22, ${color}06)`,
                  border: `1px solid ${color}18`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <WolfLogo size={36} />
                </div>
              ))}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ─── STACK TICKER ─────────────────────────────────────────────────────────────
const StackTicker = () => {
  return (
    <section style={{ background: "#080808", padding: "6rem 2.5rem 4rem" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
          {STACK.map((tech, i) => (
            <motion.div
              key={tech}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              whileHover={{ scale: 1.08, background: "rgba(232,240,32,0.12)" }}
              data-hover
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "0.9rem",
                fontWeight: 600,
                color: "#E8F020",
                padding: "0.7rem 1.4rem",
                border: "1px solid rgba(232,240,32,0.2)",
                letterSpacing: "0.1em",
                cursor: "default",
                transition: "background 0.3s",
                clipPath: "polygon(6px 0, 100% 0, calc(100% - 6px) 100%, 0 100%)",
              }}
            >{tech}</motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ─── STICKY CARDS — Premium Pinned Scroll ────────────────────────────────────
const StickyCards = () => {
  const containerRef = useRef(null);
  const stageRefs = useRef([]);
  const labelRefs = useRef([]);
  const tickerRefs = useRef([]);
  const progressFillRef = useRef(null);
  const counterRef = useRef(null);

  const items = [
    {
      step: "01", title: "DISCOVER",
      text: "We map your competitive landscape, surface technical debt, and identify exactly where you're losing users. Signal only. No filler.",
      icon: "◉", tags: ["Research", "Audit", "Strategy"],
    },
    {
      step: "02", title: "ARCHITECT",
      text: "System design, UX blueprints, and a technical roadmap your team can actually follow. We align before a single line is written.",
      icon: "◈", tags: ["Design Systems", "UX", "Blueprint"],
    },
    {
      step: "03", title: "BUILD",
      text: "Sprint-based delivery with weekly demos. Clean code. Pixel-perfect execution. Performance reviewed at every stage.",
      icon: "⬡", tags: ["Engineering", "QA", "Delivery"],
    },
    {
      step: "04", title: "SHIP & SCALE",
      text: "Zero-downtime deployment, monitoring setup, and ongoing iteration cycles. We don't disappear at launch.",
      icon: "◆", tags: ["Deploy", "Monitor", "Iterate"],
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      const total = items.length;

      // GSAP owns all transforms from the start — set initial states imperatively
      stageRefs.current.forEach((el, i) => {
        if (!el) return;
        gsap.set(el, {
          opacity: i === 0 ? 1 : 0,
          y: i === 0 ? 0 : 44,
          filter: i === 0 ? "blur(0px)" : "blur(14px)",
        });
      });
      labelRefs.current.forEach((el, i) => {
        if (!el) return;
        gsap.set(el, { x: i === 0 ? 10 : 0 });
      });
      tickerRefs.current.forEach((el, i) => {
        if (!el) return;
        gsap.set(el, { scaleY: i === 0 ? 1 : 0, opacity: i === 0 ? 1 : 0 });
      });

      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: `+=${total * 100}%`,
        pin: true,
        scrub: 1.5,
        onUpdate(self) {
          const raw = self.progress * total;
          const idx = Math.min(Math.floor(raw), total - 1);

          // Progress bar (no tween — instant with scroll)
          if (progressFillRef.current) {
            progressFillRef.current.style.width = `${self.progress * 100}%`;
          }
          // Counter
          if (counterRef.current) {
            counterRef.current.textContent =
              `${String(idx + 1).padStart(2, "0")} — ${String(total).padStart(2, "0")}`;
          }

          // Content panels: fade + slide + blur
          stageRefs.current.forEach((el, i) => {
            if (!el) return;
            if (i === idx) {
              gsap.to(el, { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.65, ease: "power3.out", overwrite: "auto" });
            } else {
              const dir = i < idx ? -1 : 1;
              gsap.to(el, { opacity: 0, y: dir * 44, filter: "blur(14px)", duration: 0.65, ease: "power3.out", overwrite: "auto" });
            }
          });

          // Nav labels: color + subtle slide
          labelRefs.current.forEach((el, i) => {
            if (!el) return;
            if (i === idx) {
              gsap.to(el, { color: "#E8F020", x: 10, duration: 0.5, ease: "power2.out", overwrite: "auto" });
            } else if (i < idx) {
              gsap.to(el, { color: "rgba(232,240,32,0.18)", x: 0, duration: 0.5, ease: "power2.out", overwrite: "auto" });
            } else {
              gsap.to(el, { color: "#282828", x: 0, duration: 0.5, ease: "power2.out", overwrite: "auto" });
            }
          });

          // Vertical accent bars: scale + fade
          tickerRefs.current.forEach((el, i) => {
            if (!el) return;
            if (i === idx) {
              gsap.to(el, { scaleY: 1, opacity: 1, duration: 0.5, ease: "power2.out", overwrite: "auto" });
            } else if (i < idx) {
              gsap.to(el, { scaleY: 1, opacity: 0.22, duration: 0.5, ease: "power2.out", overwrite: "auto" });
            } else {
              gsap.to(el, { scaleY: 0, opacity: 0, duration: 0.5, ease: "power2.out", overwrite: "auto" });
            }
          });
        },
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      style={{
        height: "100vh",
        background: "#080808",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
      }}
    >
      {/* Background grid */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage:
          "linear-gradient(rgba(232,240,32,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(232,240,32,0.02) 1px, transparent 1px)",
        backgroundSize: "80px 80px",
      }} />

      {/* Ambient glow centered on right panel */}
      <div style={{
        position: "absolute",
        top: "50%", left: "66%",
        transform: "translate(-50%, -50%)",
        width: "55vw", height: "55vw",
        background: "radial-gradient(ellipse, rgba(232,240,32,0.045) 0%, transparent 68%)",
        borderRadius: "50%",
        pointerEvents: "none",
      }} />

      {/* Thin progress bar — bottom edge */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0,
        height: "1px", background: "rgba(232,240,32,0.07)",
        zIndex: 10,
      }}>
        <div
          ref={progressFillRef}
          style={{ height: "100%", width: "0%", background: "#E8F020" }}
        />
      </div>

      {/* Stage counter */}
      <div style={{
        position: "absolute", bottom: "2.5rem", right: "2.5rem",
        fontFamily: "'Space Grotesk', sans-serif",
        fontSize: "0.65rem", letterSpacing: "0.32em",
        color: "rgba(232,240,32,0.3)", zIndex: 10,
      }}>
        <span ref={counterRef}>01 — 04</span>
      </div>

      {/* ─── Two-column grid ─── */}
      <div style={{
        maxWidth: "1280px",
        margin: "0 auto",
        padding: "0 2.5rem",
        width: "100%",
        display: "grid",
        gridTemplateColumns: "minmax(240px, 1fr) 1.65fr",
        gap: "clamp(3rem, 6vw, 7rem)",
        alignItems: "center",
        position: "relative",
        zIndex: 2,
      }}>

        {/* ─── LEFT: Label + Title + Nav ─── */}
        <div>
          <p style={{
            fontFamily: "'Space Grotesk', sans-serif",
            color: "#E8F020", fontSize: "0.68rem",
            letterSpacing: "0.35em", textTransform: "uppercase",
            margin: "0 0 1.2rem",
          }}>[ 04 ] Process</p>

          <h2 style={{
            fontFamily: "'Bebas Neue', 'Anton', sans-serif",
            fontSize: "clamp(2.8rem, 4.5vw, 5.5rem)",
            color: "#fff", lineHeight: 0.88,
            margin: "0 0 clamp(2.5rem, 4vh, 4rem)",
            letterSpacing: "-0.01em",
          }}>
            FROM BRIEF<br />
            <span style={{ color: "#E8F020" }}>TO SHIPPED</span>
          </h2>

          {/* Stage nav */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            {items.map((item, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1.25rem",
                  padding: "1rem 0",
                  borderTop: "1px solid rgba(255,255,255,0.035)",
                  overflow: "hidden",
                }}
              >
                {/* Vertical accent bar */}
                <div
                  ref={el => { tickerRefs.current[i] = el; }}
                  style={{
                    width: "2px",
                    height: "2rem",
                    background: "#E8F020",
                    flexShrink: 0,
                    transformOrigin: "top center",
                  }}
                />
                <p
                  ref={el => { labelRefs.current[i] = el; }}
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: "clamp(0.68rem, 1.05vw, 0.8rem)",
                    letterSpacing: "0.16em",
                    margin: 0,
                    textTransform: "uppercase",
                    color: i === 0 ? "#E8F020" : "#282828",
                  }}
                >
                  {item.step} — {item.title}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ─── RIGHT: Stage content panels (absolutely stacked) ─── */}
        <div style={{ position: "relative", height: "clamp(300px, 42vh, 460px)" }}>
          {items.map((item, i) => (
            <div
              key={i}
              ref={el => { stageRefs.current[i] = el; }}
              style={{
                position: "absolute",
                inset: 0,
                padding: "clamp(1.8rem, 3vw, 3rem)",
                border: "1px solid rgba(232,240,32,0.07)",
                background: "rgba(8,8,8,0.8)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                opacity: i === 0 ? 1 : 0,
              }}
            >
              {/* Icon + ghost step number */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <span style={{ fontSize: "2rem", color: "#E8F020", lineHeight: 1 }}>{item.icon}</span>
                <span style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: "clamp(4.5rem, 9vw, 9rem)",
                  color: "rgba(232,240,32,0.05)",
                  lineHeight: 1, userSelect: "none",
                }}>{item.step}</span>
              </div>

              {/* Stage title */}
              <h3 style={{
                fontFamily: "'Bebas Neue', 'Anton', sans-serif",
                fontSize: "clamp(2rem, 3.5vw, 3.2rem)",
                color: "#fff",
                margin: "0.6rem 0",
                letterSpacing: "0.02em",
                lineHeight: 1,
              }}>{item.title}</h3>

              {/* Body text */}
              <p style={{
                fontFamily: "'Space Grotesk', sans-serif",
                color: "#555",
                lineHeight: 1.78,
                fontSize: "clamp(0.82rem, 1.25vw, 0.97rem)",
                margin: "0 0 1.5rem",
                flexGrow: 1,
              }}>{item.text}</p>

              {/* Tag pills */}
              <div style={{ display: "flex", gap: "0.45rem", flexWrap: "wrap" }}>
                {item.tags.map((tag, j) => (
                  <span key={j} style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: "0.58rem",
                    letterSpacing: "0.22em",
                    color: "rgba(232,240,32,0.38)",
                    border: "1px solid rgba(232,240,32,0.11)",
                    padding: "0.26rem 0.62rem",
                    textTransform: "uppercase",
                  }}>{tag}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ─── ABOUT / MANIFESTO ────────────────────────────────────────────────────────
const About = () => {
  const words = "WE DON'T BUILD FOR MEDIOCRITY. THE BRANDS THAT LEAD DON'T SETTLE FOR AVERAGE DIGITAL. NEITHER DO WE.".split(" ");
  return (
    <section style={{ background: "#E8F020", padding: "8rem 2.5rem" }}>
      <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
          {words.map((word, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.04 }}
              style={{
                fontFamily: "'Bebas Neue', 'Anton', sans-serif",
                fontSize: "clamp(2.5rem, 5vw, 5rem)",
                color: "#080808",
                lineHeight: 0.95,
                letterSpacing: "-0.01em",
              }}
            >{word}</motion.span>
          ))}
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          style={{ marginTop: "4rem", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3rem" }}
        >
          {[["18+", "Products Delivered"], ["5+", "Years of Craft"], ["3×", "Average Client ROI"], ["100%", "Founder-Led Studio"]].map(([num, label], i) => (
            <div key={i}>
              <p style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "4rem", color: "#080808", margin: 0, lineHeight: 1 }}>{num}</p>
              <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.9rem", color: "#333", margin: 0, letterSpacing: "0.1em" }}>{label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

// ─── CONTACT ──────────────────────────────────────────────────────────────────
const Contact = () => {
  return (
    <section id="contact" style={{ background: "#080808", padding: "10rem 2.5rem 8rem", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", bottom: "10%", right: "5%", opacity: 0.04 }}>
        <WolfLogo size={400} />
      </div>
      <div style={{ maxWidth: "900px", margin: "0 auto", position: "relative", zIndex: 2 }}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <p style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#E8F020", fontSize: "0.75rem", letterSpacing: "0.35em", textTransform: "uppercase", marginBottom: "1.5rem" }}>[ 05 ] Let's Build</p>
          <h2 style={{ fontFamily: "'Bebas Neue', 'Anton', sans-serif", fontSize: "clamp(4rem, 10vw, 10rem)", color: "#fff", lineHeight: 0.88, margin: "0 0 3rem", letterSpacing: "-0.02em" }}>
            YOUR NEXT<br /><span style={{ color: "#E8F020" }}>PROJECT STARTS HERE.</span>
          </h2>
          <p style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#666", fontSize: "1.1rem", lineHeight: 1.7, maxWidth: "500px", marginBottom: "3rem" }}>
            Tell us what you're working on. We'll tell you exactly how we can make it exceptional.
          </p>
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <a href="mailto:hello@thewolfage.com" data-hover style={{
              padding: "1.1rem 3rem",
              background: "#E8F020",
              color: "#080808",
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 700,
              fontSize: "0.9rem",
              letterSpacing: "0.15em",
              textDecoration: "none",
              textTransform: "uppercase",
              clipPath: "polygon(10px 0, 100% 0, calc(100% - 10px) 100%, 0 100%)",
              display: "inline-block",
            }}>hello@thewolfage.com</a>
          </div>
          <div style={{ display: "flex", gap: "2rem", marginTop: "4rem" }}>
            {["GitHub", "LinkedIn", "Twitter", "Dribbble"].map(link => (
              <a key={link} href="#" data-hover style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "0.8rem",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "#444",
                textDecoration: "none",
                transition: "color 0.2s",
              }}
                onMouseEnter={(e) => e.target.style.color = "#E8F020"}
                onMouseLeave={(e) => e.target.style.color = "#444"}
              >{link}</a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// ─── SKIPER39 CROWD CANVAS (Open Peeps illustrations) ────────────────────────
// Uses individual Open Peeps PNG images from src/assets/peep/
// Animation logic faithful to the original Skiper39 CodePen:
//   • Each peep is an individual illustration drawn on canvas
//   • Figures walk L→R or R→L at random speeds with natural bobbing
//   • Sorted by anchorY for depth illusion (closer = bigger + rendered on top)
//   • GSAP ticker drives the render loop; GSAP timelines drive each walk cycle
//   • On walk complete the peep is recycled back to the available pool



const CrowdCanvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Cap DPR to 2 to prevent excessive pixel pushing on high-density displays
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    // ── Pre-process peep images: invert for dark theme ─────────────────────
    const processedImages = [];
    let loadedCount = 0;

    const invertImage = (img) => {
      const offscreen = document.createElement("canvas");
      // Scale down large images to max 800px height for performance
      const MAX_H = 800;
      const scale = img.naturalHeight > MAX_H ? MAX_H / img.naturalHeight : 1;
      const w = img.naturalWidth * scale;
      const h = img.naturalHeight * scale;
      
      offscreen.width = w;
      offscreen.height = h;
      const offCtx = offscreen.getContext("2d");
      offCtx.filter = "invert(1)";
      offCtx.drawImage(img, 0, 0, w, h);
      return offscreen;
    };

    const stage = { width: 0, height: 0 };
    const TOTAL = 30; // Reduced from 40 for better performance
    const allPeeps = [];
    const available = [];
    const crowd = [];
    let isVisible = false;
    let observer;

    // ── Peep factory ───────────────────────────────────────────────────────
    const createPeep = (id, image) => ({
      id,
      image,
      x: 0,
      y: 0,
      anchorY: 0,
      depthRatio: 0,
      scaleX: 1,
      scaleY: 1,
      walk: null,
    });

    // ── Reset peep to off-screen edge ──────────────────────────────────────
    const resetPeep = (peep) => {
      const direction = Math.random() > 0.5 ? 1 : -1;
      const depthRatio = Math.random();
      const figW = 200;
      const peepScale = 0.6 + depthRatio * 0.9;
      const renderedH = 500 * peepScale;

      const startY = renderedH + 30 + (1 - depthRatio) * 50;
      let startX, endX;

      if (direction === 1) {
        startX = -figW * peepScale;
        endX = stage.width + figW * peepScale;
        peep.scaleX = peepScale;
      } else {
        startX = stage.width + figW * peepScale;
        endX = -figW * peepScale;
        peep.scaleX = -peepScale;
      }

      peep.scaleY = peepScale;
      peep.depthRatio = depthRatio;
      peep.x = startX;
      peep.y = startY;
      peep.anchorY = startY;

      return { startX, startY, endX };
    };

    // ── Walk animation ─────────────────────────────────────────────────────
    const normalWalk = (peep, props) => {
      const { startY, endX } = props;
      const xDuration = 10;
      const yDuration = 0.25;

      const tl = gsap.timeline();
      const speed = 0.4 + (1 - peep.depthRatio) * 0.8;
      tl.timeScale(speed);
      tl.to(peep, { duration: xDuration, x: endX, ease: "none" }, 0);
      tl.to(peep, {
        duration: yDuration,
        repeat: xDuration / yDuration,
        yoyo: true,
        y: startY - 8,
      }, 0);

      return tl;
    };

    // ── Add peep to crowd ──────────────────────────────────────────────────
    const addPeepToCrowd = () => {
      if (available.length === 0) return null;
      const idx = Math.floor(Math.random() * available.length);
      const peep = available.splice(idx, 1)[0];

      const props = resetPeep(peep);
      const walk = normalWalk(peep, props);
      
      // Pause immediately if not visible
      if (!isVisible) walk.pause();

      walk.eventCallback("onComplete", () => {
        removePeepFromCrowd(peep);
        addPeepToCrowd();
      });

      peep.walk = walk;
      crowd.push(peep);
      crowd.sort((a, b) => a.anchorY - b.anchorY);

      return peep;
    };

    const removePeepFromCrowd = (peep) => {
      const i = crowd.indexOf(peep);
      if (i > -1) crowd.splice(i, 1);
      available.push(peep);
    };

    // ── Render loop ────────────────────────────────────────────────────────
    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.save();
      ctx.scale(dpr, dpr);

      crowd.forEach((peep) => {
        ctx.save();
        ctx.translate(peep.x, peep.y);
        ctx.scale(peep.scaleX, peep.scaleY);

        const imgW = peep.image.width || 120;
        const imgH = peep.image.height || 300;
        const drawH = 500;
        const drawW = (imgW / imgH) * drawH;

        ctx.globalAlpha = 0.5 + peep.depthRatio * 0.7;
        ctx.drawImage(peep.image, 0, -drawH, drawW, drawH);
        ctx.restore();
      });

      ctx.restore();
    };

    // ── Resize handler ─────────────────────────────────────────────────────
    const resize = () => {
      stage.width = canvas.clientWidth || canvas.parentElement?.clientWidth || window.innerWidth;
      stage.height = canvas.clientHeight || canvas.parentElement?.clientHeight || 500;
      canvas.width = stage.width * dpr;
      canvas.height = stage.height * dpr;

      crowd.forEach((p) => { if (p.walk) p.walk.kill(); });
      crowd.length = 0;
      available.length = 0;
      available.push(...allPeeps);

      while (available.length) {
        const peep = addPeepToCrowd();
        if (peep && peep.walk) {
          peep.walk.progress(Math.random());
          if (!isVisible) peep.walk.pause();
        }
      }
    };

    // ── Boot ───────────────────────────────────────────────────────────────
    const boot = () => {
      for (let i = 0; i < TOTAL; i++) {
        allPeeps.push(createPeep(i, processedImages[i % processedImages.length]));
      }
      resize();

      observer = new IntersectionObserver((entries) => {
        isVisible = entries[0].isIntersecting;
        if (isVisible) {
          gsap.ticker.add(render);
          crowd.forEach(p => p.walk && p.walk.play());
        } else {
          gsap.ticker.remove(render);
          crowd.forEach(p => p.walk && p.walk.pause());
        }
      });
      observer.observe(canvas);

      window.addEventListener("resize", resize);
    };

    PEEP_SRCS.forEach((src) => {
      const img = new Image();
      img.onload = () => {
        processedImages.push(invertImage(img));
        loadedCount++;
        if (loadedCount === PEEP_SRCS.length) boot();
      };
      img.onerror = () => {
        loadedCount++;
        if (loadedCount === PEEP_SRCS.length) boot();
      };
      img.src = src;
    });

    return () => {
      if (observer) observer.disconnect();
      window.removeEventListener("resize", resize);
      gsap.ticker.remove(render);
      crowd.forEach((p) => { if (p.walk) p.walk.kill(); });
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", display: "block" }}
    />
  );
};

// ─── CROWD SECTION ───────────────────────────────────────────────────────────
const CrowdSection = () => (
  <section style={{
    position: "relative",
    height: "100vh",
    background: "#080808",
    overflow: "hidden",
    borderTop: "1px solid rgba(232,240,32,0.06)",
  }}>
    {/* Heading — top of section */}
    <div style={{ textAlign: "center", paddingTop: "5rem", position: "relative", zIndex: 3 }}>
      <p style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#E8F020", fontSize: "0.72rem", letterSpacing: "0.38em", textTransform: "uppercase", marginBottom: "0.6rem" }}>[ 06 ] The Pack</p>
      <h2 style={{ fontFamily: "'Bebas Neue', 'Anton', sans-serif", fontSize: "clamp(2.8rem, 6vw, 6rem)", color: "#fff", margin: 0, lineHeight: 0.9 }}>
        WE MOVE<br /><span style={{ color: "#E8F020" }}>AS ONE</span>
      </h2>
    </div>
    {/* Crowd canvas — anchored to the bottom of the section */}
    <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "65%" }}>
      {/* Top fade — crowd heads emerge softly */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: "10%", zIndex: 2, pointerEvents: "none",
        background: "linear-gradient(to bottom, #080808, transparent)",
      }} />
      <CrowdCanvas />
    </div>
  </section>
);

// ─── FOOTER ───────────────────────────────────────────────────────────────────
const Footer = () => (
  <footer style={{ background: "#050505", borderTop: "1px solid rgba(232,240,32,0.08)", padding: "2rem 2.5rem", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
      <WolfLogo size={24} />
      <span style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#333", fontSize: "0.75rem", letterSpacing: "0.15em" }}>© 2026 The Wolf Age. All Rights Reserved.</span>
    </div>
    <span style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#333", fontSize: "0.75rem", letterSpacing: "0.1em" }}>BUILT WITH REACT + FRAMER MOTION</span>
  </footer>
);

// ─── FONT IMPORT + ROOT ───────────────────────────────────────────────────────
const FontImport = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Space+Grotesk:wght@400;500;600;700&display=swap');
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html { scroll-behavior: smooth; }
    body { background: #080808; color: #fff; cursor: none; overflow-x: clip; max-width: 100vw; }
    ::-webkit-scrollbar { width: 4px; }
    ::-webkit-scrollbar-track { background: #080808; }
    ::-webkit-scrollbar-thumb { background: #E8F020; }
    a { cursor: none; }
    button { cursor: none; }
  `}</style>
);

// ─── SMOOTH SCROLL ────────────────────────────────────────────────────────────
const SmoothScroll = () => {
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.04, // Lower value = smoother, heavier momentum
      smoothWheel: true,
      wheelMultiplier: 1,
      smoothTouch: false,
    });

    lenis.on('scroll', ScrollTrigger.update);

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);
  return null;
};

// ─── APP ──────────────────────────────────────────────────────────────────────
export default function TheWolfAge() {
  return (
    <>
      <SmoothScroll />
      <FontImport />
      <CustomCursor />
      <NoiseOverlay />
      <PillNav
        logo={wolfLogo}
        logoAlt="TheWolfAge"
        logoHref="#"
        items={NAV_ITEMS}
        baseColor="#000000"
        pillColor="#E8F020"
        pillTextColor="#080808"
        hoveredPillTextColor="#E8F020"
        initialLoadAnimation={false}
      />
      <main>
        <Hero />
        <HeroReveal />
        <Marquee />
        <Projects />
        <Services />
        <ParallaxSection />
        <StackTicker />
        <StickyCards />
        <About />
        <CrowdSection />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
