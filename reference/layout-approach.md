# Layout Approach Analysis - eaikw Project

**Source:** Nunjucks templates, CSS grid system, component architecture  
**Date Analyzed:** December 5, 2025  
**Layout Philosophy:** Swiss Design Principles + Modern CSS

---

## Layout Philosophy

The eaikw project uses a **systematic layout approach** based on:
1. **Swiss Grid System** - 12-column mathematical precision
2. **Component-Based Architecture** - Reusable layout patterns
3. **Responsive-First** - Mobile to desktop progression
4. **Semantic HTML** - Proper document structure

---

## Template Hierarchy

### Base Layout (`base.njk`)

**Master template** that all pages extend:

```njk
<!DOCTYPE html>
<html lang="en" class="scroll-smooth">
<head>
  <!-- Meta tags, styles, etc. -->
</head>
<body class="font-sans antialiased text-neutral-900 bg-white min-h-screen flex flex-col">
  <header><!-- Sticky navigation --></header>
  
  <main class="flex-1">
    {% block content %}{% endblock %}
  </main>
  
  <footer><!-- Site footer --></footer>
  
  <script src="/js/..."></script>
</body>
</html>
```

**Key Features:**
- `min-h-screen flex flex-col`: Full-height sticky footer
- `flex-1` on main: Content takes available space
- `scroll-smooth`: Smooth anchor scrolling

---

### Layout Layers

```
base.njk (Master)
├── post.njk (Blog posts)
├── project.njk (Portfolio items)
└── page.njk (Static pages)
```

**Inheritance Pattern:**
```njk
{% extends "layouts/base.njk" %}

{% block content %}
  <!-- Page-specific layout -->
{% endblock %}
```

---

## Swiss Grid System

### 12-Column Grid Implementation

```css
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
```

**Design Tokens:**
```css
:root {
  --swiss-grid-columns: 12;
  --swiss-grid-gutter: 1.5rem;     /* 24px between columns */
  --swiss-grid-margin: clamp(1.5rem, 5vw, 4rem);  /* Responsive side margins */
}
```

### Column Span Classes

```css
.swiss-col-1  { grid-column: span 1; }
.swiss-col-2  { grid-column: span 2; }
.swiss-col-3  { grid-column: span 3; }
.swiss-col-4  { grid-column: span 4; }
.swiss-col-5  { grid-column: span 5; }
.swiss-col-6  { grid-column: span 6; }
.swiss-col-7  { grid-column: span 7; }
.swiss-col-8  { grid-column: span 8; }
.swiss-col-9  { grid-column: span 9; }
.swiss-col-10 { grid-column: span 10; }
.swiss-col-11 { grid-column: span 11; }
.swiss-col-12 { grid-column: span 12; }
```

**Usage Example:**
```html
<div class="swiss-grid">
  <div class="swiss-col-8"><!-- Main content (8 columns) --></div>
  <div class="swiss-col-4"><!-- Sidebar (4 columns) --></div>
</div>
```

---

## Responsive Grid Strategy

### Mobile-First Breakpoint
```css
@media (max-width: 768px) {
  .swiss-grid {
    grid-template-columns: repeat(4, 1fr);  /* 4 columns on mobile */
  }
  
  /* All column spans become full width */
  .swiss-col-1, .swiss-col-2, /* ... */, .swiss-col-12 {
    grid-column: span 4;
  }
}
```

**Strategy:**
- Desktop: 12 columns
- Mobile: 4 columns (or full width)
- No intermediate breakpoints needed

---

## Asymmetric Layouts (Swiss Design)

### Hero Layout (5:7 Ratio)
```css
.swiss-asymmetric-hero {
  display: grid;
  grid-template-columns: 5fr 7fr;
  gap: var(--space-4xl);
}

@media (max-width: 768px) {
  .swiss-asymmetric-hero {
    grid-template-columns: 1fr;  /* Stack on mobile */
  }
}
```

**Visual Balance:**
```
┌─────────────┬───────────────────┐
│             │                   │
│   5 parts   │     7 parts       │
│             │                   │
└─────────────┴───────────────────┘
```

### Content Layout (7:5 Ratio)
```css
.swiss-asymmetric-content {
  display: grid;
  grid-template-columns: 7fr 5fr;
  gap: var(--space-3xl);
}
```

**Use Case:** Main content (7) + Sidebar (5)

---

## Container System

### Max-Width Container
```css
max-width: 1440px;
margin-left: auto;
margin-right: auto;
```

**Centered Content:** All layouts contained within 1440px

### Fluid Margins
```css
--swiss-grid-margin: clamp(1.5rem, 5vw, 4rem);
```

**Responsive Padding:**
- Small screens: 1.5rem (24px)
- Medium screens: 5% of viewport
- Large screens: 4rem (64px)

---

## Page Layout Patterns

### Homepage Layout

```html
<main>
  <!-- Hero Section: Full width, centered -->
  <section class="swiss-grid">
    <div class="swiss-col-12">
      <h1>Hero Title</h1>
    </div>
  </section>
  
  <!-- Featured Content: 3-column grid -->
  <section class="swiss-grid">
    <div class="swiss-col-4">Card 1</div>
    <div class="swiss-col-4">Card 2</div>
    <div class="swiss-col-4">Card 3</div>
  </section>
  
  <!-- Two-column Section: 8+4 -->
  <section class="swiss-grid">
    <div class="swiss-col-8">Main content</div>
    <div class="swiss-col-4">Sidebar</div>
  </section>
</main>
```

---

### Blog Post Layout

```html
<main>
  <!-- Post Header: Centered, narrow -->
  <header class="swiss-grid">
    <div class="swiss-col-8" style="grid-column: 3 / 11;">
      <h1>{{ title }}</h1>
      <time>{{ date }}</time>
    </div>
  </header>
  
  <!-- Post Content: Prose width -->
  <article class="swiss-grid">
    <div class="swiss-col-8 prose" style="grid-column: 3 / 11;">
      {{ content | safe }}
    </div>
  </article>
  
  <!-- Related Posts: Full width -->
  <aside class="swiss-grid">
    <div class="swiss-col-12">
      <h2>Related Posts</h2>
      <!-- Post cards -->
    </div>
  </aside>
</main>
```

**Centered Content Strategy:**
- `grid-column: 3 / 11` = Columns 3-10 (8 columns centered)
- Creates visual focus on content
- Better readability (65-75 characters per line)

---

### Project Detail Layout

```html
<main>
  <!-- Project Hero: Asymmetric -->
  <section class="swiss-asymmetric-hero">
    <div>
      <h1>{{ title }}</h1>
      <p>{{ description }}</p>
    </div>
    <div>
      <img src="{{ image }}" alt="{{ title }}">
    </div>
  </section>
  
  <!-- Project Details: 2-column -->
  <section class="swiss-grid">
    <div class="swiss-col-7">
      <!-- Main project description -->
    </div>
    <div class="swiss-col-5">
      <!-- Tech stack, links, metadata -->
    </div>
  </section>
  
  <!-- Full-width Gallery -->
  <section class="swiss-grid">
    <div class="swiss-col-12">
      <!-- Image gallery -->
    </div>
  </section>
</main>
```

---

## Header Layout

### Sticky Navigation
```html
<header class="sticky top-0 z-50" 
        style="background-color: var(--swiss-white); 
               border-bottom: 3px solid var(--swiss-black);">
  <nav style="max-width: 1440px; margin: 0 auto; padding: 0 1rem;">
    <div class="flex items-center justify-between" style="height: 64px;">
      <!-- Logo -->
      <a href="/">Logo</a>
      
      <!-- Desktop Nav -->
      <ul class="hidden lg:flex items-center gap-8">
        <li><a href="/">Home</a></li>
        <li><a href="/blog/">Blog</a></li>
        <!-- ... -->
      </ul>
      
      <!-- Mobile Toggle -->
      <button class="lg:hidden">☰</button>
    </div>
  </nav>
</header>
```

**Key Features:**
- `sticky top-0 z-50`: Always visible
- `height: 64px`: Consistent header height
- `flex justify-between`: Logo left, nav right
- `hidden lg:flex`: Responsive visibility

---

## Footer Layout

### Multi-Column Footer
```html
<footer style="background-color: var(--swiss-black); 
               color: var(--swiss-white);">
  <div class="swiss-grid" style="padding-top: var(--space-5xl); 
                                  padding-bottom: var(--space-5xl);">
    <!-- About Column -->
    <div class="swiss-col-4">
      <h3>About</h3>
      <p>{{ site.description }}</p>
    </div>
    
    <!-- Links Column -->
    <div class="swiss-col-4">
      <h3>Quick Links</h3>
      <ul>
        <li><a href="/blog/">Blog</a></li>
        <!-- ... -->
      </ul>
    </div>
    
    <!-- Social Column -->
    <div class="swiss-col-4">
      <h3>Connect</h3>
      <!-- Social icons -->
    </div>
  </div>
  
  <!-- Copyright Bar -->
  <div class="swiss-grid" style="border-top: 1px solid rgba(255,255,255,0.1);">
    <div class="swiss-col-12">
      <p>© {{ currentYear }} {{ site.title }}</p>
    </div>
  </div>
</footer>
```

**Responsive Footer:**
```css
@media (max-width: 768px) {
  /* Columns stack vertically */
  .swiss-col-4 {
    grid-column: span 4;  /* Full width */
  }
}
```

---

## Card Layouts

### Blog Post Cards
```html
<article class="swiss-col-4" style="border: 2px solid var(--swiss-black);">
  <img src="{{ image }}" alt="{{ title }}">
  
  <div style="padding: var(--space-xl);">
    <time>{{ date | dateFormat }}</time>
    <h3>{{ title }}</h3>
    <p>{{ excerpt }}</p>
    <a href="{{ url }}">Read More →</a>
  </div>
</article>
```

**3-Column Grid:**
```html
<div class="swiss-grid">
  <article class="swiss-col-4">Post 1</article>
  <article class="swiss-col-4">Post 2</article>
  <article class="swiss-col-4">Post 3</article>
</div>
```

**Mobile Stacking:** Each card takes full width

---

## Spacing System

### Section Spacing
```css
:root {
  --swiss-section-block: clamp(4rem, 8vw, 8rem);  /* Vertical */
  --swiss-section-inline: clamp(1rem, 3vw, 3rem); /* Horizontal */
}
```

**Usage:**
```html
<section style="padding-top: var(--swiss-section-block); 
                 padding-bottom: var(--swiss-section-block);">
  <!-- Content -->
</section>
```

### Component Spacing
```css
:root {
  --space-xs: 0.25rem;  /* 4px */
  --space-sm: 0.5rem;   /* 8px */
  --space-md: 0.75rem;  /* 12px */
  --space-lg: 1rem;     /* 16px */
  --space-xl: 1.5rem;   /* 24px */
  --space-2xl: 2rem;    /* 32px */
  --space-3xl: 2.5rem;  /* 40px */
  --space-4xl: 3rem;    /* 48px */
  --space-5xl: 4rem;    /* 64px */
}
```

**T-shirt Sizing:** Easy to remember and consistent

---

## Mobile Menu Layout

### Overlay Menu
```html
<div id="mobile-menu" class="hidden lg:hidden fixed inset-0 z-50">
  <!-- Semi-transparent backdrop -->
  <div style="background-color: rgba(0,0,0,0.8); 
              position: absolute; 
              inset: 0;">
  </div>
  
  <!-- Menu Panel -->
  <nav style="position: absolute; 
              right: 0; 
              top: 0; 
              bottom: 0;
              width: 80vw;
              max-width: 400px;
              background-color: var(--swiss-white);
              padding: var(--space-4xl);">
    <ul>
      <li><a href="/">Home</a></li>
      <li><a href="/blog/">Blog</a></li>
      <!-- ... -->
    </ul>
  </nav>
</div>
```

**Layout Features:**
- `fixed inset-0`: Full screen overlay
- `right: 0`: Slides in from right
- `width: 80vw; max-width: 400px`: Responsive width
- `z-50`: Above all content

---

## Content Width Strategy

### Prose (Reading) Width
```css
.prose {
  max-width: 65ch;  /* 65 characters wide */
}
```

**Optimal Line Length:**
- 45-75 characters per line
- Better readability
- Reduces eye strain

### Full-Width Elements
```html
<figure class="swiss-col-12">
  <img src="wide-image.jpg" alt="Full width image">
</figure>
```

**Breakout Layouts:** Images can span full grid

---

## Flexbox Patterns

### Centered Content
```css
.centered {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 50vh;
}
```

### Space Between
```css
.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
```

### Equal Height Cards
```css
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--space-3xl);
}
```

**Auto-fit:** Responsive without media queries

---

## Sticky Elements

### Sticky Navigation
```css
header {
  position: sticky;
  top: 0;
  z-index: 50;
}
```

### Sticky Sidebar (Desktop Only)
```css
@media (min-width: 1024px) {
  .sidebar {
    position: sticky;
    top: 80px;  /* Below header */
    max-height: calc(100vh - 80px);
    overflow-y: auto;
  }
}
```

---

## Z-Index Layers

### Stacking Context Hierarchy
```css
:root {
  --z-base: 0;
  --z-content: 10;
  --z-header: 50;
  --z-overlay: 100;
  --z-modal: 200;
}
```

**Usage:**
```css
.header { z-index: var(--z-header); }
.mobile-menu { z-index: var(--z-overlay); }
```

---

## Print Layout

### Print-Specific Styles (`print.css`)
```css
@media print {
  /* Hide navigation */
  header, footer, .no-print {
    display: none;
  }
  
  /* Single column */
  .swiss-grid {
    display: block;
  }
  
  /* Expand links */
  a[href]:after {
    content: " (" attr(href) ")";
  }
  
  /* Page breaks */
  article {
    page-break-after: always;
  }
}
```

---

## Component Architecture

### Reusable Layout Components

**In `_includes/components/`:**
```
components/
├── card.njk           # Card layout
├── hero.njk           # Hero section
├── section.njk        # Generic section wrapper
├── grid-item.njk      # Grid item wrapper
└── social-share.njk   # Social sharing buttons
```

**Component Example:**
```njk
{# components/card.njk #}
<article class="swiss-col-{{ span or 4 }}" 
         style="border: 2px solid var(--swiss-black);">
  <div style="padding: var(--space-xl);">
    {% block cardContent %}{% endblock %}
  </div>
</article>
```

**Usage:**
```njk
{% include "components/card.njk" %}
  {% block cardContent %}
    <h3>{{ title }}</h3>
    <p>{{ description }}</p>
  {% endblock %}
{% endinclude %}
```

---

## Layout Best Practices

### ✅ What Works Well

1. **Swiss Grid System**
   - Mathematical precision
   - Consistent spacing
   - Responsive without complex media queries

2. **Component Reusability**
   - DRY principle
   - Easy maintenance
   - Consistent patterns

3. **Fluid Typography & Spacing**
   - Clamp() for responsiveness
   - Smooth transitions
   - No breakpoint jumps

4. **Semantic Structure**
   - Proper landmarks
   - Heading hierarchy
   - Accessible markup

5. **Sticky Header**
   - Always accessible navigation
   - Small footprint (64px)
   - Clean visual design

---

## Layout Anti-Patterns Avoided

### ❌ What This Project Doesn't Do

1. **No Complex Media Queries**
   - Uses fluid design tokens instead
   - Clamp() handles most responsiveness

2. **No Absolute Positioning**
   - Relies on Grid/Flexbox
   - More maintainable layouts

3. **No Fixed Heights**
   - Content determines height
   - Prevents overflow issues

4. **No Inline Styles** (Mostly)
   - CSS classes preferred
   - Style tags only for dynamic values

---

## Key Takeaways for Your Project

### ✅ Adopt These Patterns:

1. **Grid System**
   - 12-column for flexibility
   - Mobile-first responsive
   - Use CSS Grid (not floats)

2. **Fluid Spacing**
   - Clamp() for margins/padding
   - CSS custom properties
   - T-shirt sizing (xs, sm, md, lg, xl)

3. **Component Architecture**
   - Reusable templates
   - Block/extends pattern
   - Consistent naming

4. **Semantic HTML**
   - header, main, footer
   - article, section, aside
   - Proper heading hierarchy

5. **Sticky Navigation**
   - Always accessible
   - Small footprint
   - Mobile-friendly

### ⚠️ Customize to Your Needs:

- **Column ratios** - Adjust to your content
- **Max width** - 1440px may be too wide/narrow
- **Grid gaps** - Adjust spacing to your taste
- **Breakpoints** - Add more if needed

### 🚫 Don't Copy:

- Swiss-specific design elements
- Exact spacing values (unless they fit)
- Color scheme

---

## Layout Performance

**Impact on Performance:**
- ✅ CSS Grid is fast
- ✅ No JavaScript for layout
- ✅ Minimal CSS (grid classes are small)
- ✅ Responsive without excess media queries

**Result:** Layout doesn't slow down the site
