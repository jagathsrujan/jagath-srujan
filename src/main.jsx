import React, { useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import { motion, useReducedMotion } from "motion/react";
import portraitUrl from "./assets/jagath-portrait.jpeg";
import "./styles.css";

const links = {
  github: "https://github.com/jagathsrujan",
  linkedin: "https://www.linkedin.com/in/jagath-srujan-057156359/",
};

const projects = [
  {
    eyebrow: "Climate intelligence",
    status: "CIVIC RISK SYSTEM",
    title: "VanaRaksha",
    href: "https://github.com/jagathsrujan/vana-raksha",
    summary:
      "A Bengaluru property climate-risk assessment tool that reasons across flood exposure, urban heat island conditions, and water stress.",
    build:
      "React, ward-level datasets, photo evidence intake, AI-assisted risk synthesis, deterministic fallback scoring.",
    impact:
      "Turns fragmented civic and environmental signals into an auditable risk report for buyers, planners, and researchers.",
    stack: ["React", "AI reasoning", "Climate data", "Bengaluru"],
  },
  {
    eyebrow: "Career systems",
    status: "AUTOMATION PIPELINE",
    title: "ME Job Scout",
    href: "https://github.com/jagathsrujan/me-job-scout",
    summary:
      "A Python automation pipeline for tracking mechanical engineering roles and turning market demand into project ideas.",
    build:
      "Company job scraping, daily digests, skill extraction, and portfolio recommendations for mechanical engineering growth.",
    impact:
      "Connects learning effort to real hiring signals instead of guessing what to build next.",
    stack: ["Python", "Automation", "Job data", "Skill mapping"],
  },
  {
    eyebrow: "Engineering direction",
    status: "AEROSPACE TRACK",
    title: "Aerospace and defence path",
    href: "https://github.com/jagathsrujan/jagath-srujan",
    summary:
      "An early career signal around aerospace, defence, and mechanical engineering systems.",
    build:
      "Use this space for CAD studies, propulsion notes, systems analysis, and build logs as the work matures.",
    impact:
      "Frames a clear long-term technical direction while the portfolio grows from student work into proof-of-work.",
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

const staggerParent = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 0.12,
      staggerChildren: 0.09,
    },
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

const buttonPress = {
  whileHover: { y: -3, scale: 1.015 },
  whileTap: { y: 0, scale: 0.975 },
  transition: { duration: 0.18, ease: "easeOut" },
};

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

function Header({ progress }) {
  const navItems = ["work", "direction", "skills", "contact"];

  return (
    <header className="site-header">
      <div className="progress-bar" style={{ transform: `scaleX(${progress})` }} />
      <a className="wordmark" href="#top" aria-label="Jagath Srujan home">
        JS
      </a>
      <nav aria-label="Primary navigation">
        {navItems.map((item) => (
          <a key={item} href={`#${item}`}>
            {item}
          </a>
        ))}
      </nav>
    </header>
  );
}

function Hero() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      <motion.div
        className="hero-copy"
        variants={staggerParent}
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

  return (
    <motion.article
      className="project-card"
      custom={index}
      variants={slideFromSide}
      initial={shouldReduceMotion ? false : "hidden"}
      whileInView="visible"
      viewport={{ once: true, amount: 0.22 }}
    >
      <div className="project-meta">
        <p className="eyebrow">{project.eyebrow}</p>
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
      <p className="spec-label stack-label">Stack</p>
      <ul className="tag-list" aria-label={`${project.title} stack`}>
        {project.stack.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </motion.article>
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
  const shouldReduceMotion = useReducedMotion();

  const year = useMemo(() => new Date().getFullYear(), []);

  return (
    <>
      <Header progress={progress} />
      <main>
        <Hero />

        <section className="section work-section" id="work" aria-labelledby="work-title">
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
        </section>

        <section className="section direction-section" id="direction">
          <motion.div
            className="direction-panel"
            variants={fadeUp}
            initial={shouldReduceMotion ? false : "hidden"}
            whileInView="visible"
            viewport={{ once: true, amount: 0.26 }}
          >
            <p className="eyebrow">Engineering vector</p>
            <h2>Mechanical core. Aerospace edge. Defense-grade discipline.</h2>
            <p>
              The center of gravity is mechanical engineering. The edge is where
              software, AI, public data, and physical systems make that engineering
              sharper.
            </p>
            <div className="direction-marks" aria-label="Focus areas">
              <span>climate resilience</span>
              <span>career intelligence</span>
              <span>propulsion systems</span>
            </div>
          </motion.div>
        </section>

        <section className="section skills-section" id="skills">
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
                whileHover={{ y: -4, borderColor: "rgba(202, 207, 210, 0.34)" }}
                whileTap={{ scale: 0.985 }}
                transition={{ duration: 0.18, ease: "easeOut" }}
              >
                {skill}
              </motion.li>
            ))}
          </motion.ul>
        </section>

        <section className="section contact-section" id="contact">
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
        </section>
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
