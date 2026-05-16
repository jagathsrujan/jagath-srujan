# Jagath Srujan Portfolio

Recruiter-focused portfolio website for Jagath Srujan, a Bengaluru-based mechanical engineering student building AI-assisted tools for climate, careers, and engineered systems.

## Highlights

- Black titanium mechanical/aerospace visual direction with carbon black, gunmetal, brushed silver, and smoke-gray text.
- Full-viewport hero using Jagath's portrait as an extended background image.
- Scroll progress indicator and Motion-powered reveal animations.
- Engineering spec-panel project cards that slide in from the side on scroll.
- Subtle hover/tap motion for portfolio links and project actions.
- Reduced-motion support for accessibility.
- GitHub Pages deployment through GitHub Actions.

## Featured Work

- **VanaRaksha**: Bengaluru climate-risk assessment tool for flood, urban heat island, and water-stress reasoning.
- **ME Job Scout**: Python automation pipeline for mechanical engineering job discovery and skill analysis.
- **Aerospace and defence direction**: Evolving mechanical engineering interest area for future build logs and systems work.

## Tech Stack

- React 18
- Vite
- Motion for React
- CSS custom properties
- GitHub Pages

## Local Development

```bash
npm install
npm run dev
```

The dev server uses:

```text
http://127.0.0.1:5174/
```

## Build

```bash
npm run build
```

The production build is emitted to `dist/`.

## Deployment

This repo deploys to GitHub Pages with the workflow in `.github/workflows/deploy.yml`.

Production URL:

```text
https://jagathsrujan.github.io/jagath-srujan/
```
