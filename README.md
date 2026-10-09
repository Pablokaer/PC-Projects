# Pablo Dev Hub

Personal portfolio of Pablo, a software engineer building backend and full-stack products.
Live at **[pablodevhub.com](https://pablodevhub.com)**.

It is a static site: plain HTML, CSS and JavaScript, no framework, no build step and no dependencies.

## Sections

| Section | What it shows |
|---|---|
| Hero | Headline, status label, links and a circular artwork with three floating cards (project count, clean code, core stack) |
| Projects | Five projects as full-width cards with filters (All, Full Stack, AI, Mobile & Desktop) |
| Expertise | Technologies grouped by the kind of problem they solve |
| About | Short introduction and key facts |
| Timeline | Professional milestones |
| Contact | Email, LinkedIn and GitHub |

## Projects

Each card links to a case-study page built from the project's repository README.

| Project | Stack | Links |
|---|---|---|
| IERailMetrics (Irish Rail Delay Tracker) | Java 21, Spring Boot, PostgreSQL, SSE, Leaflet | [site](https://ierailmetrics.com/overview) · [repo](https://github.com/Pablokaer/RailDelayTracker) |
| CV Fit AI (Resume Tailor) | Java 21, Spring Boot, PostgreSQL, OpenAI, Stripe | [site](https://cvfitai.com/) · [repo](https://github.com/Pablokaer/CVAdjuster) |
| TechRat | C#, ASP.NET Core 10, Next.js, Expo, PostgreSQL | [site](https://techrat.io) · [repo](https://github.com/Pablokaer/techrat) |
| Travelist | Expo, React Native, TypeScript, Supabase, PostGIS | [site](https://travelist.live/) · [repo](https://github.com/Pablokaer/travelist) |
| OctoSplitter | Python, PySide6, PyTorch, RoFormer | [repo](https://github.com/Pablokaer/StemSplitter) |

## Run locally

Any static file server works. With Python installed:

```bash
python -m http.server 8000
```

Then open <http://localhost:8000>.

## Project structure

```
index.html                    Home page (hero, projects, expertise, about, timeline, contact)
favicon.ico                   Favicon fallback
pages/
  about.html                  Extended about page
  contact.html                Contact page
  social.html                 Social page (not linked from the navigation)
  projects/projeto1..5.html   Case study for each project
assets/
  css/style.css               Design system, layout and responsive rules
  js/config.js                Personal details: links, status label, hero image
  js/script.js                Mobile menu, scroll reveal, project filter, config binding
  img/projects/               Project covers and screenshots (WebP)
  img/brand/                  Favicon (SVG), Apple touch icon and social preview image
```

## Editing content

- **Links, email, status label and hero image:** edit `assets/js/config.js`. Every page reads it at load time, so one change updates the whole site. A personal photo can be set with `heroImage`; without it the hero shows an abstract artwork.
- **Projects:** each card lives in the `#project-grid` section of `index.html` and each case study in `pages/projects/`. Add `data-category` values (`fullstack`, `ai`, `apps`) to make a card appear under a filter.
- **Design tokens:** colours, type, spacing and motion are CSS variables at the top of `assets/css/style.css`.

## Design

- Near-black background with a restrained amber accent used for actions and small indicators.
- Inter Tight for headings, Inter for text and Geist Mono for technical labels, loaded from Google Fonts.
- Responsive from phone to desktop, keyboard-friendly navigation and a skip link.
- Animations use only `transform` and `opacity` and are disabled under `prefers-reduced-motion`.

## Social preview and icons

The favicon is a white "P" on a blue background. Links pasted in chats show `assets/img/brand/og-preview.png` (1200×630) through the Open Graph and Twitter Card tags in each page's `<head>`. Chat apps cache previews, so test a changed image with a new link or the platform's debugger.

## Deployment

The `main` branch is served as a static site and `CNAME` maps it to `pablodevhub.com`.
