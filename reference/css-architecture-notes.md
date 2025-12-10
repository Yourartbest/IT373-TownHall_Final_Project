# CSS Architecture Analysis - eaikw Project

**Source:** `tailwind.css`, `tailwind.config.js`, `postcss.config.js`  
**Date Analyzed:** December 5, 2025  
**CSS Strategy:** Utility-First with Custom Properties

---

## Architecture Overview

The eaikw project uses a **hybrid CSS architecture**:
1. **Tailwind CSS** - Utility-first foundation (~30KB minified)
2. **Custom Properties** - Design tokens for consistency
3. **Component Classes** - Reusable patterns in `@layer components`
4. **Modern CSS Features** - Fluid typography, container queries, P3 colors

**Result:** Lighthouse CSS budget: 30KB (passing with 100% score)

---

## File Structure

```
src/css/
├── tailwind.css        # Main stylesheet (1,079 lines)
└── print.css           # Print-specific styles (separate)

Project Root:
├── tailwind.config.js  # Tailwind configuration
└── postcss.config.js   # PostCSS pipeline
```

---

## PostCSS Pipeline

### Configuration (`postcss.config.js`)
```javascript
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {}
  }
};
```

**Simple But Effective:**
- Tailwind processes utilities
- Autoprefixer adds vendor prefixes
- No complex transformations (keeps builds fast)

---

## Tailwind Configuration Deep Dive

### Content Detection (PurgeCSS)
```javascript
content: [
  "./src/**/*.{html,njk,md}", 
  "./src/_layouts/**/*.njk", 
  "./src/_data/**/*.js"
]
```

**Why This Matters:**
- Scans templates for class names
- Removes unused utilities
- Reduces CSS from ~3MB to ~30KB

**Best Practice:** Include all files that contain Tailwind classes

### Safelist (Classes Always Kept)
```javascript
safelist: ["sticky", "top-0", "z-50"]
```

**Use Case:** Classes added dynamically via JavaScript

---

## Custom Color System

### Primary Colors (Blue Scale)
```javascript
primary: {
  50: "#eff6ff",
  100: "#dbeafe",
  200: "#bfdbfe",
  300: "#93c5fd",
  400: "#60a5fa",
  500: "#3b82f6",  // Base blue
  600: "#2563eb",  // Most commonly used
  700: "#1d4ed8",
  800: "#1e40af",
  900: "#1e3a8a"
}
```

**Usage:** `bg-primary-600`, `text-primary-500`

### Neutral Colors (Gray Scale)
```javascript
neutral: {
  50: "#fafafa",   // Lightest gray
  100: "#f5f5f5",
  200: "#e5e5e5",
  300: "#d4d4d4",
  400: "#a3a3a3",
  500: "#737373",  // Mid-gray
  600: "#525252",
  700: "#404040",
  800: "#262626",
  900: "#171717"   // Almost black
}
```

**Strategy:** Neutral palette for backgrounds, borders, text

---

## Typography System

### Font Families
```javascript
fontFamily: {
  sans: ["Inter", "system-ui", "-apple-system", "sans-serif"],
  mono: ["Fira Code", "monospace"]
}
```

**Fallback Chain:**
1. Inter (web font)
2. system-ui (native UI font)
3. -apple-system (iOS/macOS)
4. sans-serif (ultimate fallback)

### Tailwind Typography Plugin
```javascript
typography: (theme) => ({
  DEFAULT: {
    css: {
      color: theme("colors.neutral.900"),
      a: {
        color: theme("colors.primary.600"),
        "&:hover": {
          color: theme("colors.primary.700")
        }
      },
      h1: {
        fontWeight: "700",
        letterSpacing: "-0.025em"
      },
      h2: {
        fontWeight: "600",
        letterSpacing: "-0.025em"
      },
      h3: {
        fontWeight: "600"
      },
      code: {
        color: theme("colors.primary.600"),
        backgroundColor: theme("colors.neutral.100"),
        padding: "0.25rem 0.375rem",
        borderRadius: "0.25rem",
        fontWeight: "500"
      },
      "code::before": {
        content: '""'  // Removes default backticks
      },
      "code::after": {
        content: '""'
      }
    }
  }
})
```

**Usage:** Add `prose` class to Markdown content
```html
<article class="prose">
  {{ content | safe }}
</article>
```

**Benefits:**
- Beautiful typography out of the box
- Consistent styling for Markdown
- Customized to match brand colors

---

## Custom Spacing System

### Extended Spacing Values
```javascript
spacing: {
  128: "32rem",  // 512px
  144: "36rem"   // 576px
}
```

**Use Case:** Large hero sections, spacious layouts

### Max Width Extension
```javascript
maxWidth: {
  "8xl": "88rem"  // 1408px
}
```

**Standard Tailwind Stops at 7xl (80rem)**

---

## Tailwind Plugins Used

### 1. Typography Plugin
```javascript
require("@tailwindcss/typography")
```

**Purpose:** Beautiful prose styles for blog posts

### 2. Headless UI Plugin
```javascript
require("@headlessui/tailwindcss")
```

**Purpose:** Styles for accessible UI components (modals, dropdowns)

### 3. Container Queries Plugin
```javascript
require("@tailwindcss/container-queries")
```

**Purpose:** Component-based responsive design
```html
<div class="@container">
  <div class="@lg:grid-cols-2">
    <!-- Responds to container, not viewport -->
  </div>
</div>
```

---

## Custom CSS Properties (Design Tokens)

### Swiss Grid System
```css
:root {
  --swiss-grid-columns: 12;
  --swiss-grid-gutter: 1.5rem;
  --swiss-grid-margin: clamp(1.5rem, 5vw, 4rem);
  --swiss-column-width: calc(
    (100% - (var(--swiss-grid-gutter) * (var(--swiss-grid-columns) - 1))) /
    var(--swiss-grid-columns)
  );
}
```

**Mathematical Grid:** Precise column calculations

### Spacing Scale
```css
:root {
  --space-xs: 0.25rem;   /* 4px */
  --space-sm: 0.5rem;    /* 8px */
  --space-md: 0.75rem;   /* 12px */
  --space-lg: 1rem;      /* 16px */
  --space-xl: 1.5rem;    /* 24px */
  --space-2xl: 2rem;     /* 32px */
  --space-3xl: 2.5rem;   /* 40px */
  --space-4xl: 3rem;     /* 48px */
  --space-5xl: 4rem;     /* 64px */
}
```

**T-shirt sizing:** Easy to remember, scales consistently

### Fluid Spacing (Responsive)
```css
:root {
  --swiss-section-inline: clamp(1rem, 3vw, 3rem);
  --swiss-section-block: clamp(4rem, 8vw, 8rem);
  --swiss-container-padding: clamp(1rem, 4vw, 2rem);
}
```

**Benefits:**
- Automatic responsive scaling
- No media queries needed
- Smooth transitions between breakpoints

---

## Fluid Typography System

### Clamp-Based Scaling
```css
:root {
  --fluid-display: clamp(2rem, 6vw + 1rem, 3.5rem);      /* 32-56px */
  --fluid-h1: clamp(1.75rem, 5vw + 0.5rem, 3rem);        /* 28-48px */
  --fluid-h2: clamp(1.5rem, 4vw + 0.5rem, 2.25rem);      /* 24-36px */
  --fluid-h3: clamp(1.25rem, 3vw + 0.5rem, 1.75rem);     /* 20-28px */
  --fluid-h4: clamp(1.125rem, 2vw + 0.25rem, 1.375rem);  /* 18-22px */
  --fluid-body-lg: clamp(1.125rem, 1vw + 0.5rem, 1.25rem);
  --fluid-body: clamp(1rem, 0.5vw + 0.75rem, 1.125rem);
  --fluid-body-sm: clamp(0.875rem, 0.5vw + 0.5rem, 1rem);
  --fluid-caption: clamp(0.75rem, 0.5vw + 0.25rem, 0.875rem);
}
```

**How Clamp Works:**
```
clamp(MIN, PREFERRED, MAX)
clamp(20px, 5vw, 40px)
```
- **Small screens:** 20px
- **Medium screens:** 5% of viewport width
- **Large screens:** 40px (capped)

**Benefits:**
- No media queries for font sizes
- Smooth scaling on all devices
- Better readability across breakpoints

---

## Color System

### Core Colors (Swiss Design)
```css
:root {
  --swiss-black: #000000;
  --swiss-white: #ffffff;
  --swiss-red: #ff0000;
  --swiss-gray-100: #f5f5f5;
  --swiss-gray-200: #e5e5e5;
  --swiss-gray-300: #d4d4d4;
  --swiss-gray-400: #a3a3a3;
  --swiss-gray-500: #737373;
  --swiss-gray-600: #525252;
  --swiss-gray-700: #404040;
  --swiss-gray-800: #262626;
  --swiss-gray-900: #171717;
}
```

**Minimalist Palette:** Pure black, white, red, grayscale

---

## Component Layer (Custom Classes)

### Swiss Grid Container
```css
@layer components {
  .swiss-grid {
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    gap: var(--swiss-grid-gutter);
    padding-left: var(--swiss-grid-margin);
    padding-right: var(--swiss-grid-margin);
    max-width: 1440px;
    margin-left: auto;
    margin-right: auto;
  }
}
```

**Usage:** `<div class="swiss-grid">`

### Column Spans
```css
.swiss-col-1 { grid-column: span 1; }
.swiss-col-2 { grid-column: span 2; }
/* ... */
.swiss-col-12 { grid-column: span 12; }
```

**Responsive Behavior:**
```css
@media (max-width: 768px) {
  .swiss-grid {
    grid-template-columns: repeat(4, 1fr);
  }
  
  .swiss-col-1, .swiss-col-2, /* ... */, .swiss-col-12 {
    grid-column: span 4;  /* Full width on mobile */
  }
}
```

---

## Button Components

### Primary Button
```css
.btn-swiss {
  @apply inline-flex items-center justify-center gap-2 
         px-8 py-4 min-h-[56px] 
         font-bold uppercase tracking-wider text-sm 
         border-2 transition-all duration-200;
  
  border-color: var(--swiss-black);
  background-color: var(--swiss-white);
  color: var(--swiss-black);
  text-decoration: none;
}

.btn-swiss:hover {
  background-color: var(--swiss-black);
  color: var(--swiss-white);
}

.btn-swiss:focus-visible {
  outline: 2px solid var(--swiss-black);
  outline-offset: 2px;
}
```

**Key Features:**
- 56px minimum height (touch-friendly)
- Bold uppercase text (Swiss style)
- Smooth transitions
- Accessible focus states

### Variations
```css
.btn-swiss-primary   /* Black background */
.btn-swiss-accent    /* Red background */
```

**All Buttons Share:**
- Consistent sizing
- Keyboard navigation
- Hover effects
- Focus indicators

---

## Advanced CSS Features

### Wide Color Gamut (P3)
```css
@media (color-gamut: p3) {
  :root {
    --color-primary-p3: color(display-p3 0.231 0.51 0.961);
    --color-accent-p3: color(display-p3 0.961 0.62 0.043);
  }
}
```

**Benefit:** Richer colors on modern displays (iPhone, MacBook Pro)

### HDR Support
```css
@media (dynamic-range: high) {
  :root {
    --color-primary-hdr: color(display-p3 0.25 0.55 1);
  }
  
  img, video {
    filter: contrast(1.05) brightness(1.02);
  }
}
```

**Progressive Enhancement:** Better visuals on capable hardware

---

## View Transitions API

```css
@supports (view-transition-name: none) {
  ::view-transition-old(root),
  ::view-transition-new(root) {
    animation-duration: 0.3s;
    animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  }
  
  ::view-transition-new(root) {
    animation-name: slide-from-bottom;
  }
  
  @keyframes slide-from-bottom {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
}
```

**Modern Navigation:** Smooth page transitions (Chrome, Edge)

---

## Build Process

### Development Build
```bash
npm run watch:css
# Watches for changes, includes sourcemaps
```

### Production Build
```bash
npm run build:css:prod
# NODE_ENV=production
# Enables PurgeCSS
# Minifies output
# Removes unused utilities
```

**Output Size:**
- Development: ~3MB (all utilities)
- Production: ~30KB (only used classes)

---

## Performance Optimizations

### 1. **Critical CSS Inline** (in `<head>`)
```html
<link rel="preload" href="/css/main.css" as="style">
<link rel="stylesheet" href="/css/main.css">
```

### 2. **Print Styles Separate**
```html
<link rel="stylesheet" href="/css/print.css" media="print">
```

**Benefit:** Print styles don't block screen rendering

### 3. **Font Loading Strategy**
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="preload" href="https://fonts.googleapis.com/css2?family=Inter..." as="style">
<link href="https://fonts..." rel="stylesheet" media="print" onload="this.media='all'">
<noscript><link href="https://fonts..." rel="stylesheet"></noscript>
```

**Strategy:**
1. Preconnect to font CDN
2. Preload font CSS
3. Load async (media="print" trick)
4. Switch to "all" after load
5. Fallback for no-JS

---

## Accessibility Features in CSS

### Focus Indicators
```css
.btn-swiss:focus-visible {
  outline: 2px solid var(--swiss-black);
  outline-offset: 2px;
}
```

**Uses `:focus-visible`** - Only shows on keyboard navigation

### Color Contrast
All colors tested for WCAG AA compliance:
- Text on white: minimum 4.5:1 ratio
- Large text: minimum 3:1 ratio

### Touch Targets
```css
min-h-[56px]  /* 56px = WCAG AAA minimum */
```

---

## Key Takeaways for Your Project

### ✅ Adopt These Patterns:
1. **Fluid typography with clamp()** - No media queries needed
2. **Custom properties for design tokens** - Easy theming
3. **@layer components** - Organized custom classes
4. **PurgeCSS via Tailwind** - Tiny production builds
5. **Async font loading** - Better performance

### ✅ Performance Wins:
- 30KB CSS (vs 100KB+ average)
- Inline critical CSS
- Separate print styles
- Preconnect to CDNs

### ⚠️ Don't Copy:
- Swiss-specific design tokens (unless you want that aesthetic)
- Specific color values
- Grid system (use Tailwind's built-in grid instead)

### 🎨 Customize:
- Color palette to match your brand
- Typography scale for your content
- Component styles for your design

---

## File Size Comparison

**Before Optimization:**
- Full Tailwind: ~3.5MB
- With all plugins: ~4MB

**After PurgeCSS:**
- Production CSS: 30KB
- Gzipped: ~8KB

**Industry Average:** 100-150KB

**Result:** 80% smaller than average
