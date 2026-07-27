# Newark AI Town Hall Website

Making AI education accessible, plain-language, and community-centered for Newark residents.

## Project Structure

```
IT373-TownHall_Final_Project/
├── src/                          # Eleventy source files
│   ├── _includes/layouts/        # Page layouts (base.njk)
│   ├── _data/                    # Data files (Sanity queries)
│   ├── css/                      # Tailwind CSS with Bauhaus design
│   ├── js/                       # JavaScript (mobile menu, etc.)
│   └── index.njk                 # Homepage
├── townhall/                     # Sanity Studio CMS
│   └── schemaTypes/              # Content schemas (event, post, etc.)
├── docs/                         # Project planning documentation
├── reference/                    # Technical analysis documents
└── _site/                        # Generated static site (git ignored)
```

### Prerequisites
- Node.js v22.19.0+
- npm v11.6.2+

### Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run Sanity Studio (CMS):**
   ```bash
   cd townhall
   npm run dev
   ```
   Opens at `http://localhost:3333`

3. **Run Eleventy (Website):**
   ```bash
   npm run dev
   ```
   Opens at `http://localhost:8080`

##  Design System

**Bauhaus Modernist Principles:**
- **Colors:** Red (#E63946), Blue (#1D3557), Yellow (#F1C40F)
- **Typography:** Inter font, uppercase headings, 0.05em letter-spacing
- **Layout:** 8px grid system, 4px borders, 8px offset shadows
- **Accessibility:** WCAG 2.1 Level AA, 56px touch targets

##  Tech Stack

- **Static Site Generator:** Eleventy 3.1.2
- **CMS:** Sanity Studio v4
- **CSS:** Tailwind CSS with custom Bauhaus tokens
- **JavaScript:** Vanilla JS (mobile menu, accessibility)
- **Date Handling:** Luxon
- **Content Queries:** GROQ (Sanity Query Language)

##  Content Types

1. **Event** - Town hall events with registration
2. **Blog Post** - AI education articles
3. **Educator Resource** - Lesson plans and activities
4. **Volunteer Opportunity** - Ways to get involved
5. **Author** - Content creators and organizers

##  Accessibility Features

- ARIA landmarks (`role="banner"`, `role="main"`, `role="contentinfo"`)
- Skip link for keyboard users
- Focus trap in mobile menu
- 56px minimum touch targets (exceeds WCAG 44px)
- `:focus-visible` outlines
- `prefers-reduced-motion` support
- Screen reader text (`.sr-only` class)

##  SEO Features

- Complete meta tags (title, description, author)
- Open Graph protocol for social sharing
- Twitter Card meta tags
- Schema.org JSON-LD for structured data
- Semantic HTML5 elements
- Image optimization with Sanity CDN

##  Performance

- Tailwind CSS with PurgeCSS (99% size reduction)
- Lazy loading images
- CDN-optimized assets via Sanity
- Minimal JavaScript (mobile menu only)
- Static site generation (fast page loads)

##  User Personas

1. **Angela (Parent, Low Tech)** - Needs plain language, visual examples
2. **James (Educator, Medium Tech)** - Wants classroom-ready resources
3. **Aisha (Student Volunteer, High Tech)** - Seeks leadership experience

##  Scripts

```bash
npm run dev      # Start Eleventy dev server
npm run build    # Build static site
npm start        # Alias for npm run dev
```

##  CMS Setup

**Sanity Studio** runs independently at `http://localhost:3333`

**Project Details:**
- Project ID: `ajcjdayi`
- Dataset: `production`
- API Version: `2024-12-10`

**To add content:**
1. Run `cd townhall && npm run dev`
2. Open http://localhost:3333
3. Create events, blog posts, resources, etc.
4. Content automatically syncs to Eleventy via GROQ queries

##  Documentation

See `/docs` folder for complete planning documentation.
See `/reference` folder for technical analysis and reusable patterns.

##  Contributing

This is a student project for IT373. The project demonstrates:
- Static site generation with Eleventy
- Headless CMS integration with Sanity
- Bauhaus design system implementation
- WCAG 2.1 Level AA accessibility compliance
- SEO best practices
- Performance optimization techniques

---

**Built with love for the Newark community**
