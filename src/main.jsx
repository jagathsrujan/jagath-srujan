import React, { useEffect, useMemo, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import introVideoUrl from "./assets/intro/portfolio-intro.mp4";
import portraitUrl from "./assets/jagath-portrait.webp";
import canImg from "./assets/work/can.webp";
import cycloImg from "./assets/work/cyclo.webp";
import gearboxImg from "./assets/work/gearbox.webp";
import pulsejetImg from "./assets/work/pulsejet.webp";
import "./styles.css";

const GH = "https://github.com/jagathsrujan";
const links = {
  email: "jagathsrujan22@gmail.com",
  github: GH,
  linkedin: "https://www.linkedin.com/in/jagath-srujan-057156359/",
};

const featured = [
  {
    code: "EL-01",
    title: "MCP2515 CAN Bus Module",
    areas: ["Electronics"],
    tag: "PCB design · KiCad",
    href: `${GH}/mcp2515-can-bus-module`,
    img: canImg,
    alt: "3D render of the MCP2515 CAN bus module, Rev A",
    summary:
      "A stand-alone CAN 2.0B controller board taken from requirements to a JLCPCB-ready manufacturing package. The logic side runs from the host's own I/O voltage, so it works with 3.3 V and 5 V microcontrollers without level shifters.",
    specs: [
      ["Board", "70 × 50 mm, 2-layer"],
      ["Parts", "73 components, 43 nets"],
      ["Input", "7–16 V, protected, 5 V buck"],
      ["Checks", "ERC 0 · DRC 0 · parity 0"],
    ],
    status: "Validated for prototype order",
  },
  {
    code: "ME-02",
    title: "Cycloidal Drive, 15:1",
    areas: ["Mechanisms", "Analysis"],
    tag: "Mechanisms · FEA",
    href: `${GH}/3d-printable-cycloidal-drive`,
    img: cycloImg,
    alt: "FEA stress plot of a cycloidal disk",
    summary:
      "A parametric rebuild of a 3D-printable cycloidal reducer in Python and FreeCAD, followed by a part-by-part FEA study in CalculiX comparing PLA against PETG-CF to choose the print material.",
    specs: [
      ["Ratio", "15:1, near-zero backlash"],
      ["Ring", "16 rollers on Ø90 PCD"],
      ["Eccentricity", "1.5 mm"],
      ["Analysis", "15 parts, PLA vs PETG-CF"],
    ],
    status: "Print-ready, 106 parts",
  },
  {
    code: "ME-03",
    title: "Two-Stage Planetary Gearbox",
    areas: ["Mechanisms"],
    tag: "Mechanisms · 3D printing",
    href: `${GH}/3d-printable-planetary-gearbox`,
    img: gearboxImg,
    alt: "Printed planetary gearbox mounted to a NEMA 17 stepper on the bench",
    summary:
      "A 16:1 helical planetary gearbox for a NEMA 17 stepper, with the ring gear doubling as the housing. Printed, assembled and run on the bench; bolt lengths were measured from the meshes for the BOM.",
    specs: [
      ["Ratio", "16:1 (4:1 × 2)"],
      ["Gears", "Module 1.5 · 15T / 15T / 45T"],
      ["Planets", "3 per stage, helical"],
      ["Material", "PLA, 0.1 mm backlash offset"],
    ],
    status: "Built and bench-tested",
  },
  {
    code: "PR-04",
    title: "PJ-4.5 Valveless Pulse Jet",
    areas: ["Propulsion"],
    tag: "Propulsion · CAD",
    href: `${GH}/pj45-pulsejet`,
    img: pulsejetImg,
    fit: "contain",
    alt: "CAD model of the PJ-4.5 pulse jet",
    summary:
      "A propane-fuelled valveless pulse jet for a college static-thrust demo. Designed as a hybrid rig of reusable metal hot sections and printed cones, assembled with zero welding so it can be iterated before a full metal build.",
    specs: [
      ["Thrust", "≈ 20 N static (target)"],
      ["Length", "833 mm"],
      ["Pulse", "~70–100 Hz"],
      ["Build", "Metal + printed, no welding"],
    ],
    status: "CAD, BOM and test guide done",
  },
];

const moreBuilds = [
  {
    title: "Low-Cost Twin-Motor UAV",
    areas: ["Aircraft", "Propulsion"],
    tag: "Aircraft",
    href: `${GH}/low-cost-twin-motor-uav`,
    text: "Repairable fixed-wing proposal: 1.5 m XPS wing on a NACA 2412 section, removable nacelles, catapult launch and a formula-driven BOM.",
  },
  {
    title: "Engineering Harness",
    areas: ["Analysis"],
    tag: "Design tooling",
    href: `${GH}/engineering-harness`,
    text: "Designs as typed, unit-aware graphs. A deterministic solver computes every number, and each value carries its provenance.",
  },
  {
    title: "CAD Portfolio",
    areas: ["Mechanisms"],
    tag: "Design studies",
    href: `${GH}/cad-portfolio`,
    text: "Mechanism and packaging studies: a self-centring compliant gripper, a kinematic docking nest and a liquid-cooled compute tray.",
  },
];

const software = [
  {
    title: "VanaRaksha",
    tag: "Climate risk",
    href: `${GH}/vana-raksha`,
    text: "Flood, heat-island and water-stress assessment for Bengaluru properties.",
  },
  {
    title: "MARVEL Inventory",
    tag: "Makerspace PWA",
    href: `${GH}/marvel-inventory-pwa`,
    live: "https://marvel-pwa-zeta.vercel.app",
    text: "Offline-first inventory with QR labels for the UVCE makerspace lab.",
  },
  {
    title: "ModelAtlas",
    tag: "AI infra advisor",
    href: `${GH}/modelatlas1`,
    live: "https://modelatlas1.vercel.app",
    text: "Helps non-specialists pick AI models and hardware, with transparent ranking.",
  },
  {
    title: "GenForge",
    tag: "Career agent",
    href: `${GH}/genforge-live-career-agent`,
    text: "Local-first resume builder where every bullet links back to its evidence.",
  },
  {
    title: "ME Job Scout",
    tag: "Automation",
    href: `${GH}/me-job-scout`,
    text: "Daily scrape of ME roles across 55+ companies, with skill-demand analysis.",
  },
  {
    title: "FreeCAD LLM MCP",
    tag: "CAD + AI",
    href: `${GH}/freecad-llm-mcp`,
    text: "A language-model interface for driving parametric FreeCAD models.",
  },
];

const toolkit = [
  ["CAD & analysis", ["FreeCAD", "Onshape", "OpenSCAD", "CalculiX FEA", "Parametric modelling"]],
  ["Electronics", ["KiCad", "Schematic capture", "2-layer layout", "DFM for JLCPCB"]],
  ["Fabrication", ["FDM printing", "PLA / PETG-CF", "Hybrid metal + printed rigs", "BOMs & sourcing"]],
  ["Code", ["Python", "TypeScript / React", "Data pipelines", "LLM agents"]],
];

const nav = [
  ["work", "Work"],
  ["software", "Software"],
  ["toolkit", "Toolkit"],
  ["contact", "Contact"],
];


const areaFilters = ["All", "Mechanisms", "Propulsion", "Aircraft", "Electronics", "Analysis"];

/* ---------- Scroll reveal (one shared observer, no animation library) ---------- */
let revealObserver;
function getRevealObserver() {
  if (revealObserver || typeof IntersectionObserver === "undefined") return revealObserver;
  revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-in");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { rootMargin: "0px 0px -10% 0px", threshold: 0.12 },
  );
  return revealObserver;
}

function Reveal({ as: Tag = "div", delay = 0, className = "", style, children, ...rest }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    const io = getRevealObserver();
    if (!el) return undefined;
    if (!io) {
      el.classList.add("is-in");
      return undefined;
    }
    io.observe(el);
    return () => io.unobserve(el);
  }, []);
  return (
    <Tag
      ref={ref}
      className={`reveal ${className}`.trim()}
      style={delay ? { ...style, "--delay": `${delay}s` } : style}
      {...rest}
    >
      {children}
    </Tag>
  );
}

/* ---------- Storage helpers (storage can be blocked) ---------- */
function storageGet(key) {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}
function storageSet(key, value) {
  try {
    window.localStorage.setItem(key, value);
  } catch {
    /* ignore */
  }
}

function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
}

/* ---------- Intro video: first visit only, click anywhere to skip ---------- */
const INTRO_KEY = "jagath-portfolio-intro-seen";

function VideoIntro() {
  const reduce = useMemo(prefersReducedMotion, []);
  const [state, setState] = useState(() => (storageGet(INTRO_KEY) === "true" ? "done" : "playing"));

  const finish = () => {
    storageSet(INTRO_KEY, "true");
    setState((s) => (s === "playing" ? "leaving" : s));
  };

  useEffect(() => {
    if (state === "done") return undefined;
    if (state === "leaving") {
      const t = window.setTimeout(() => setState("done"), 600);
      return () => window.clearTimeout(t);
    }
    document.documentElement.classList.add("intro-open");
    const onKey = (e) => e.key === "Escape" && finish();
    window.addEventListener("keydown", onKey);
    const t = window.setTimeout(finish, reduce ? 1400 : 12000); // safety net if the video stalls
    return () => {
      document.documentElement.classList.remove("intro-open");
      window.removeEventListener("keydown", onKey);
      window.clearTimeout(t);
    };
  }, [state, reduce]);

  if (state === "done") return null;

  return (
    <div
      className={`intro${state === "leaving" ? " is-leaving" : ""}`}
      role="dialog"
      aria-label="Opening video. Click anywhere or press Escape to skip."
      onClick={finish}
    >
      {!reduce && (
        <video className="intro-bg" src={introVideoUrl} autoPlay muted playsInline aria-hidden="true" />
      )}
      {!reduce && (
        <video
          className="intro-main"
          src={introVideoUrl}
          autoPlay
          muted
          playsInline
          preload="auto"
          onEnded={finish}
          onError={finish}
        />
      )}
      <div className="intro-shade" aria-hidden="true" />
      <span className="intro-corner intro-corner--tl" aria-hidden="true" />
      <span className="intro-corner intro-corner--br" aria-hidden="true" />
      <div className="intro-copy">
        <span className="label">
          <span className="dot" aria-hidden="true" /> Portfolio · Rev 2026.11
        </span>
        <strong>Jagath Srujan</strong>
        <span className="intro-hint">Click anywhere to skip</span>
      </div>
      <button className="intro-skip" type="button" onClick={finish} autoFocus>
        Skip intro
      </button>
      {!reduce && <span className="intro-progress" aria-hidden="true" />}
    </div>
  );
}

/* ---------- Theme toggle ---------- */
const THEME_KEY = "jagath-portfolio-theme";

function currentTheme() {
  const set = document.documentElement.dataset.theme;
  if (set === "light" || set === "dark") return set;
  return window.matchMedia?.("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function ThemeToggle() {
  const [theme, setTheme] = useState(currentTheme);

  useEffect(() => {
    const mq = window.matchMedia?.("(prefers-color-scheme: dark)");
    if (!mq) return undefined;
    const onChange = () => {
      if (!document.documentElement.dataset.theme) setTheme(currentTheme());
    };
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, []);

  const toggle = () => {
    const next = theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    storageSet(THEME_KEY, next);
    setTheme(next);
  };

  const label = theme === "dark" ? "Switch to light theme" : "Switch to dark theme";
  return (
    <button className="theme-toggle" type="button" onClick={toggle} aria-label={label} title={label}>
      {theme === "dark" ? (
        <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
          <circle cx="12" cy="12" r="4.5" fill="none" stroke="currentColor" strokeWidth="1.8" />
          <path
            d="M12 2v2.5M12 19.5V22M2 12h2.5M19.5 12H22M4.9 4.9l1.8 1.8M17.3 17.3l1.8 1.8M4.9 19.1l1.8-1.8M17.3 6.7l1.8-1.8"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
          <path
            d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </button>
  );
}

/* ---------- Layout ---------- */
function useScrolled() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return scrolled;
}

function Arrow() {
  return (
    <svg className="arrow" viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
      <path d="M4 12 12 4M6 4h6v6" fill="none" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

function Header() {
  const scrolled = useScrolled();
  const [open, setOpen] = useState(false);
  return (
    <header className={`site-header${scrolled ? " is-scrolled" : ""}`}>
      <div className="wrap header-inner">
        <a className="wordmark" href="#top" aria-label="Jagath Srujan, back to top">
          <span className="wordmark-mark" aria-hidden="true">JS</span>
          <span className="wordmark-name">Jagath Srujan</span>
        </a>
        <div className="header-actions">
          <nav id="primary-nav" className={open ? "is-open" : undefined} aria-label="Primary">
            {nav.map(([id, label]) => (
              <a key={id} href={`#${id}`} onClick={() => setOpen(false)}>
                {label}
              </a>
            ))}
            <a className="nav-cta" href={`mailto:${links.email}`}>
              Get in touch
            </a>
          </nav>
          <ThemeToggle />
          <button
            className="menu-toggle"
            type="button"
            aria-expanded={open}
            aria-controls="primary-nav"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? "Close" : "Menu"}
          </button>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  const rise = (i) => ({ className: "rise", style: { "--delay": `${0.08 * i}s` } });
  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      <div className="wrap hero-grid">
        <div className="hero-copy">
          <p {...rise(0)}>
            <span className="label">
              <span className="dot" aria-hidden="true" /> Mechanical engineering student · Bengaluru
            </span>
          </p>
          <h1 id="hero-title" {...rise(1)}>
            I design mechanisms, propulsion rigs and the boards that drive them.
          </h1>
          <p {...rise(2)} className="rise lede">
            I'm Jagath Srujan. My work runs from CAD and FEA to printed prototypes,
            PCBs and the software that ties them together. Interested in aerospace
            and defence hardware, and open to internships.
          </p>
          <div {...rise(3)} className="rise hero-actions">
            <a className="btn btn-primary" href="#work">
              See the work
            </a>
            <a className="btn" href={`mailto:${links.email}`}>
              {links.email}
            </a>
          </div>
          <dl {...rise(4)} className="rise hero-facts">
            <div>
              <dt>Focus</dt>
              <dd>Mechanisms, propulsion, UAVs</dd>
            </div>
            <div>
              <dt>Now building</dt>
              <dd>CAN bus module, Rev A</dd>
            </div>
            <div>
              <dt>Also</dt>
              <dd>UVCE Rocketry Club, MARVEL lab</dd>
            </div>
          </dl>
        </div>

        <figure className="portrait rise" style={{ "--delay": "0.15s" }}>
          <div className="portrait-img">
            <img
              src={portraitUrl}
              alt="Jagath Srujan working at a laptop"
              width="719"
              height="1600"
              fetchpriority="high"
            />
          </div>
          <figcaption className="title-block">
            <span>
              <i>Drawn by</i> J. Srujan
            </span>
            <span>
              <i>Sheet</i> 01 / 01
            </span>
            <span>
              <i>Rev</i> 2026.11
            </span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}

function Disciplines() {
  const items = ["Mechanisms", "Propulsion", "Aircraft", "PCB design", "FEA", "Automation"];
  return (
    <div className="disciplines" aria-label="Disciplines">
      <div className="wrap disciplines-inner">
        {items.map((d) => (
          <span key={d}>{d}</span>
        ))}
      </div>
    </div>
  );
}

function SectionHead({ index, title, children, id }) {
  return (
    <Reveal className="section-head">
      <p className="label">
        <span className="label-index">{index}</span> {id}
      </p>
      <h2 id={`${id}-title`}>{title}</h2>
      {children && <p className="section-sub">{children}</p>}
    </Reveal>
  );
}

function FeaturedCard({ p, i }) {
  return (
    <Reveal as="article" className={`feature${i % 2 ? " is-flipped" : ""}`}>
      <a
        className={`feature-media${p.fit ? " is-contain" : ""}`}
        href={p.href}
        aria-label={`${p.title} on GitHub`}
      >
        <img src={p.img} alt={p.alt} loading="lazy" decoding="async" />
        <span className="feature-code">{p.code}</span>
      </a>
      <div className="feature-body">
        <p className="label">{p.tag}</p>
        <h3>{p.title}</h3>
        <p className="feature-summary">{p.summary}</p>
        <dl className="spec-table">
          {p.specs.map(([k, v]) => (
            <div key={k}>
              <dt>{k}</dt>
              <dd>{v}</dd>
            </div>
          ))}
        </dl>
        <div className="feature-foot">
          <span className="status">
            <span className="dot" aria-hidden="true" />
            {p.status}
          </span>
          <a className="text-link" href={p.href}>
            Repository <Arrow />
          </a>
        </div>
      </div>
    </Reveal>
  );
}

function Tile({ p, i }) {
  return (
    <Reveal as="article" className="tile" delay={i * 0.05}>
      <p className="label">{p.tag}</p>
      <h3>
        <a href={p.href}>
          {p.title} <Arrow />
        </a>
      </h3>
      <p>{p.text}</p>
      {p.live && (
        <a className="tile-live" href={p.live}>
          Live demo
        </a>
      )}
    </Reveal>
  );
}

function WorkSection() {
  const [area, setArea] = useState("All");
  const match = (p) => area === "All" || p.areas.includes(area);
  const shownFeatured = featured.filter(match);
  const shownMore = moreBuilds.filter(match);
  const count = shownFeatured.length + shownMore.length;

  return (
    <section className="section" id="work" aria-labelledby="work-title">
      <div className="wrap">
        <SectionHead index="01" id="work" title="Selected hardware">
          Four builds that show the range: a PCB taken to fab-ready, two printed
          gear reducers, and a jet engine test rig.
        </SectionHead>

        <div className="filters" role="group" aria-label="Filter projects by area">
          {areaFilters.map((a) => (
            <button
              key={a}
              type="button"
              className="chip"
              aria-pressed={area === a}
              onClick={() => setArea(a)}
            >
              {a}
            </button>
          ))}
          <span className="filter-count" aria-live="polite">
            {count} {count === 1 ? "project" : "projects"}
          </span>
        </div>

        {shownFeatured.length > 0 && (
          <div className="features">
            {shownFeatured.map((p, i) => (
              <FeaturedCard key={p.title} p={p} i={i} />
            ))}
          </div>
        )}
        {shownMore.length > 0 && (
          <>
            <h3 className={`sub-head${shownFeatured.length ? "" : " is-first"}`}>More engineering</h3>
            <div className={`tiles tiles-${Math.min(shownMore.length, 3)}`}>
              {shownMore.map((p, i) => (
                <Tile key={p.title} p={p} i={i} />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}

function App() {
  return (
    <>
      <VideoIntro />
      <a className="skip-link" href="#work">
        Skip to work
      </a>
      <Header />
      <main>
        <Hero />
        <Disciplines />
        <WorkSection />

        <section className="section section-alt" id="software" aria-labelledby="software-title">
          <div className="wrap">
            <SectionHead index="02" id="software" title="Software and AI tools">
              Things I've shipped to make engineering and everyday decisions
              easier. Most started at hackathons or in the college makerspace.
            </SectionHead>
            <div className="tiles">
              {software.map((p, i) => (
                <Tile key={p.title} p={p} i={i} />
              ))}
            </div>
          </div>
        </section>

        <section className="section" id="toolkit" aria-labelledby="toolkit-title">
          <div className="wrap">
            <SectionHead index="03" id="toolkit" title="Toolkit" />
            <div className="toolkit">
              {toolkit.map(([group, items], i) => (
                <Reveal key={group} className="tool-group" delay={i * 0.05}>
                  <h3>{group}</h3>
                  <ul>
                    {items.map((t) => (
                      <li key={t}>{t}</li>
                    ))}
                  </ul>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="section contact" id="contact" aria-labelledby="contact-title">
          <div className="wrap">
            <Reveal className="contact-inner">
              <p className="label">
                <span className="label-index">04</span> contact
              </p>
              <h2 id="contact-title">Looking for an intern who builds things?</h2>
              <p className="section-sub">
                I'm open to internships in mechanical, aerospace and hardware
                engineering, and to collaborating on student projects.
              </p>
              <a className="contact-email" href={`mailto:${links.email}`}>
                {links.email} <Arrow />
              </a>
              <div className="contact-links">
                <a className="btn" href={links.github}>
                  GitHub
                </a>
                <a className="btn" href={links.linkedin}>
                  LinkedIn
                </a>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="wrap footer-inner">
          <span>© {new Date().getFullYear()} Jagath Srujan</span>
          <span>Bengaluru, India</span>
        </div>
      </footer>
    </>
  );
}

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
