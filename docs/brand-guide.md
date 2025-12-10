# Brand Guide
# Newark AI Town Hall - Bauhaus Design Style Guide

## Design Philosophy

This website embraces **Bauhaus design principles** — a modernist movement that emphasizes functionality, geometric forms, and the harmonious integration of art and technology. Our design system features:

- **Functionalist aesthetics** - Form follows function
- **Geometric shapes** - Circles, squares, and triangles as core visual elements
- **Primary color palette** - Bold use of red, blue, and yellow
- **Bold typography** - Strong, uppercase letterforms with tight tracking
- **Asymmetric composition** - Dynamic layouts that guide the eye
- **Minimalism** - No unnecessary ornamentation

---

## Color Palette

### Primary Colors

The Bauhaus movement is famous for its use of primary colors. Our palette reflects this heritage:

| Color Name | Hex Code | Usage |
|------------|----------|-------|
| **Bauhaus Red** | `#E63946` | Primary CTAs, accent elements, hover states |
| **Bauhaus Blue** | `#1D3557` | Backgrounds, navigation, secondary buttons |
| **Bauhaus Yellow** | `#F1C40F` | Highlights, tertiary buttons, decorative accents |
| **Light Blue** | `#457B9D` | Supporting color for tags and accents |

### Neutral Colors

| Color Name | Hex Code | Usage |
|------------|----------|-------|
| **Black** | `#000000` | Text, borders, structural elements |
| **White** | `#FFFFFF` | Backgrounds, text on dark backgrounds |
| **Gray 100** | `#F5F5F5` | Light backgrounds, section dividers |
| **Gray 200** | `#E0E0E0` | Subtle borders, dividers |
| **Gray 300** | `#CCCCCC` | Disabled states |
| **Gray 600** | `#666666` | Secondary text |
| **Gray 900** | `#1A1A1A` | Dark text alternatives |

### Color Applications

```css
/* Hero backgrounds */
background: #1D3557; /* Bauhaus Blue */

/* Primary CTA buttons */
background: #E63946; /* Bauhaus Red */

/* Highlight accents */
background: #F1C40F; /* Bauhaus Yellow */

/* Text */
color: #000000; /* Black */
```

---

## Typography

### Font Family

**Primary Typeface:** Inter

**Fallback Stack:**
```css
font-family: 'Inter', 'Futura', 'Helvetica Neue', Helvetica, Arial, sans-serif;
```

Inter is a modern, geometric sans-serif that echoes the spirit of classic Bauhaus typefaces like Futura while maintaining excellent screen readability.

### Type Scale

| Element | Size (Desktop) | Size (Mobile) | Weight | Line Height | Letter Spacing |
|---------|---------------|---------------|---------|-------------|----------------|
| **H1** | 3.5rem (56px) | 2.25rem (36px) | 700-900 | 1.0 | -0.03em |
| **H2** | 2.5rem (40px) | 1.875rem (30px) | 700-900 | 1.1 | -0.02em |
| **H3** | 1.75rem (28px) | 1.375rem (22px) | 700-900 | 1.2 | 0 |
| **H4** | 1.25rem (20px) | 1.25rem (20px) | 700-900 | 1.3 | 0 |
| **Body** | 1rem (16px) | 1rem (16px) | 400 | 1.7 | 0 |
| **Small** | 0.875rem (14px) | 0.875rem (14px) | 400-500 | 1.5 | 0 |

### Typographic Treatment

**Uppercase Usage:**
All headings and UI labels use **UPPERCASE** text with **increased letter-spacing** to create a bold, architectural feel:

```css
text-transform: uppercase;
letter-spacing: 0.05em; /* tracking-wider */
```

**Examples:**
```html
<!-- Heading -->
<h1 class="uppercase tracking-tight">AI LEARNING FOR EVERYONE</h1>

<!-- Button -->
<button class="uppercase tracking-wider">Browse Events</button>

<!-- Label -->
<label class="uppercase text-sm tracking-wider">Email Address</label>
```

---

## Layout & Spacing

### Geometric Grid

Based on an **8px grid system** for consistent, modular spacing:

| Token | Size | Usage |
|-------|------|-------|
| `spacing-1` | 8px (0.5rem) | Tight spacing, icon gaps |
| `spacing-2` | 16px (1rem) | Component padding, small gaps |
| `spacing-3` | 24px (1.5rem) | Medium gaps |
| `spacing-4` | 32px (2rem) | Large gaps, section padding |
| `spacing-5` | 40px (2.5rem) | Extra large gaps |
| `spacing-6` | 48px (3rem) | Section spacing |
| `spacing-8` | 64px (4rem) | Major section dividers |
| `spacing-12` | 96px (6rem) | Hero/large section padding |

### Container Widths

```css
max-width: 1280px; /* 7xl - Main content container */
padding: 0 1rem; /* Mobile: 16px horizontal padding */
padding: 0 1.5rem; /* Tablet: 24px horizontal padding */
padding: 0 2rem; /* Desktop: 32px horizontal padding */
```

---

## Borders & Shapes

### Border Weight

**Heavy borders** are a signature Bauhaus element:

```css
border-width: 4px; /* All cards, buttons, inputs */
border-color: #000000; /* Black borders everywhere */
```

### Border Radius

**Zero border radius** for rectangular elements to maintain geometric purity:

```css
border-radius: 0; /* All cards, buttons, inputs */
```

**Circles** use full rounding:

```css
border-radius: 9999px; /* Icon containers, decorative shapes */
```

### Examples

```html
<!-- Card -->
<div class="border-4 border-black">...</div>

<!-- Button -->
<button class="border-4 border-black">...</button>

<!-- Circle -->
<div class="w-16 h-16 rounded-full bg-bauhaus-red">...</div>
```

---

## Shadows

### Offset Shadow (Brutalist Style)

A defining characteristic of our Bauhaus interpretation — **hard, offset shadows** that create depth without softness:

```css
/* Default shadow */
box-shadow: 8px 8px 0px 0px rgba(0, 0, 0, 1);

/* Color variations */
box-shadow: 8px 8px 0px 0px rgba(0, 0, 0, 1); /* Black */
box-shadow: 8px 8px 0px 0px rgba(241, 196, 15, 1); /* Yellow */
box-shadow: 8px 8px 0px 0px rgba(29, 53, 87, 1); /* Blue */
```

### Shadow Applications

| Element | Shadow |
|---------|--------|
| Hover cards | `shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]` |
| Info cards | Color-matched offset shadows |
| Modal overlays | Black offset shadow |
| Buttons (hover) | None — uses `active:scale-95` instead |

---

## Components

### Buttons

**Variants:**

1. **Primary** (Red)
   ```html
   <button class="bg-[#E63946] text-white hover:bg-[#D62936] active:scale-95 px-8 py-3 uppercase tracking-wider">
     Register
   </button>
   ```

2. **Secondary** (Blue)
   ```html
   <button class="bg-[#1D3557] text-white hover:bg-[#0D2545] active:scale-95 px-8 py-3 uppercase tracking-wider">
     Learn More
   </button>
   ```

3. **Tertiary** (Yellow)
   ```html
   <button class="bg-[#F1C40F] text-black hover:bg-[#E1B40F] active:scale-95 px-8 py-3 uppercase tracking-wider">
     What Is AI?
   </button>
   ```

4. **Outline** (White/Transparent)
   ```html
   <button class="border-4 border-black text-black hover:bg-black hover:text-white px-8 py-3 uppercase tracking-wider">
     View All Events
   </button>
   ```

**Sizes:**
- Small: `px-6 py-2 min-h-[40px] text-xs`
- Medium: `px-8 py-3 min-h-[48px] text-sm`
- Large: `px-10 py-4 min-h-[56px] text-base`

**Interaction:**
- Hover: Darken background color by ~10%
- Active: `scale-95` for tactile feedback
- Disabled: `opacity-50` with `cursor-not-allowed`

---

### Cards

**Base Card:**
```html
<div class="bg-white border-4 border-black p-6">
  <!-- Content -->
</div>
```

**Hover Card:**
```html
<div class="bg-white border-4 border-black p-6 hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-all duration-200">
  <!-- Content -->
</div>
```

**With Geometric Accent:**
```html
<div class="bg-white border-4 border-black p-6 relative overflow-hidden">
  <!-- Corner triangle accent -->
  <div class="absolute top-0 right-0 w-16 h-16 bg-[#F1C40F] transform rotate-45 translate-x-8 -translate-y-8"></div>
  
  <!-- Content -->
  <div class="relative z-10">...</div>
</div>
```

---

### Tags/Badges

**Semantic Color Coding:**

```html
<!-- Default -->
<span class="bg-white border-3 border-black text-black px-3 py-1 text-xs uppercase tracking-wider">
  Workshop
</span>

<!-- Beginner (Red) -->
<span class="bg-[#E63946] text-white px-3 py-1 text-xs uppercase tracking-wider">
  Beginner-Friendly
</span>

<!-- Family (Yellow) -->
<span class="bg-[#F1C40F] text-black px-3 py-1 text-xs uppercase tracking-wider">
  Family-Friendly
</span>

<!-- Educator (Dark Blue) -->
<span class="bg-[#1D3557] text-white px-3 py-1 text-xs uppercase tracking-wider">
  For Educators
</span>

<!-- Youth (Light Blue) -->
<span class="bg-[#457B9D] text-white px-3 py-1 text-xs uppercase tracking-wider">
  Youth
</span>

<!-- Volunteer (Black) -->
<span class="bg-black text-white px-3 py-1 text-xs uppercase tracking-wider">
  Volunteer
</span>
```

---

### Form Inputs

**Text Input:**
```html
<input 
  type="text"
  class="w-full px-4 py-3 border-4 border-black focus:outline-none focus:border-[#E63946] transition-all"
  placeholder="Your Name"
/>
```

**Select Dropdown:**
```html
<select class="w-full px-4 py-3 border-4 border-black focus:outline-none focus:border-[#E63946] transition-all bg-white">
  <option>Option 1</option>
  <option>Option 2</option>
</select>
```

**Checkbox:**
```html
<label class="flex items-center gap-3 cursor-pointer">
  <input type="checkbox" class="w-6 h-6 border-4 border-black text-[#E63946] focus:ring-2 focus:ring-[#E63946]" />
  <span>I agree to the terms</span>
</label>
```

**Labels:**
```html
<label class="block mb-2 uppercase text-sm tracking-wider">
  Email Address
</label>
```

**Error State:**
```html
<input 
  type="email"
  class="w-full px-4 py-3 border-4 border-[#E63946] focus:outline-none transition-all"
/>
<p class="mt-1 text-[#E63946] text-sm">Please enter a valid email</p>
```

---

### Navigation

**Desktop Navigation:**
```html
<nav class="bg-[#1D3557] text-white sticky top-0 z-50 border-b-4 border-black">
  <div class="flex items-center justify-between h-20">
    <!-- Logo -->
    <div class="uppercase tracking-wider text-lg hover:text-[#F1C40F] transition-colors">
      Newark AI
    </div>
    
    <!-- Nav Items -->
    <div class="flex items-center gap-2">
      <button class="px-5 py-2 uppercase text-sm tracking-wider border-4 border-transparent hover:border-[#F1C40F] hover:text-[#F1C40F]">
        Events
      </button>
      <!-- Active state -->
      <button class="px-5 py-2 uppercase text-sm tracking-wider bg-[#E63946] text-white border-4 border-black">
        Resources
      </button>
    </div>
  </div>
</nav>
```

---

### Geometric Decorative Elements

**Background Circles:**
```html
<div class="absolute top-20 right-10 w-64 h-64 bg-[#E63946] rounded-full opacity-20"></div>
```

**Background Squares:**
```html
<div class="absolute bottom-10 left-10 w-48 h-48 bg-[#F1C40F] transform rotate-45 opacity-20"></div>
```

**Outlined Circle:**
```html
<div class="absolute top-1/2 left-1/3 w-32 h-32 border-8 border-white opacity-10 rounded-full"></div>
```

**Decorative Bar:**
```html
<div class="w-24 h-3 bg-[#E63946] mb-6"></div>
```

**Icon Containers:**
```html
<!-- Filled circle -->
<div class="w-16 h-16 bg-[#E63946] rounded-full flex items-center justify-center">
  <Icon size={32} class="text-white" />
</div>

<!-- Square -->
<div class="w-12 h-12 bg-black flex items-center justify-center">
  <Icon size={24} class="text-white" />
</div>
```

---

## Section Patterns

### Hero Section

```html
<section class="bg-[#1D3557] text-white py-24 md:py-32 border-b-4 border-black relative overflow-hidden">
  <!-- Geometric background shapes -->
  <div class="absolute top-20 right-10 w-64 h-64 bg-[#E63946] rounded-full opacity-20"></div>
  <div class="absolute bottom-10 left-10 w-48 h-48 bg-[#F1C40F] transform rotate-45 opacity-20"></div>
  
  <div class="max-w-7xl mx-auto px-4 relative z-10">
    <!-- Yellow decorative bar -->
    <div class="w-24 h-3 bg-[#F1C40F] mb-8"></div>
    
    <h1 class="text-white mb-6 uppercase tracking-tight">
      Your Headline Here
    </h1>
    
    <p class="text-white/90 mb-12 max-w-2xl text-lg">
      Supporting copy goes here
    </p>
    
    <div class="flex gap-4">
      <button class="bg-[#E63946] text-white...">Primary CTA</button>
      <button class="bg-[#F1C40F] text-black...">Secondary CTA</button>
    </div>
  </div>
</section>
```

### Content Section

```html
<section class="py-16 md:py-24 bg-white">
  <div class="max-w-7xl mx-auto px-4">
    <!-- Section header -->
    <div class="mb-12">
      <div class="w-20 h-3 bg-[#E63946] mb-6"></div>
      <h2 class="uppercase tracking-tight mb-3">Section Title</h2>
      <p class="text-gray-700 max-w-2xl">Section description</p>
    </div>
    
    <!-- Content grid -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <!-- Cards go here -->
    </div>
  </div>
</section>
```

### Alternating Background Section

```html
<section class="py-16 md:py-24 bg-[#F5F5F5] border-y-4 border-black relative overflow-hidden">
  <!-- Geometric background -->
  <div class="absolute top-0 right-0 w-96 h-96 bg-[#F1C40F] opacity-5 rounded-full"></div>
  
  <div class="max-w-7xl mx-auto px-4 relative z-10">
    <!-- Content -->
  </div>
</section>
```

---

## Iconography

**Icon Library:** Lucide React

**Usage:**
```jsx
import { Calendar, MapPin, Users } from 'lucide-react';

// Small icons (16px)
<Calendar size={16} />

// Medium icons (24px)
<Users size={24} />

// Large icons (32px)
<GraduationCap size={32} />
```

**Icon + Dot Pattern:**
```html
<div class="flex items-center gap-2">
  <div class="w-2 h-2 bg-[#E63946] rounded-full"></div>
  <Calendar size={16} />
  <span>Saturday, Dec 14, 2025</span>
</div>
```

---

## Accessibility

### Color Contrast

All text meets **WCAG AA** standards:
- White text on `#1D3557` (Blue): ✓ AAA
- White text on `#E63946` (Red): ✓ AA
- Black text on `#F1C40F` (Yellow): ✓ AAA
- Black text on White: ✓ AAA

### Focus States

All interactive elements have visible focus states:
```css
focus:outline-none focus:border-[#E63946] /* Inputs */
focus:ring-2 focus:ring-[#E63946] /* Checkboxes */
```

### Keyboard Navigation

- All buttons and links are keyboard accessible
- Logical tab order maintained
- Skip links for main content navigation

### Screen Reader Support

- Semantic HTML (`<nav>`, `<section>`, `<article>`)
- ARIA labels on icon-only buttons
- Alt text on all images
- Descriptive link text

---

## Responsive Design

### Breakpoints

```css
/* Mobile-first approach */
/* Base: 0-639px (mobile) */

/* sm: 640px+ (large mobile) */
@media (min-width: 640px) { }

/* md: 768px+ (tablet) */
@media (min-width: 768px) { }

/* lg: 1024px+ (desktop) */
@media (min-width: 1024px) { }

/* xl: 1280px+ (large desktop) */
@media (min-width: 1280px) { }
```

### Mobile Considerations

1. **Typography scales down** on mobile (see Type Scale table)
2. **Navigation collapses** into hamburger menu below 768px
3. **Grid layouts** go single-column on mobile
4. **Padding reduces** from 2rem to 1rem on mobile
5. **Geometric shapes resize** or hide on mobile for performance

---

## Animation & Transitions

### Transition Speed

**Standard duration:** `200ms`

```css
transition-all duration-200
```

### Common Animations

**Hover lift:**
```css
hover:-translate-y-1
```

**Button press:**
```css
active:scale-95
```

**Shadow appearance:**
```css
hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]
```

**Color transitions:**
```css
transition-colors
```

**Combined effects:**
```css
transition-all duration-200
hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] 
hover:-translate-y-1
```

---

## Design Principles in Practice

### 1. **Form Follows Function**
Every element serves a purpose. No decoration without meaning.

### 2. **Geometric Clarity**
Use circles, squares, and rectangles to create visual hierarchy and rhythm.

### 3. **Bold Contrast**
Don't be afraid of black borders and vibrant primary colors. Contrast creates clarity.

### 4. **Asymmetric Balance**
Layouts don't need to be perfectly centered. Use geometric shapes to balance negative space.

### 5. **Typography as Architecture**
Text is a structural element. Use uppercase, tight tracking, and bold weights to create visual impact.

### 6. **Color with Purpose**
Each color has semantic meaning:
- **Red** = Action, importance
- **Blue** = Trust, structure
- **Yellow** = Highlight, attention
- **Black** = Framework, definition

### 7. **Modularity**
Components are reusable building blocks that maintain consistency across all pages.

---

## File Structure

```
/styles/globals.css         # Global CSS variables and base styles
/components/ui/Button.tsx   # Button component
/components/ui/Card.tsx     # Card component
/components/ui/Tag.tsx      # Tag/Badge component
/components/ui/Input.tsx    # Form input components
/components/Navigation.tsx  # Main navigation
/components/EventCard.tsx   # Event card component
/pages/Home.tsx            # Homepage
/pages/Events.tsx          # Events page
/pages/Resources.tsx       # Resources page
/pages/Volunteer.tsx       # Volunteer page
```

---

## Usage Guidelines

### DO ✓

- Use uppercase for headings and UI labels
- Apply 4px black borders consistently
- Use offset shadows (8px 8px) for depth
- Maintain geometric background elements
- Keep border radius at 0 (except circles)
- Use primary colors boldly
- Follow the 8px spacing grid

### DON'T ✗

- Use rounded corners on rectangular elements
- Apply soft drop shadows or blur effects
- Use gradients or textures
- Mix different border weights
- Use decorative fonts or script typefaces
- Create elements without clear purpose
- Ignore the semantic color meanings

---

## Credits & Inspiration

This design system is inspired by the **Bauhaus** school of design (1919-1933), particularly the work of:
- **Walter Gropius** - Founder and architect
- **László Moholy-Nagy** - Typography and visual design
- **Josef Albers** - Color theory
- **Herbert Bayer** - Universal typeface design

The implementation uses modern web technologies while honoring Bauhaus principles of functionality, geometric form, and bold primary colors.

---

## Version

**Style Guide Version:** 1.0  
**Last Updated:** December 10, 2025  
**Design System:** Bauhaus Revival  
**Website:** Newark AI Town Hall
