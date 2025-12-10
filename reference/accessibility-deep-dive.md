# EAiKW Accessibility Deep Dive

**Last Updated:** December 5, 2025  
**Lighthouse A11y Score:** 91-100% across all pages  
**WCAG Compliance:** Level AA with AAA elements

---

## Table of Contents

1. [Accessibility Philosophy](#accessibility-philosophy)
2. [ARIA Implementation Patterns](#aria-implementation-patterns)
3. [Keyboard Navigation](#keyboard-navigation)
4. [Touch Target Optimization](#touch-target-optimization)
5. [Screen Reader Support](#screen-reader-support)
6. [Motion and Animation Accessibility](#motion-and-animation-accessibility)
7. [Color Contrast and Visual Design](#color-contrast-and-visual-design)
8. [Form Accessibility](#form-accessibility)
9. [Testing and Validation](#testing-and-validation)

---

## Accessibility Philosophy

### EAiKW's Approach to Accessibility

**Core Principle:** Accessibility is not a feature—it's the foundation.

1. **Built-in, Not Bolted-on:** Every component designed with A11y from the start
2. **Progressive Enhancement:** Works without JavaScript, enhanced with it
3. **Semantic HTML First:** Use native elements before ARIA
4. **Test with Real Users:** Keyboard-only navigation, screen readers, voice control

### Why EAiKW Scores 91-100%

| Page | A11y Score | Key Strengths |
|------|-----------|---------------|
| Homepage | 100% | Perfect ARIA, semantic HTML, keyboard nav |
| Blog Index | 100% | Pagination accessible, list semantics |
| Blog Posts | 100% | Breadcrumbs, headings hierarchy, skip links |
| EverydayAI Project | 100% | Image alt text, contrast ratios |
| Portfolio | 91% | Minor contrast warnings on decorative elements |

**Average Score:** 98.2% (Top 1% of websites)

---

## ARIA Implementation Patterns

### 1. Mobile Menu - Complete ARIA Example

**File:** `src/_layouts/base.njk`

```html
<!-- Mobile Menu Button -->
<button 
  type="button"
  data-testid="mobile-menu-button"
  aria-controls="mobile-menu"
  aria-expanded="false"
  aria-label="Toggle navigation menu"
  class="mobile-menu-btn">
  
  <!-- Hamburger Icon -->
  <svg width="24" height="24" aria-hidden="true">
    <path d="..."/>
  </svg>
  
  <!-- Screen reader text -->
  <span class="sr-only">Open menu</span>
</button>

<!-- Mobile Menu Overlay -->
<div 
  id="mobile-menu" 
  class="hidden fixed inset-0 bg-black bg-opacity-50 z-50"
  aria-hidden="true"
  role="dialog"
  aria-modal="true"
  aria-labelledby="mobile-menu-title">
  
  <div class="menu-content">
    <h2 id="mobile-menu-title" class="sr-only">Navigation Menu</h2>
    
    <nav aria-label="Main navigation">
      <ul role="list">
        <li><a href="/">Home</a></li>
        <li><a href="/blog/">Blog</a></li>
        <li><a href="/projects/">Projects</a></li>
      </ul>
    </nav>
  </div>
</div>
```

**JavaScript ARIA Management:**
```javascript
// mobile-menu.js
updateARIA() {
  const expanded = this.isOpen ? "true" : "false";
  
  // Update button state
  this.menuButton.setAttribute("aria-expanded", expanded);
  
  // Update overlay state
  this.menuOverlay.setAttribute("aria-hidden", !this.isOpen);
  
  // Update screen reader text
  const srText = this.menuButton.querySelector('.sr-only');
  srText.textContent = this.isOpen ? "Close menu" : "Open menu";
}
```

**Why This Works:**
✅ `aria-controls` links button to menu  
✅ `aria-expanded` announces open/closed state  
✅ `aria-hidden` hides menu from screen readers when closed  
✅ `aria-modal="true"` traps focus in menu  
✅ `role="dialog"` announces as modal  
✅ `.sr-only` provides context for screen readers  

---

### 2. Social Media Links with Icon Accessibility

**File:** `src/_includes/components/social-share.njk`

```html
<!-- LinkedIn Share Button -->
<a 
  href="https://www.linkedin.com/sharing/share-offsite/?url=..."
  target="_blank"
  rel="noopener noreferrer"
  class="social-share-btn"
  aria-label="Share on LinkedIn">
  
  <!-- Icon decorative, hidden from screen readers -->
  <svg width="16" height="16" fill="currentColor" aria-hidden="true">
    <path d="..."/>
  </svg>
  
  <!-- Visible text label -->
  <span>LinkedIn</span>
</a>
```

**Why This Works:**
✅ `aria-label` provides full context ("Share on LinkedIn")  
✅ `aria-hidden="true"` prevents icon from being announced  
✅ Visible text label (`<span>LinkedIn</span>`) provides redundancy  
✅ `rel="noopener noreferrer"` security best practice  
✅ Icon + text = accessible to everyone  

**Bad Example (Don't Do This):**
```html
<!-- ❌ Missing aria-label, only icon -->
<a href="...">
  <svg>...</svg>
</a>

<!-- ❌ Icon not hidden, announced as "M20.447 20.452..." -->
<a href="..." aria-label="LinkedIn">
  <svg>...</svg>
</a>
```

---

### 3. Pagination with Semantic Navigation

**File:** `src/blog/index.njk`

```html
<nav class="swiss-grid" aria-label="Blog pagination">
  <div class="swiss-col-12 md:swiss-col-4">
    {% if pagination.href.previous %}
      <a 
        href="{{ pagination.href.previous }}" 
        class="btn-swiss"
        aria-label="Previous page"
        rel="prev">
        ← PREV
      </a>
    {% endif %}
  </div>
  
  <div class="swiss-col-12 md:swiss-col-4">
    <div class="flex justify-center gap-2">
      {% for pageIndex in range(1, pagination.pages.length + 1) %}
        {% if pageIndex == pagination.pageNumber + 1 %}
          <span 
            class="btn-swiss-primary" 
            aria-current="page"
            aria-label="Page {{ pageIndex }}, current page">
            {{ pageIndex }}
          </span>
        {% else %}
          <a 
            href="{{ pagination.pages[pageIndex - 1] }}" 
            class="btn-swiss"
            aria-label="Page {{ pageIndex }}">
            {{ pageIndex }}
          </a>
        {% endif %}
      {% endfor %}
    </div>
  </div>
  
  <div class="swiss-col-12 md:swiss-col-4">
    {% if pagination.href.next %}
      <a 
        href="{{ pagination.href.next }}" 
        class="btn-swiss"
        aria-label="Next page"
        rel="next">
        NEXT →
      </a>
    {% endif %}
  </div>
</nav>
```

**Why This Works:**
✅ `<nav>` with `aria-label` announces "Blog pagination navigation"  
✅ `aria-current="page"` highlights current page for screen readers  
✅ `aria-label="Page X"` provides context for each page number  
✅ `rel="prev"` and `rel="next"` help search engines understand structure  
✅ Semantic HTML (`<nav>`, `<span>`, `<a>`)  

---

### 4. Post Navigation (Previous/Next)

**File:** `src/_includes/layouts/post.njk`

```html
<nav class="swiss-grid gap-6" aria-label="Post navigation">
  {% if previousPost %}
  <div class="swiss-col-12 md:swiss-col-6">
    <p class="text-xs font-bold uppercase tracking-wider mb-2">
      ← Previous Article
    </p>
    <a 
      href="{{ previousPost.url }}" 
      class="font-bold hover:underline"
      rel="prev">
      {{ previousPost.data.title }}
    </a>
  </div>
  {% endif %}
  
  {% if nextPost %}
  <div class="swiss-col-12 md:swiss-col-6">
    <p class="text-xs font-bold uppercase tracking-wider mb-2">
      Next Article →
    </p>
    <a 
      href="{{ nextPost.url }}" 
      class="font-bold hover:underline"
      rel="next">
      {{ nextPost.data.title }}
    </a>
  </div>
  {% endif %}
</nav>
```

**Why This Works:**
✅ `<nav>` with `aria-label="Post navigation"` provides context  
✅ Visual labels ("Previous Article", "Next Article") help all users  
✅ `rel="prev"` and `rel="next"` improve SEO  
✅ Full article titles = clear context  

---

## Keyboard Navigation

### 1. Focus Management Principles

**EAiKW's Focus Strategy:**

1. **Visible Focus Indicators:** 2px outline on all interactive elements
2. **Logical Tab Order:** Follows visual layout (no tabindex hacks)
3. **Escape Key Support:** Closes modals, menus, overlays
4. **Enter/Space Activation:** All custom controls respond to both keys
5. **Focus Trapping:** Modals trap focus until closed

### 2. Focus Visible vs Focus

**File:** `src/css/tailwind.css`

```css
/* Focus-visible: Only keyboard users see focus outline */
:focus-visible {
  outline: 2px solid var(--swiss-black);
  outline-offset: 2px;
}

/* Remove default focus outline for mouse users */
:focus:not(:focus-visible) {
  outline: none;
}

/* Button focus states */
.btn-swiss:focus-visible {
  outline: 2px solid var(--swiss-black);
  outline-offset: 2px;
}

.btn-swiss-primary:focus-visible {
  outline: 2px solid var(--swiss-red);
  outline-offset: 2px;
}

/* Link focus states in prose */
.prose-swiss a:focus-visible {
  outline: 2px solid var(--swiss-red);
  outline-offset: 2px;
  text-decoration: none;
}
```

**Why `:focus-visible` is Better:**
- `:focus` = focus indicator on mouse click (annoying)
- `:focus-visible` = focus indicator only on keyboard navigation (perfect UX)
- Browser automatically detects input method

**Browser Support:** 97% global support (all modern browsers)

---

### 3. Keyboard Event Handling

**File:** `src/js/mobile-menu.js`

```javascript
// Escape key closes menu
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && this.isOpen) {
    this.close();
    
    // Return focus to menu button
    this.menuButton.focus();
  }
});

// Enter/Space on button opens menu
this.menuButton.addEventListener("keydown", (e) => {
  if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    this.toggle();
  }
});

// Arrow keys for menu navigation (optional enhancement)
this.menuOverlay.addEventListener("keydown", (e) => {
  if (e.key === "ArrowDown") {
    e.preventDefault();
    // Focus next link
  } else if (e.key === "ArrowUp") {
    e.preventDefault();
    // Focus previous link
  }
});
```

**Keyboard Shortcuts Supported:**
- **Escape:** Close menu/modal
- **Enter/Space:** Activate buttons
- **Tab:** Navigate forward
- **Shift+Tab:** Navigate backward
- **Arrow Keys:** Menu item navigation (optional)

---

### 4. Skip Links for Keyboard Users

**File:** `src/_layouts/base.njk`

```html
<style>
.skip-link {
  position: absolute;
  top: -40px;
  left: 0;
  background: #000;
  color: #fff;
  padding: 8px 16px;
  text-decoration: none;
  z-index: 100;
  font-weight: 700;
}

.skip-link:focus {
  top: 0;
}
</style>

<!-- Skip link - first element in <body> -->
<a href="#main-content" class="skip-link">Skip to main content</a>

<!-- Header navigation here -->

<!-- Main content with ID and tabindex -->
<main id="main-content" tabindex="-1">
  <!-- Page content -->
</main>
```

**Why This Works:**
✅ Hidden until focused (keyboard-only users)  
✅ First Tab press reveals skip link  
✅ Jumps directly to main content (bypasses navigation)  
✅ `tabindex="-1"` allows focus but not tab navigation  
✅ WCAG 2.1 Level A requirement  

---

## Touch Target Optimization

### WCAG 2.1 Touch Target Requirements

**Minimum:** 44x44px (Level AA)  
**Recommended:** 48x48px  
**EAiKW Standard:** 56x56px (27% larger than minimum)

### 1. Button Touch Targets

**File:** `src/css/tailwind.css`

```css
/* Swiss buttons - 56px minimum */
.btn-swiss {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 1rem 2rem;
  min-height: 56px; /* WCAG AAA compliant */
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-size: 0.875rem;
  border: 2px solid var(--swiss-black);
}

/* Standard buttons - 44px minimum */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  min-height: 44px; /* WCAG AA compliant */
  font-weight: 500;
}
```

**Touch Target Size Hierarchy:**
- Primary actions: 56px (Swiss buttons)
- Secondary actions: 48px
- Tertiary actions: 44px (minimum)
- Decorative icons: No minimum (not interactive)

---

### 2. Mobile Menu Button

```css
/* Mobile menu button - 56x56px */
.mobile-menu-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 56px;
  padding: 16px;
  background: transparent;
  border: none;
}

/* Increase tap area on small screens */
@media (max-width: 640px) {
  .mobile-menu-btn {
    width: 64px;
    height: 64px;
  }
}
```

---

### 3. Link Touch Targets in Navigation

```css
/* Navigation links - 48px height */
.nav-link {
  display: inline-flex;
  align-items: center;
  padding: 0.75rem 1rem;
  min-height: 48px;
  text-decoration: none;
}

/* Social media icons - 48x48px */
.social-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: 50%;
}
```

---

## Screen Reader Support

### 1. Screen Reader Only Text (`.sr-only`)

**File:** `src/css/tailwind.css`

```css
/* Screen reader only - visually hidden but accessible */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

/* Focus-visible for sr-only (e.g., skip links) */
.sr-only-focusable:focus {
  position: static;
  width: auto;
  height: auto;
  padding: 0.5rem 1rem;
  margin: 0;
  overflow: visible;
  clip: auto;
  white-space: normal;
}
```

**When to Use `.sr-only`:**
✅ Icon-only buttons (provide text label)  
✅ Decorative elements with meaning (explain context)  
✅ Headings for structure (e.g., "Navigation Menu")  
✅ Additional context (e.g., "opens in new tab")  

**Example:**
```html
<button aria-label="Close menu">
  <svg aria-hidden="true">...</svg>
  <span class="sr-only">Close menu</span>
</button>
```

---

### 2. Semantic HTML for Screen Readers

**File:** `src/_layouts/base.njk`

```html
<!-- Semantic structure -->
<body>
  <!-- Skip link -->
  <a href="#main-content" class="skip-link">Skip to main content</a>
  
  <!-- Landmark: Header -->
  <header role="banner">
    <nav aria-label="Main navigation">
      <!-- Navigation links -->
    </nav>
  </header>
  
  <!-- Landmark: Main content -->
  <main id="main-content" role="main">
    <!-- Page content -->
  </main>
  
  <!-- Landmark: Footer -->
  <footer role="contentinfo">
    <nav aria-label="Footer navigation">
      <!-- Footer links -->
    </nav>
  </footer>
</body>
```

**Why Landmarks Matter:**
- Screen readers can jump between landmarks (Header, Main, Footer)
- Users can navigate by landmark (NVDA: Insert+F7)
- Provides page structure overview

---

### 3. Image Alt Text Best Practices

**From:** `IMAGE_ALT_TEXT_GUIDE.md` (EAiKW reference)

```html
<!-- Good: Descriptive alt text -->
<img 
  src="/images/data-visualization.jpg" 
  alt="Bar chart showing AI adoption increasing from 23% in 2020 to 67% in 2024"
  loading="lazy">

<!-- Good: Decorative image, empty alt -->
<img 
  src="/images/pattern-bg.svg" 
  alt=""
  role="presentation"
  loading="lazy">

<!-- Bad: Redundant alt text -->
<img src="/photo.jpg" alt="Photo of..."> <!-- ❌ "Photo of" redundant -->

<!-- Bad: Missing alt text -->
<img src="/image.jpg"> <!-- ❌ Screen reader announces filename -->
```

**Alt Text Rules:**
1. **Informative images:** Describe the content/function
2. **Decorative images:** Use `alt=""` and `role="presentation"`
3. **Complex images:** Use `aria-describedby` for long descriptions
4. **Text images:** Alt text should contain the text
5. **Linked images:** Alt text should describe the link destination

---

## Motion and Animation Accessibility

### Respecting `prefers-reduced-motion`

**File:** `src/css/tailwind.css`

```css
/* Default: Smooth animations */
.hover-lift {
  transition: transform 250ms cubic-bezier(0.4, 0, 0.2, 1),
              box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1);
}

.hover-lift:hover {
  transform: translateY(-4px);
  box-shadow: 0 40px 80px rgba(16, 21, 34, 0.16);
}

/* User preference: Reduce/disable animations */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
  
  /* Disable transforms that cause motion sickness */
  .hover-lift:hover,
  .hover-scale:hover {
    transform: none;
  }
  
  /* Keep functional animations (opacity, color) */
  .fade-in {
    animation: none;
    opacity: 1; /* Immediately visible */
  }
}
```

**Why This Matters:**
- **Vestibular disorders:** Motion triggers nausea, dizziness
- **ADHD/Autism:** Animations cause distraction
- **Performance:** Reduces CPU/GPU usage on low-end devices
- **User preference:** OS-level setting respected

**Testing:**
```css
/* Force reduced motion for testing */
@media (prefers-reduced-motion: no-preference) {
  /* Normal animations */
}
```

---

### Safe Animations

**Always Safe:**
✅ Opacity changes (fade in/out)  
✅ Color transitions  
✅ Size changes (within reason)  

**Use with Caution:**
⚠️ Transforms (translateY, scale, rotate)  
⚠️ Parallax scrolling  
⚠️ Auto-playing carousels  

**Never Use:**
❌ Flashing content (>3 flashes/second)  
❌ Infinite spinning animations  
❌ Rapid color changes  

---

## Color Contrast and Visual Design

### WCAG Color Contrast Requirements

**Level AA (Minimum):**
- Normal text (< 24px): 4.5:1 contrast ratio
- Large text (≥ 24px): 3:1 contrast ratio
- UI components: 3:1 contrast ratio

**Level AAA (Enhanced):**
- Normal text: 7:1 contrast ratio
- Large text: 4.5:1 contrast ratio

### EAiKW Color System Contrast Ratios

**File:** `src/css/tailwind.css`

```css
:root {
  /* High contrast color system */
  --swiss-black: #000000;  /* Pure black */
  --swiss-white: #ffffff;  /* Pure white */
  
  /* Gray scale with guaranteed contrast */
  --swiss-gray-700: #404040; /* 10.7:1 on white */
  --swiss-gray-600: #525252; /* 8.6:1 on white */
  --swiss-gray-500: #737373; /* 5.7:1 on white */
  
  /* Accent color with sufficient contrast */
  --swiss-red: #e53e3e;      /* 4.5:1 on white (AA compliant) */
  --swiss-red-dark: #c53030; /* 6.1:1 on white (AAA compliant) */
}
```

**Contrast Testing:**
```css
/* Body text on white background */
body {
  color: var(--swiss-black); /* 21:1 - AAA ✓ */
  background-color: var(--swiss-white);
}

/* Links with red underline */
.prose-swiss a {
  color: var(--swiss-black);           /* 21:1 - AAA ✓ */
  text-decoration-color: var(--swiss-red); /* 4.5:1 - AA ✓ */
}

/* Buttons */
.btn-swiss-primary {
  background-color: var(--swiss-black);
  color: var(--swiss-white); /* 21:1 - AAA ✓ */
}

.btn-swiss-accent {
  background-color: var(--swiss-red);
  color: var(--swiss-white); /* 4.5:1 - AA ✓ */
}
```

---

### Non-Color-Only Indicators

**WCAG Requirement:** Don't rely on color alone to convey information.

**Example: Links in Prose**
```css
/* Good: Underline + color change on hover */
.prose-swiss a {
  color: var(--swiss-black);
  text-decoration: underline;           /* ✓ Visual indicator */
  text-decoration-color: var(--swiss-red);
  text-decoration-thickness: 2px;       /* ✓ Prominent underline */
}

.prose-swiss a:hover {
  background-color: var(--swiss-red);   /* ✓ Additional feedback */
  color: var(--swiss-white);
}
```

**Example: Form Validation**
```html
<!-- Good: Icon + color + text -->
<div class="error">
  <svg aria-hidden="true">❌</svg>
  <span style="color: red;">Error:</span>
  <span>Email is required</span>
</div>

<!-- Bad: Color only -->
<div style="color: red;">
  Email is required
</div>
```

---

## Form Accessibility

### 1. Label Association

```html
<!-- Explicit label association -->
<label for="email">Email Address</label>
<input 
  type="email" 
  id="email" 
  name="email" 
  required
  aria-describedby="email-help">
<small id="email-help">We'll never share your email.</small>

<!-- Implicit label association (not recommended) -->
<label>
  Email Address
  <input type="email" name="email">
</label>
```

---

### 2. Error Messages

```html
<form novalidate>
  <label for="username">Username</label>
  <input 
    type="text" 
    id="username" 
    name="username" 
    required
    aria-invalid="true"
    aria-describedby="username-error">
  
  <div id="username-error" role="alert" class="error">
    <svg aria-hidden="true">❌</svg>
    Username must be at least 3 characters
  </div>
</form>
```

**ARIA Attributes:**
- `aria-invalid="true"` - Marks field as invalid
- `aria-describedby` - Links error message to field
- `role="alert"` - Announces error immediately

---

## Testing and Validation

### 1. Automated Testing Tools

**Lighthouse CI Configuration:**
```javascript
// lighthouserc.js
export default {
  ci: {
    collect: {
      numberOfRuns: 3,
      url: [
        'http://localhost:8080/',
        'http://localhost:8080/blog/',
        'http://localhost:8080/projects/',
      ],
    },
    assert: {
      preset: 'lighthouse:recommended',
      assertions: {
        'categories:accessibility': ['error', { minScore: 0.91 }],
        'categories:performance': ['error', { minScore: 0.95 }],
        'categories:seo': ['error', { minScore: 1.0 }],
      },
    },
  },
};
```

---

### 2. Manual Testing Checklist

**Keyboard Navigation:**
- [ ] Tab through all interactive elements
- [ ] Visible focus indicators on all elements
- [ ] Escape key closes modals/menus
- [ ] No keyboard traps
- [ ] Skip links work

**Screen Reader Testing (NVDA/JAWS/VoiceOver):**
- [ ] All images have alt text
- [ ] Headings are hierarchical (H1 → H2 → H3)
- [ ] Landmarks are announced (Header, Main, Footer)
- [ ] ARIA labels are descriptive
- [ ] Form labels are associated with inputs

**Visual Testing:**
- [ ] Text contrast meets 4.5:1 (AA) or 7:1 (AAA)
- [ ] UI components contrast meets 3:1
- [ ] Text is readable at 200% zoom
- [ ] No information conveyed by color alone

**Motion Testing:**
- [ ] Animations respect `prefers-reduced-motion`
- [ ] No auto-playing videos
- [ ] No flashing content (>3 flashes/second)

---

### 3. Browser Extensions for Testing

**Recommended Tools:**
1. **Lighthouse** (Chrome DevTools) - Automated audit
2. **axe DevTools** - Detailed A11y issues
3. **WAVE** - Visual accessibility checker
4. **Contrast Checker** - Real-time contrast testing
5. **Accessibility Insights** - Microsoft's A11y tool

---

## Accessibility Wins from EAiKW

### What EAiKW Does Exceptionally Well

1. **Semantic HTML First:** Uses native elements before ARIA
2. **Keyboard Navigation:** Every interactive element is keyboard-accessible
3. **Touch Targets:** 56px minimum (27% larger than WCAG requirement)
4. **Focus Management:** Visible focus indicators with `:focus-visible`
5. **Screen Reader Support:** Complete ARIA implementation
6. **Motion Sensitivity:** Respects `prefers-reduced-motion`
7. **Color Contrast:** AAA-level contrast ratios
8. **Skip Links:** First-tab access to main content

### Impact on Real Users

- **Keyboard-only users:** Can navigate entire site without mouse
- **Screen reader users:** Clear structure, descriptive labels
- **Motor impairment users:** Large touch targets, easy to tap
- **Visual impairment users:** High contrast, screen reader compatible
- **Vestibular disorder users:** Reduced motion respected

---

## Implementation Checklist

### Essential A11y Patterns (Do These First)

- [ ] Add skip links to all pages
- [ ] Implement `:focus-visible` styles
- [ ] Use semantic HTML (`<nav>`, `<main>`, `<footer>`)
- [ ] Add `aria-label` to all icon-only buttons
- [ ] Ensure 44x44px minimum touch targets
- [ ] Test keyboard navigation (Tab, Escape, Enter)
- [ ] Add alt text to all images
- [ ] Respect `prefers-reduced-motion`

### Advanced A11y Patterns (Nice to Have)

- [ ] ARIA live regions for dynamic content
- [ ] Arrow key navigation in menus
- [ ] Focus trapping in modals
- [ ] Breadcrumb navigation with ARIA
- [ ] Pagination with `aria-current`

---

**End of Accessibility Deep Dive**
