import React, { useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "motion/react";
import introVideoUrl from "./assets/intro/portfolio-intro.mp4";
import portraitUrl from "./assets/jagath-portrait.jpeg";
import "./styles.css";

const INTRO_KEY = "jagath-portfolio-video-intro-seen";

const links = {
  github: "https://github.com/jagathsrujan",
  linkedin: "https://www.linkedin.com/in/jagath-srujan-057156359/",
};

const projects = [
  {
    eyebrow: "Climate intelligence",
    missionCode: "VR-01",
    status: "CIVIC RISK SYSTEM",
    metric: "4 risk signals",
    title: "VanaRaksha",
    href: "https://github.com/jagathsrujan/vana-raksha",
    summary:
      "A Bengaluru property climate-risk assessment tool that reasons across flood exposure, urban heat island conditions, and water stress.",
    build:
      "React, ward-level datasets, photo evidence intake, AI-assisted risk synthesis, deterministic fallback scoring.",
    impact:
      "Turns fragmented civic and environmental signals into an auditable risk report for buyers, planners, and researchers.",
    detail:
      "Designed as an engineering-grade decision aid: gather evidence, score known hazards, and keep the reasoning legible for non-technical users.",
    stack: ["React", "AI reasoning", "Climate data", "Bengaluru"],
  },
  {
    eyebrow: "Career systems",
    missionCode: "JS-02",
    status: "AUTOMATION PIPELINE",
    metric: "daily signal loop",
    title: "ME Job Scout",
    href: "https://github.com/jagathsrujan/me-job-scout",
    summary:
      "A Python automation pipeline for tracking mechanical engineering roles and turning market demand into project ideas.",
    build:
      "Company job scraping, daily digests, skill extraction, and portfolio recommendations for mechanical engineering growth.",
    impact:
      "Connects learning effort to real hiring signals instead of guessing what to build next.",
    detail:
      "Built to turn job-market noise into repeatable learning direction: scrape, classify, summarize, and convert role demand into project ideas.",
    stack: ["Python", "Automation", "Job data", "Skill mapping"],
  },
  {
    eyebrow: "Engineering direction",
    missionCode: "AE-03",
    status: "AEROSPACE TRACK",
    metric: "long-range vector",
    title: "Aerospace and defence path",
    href: "https://github.com/jagathsrujan/jagath-srujan",
    summary:
      "An early career signal around aerospace, defence, and mechanical engineering systems.",
    build:
      "Use this space for CAD studies, propulsion notes, systems analysis, and build logs as the work matures.",
    impact:
      "Frames a clear long-term technical direction while the portfolio grows from student work into proof-of-work.",
    detail:
      "A living track for CAD studies, propulsion notes, simulation experiments, teardown logs, and mechanical systems research.",
    stack: ["Mechanical engineering", "Aerospace", "Defence", "Systems"],
  },
];

const skills = [
  "Mechanical engineering",
  "React prototyping",
  "Python automation",
  "AI-assisted analysis",
  "Climate risk thinking",
  "Data storytelling",
  "Aerospace curiosity",
  "Systems research",
];

const fadeUp = {
  hidden: { opacity: 0, y: 26 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.72, ease: [0.16, 1, 0.3, 1] },
  },
};

const stagger = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 0.1,
      staggerChildren: 0.08,
    },
  },
};

const staggerParent = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 0.12,
      staggerChildren: 0.09,
    },
  },
};

const panelReveal = {
  hidden: { opacity: 0, y: 42, scale: 0.985, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 0.88, ease: [0.16, 1, 0.3, 1] },
  },
};

const slideFromSide = {
  hidden: (index = 0) => ({
    opacity: 0,
    x: index === 0 ? -86 : 86,
    scale: 0.985,
  }),
  visible: (index = 0) => ({
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      duration: 0.82,
      delay: index * 0.08,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

const magneticHover = {
  whileHover: {
    y: -5,
    scale: 1.035,
    boxShadow: "0 18px 46px rgba(0, 0, 0, 0.42)",
  },
  whileTap: { y: 0, scale: 0.975 },
  transition: { duration: 0.18, ease: "easeOut" },
};

const buttonPress = magneticHover;
const borderTrace = { "--trace": "100%" };

function VideoIntro() {
  const shouldReduceMotion = useReducedMotion();
  const [isVisible, setIsVisible] = useState(() => {
    if (typeof window === "undefined") {
      return true;
    }

    return window.sessionStorage.getItem(INTRO_KEY) !== "true";
  });
  const [isDeparting, setIsDeparting] = useState(false);

  const finishIntro = () => {
    if (isDeparting) {
      return;
    }

    setIsDeparting(true);
    window.setTimeout(() => {
      window.sessionStorage.setItem(INTRO_KEY, "true");
      setIsVisible(false);
    }, 780);
  };

  useEffect(() => {
    if (!isVisible) {
      return undefined;
    }

    const timeout = window.setTimeout(finishIntro, shouldReduceMotion ? 1200 : 9000);
    return () => window.clearTimeout(timeout);
  }, [isVisible, shouldReduceMotion]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className={`video-intro${isDeparting ? " is-departing" : ""}`}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.72, ease: [0.16, 1, 0.3, 1] }}
          aria-label="Portfolio opening video"
        >
          {!shouldReduceMotion && (
            <video
              src={introVideoUrl}
              autoPlay
              muted
              playsInline
              preload="auto"
              onEnded={finishIntro}
              onError={finishIntro}
            />
          )}
          <div className="video-intro__shade" />
          <div className="video-intro__copy" aria-hidden="true">
            <span>portfolio boot sequence</span>
            <strong>Jagath Srujan</strong>
          </div>
          <button className="video-intro__skip" type="button" onClick={finishIntro}>
            Skip
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function useScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? window.scrollY / max : 0);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return progress;
}

function useActiveSection(sectionIds) {
  const [activeSection, setActiveSection] = useState(sectionIds[0]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visibleEntry?.target.id) {
          setActiveSection(visibleEntry.target.id);
        }
      },
      { rootMargin: "-42% 0px -46% 0px", threshold: [0.08, 0.22, 0.46] },
    );

    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [sectionIds]);

  return activeSection;
}

function ScrollTelemetry({ activeSection, progress }) {
  return (
    <aside className="scroll-telemetry" aria-label="Scroll telemetry">
      <span>section</span>
      <strong>{activeSection}</strong>
      <i>{Math.round(progress * 100).toString().padStart(3, "0")}%</i>
    </aside>
  );
}

function Header({ progress, activeSection }) {
  const navItems = ["work", "direction", "skills", "contact"];

  return (
    <header className="site-header">
      <div className="progress-bar" style={{ transform: `scaleX(${progress})` }} />
      <a className="wordmark" href="#top" aria-label="Jagath Srujan home">
        JS
      </a>
      <nav aria-label="Primary navigation">
        {navItems.map((item) => (
          <motion.a
            key={item}
            href={`#${item}`}
            className={activeSection === item ? "is-active" : undefined}
            {...magneticHover}
          >
            {item}
          </motion.a>
        ))}
      </nav>
    </header>
  );
}

function Hero() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      className="hero"
      id="top"
      aria-labelledby="hero-title"
    >
      <motion.div
        className="hero-copy"
        variants={stagger}
        initial={shouldReduceMotion ? false : "hidden"}
        animate="visible"
      >
        <motion.p className="kicker" variants={fadeUp}>
          Bengaluru / Mechanical systems / Aerospace + defence
        </motion.p>
        <motion.h1 id="hero-title" variants={fadeUp}>
          Jagath Srujan
        </motion.h1>
        <motion.p className="hero-lede" variants={fadeUp}>
          Mechanical engineering student building AI-assisted tools for climate,
          career intelligence, propulsion curiosity, and engineered systems.
        </motion.p>
        <motion.div
          className="hero-actions"
          aria-label="Portfolio links"
          variants={fadeUp}
        >
          <motion.a className="button primary" href={links.github} {...buttonPress}>
            GitHub
          </motion.a>
          <motion.a className="button" href={links.linkedin} {...buttonPress}>
            LinkedIn
          </motion.a>
        </motion.div>
      </motion.div>

      <motion.figure
        className="portrait-frame"
        aria-label="Jagath working on a laptop"
        initial={shouldReduceMotion ? false : { opacity: 0, scale: 1.035, y: 18 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1.05, ease: [0.16, 1, 0.3, 1] }}
      >
        <img src={portraitUrl} alt="Jagath Srujan working on a laptop" />
        <figcaption>
          <span>student builder</span>
          <span>Bengaluru</span>
        </figcaption>
      </motion.figure>
    </section>
  );
}

function ProjectCard({ project, index }) {
  const shouldReduceMotion = useReducedMotion();
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.article
      className="project-card"
      custom={index}
      variants={slideFromSide}
      initial={shouldReduceMotion ? false : "hidden"}
      whileInView="visible"
      viewport={{ once: true, amount: 0.22 }}
      whileHover={
        shouldReduceMotion
          ? undefined
          : {
              y: -14,
              rotateX: index === 1 ? 0.8 : 1.2,
              rotateY: index === 0 ? -1.4 : index === 2 ? 1.4 : 0,
              transition: { duration: 0.28, ease: "easeOut" },
            }
      }
      style={borderTrace}
    >
      <span className="project-card__trace" aria-hidden="true" />
      <div className="project-meta">
        <p className="eyebrow">
          <span>{project.missionCode}</span>
          {project.eyebrow}
        </p>
        <span>{project.status}</span>
      </div>
      <div className="project-heading">
        <h3>{project.title}</h3>
        <motion.a
          href={project.href}
          aria-label={`Open ${project.title} on GitHub`}
          {...buttonPress}
        >
          View
        </motion.a>
      </div>
      <p className="spec-label">Mission</p>
      <p className="project-summary">{project.summary}</p>
      <div className="project-metric">
        <span>metric</span>
        <strong>{project.metric}</strong>
      </div>
      <dl>
        <div>
          <dt>Build</dt>
          <dd>{project.build}</dd>
        </div>
        <div>
          <dt>Signal</dt>
          <dd>{project.impact}</dd>
        </div>
      </dl>
      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            className="project-detail"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="spec-label">Mission detail</p>
            <p>{project.detail}</p>
          </motion.div>
        )}
      </AnimatePresence>
      <p className="spec-label stack-label">Stack</p>
      <ul className="tag-list" aria-label={`${project.title} stack`}>
        {project.stack.map((item) => (
          <motion.li
            key={item}
            whileHover={shouldReduceMotion ? undefined : { y: -3, scale: 1.04 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
          >
            {item}
          </motion.li>
        ))}
      </ul>
      <motion.button
        className="detail-toggle"
        type="button"
        onClick={() => setIsExpanded((current) => !current)}
        aria-expanded={isExpanded}
        {...buttonPress}
      >
        {isExpanded ? "Collapse file" : "Expand file"}
      </motion.button>
    </motion.article>
  );
}

function AnimatedSection({ id, className = "", titleId, children }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.section
      className={`section animated-section ${className}`}
      id={id}
      aria-labelledby={titleId}
      variants={panelReveal}
      initial={shouldReduceMotion ? false : "hidden"}
      whileInView="visible"
      viewport={{ once: true, amount: 0.16 }}
    >
      {children}
    </motion.section>
  );
}

function SectionIntro({ eyebrow, title, titleId, children }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      className="section-intro"
      variants={fadeUp}
      initial={shouldReduceMotion ? false : "hidden"}
      whileInView="visible"
      viewport={{ once: true, amount: 0.28 }}
    >
      <p className="eyebrow">{eyebrow}</p>
      <h2 id={titleId}>{title}</h2>
      <p>{children}</p>
    </motion.div>
  );
}

function App() {
  const progress = useScrollProgress();
  const sectionIds = useMemo(() => ["top", "work", "direction", "skills", "contact"], []);
  const activeSection = useActiveSection(sectionIds);
  const shouldReduceMotion = useReducedMotion();

  const year = useMemo(() => new Date().getFullYear(), []);

  return (
    <>
      <VideoIntro />
      <Header progress={progress} activeSection={activeSection} />
      <ScrollTelemetry activeSection={activeSection} progress={progress} />
      <main>
        <Hero />

        <AnimatedSection className="work-section" id="work" titleId="work-title">
          <SectionIntro
            eyebrow="Mission files"
            title="Systems proof, not just polish"
            titleId="work-title"
          >
            A small but focused set of projects that show practical systems thinking:
            climate analysis, automation, and a growing mechanical-engineering direction.
          </SectionIntro>
          <div className="project-grid">
            {projects.map((project, index) => (
              <ProjectCard key={project.title} project={project} index={index} />
            ))}
          </div>
        </AnimatedSection>

        <section className="section direction-section" id="direction" aria-labelledby="direction-title">
          <motion.div
            className="direction-panel"
            variants={fadeUp}
            initial={shouldReduceMotion ? false : "hidden"}
            whileInView="visible"
            viewport={{ once: true, amount: 0.26 }}
          >
            <p className="eyebrow">Engineering vector</p>
            <h2 id="direction-title">Mechanical core. Aerospace edge. Defense-grade discipline.</h2>
            <p>
              The center of gravity is mechanical engineering. The edge is where
              software, AI, public data, and physical systems make that engineering
              sharper.
            </p>
            <div className="direction-marks" aria-label="Focus areas">
              {["climate resilience", "career intelligence", "propulsion systems"].map(
                (mark, index) => (
                  <motion.span
                    key={mark}
                    initial={shouldReduceMotion ? false : { opacity: 0, x: -18 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.6 }}
                    transition={{ duration: 0.52, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
                    whileHover={shouldReduceMotion ? undefined : { scale: 1.025, y: -4 }}
                  >
                    {mark}
                  </motion.span>
                ),
              )}
            </div>
          </motion.div>
        </section>

        <AnimatedSection className="skills-section" id="skills">
          <SectionIntro eyebrow="Capabilities" title="Technical payload">
            The portfolio should keep evolving as the work gets deeper: each skill
            is strongest when tied to a visible project, result, or build note.
          </SectionIntro>
          <motion.ul
            className="skills-grid"
            aria-label="Jagath Srujan skills"
            variants={staggerParent}
            initial={shouldReduceMotion ? false : "hidden"}
            whileInView="visible"
            viewport={{ once: true, amount: 0.18 }}
          >
            {skills.map((skill, index) => (
              <motion.li
                key={skill}
                variants={fadeUp}
                whileHover={
                  shouldReduceMotion
                    ? undefined
                    : {
                        y: -8,
                        scale: 1.025,
                        borderColor: "rgba(202, 207, 210, 0.38)",
                      }
                }
                whileTap={{ scale: 0.985 }}
                transition={{ duration: 0.18, ease: "easeOut" }}
              >
                {skill}
              </motion.li>
            ))}
          </motion.ul>
        </AnimatedSection>

        <AnimatedSection className="contact-section" id="contact">
          <motion.div
            className="contact-card"
            variants={fadeUp}
            initial={shouldReduceMotion ? false : "hidden"}
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <p className="eyebrow">Contact</p>
            <h2>Let the work start the conversation.</h2>
            <p>
              For internships, collaborations, or project feedback, the fastest path
              is through GitHub or LinkedIn.
            </p>
            <div className="contact-links">
              <motion.a href={links.github} {...buttonPress}>
                GitHub
              </motion.a>
              <motion.a href={links.linkedin} {...buttonPress}>
                LinkedIn
              </motion.a>
            </div>
          </motion.div>
        </AnimatedSection>
      </main>

      <footer className="site-footer">
        <span>Jagath Srujan</span>
        <span>{year}</span>
      </footer>
    </>
  );
}

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
