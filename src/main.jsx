import React, { useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import portraitUrl from "./portrait-data";
import "./styles.css";

const links = {
  github: "https://github.com/jagathsrujan",
  linkedin: "https://www.linkedin.com/in/jagath-srujan-057156359/",
};

const projects = [
  {
    eyebrow: "Climate intelligence",
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

function useRevealOnScroll() {
  useEffect(() => {
    const elements = Array.from(document.querySelectorAll("[data-reveal]"));
    if (!elements.length) return undefined;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      elements.forEach((element) => element.classList.add("is-visible"));
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.16 }
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);
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
  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      <div className="hero-copy">
        <p className="kicker">Bengaluru / Mechanical engineering / AI tools</p>
        <h1 id="hero-title">Jagath Srujan</h1>
        <p className="hero-lede">
          Mechanical engineering student building AI-assisted tools for climate,
          careers, and engineered systems.
        </p>
        <div className="hero-actions" aria-label="Portfolio links">
          <a className="button primary" href={links.github}>
            GitHub
          </a>
          <a className="button" href={links.linkedin}>
            LinkedIn
          </a>
        </div>
      </div>

      <figure className="portrait-frame" aria-label="Jagath working on a laptop">
        <img src={portraitUrl} alt="Jagath Srujan working on a laptop" />
        <figcaption>
          <span>student builder</span>
          <span>Bengaluru</span>
        </figcaption>
      </figure>
    </section>
  );
}

function ProjectCard({ project, index }) {
  return (
    <article
      className="project-card"
      data-reveal
      style={{ transitionDelay: `${index * 90}ms` }}
    >
      <p className="eyebrow">{project.eyebrow}</p>
      <div className="project-heading">
        <h3>{project.title}</h3>
        <a href={project.href} aria-label={`Open ${project.title} on GitHub`}>
          View
        </a>
      </div>
      <p>{project.summary}</p>
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
      <ul className="tag-list" aria-label={`${project.title} stack`}>
        {project.stack.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </article>
  );
}

function SectionIntro({ eyebrow, title, titleId, children }) {
  return (
    <div className="section-intro" data-reveal>
      <p className="eyebrow">{eyebrow}</p>
      <h2 id={titleId}>{title}</h2>
      <p>{children}</p>
    </div>
  );
}

function App() {
  const progress = useScrollProgress();
  useRevealOnScroll();

  const year = useMemo(() => new Date().getFullYear(), []);

  return (
    <>
      <Header progress={progress} />
      <main>
        <Hero />

        <section className="section work-section" id="work" aria-labelledby="work-title">
          <SectionIntro
            eyebrow="Selected work"
            title="Proof over polish alone"
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
          <div className="direction-panel" data-reveal>
            <p className="eyebrow">Engineering direction</p>
            <h2>Curious, technical, and deliberately cross-domain.</h2>
            <p>
              The center of gravity is mechanical engineering. The edge is where
              software, AI, public data, and physical systems make that engineering
              sharper.
            </p>
            <div className="direction-marks" aria-label="Focus areas">
              <span>climate resilience</span>
              <span>career intelligence</span>
              <span>aerospace systems</span>
            </div>
          </div>
        </section>

        <section className="section skills-section" id="skills">
          <SectionIntro eyebrow="Capabilities" title="Tools for thinking and building">
            The portfolio should keep evolving as the work gets deeper: each skill
            is strongest when tied to a visible project, result, or build note.
          </SectionIntro>
          <ul className="skills-grid" aria-label="Jagath Srujan skills">
            {skills.map((skill, index) => (
              <li key={skill} data-reveal style={{ transitionDelay: `${index * 45}ms` }}>
                {skill}
              </li>
            ))}
          </ul>
        </section>

        <section className="section contact-section" id="contact">
          <div className="contact-card" data-reveal>
            <p className="eyebrow">Contact</p>
            <h2>Let the work start the conversation.</h2>
            <p>
              For internships, collaborations, or project feedback, the fastest path
              is through GitHub or LinkedIn.
            </p>
            <div className="contact-links">
              <a href={links.github}>GitHub</a>
              <a href={links.linkedin}>LinkedIn</a>
            </div>
          </div>
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
