# praneelmagapu.me

Portfolio site. Vite, React, TypeScript. Deploys to GitHub Pages on the root custom domain.

## Run locally

```bash
npm install
npm run dev
```

Dev server with hot reload at http://localhost:5173.

## Build and preview

```bash
npm run build
npm run preview
```

## Deploy

Full GitHub Pages deploy steps arrive once the site is complete. The short version: `npm run deploy` builds and pushes `dist/` to the `gh-pages` branch via the `gh-pages` package. `public/CNAME` carries the custom domain into every deploy.

## Structure

```
public/          CNAME, resume.pdf
src/
  components/    Nav, Hero, About, Projects, ProjectCard, Experience, Skills, Contact, Icons
  hero/          icp.ts (registration simulation, rocket point cloud), render.ts (canvas renderer)
  styles/        tokens.css (theme variables), global.css
```

## Current state

All sections built: hero with ICP rocket animation, About, Projects, Experience timeline, Skills, and Contact. Awaiting final review before deploy.
