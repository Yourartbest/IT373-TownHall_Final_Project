# EAiKW Reference Harvest Notes

This document captures reusable patterns from the EAiKW (EverydayAI / Keith Williams portfolio) Eleventy project and how to adapt them into the Town Hall / TownHall project.

Sections:

- Eleventy config analysis
- CSS architecture notes
- Layout & content architecture
- Accessibility practices
- SEO strategy & structured data
- Performance techniques & tooling
- Code structure, quality gates, and testing
- Adaptation checklist for the TownHall project

---

## 1. Eleventy Config Analysis

**File:** `.eleventy.js`

### 1.1 Directory and engine setup

- `dir.input = "src"`, `dir.output = "_site"`, `includes = "_includes"`, `data = "_data"`.
- `templateFormats: ["md", "njk", "html"]` keeps build fast and predictable.
- `markdownTemplateEngine`, `htmlTemplateEngine`, `dataTemplateEngine` all set to `"njk"` for consistency.
- `serverOptions` exposes `0.0.0.0:8080` so Docker and other hosts can hit the dev server.

**TownHall adaptation:**
- Use the same directory structure to keep templates and data portable between EAiKW and TownHall.
- If TownHall is its own Eleventy project, start from this config and only adjust paths and ports as needed.

### 1.2 Collections

- `blog` collection: `collectionApi.getFilteredByGlob("src/blog/*.md").reverse()`
- `projects` collection: `collectionApi.getFilteredByGlob("src/projects/*.md").reverse()`

These collections power:
- Blog index (`src/blog/index.njk`) with pagination
- Homepage recent posts & featured projects
- Project listing grid (`src/projects/index.njk`)

**TownHall adaptation:**
- Reuse the `blog` and `projects` patterns for any recurring content types:
  - Town Hall events (`src/events/*.md` → `events` collection)
  - Community programs, partners, or case studies.
- Keep content in Markdown with rich front matter; let layouts handle rendering.

### 1.3 Filters

Key reusable filters:

- `dateFormat`, `readableDate`, `dateToISO` with **defensive error handling** (handles missing/invalid dates). This prevents schema/SEO breakage.
- `excerpt(content)`: strips HTML and truncates to ~200 chars, used for meta descriptions and previews.
- `limit(array, n)`: simple utility for home/index sections.
- `currentYear()`: powers footer copyright.
- `getPreviousCollectionItem` / `getNextCollectionItem`: prev/next navigation for posts.
- `baseUrl(url)`: prefixes URLs with `PATH_PREFIX` (GitHub Pages subdirectory support).

**TownHall adaptation:**
- Copy these filters directly or import them into TownHall’s Eleventy config.
- Ensure all date usage in SEO/meta/schema uses `dateToISO` to keep structured data valid.
- Use `excerpt` for town hall event meta descriptions when no explicit description is provided.

### 1.4 Shortcodes and plugins

- Uses `@11ty/eleventy-img` via an async `image` shortcode:
  - Outputs responsive `webp` + `jpeg` at 300/600/1200 widths.
  - Sets `loading="lazy"` and `decoding="async"`.
- Plugins:
  - `EleventyHtmlBasePlugin` for `<base>` handling.
  - `@11ty/eleventy-plugin-rss` for RSS feed and date helpers.
- `setUseGitIgnore(false)` ensures Eleventy doesn’t skip important built assets when `.gitignore` is strict.

**TownHall adaptation:**
- Use the same `image` shortcode for any hero/event images or photos from Town Halls.
- Keep the RSS plugin if you want events or posts syndicated.
- If TownHall lives inside the EAiKW site, you can share this exact config and just add new collections/templates.

### 1.5 Passthrough copy

- Copies:
  - `src/images → images`
  - `src/assets → assets`
  - `src/favicon.svg → favicon.svg`
  - `src/css/print.css → css/print.css`
  - `CNAME` for the custom domain.

**TownHall adaptation:**
- Ensure any TownHall-specific assets (logos, diagrams) live under `src/images` or `src/assets` so they are served at predictable URLs.
- Reuse `print.css` for printable event agendas, handouts, or program overviews.

---

## 2. CSS Architecture Notes

**Files:** `tailwind.config.js`, `src/css/tailwind.css`, `src/css/print.css`

### 2.1 Tailwind and design tokens

- Tailwind configured with:
  - `content` scanning `./src/**/*.{html,njk,md}`, plus `_layouts` and `_data`.
  - Color extensions: `primary` and `neutral` scales.
  - Fonts: `sans = Inter`, `mono = Fira Code`.
  - Typography plugin customized for headings and inline `code` styling.
- Uses Tailwind plugins:
  - `@tailwindcss/typography`
  - `@headlessui/tailwindcss`
  - `@tailwindcss/container-queries`

**TownHall adaptation:**
- Reuse this Tailwind config as the base for TownHall; keep typography and container query support.
- Any TownHall-specific components (event cards, agenda lists) should be composed from Tailwind utilities plus the Swiss custom layer.

### 2.2 Swiss design system (custom CSS)

In `tailwind.css`:

- `@tailwind base/components/utilities` at top; then large custom @layer blocks.
- Core concepts:
  - **Grid:** `.swiss-grid` with 12 equal columns and variable gutters.
  - **Column spans:** `.swiss-col-1` … `.swiss-col-12` classes.
  - **Asymmetric layouts:** `.swiss-asymmetric-hero`, `.swiss-asymmetric-content` for 5/7 or 7/5 splits.
  - **Container:** `.swiss-container` max-width wrapper.
  - **Typography:** `.prose-swiss` for article-style content with custom headings, lists, links, code, tables, blockquotes, and special `.ai-voice` callouts.
  - **Buttons:** `.btn-swiss`, `.btn-swiss-primary`, `.btn-swiss-accent` plus generic `.btn`, `.btn-primary`, `.btn-secondary`, `.btn-outline` built from Tailwind utilities.
  - **Tokens:** CSS custom properties in `:root` for spacing, fluid typography (`--fluid-h1` etc.), grayscale & accent colors, shadows, radii, transitions.

**TownHall adaptation:**
- Treat the Swiss layer as a shared design system.
- For TownHall pages, keep:
  - `.swiss-grid` for all main grid layouts.
  - `.swiss-divider` for section breaks.
  - `.prose-swiss` for narrative sections (e.g., “Why this matters”, “What we’ll discuss”).
  - `.btn-swiss` / `.btn-swiss-accent` for CTAs like “Register for Town Hall” or “Get Notified”.

### 2.3 Advanced and progressive features

The CSS uses modern features with graceful fallback:

- `@supports (content-visibility: auto)` to lazy-render sections and cards.
- `@supports (animation-timeline: view())` for scroll-driven animations.
- `@media (prefers-reduced-motion: reduce)` to turn off animations and transitions.
- `@media (prefers-reduced-transparency: reduce)` for glass effect fallbacks.
- `@media (color-gamut: p3)` and `@media (dynamic-range: high)` for wide-gamut and HDR tweaks.
- `::view-transition-old/new(root)` to customize view transitions when supported.

**TownHall adaptation:**
- Keep the progressive enhancements but ensure TownHall still works perfectly without them.
- Only apply scroll animations or hover micro-interactions to non-essential visuals; never to critical navigation or readability.

### 2.4 Print stylesheet

`src/css/print.css` defines a full Swiss print system:

- Targets A4 with precise margins and grid.
- Hides navigation, interactive controls, and purely visual elements.
- Recasts `.swiss-grid`, headings, lists, tables, and metadata into print-friendly layout.
- Adds `main::before` and `main::after` headers/footers when printed.

**TownHall adaptation:**
- Use the same print CSS so TownHall event pages print cleanly as handouts.
- For TownHall, ensure the main event/agenda content is inside `<main>` and uses `.prose-swiss` and `.swiss-grid` so the print rules apply correctly.

---

## 3. Layout & Content Architecture

### 3.1 Base layout (`src/_includes/layouts/base.njk`)

- Global HTML `<head>` with SEO and structured data (see SEO section).
- Sticky header with:
  - Logo / wordmark.
  - Desktop nav (Home, Town Hall, Blog, Projects, About).
  - Mobile menu toggle (`aria-expanded`, `aria-controls`, `aria-label`).
- Full-screen mobile menu overlay using Swiss numbering (01–05) and definition-style layout.
- `<main>` for page-specific content.
- Swiss footer with:
  - Brand/description, nav links, social icons with labels, copyright.
  - Build credits (Eleventy, Tailwind, International Typographic Style).

**TownHall adaptation:**
- TownHall page(s) inherit this layout, so nav, footer, and SEO structure stay consistent.
- If TownHall becomes a separate project, replicate this base layout and adjust menu entries to emphasize TownHall content.

### 3.2 Key pages & patterns

- `index.njk` (Home):
  - Asymmetric hero: biography and mission left, definition lists and CTAs right.
  - "Choose Your Path" cards (students, employers, skeptics, believers) using animation-capable card pattern.
  - Featured projects: 2-column Swiss grid using `collections.projects`.
  - Recent posts: timeline-style list with Swiss grid.

- `blog/index.njk`:
  - Paginated list of posts using Swiss grid with 3 columns: date, title/description, CTA.
  - Swiss pagination using `.btn-swiss`.

- `projects/index.njk`:
  - `projects-grid-advanced` with auto-fit grid and advanced hover/animation hooks.
  - Each project card uses number, red accent bar, tech badges, CTA.

- `layouts/post.njk`, `layouts/project.njk`, `layouts/project-chapters.njk`:
  - All use a consistent Swiss header: bordered left accent, metadata in definition lists, big fluid headings.
  - Project-chapters layout includes a scroll-linked nav sidebar and progress indicator.

- `townhall.njk`:
  - Hero: hero text and CTAs over black background.
  - Quick stats: three bold stats cards (FREE, HYBRID, MONTHLY).
  - Next event section: metadata definitions, discussion bullets, speakers, CTA.
  - About, community programs, final CTA — all using Swiss heading, short lists, and clear CTAs.

**TownHall adaptation:**
- Use `townhall.njk` as the **canonical layout reference** for Town Hall experiences:
  - Keep the same section ordering: Hero → Quick Stats → Next Event → Why This Matters → Community Programs → Final CTA.
  - When you spin TownHall into its own project, lift this structure almost verbatim and plug in new content.

---

## 4. Accessibility Practices

Accessibility is baked in across CSS, layout, and documentation.

### 4.1 Global accessibility-oriented CSS

- `:focus-visible` outline: high-contrast, 2px outline with offset.
- Button classes ensure **44×44 px minimum hit area** (via padding and `min-h` utilities).
- `prefers-reduced-motion: reduce` disables animations and transitions.
- `prefers-reduced-transparency: reduce` removes blur/backdrop filters.
- High-contrast text and background combinations in the Swiss palette, validated in Lighthouse.

### 4.2 Components

- Social share component:
  - Uses `aria-label` for each share action (LinkedIn, Twitter, Email, Copy link).
  - Focus rings via `.social-share-btn:focus`.
  - Copy button uses `<button>` (not `<a>`) and stores state with a `copied` class.

- Navigation:
  - Header `<nav>` and footer navigation clearly separated.
  - Mobile menu button uses `aria-expanded` and `aria-controls` to express state.

- Print styles:
  - Strip purely interactive elements (buttons, nav) when printing to avoid confusion.

- `IMAGE_ALT_TEXT_GUIDE.md`:
  - Detailed guidance on alt text length, content, and special cases.
  - Examples for charts, screenshots, diagrams, logos, OG images, decorative images.

### 4.3 Audit results

From `LIGHTHOUSE_AUDIT_REPORT.md` and `LAUNCH_AUDIT.md`:

- Accessibility scores: 91–100 across audited pages.
- EverydayAI Community project page reaches **100% Accessibility**.
- Remaining issues are minor (occasional contrast or labeling tweaks).

**TownHall adaptation:**
- Always supply alt text following the guide — especially for event photos/diagrams.
- Keep the `prefers-reduced-motion` and `prefers-reduced-transparency` patterns intact.
- Validate TownHall pages with Lighthouse and fix anything that lowers the accessibility score below ~95.
- If you add forms (e.g., registrations), ensure explicit `<label>`s, clear error text, and keyboard access.

---

## 5. SEO Strategy & Structured Data

### 5.1 Meta tags in `base.njk`

- Titles:
  - `<title>{% if title %}{{ title }} | {% endif %}{{ site.title }}</title>`
- Descriptions:
  - `<meta name="description" content="{{ description or site.description }}">`
- Author:
  - `<meta name="author" content="{{ site.author }}">`
- Keywords:
  - If `keywords` front matter exists, join as CSV into `<meta name="keywords" content="...">`.
- Canonical:
  - `<link rel="canonical" href="{{ site.url }}{{ page.url }}">`

### 5.2 Open Graph & Twitter

- OG:
  - `og:type` switches to `article` for blog posts.
  - `og:title`, `og:description`, `og:url`, `og:site_name`, `og:locale`.
  - `og:image` uses `image` front matter or a default OG image.
  - For articles, adds `article:published_time`, `article:author`, `article:tag`.
- Twitter Card:
  - `summary_large_image` with title/description.
  - `twitter:image` mirrors OG image.
  - `twitter:site` and `twitter:creator` use `site.social.twitter`.

### 5.3 JSON-LD structured data

In `base.njk` JSON-LD graph:

- `Person` with `@id`, `name`, `url`, `description`, `sameAs` social links, jobTitle, worksFor.
- `Organization` describing EverydayAI Community.
- `WebSite` describing the site.
- Conditional:
  - `BlogPosting` for blog-tagged pages.
  - `CreativeWork` for project-tagged pages.

In `post.njk`:

- Additional `BreadcrumbList` JSON-LD with Home → Blog → Current Post.
- Another `BlogPosting` block that explicitly includes `keywords` and `articleSection`.

### 5.4 Robots, sitemap, feed

- `robots.njk` outputs `/robots.txt` with allow-all and sitemap pointer.
- `sitemap.njk` enumerates `collections.all` and sets:
  - `<lastmod>` from `dateToRfc3339`.
  - `changefreq` and `priority` based on path (home vs blog vs other).
- `feed.njk` provides `/feed.xml` using `collections.blog` and RSS helpers.

### 5.5 SEO docs & quick wins

From `SEO_*` and `GOOGLE_SEO_AUDIT_REPORT.md`:

- Completed improvements:
  - Enhanced homepage meta description with strong keywords and credentials.
  - Added BreadcrumbList schema to blog posts.
  - Enriched BlogPosting schema with `keywords` and `articleSection`.
  - Created alt text guidelines.
- Achieved **100/100 SEO** and validated with Lighthouse.
- Emphasis on:
  - Internal linking architecture.
  - Content hubs (Welcome, Second Renaissance).
  - Topic clusters and strategic anchor text.

**TownHall adaptation:**
- For TownHall pages:
  - Provide strong `title`, `description`, `keywords`, `excerpt`, and `image` front matter.
  - Ensure event pages are included in the sitemap with appropriate `changefreq` and `priority` (e.g., upcoming events weekly, archive monthly).
  - Consider adding FAQ schema for common TownHall questions (registration, hybrid attendance) when content exists.
  - Keep internal linking strong: from TownHall page to blog posts, projects, and Enterprise AI program.

---

## 6. Performance Techniques & Tooling

### 6.1 Build pipeline

- CSS:
  - Tailwind with PostCSS + Autoprefixer.
  - `npm run build:css:prod` generates minified `main.css` to `_site/css`.
- JS:
  - Esbuild bundler (`build-alpine.js`) compiles multiple entrypoints into minified IIFE bundles in `_site/js`.
- Eleventy:
  - `npm run build:eleventy` builds HTML.
- Combined build:
  - `npm run build` runs CSS + JS builds in parallel, then Eleventy.

### 6.2 Runtime performance features

- CSS-level optimizations:
  - `content-visibility: auto` for sections and cards.
  - Carefully scoped animations and transitions.
  - UI-level skeleton loading states (`.image-skeleton`).
- Image optimization via Eleventy image shortcode (responsive, webp/jpeg, lazy loading).
- Fonts loaded with:
  - `preconnect` to `fonts.googleapis.com` / `fonts.gstatic.com`.
  - `preload` of font stylesheet with `media="print"` + `onload` hack; `noscript` fallback.
- Static serving with nginx tuned for:
  - Gzip compression.
  - Cache headers for static assets.
  - Security headers and health check endpoint.

### 6.3 Performance budgets and audits

- `lighthouserc.js` defines Lighthouse CI config with strict assertions:
  - Performance ≥ 0.95, Accessibility = 1, Best Practices = 1, SEO = 1.
  - Caps JS, CSS, image, and total bytes.
- `LIGHTHOUSE_AUDIT_REPORT.md` documents actual runs and scores.
- Docker and Makefile provide reproducible dev/prod environments.

### 6.4 Testing

- Playwright config:
  - Runs E2E tests in Chromium and a mobile viewport.
  - Starts local server with `npm run build` then `eleventy --serve`.
  - Screenshots on failure, HTML reports.
- Visual regression tests for key pages (tests under `tests/visual`).

**TownHall adaptation:**
- Keep the same budgets and tooling for TownHall pages:
  - Ensure new content doesn’t push JS or CSS beyond defined byte limits.
  - Add Playwright tests for the TownHall page, verifying nav, hero CTAs, and important copy render correctly on desktop and mobile.
  - Run Lighthouse against `/townhall/` and treat any regression as a gate.

---

## 7. Code Structure, Quality Gates, and Workflow

### 7.1 Code structure

- Clear separation of concerns:
  - `src/_data` for site-level data (`site.json`).
  - `src/_includes/layouts` for page-level layouts.
  - `src/_includes/components` for reusable macros and components (`card.njk`, `social-share.njk`).
  - `src/blog`, `src/projects`, `src/townhall.njk`, etc. for content.
- Macros (`card.njk`) keep presentation logic DRY while front matter remains content-focused.

### 7.2 Linting & formatting

- ESLint (`eslint.config.js`) with:
  - Recommended JS config plus strict stylistic rules.
  - Shared browser + node globals.
  - Ignores compiled/bundled assets.
- Stylelint and markdownlint configured in project root.
- Prettier applied across JS, JSON, CSS, MD, Nunjucks, HTML.

### 7.3 Quality gates script

- `scripts/setup-quality-gates.sh` installs:
  - ESLint, Prettier, Stylelint, Markdownlint, Husky, lint-staged, Commitlint.
- Configures Git hooks:
  - `pre-commit` runs `lint-staged`.
  - `commit-msg` enforces conventional commits via Commitlint.

### 7.4 Docker & deployment workflow

- `Dockerfile`:
  - Multi-stage build: Node builder → nginx serving static `_site`.
  - Health check endpoint.
- `Dockerfile.dev`:
  - Dev-friendly container with `npm run dev` and port 8080.
- `DOCKER.md` and `LAUNCH_AUDIT.md` document:
  - Dev/prod workflows, ports, profiles.
  - Deployment via Docker Hub and/or GitHub Pages.

**TownHall adaptation:**
- Use the same quality gates in the TownHall repo:
  - Run `scripts/setup-quality-gates.sh` (adjusted paths if necessary).
  - Enforce linting/formatting on all TownHall templates and CSS.
- If TownHall is deployed separately:
  - Copy the Docker and nginx setup and adjust domain and health-check paths as needed.

---

## 8. Adaptation Checklist for TownHall Project

Use this as a concrete checklist when applying EAiKW patterns to the TownHall project.

### 8.1 Eleventy & structure

- [ ] Use EAiKW `.eleventy.js` as the base config (collections, filters, image shortcode, markdownIt + anchor, baseUrl filter).
- [ ] Keep `src/_data/site.json` and update `title`, `description`, `url`, and `social` for TownHall branding.
- [ ] Organize TownHall content as:
  - [ ] `src/townhall.njk` (main page)
  - [ ] Optionally `src/events/*.md` with an `events` collection.

### 8.2 CSS & layout

- [ ] Import `tailwind.css` and `print.css` into the new project.
- [ ] Preserve Swiss CSS variables, `.swiss-grid`, `.prose-swiss`, button classes, and dividers.
- [ ] Build TownHall hero, stats, and program sections using the same patterns as `townhall.njk`.

### 8.3 Accessibility

- [ ] Follow `IMAGE_ALT_TEXT_GUIDE.md` for all new images.
- [ ] Verify that all CTAs are at least 44×44 px with visible focus states.
- [ ] Test TownHall pages with Lighthouse accessibility; fix any issues until ≥95.

### 8.4 SEO

- [ ] Provide strong `title`, `description`, `keywords`, `excerpt`, and `image` for TownHall pages.
- [ ] Ensure `/townhall/` is in sitemap with correct priority and changefreq.
- [ ] Consider FAQ schema for common questions once content exists.

### 8.5 Performance & quality

- [ ] Keep CSS and JS within Lighthouse budgets (script < 50KB, CSS < 30KB, images < 200KB per page where possible).
- [ ] Add Playwright tests focused on TownHall UX.
- [ ] Run Lighthouse CI (or manual Lighthouse) regularly against `/townhall/`.
- [ ] Enforce linting/formatting with Husky + lint-staged + Commitlint.

If you want, we can next **apply these patterns directly** to the TownHall code (navigation, layouts, SEO, and CSS) and wire it into your main project build.
