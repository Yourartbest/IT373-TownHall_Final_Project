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

## Pages & Features

This section documents the complete page structure, unique components, interactive features, and user flows across the Newark AI Town Hall website.

---

### Page Overview

The website consists of five main pages:

1. **Home** (`/pages/Home.tsx`) - Landing page with hero, about section, featured events
2. **Events** (`/pages/Events.tsx`) - Searchable/filterable event listing
3. **Event Detail** (`/pages/EventDetail.tsx`) - Individual event page with registration
4. **Resources** (`/pages/Resources.tsx`) - Filterable resource library
5. **Volunteer** (`/pages/Volunteer.tsx`) - Volunteer opportunities and onboarding flow

---

### 1. Home Page

**Purpose:** Welcome visitors, communicate value proposition, showcase upcoming events

**Layout Structure:**

```
Navigation (sticky)
├── Hero Section (Bauhaus Blue background)
│   ├── Decorative geometric shapes
│   ├── Yellow accent bar
│   ├── Main headline
│   ├── Supporting copy
│   └── CTA buttons (Browse Events, What Is AI?)
│
├── Upcoming Events Preview
│   ├── Section header with red accent bar
│   ├── 3-column event card grid
│   └── "View All Events" button
│
├── Info Row (3 cards with colored shadows)
│   ├── Who It's For (red shadow)
│   ├── What You'll Learn (yellow shadow)
│   └── Always Free (blue shadow)
│
├── About Us Section
│   ├── 2-column layout (content + value cards)
│   ├── Mission statement
│   ├── Value proposition cards
│   └── CTA buttons
│
└── Discord CTA Section
Footer
```

**Key Components:**
- **Hero with geometric shapes** - Red circle, yellow square, white circle outlines
- **Event Cards** (3 featured) - Preview of upcoming events
- **Info Cards** - Colored offset shadows (black/yellow/blue)
- **Value Proposition Cards** - Stacked cards with icons (Community-Led, Accessible Learning, Always Free)
- **DiscordCTA** - Full-width call-to-action section

**Interactions:**
- Click "Browse Events" → Navigate to Events page
- Click "View All Events" → Navigate to Events page
- Click Event Card → Navigate to Event Detail page
- Click "Get Involved" → Navigate to Volunteer page

---

### 2. Events Page

**Purpose:** Display all events with filtering capabilities

**Layout Structure:**

```
Navigation (sticky)
├── Page Header (gray background)
│   ├── Red accent bar
│   ├── Page title
│   └── Description
│
├── Filter Bar (sticky, white background)
│   ├── Filter icon (yellow square)
│   ├── Filter chips (horizontal scroll on mobile)
│   └── Active state highlighting
│
└── Event Grid
    ├── Event count indicator
    ├── 3-column grid (responsive)
    └── Empty state (if no results)
Footer
```

**Filters:**
- All
- Beginner-Friendly
- Family-Friendly
- Educators
- Youth
- Volunteer

**Key Components:**
- **Sticky Filter Bar** - Remains visible when scrolling
- **Filter Chips** - Active state with red background and shadow
- **Event Cards** - Hover effects with shadow
- **Empty State** - Yellow circle + message + "View all events" link

**Interactions:**
- Click filter chip → Updates event list in real-time
- Click Event Card "View Details" → Navigate to Event Detail page
- Click Event Card "Register" → Open Registration Modal
- Mobile: Horizontal scroll for filter chips

**States:**
- Active Filter: Red background, black border, black shadow
- Inactive Filter: White background, black border, hover shadow
- Empty State: No events found message with reset option

---

### 3. Event Detail Page

**Purpose:** Show comprehensive event information and enable registration

**Layout Structure:**

```
Navigation (sticky)
├── Back Button Bar
│   └── "Back to Events" link
│
├── Event Hero (Bauhaus Blue background)
│   ├── Decorative shapes
│   ├── Tags (difficulty, category)
│   ├── Yellow accent bar
│   ├── Event title
│   ├── Date/time card
│   ├── Location card
│   └── "Register Now" button
│
├── Event Details (2-column on desktop)
│   ├── Main Content
│   │   ├── "What You'll Learn" section (gray box)
│   │   │   └── Checklist with red square checkmarks
│   │   └── "About This Event" section
│   │       └── Event description (multi-paragraph)
│   │
│   └── Sidebar
│       ├── Quick Info card
│       │   ├── Duration
│       │   ├── Cost
│       │   └── Registration info
│       └── Related Events
│           └── 2 event cards
│
└── Discord CTA Section
Footer
```

**Key Components:**
- **Event Hero** - Tags + title + info cards + CTA
- **Info Cards** - Date/time and location with icons
- **What You'll Learn Box** - Gray background, checklist items with red checkmarks
- **Quick Info Card** - Bordered card with event metadata
- **Related Events** - Suggested similar events

**Interactions:**
- Click "Back to Events" → Navigate to Events page
- Click "Register Now" → Open Registration Modal
- Click Related Event Card → Navigate to that Event Detail page

---

### 4. Resources Page

**Purpose:** Provide filterable library of educational resources

**Layout Structure:**

```
Navigation (sticky)
├── Page Header (gray background)
│   ├── Blue accent bar
│   ├── Page title
│   └── Description
│
├── Filter Section
│   ├── Category Filter
│   │   ├── Red filter icon
│   │   ├── Filter label
│   │   └── Filter chips (All, Article, Educator Resource, Guide)
│   │
│   └── Audience Filter
│       ├── Blue filter icon
│       ├── Filter label
│       └── Filter chips (All, Parents, Educators, Volunteers, General)
│
└── Resource Grid
    ├── Resource count indicator
    ├── 3-column grid (responsive)
    └── Resource cards
Footer
```

**Filters:**
- **Category:** All, Article, Educator Resource, Guide
- **Audience:** All, Parents, Educators, Volunteers, General

**Key Components:**
- **Dual Filter System** - Category + Audience filters work together
- **Resource Cards** - Category badge, title, summary, download button
- **Filter Chips** - Same style as Events page

**Interactions:**
- Click Category filter → Updates resource list
- Click Audience filter → Updates resource list
- Both filters work together (AND logic)
- Click "Download" on card → Download resource (mock)

**Card Variants:**
- **Guide** - Blue accent
- **Article** - Red accent
- **Educator Resource** - Yellow accent

---

### 5. Volunteer Page

**Purpose:** Showcase volunteer opportunities and facilitate sign-up

**Layout Structure:**

```
Navigation (sticky)
├── Hero Section (Bauhaus Blue background)
│   ├── Decorative shapes
│   ├── Yellow accent bar
│   ├── Headline
│   ├── Description
│   └── "Start Volunteering" button
│
├── Why Volunteer Section (gray background)
│   ├── Red accent bar
│   ├── Section title
│   └── 3-column benefit cards
│       ├── Make an Impact (yellow circle icon)
│       ├── Flexible Schedule (blue circle icon)
│       └── Learn & Grow (red circle icon)
│
├── Volunteer Roles Section
│   ├── Blue accent bar
│   ├── Section title
│   └── 3 role cards
│       ├── Event Assistant (icon + details)
│       ├── Community Helper (icon + details)
│       └── Content Helper (icon + details)
│
└── Discord CTA Section
Footer
```

**Volunteer Onboarding Flow:**

When user clicks "Start Volunteering", a multi-step modal appears:

**Step 1: Your Info**
- Full Name input
- Email input
- Phone Number input
- Cancel / Continue buttons

**Step 2: Join Discord**
- Explanation of Discord
- Link to Discord server
- "Join Discord" button
- Back / Continue buttons

**Step 3: Get Assigned**
- Role selection checkboxes
  - Event Assistant
  - Community Helper
  - Content Helper
- Availability selection
- Submit button

**Success State:**
- Green checkmark icon
- "Thank you" message
- Discord invite button
- Close button

**Key Components:**
- **Progress Indicator** - 3-step progress bar with checkmarks
- **Role Cards** - Icon, title, description, commitment, skills required
- **Benefit Cards** - Icon containers with colored backgrounds
- **Onboarding Modal** - Multi-step form with validation

**Interactions:**
- Click "Start Volunteering" → Open onboarding modal
- Complete Step 1 → Advance to Step 2
- Complete Step 2 → Advance to Step 3
- Submit Step 3 → Show success message
- Click Discord button → Open Discord invite (external)

**Form Validation:**
- All fields required on Step 1
- Email validation
- Phone number validation
- At least one role must be selected on Step 3

---

### Shared Components

These components appear across multiple pages:

#### Navigation

**Component:** `/components/Navigation.tsx`

**Features:**
- Sticky positioning
- Bauhaus Blue background
- Black bottom border
- Logo (Newark AI)
- Navigation items: Home, Events, Resources, Volunteer
- Active state highlighting
- Mobile hamburger menu

**States:**
- **Active Page:** Red background, black border
- **Hover:** Yellow border, yellow text
- **Mobile:** Hamburger menu with slide-out drawer

---

#### Footer

**Component:** `/components/Footer.tsx`

**Features:**
- Black background
- Multi-column layout (responsive)
- Links to pages
- Social media icons
- Copyright notice

---

#### Event Card

**Component:** `/components/EventCard.tsx`

**Features:**
- White background
- 4px black border
- Hover effect: lift + shadow
- Difficulty tag (colored)
- Event title
- Date/time with calendar icon
- Location with map pin icon
- Summary text
- Multiple tags
- Two CTAs: "View Details" + "Register"

**Tag Colors:**
- Beginner-Friendly: Red
- Family-Friendly: Yellow
- Youth: Light Blue
- Educators: Dark Blue
- Business: Black

**Hover Effect:**
```css
hover:-translate-y-1
hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]
```

---

#### Resource Card

**Component:** `/components/ResourceCard.tsx`

**Features:**
- White background
- 4px black border
- Category badge (colored)
- Resource title
- Summary text
- "Download" button
- Hover effect: shadow

**Category Colors:**
- Guide: Blue
- Article: Red
- Educator Resource: Yellow

---

#### Registration Modal

**Component:** `/components/RegistrationModal.tsx`

**Features:**
- Full-screen overlay (black, 80% opacity)
- Centered modal with offset shadow
- Bauhaus Blue header
- Close button (X)
- Event title display (yellow box)
- Form fields:
  - Full Name
  - Email Address
  - Neighborhood dropdown (Newark-specific)
  - SMS opt-in toggle
- Submit button
- Success state with confirmation
- Post-registration CTAs:
  - Add to Calendar
  - Join Discord
  - Close

**States:**
- **Form State:** Input fields + submit button
- **Success State:** Checkmark + confirmation + action buttons

**Interactions:**
- Click overlay → Close modal
- Click X button → Close modal
- Submit form → Show success state
- Click "Add to Calendar" → Download .ics file (mock)
- Click "Join Discord" → Open Discord invite
- Click "Close" → Close modal

---

#### Discord CTA

**Component:** `/components/DiscordCTA.tsx`

**Features:**
- Full-width section
- Yellow background
- Black borders (top + bottom)
- Geometric decorative shapes
- Discord logo/icon
- Bold headline
- Supporting copy
- "Join Our Discord" button (black)
- Appears on: Home, Event Detail, Volunteer pages

**Purpose:** Drive community engagement through Discord platform

---

### User Flows

#### Flow 1: Event Registration

1. User lands on Home page
2. Sees featured events → Clicks "Browse Events" OR "View All Events"
3. Arrives at Events page
4. (Optional) Filters by category (e.g., "Family-Friendly")
5. Clicks "View Details" on event card
6. Reads event details on Event Detail page
7. Clicks "Register Now" button
8. Registration modal appears
9. Fills out form (name, email, neighborhood, SMS opt-in)
10. Clicks "Submit"
11. Success state appears with confirmation
12. (Optional) Clicks "Add to Calendar" or "Join Discord"
13. Closes modal
14. Returns to Event Detail page

---

#### Flow 2: Resource Discovery

1. User navigates to Resources page
2. Sees all resources by default
3. Filters by Category (e.g., "Guide")
4. Filters by Audience (e.g., "Parents")
5. Views filtered results (e.g., "AI Safety for Families")
6. Clicks "Download" on resource card
7. Resource downloads (mock)

---

#### Flow 3: Volunteer Sign-Up

1. User clicks "Get Involved" from Home page OR navigates to Volunteer page
2. Reads about volunteer opportunities
3. Reviews volunteer roles (Event Assistant, Community Helper, Content Helper)
4. Clicks "Start Volunteering" button
5. Onboarding modal appears - Step 1
6. Fills out personal information (name, email, phone)
7. Clicks "Continue"
8. Step 2: Discord explanation appears
9. Clicks "Continue" (Discord join happens later)
10. Step 3: Selects volunteer roles and availability
11. Clicks "Submit"
12. Success message appears
13. Clicks "Join Discord" to complete onboarding
14. Closes modal

---

### Page-Specific Patterns

#### Hero Sections

**Consistent across:** Home, Event Detail, Volunteer

**Elements:**
- Bauhaus Blue background (`#1D3557`)
- Decorative geometric shapes (circles, squares, opacity 10-20%)
- Yellow accent bar (24px wide, 12px tall)
- Uppercase headline
- Supporting copy (white text, 90% opacity)
- CTA buttons

---

#### Section Headers

**Consistent across:** All pages

**Pattern:**
```html
<div class="mb-12">
  <div class="w-20 h-3 bg-[#E63946] mb-6"></div>
  <h2 class="uppercase tracking-tight mb-3">Section Title</h2>
  <p class="text-gray-700 max-w-2xl">Section description</p>
</div>
```

**Color coding:**
- Red bar: Events, general sections
- Blue bar: Resources, structural sections
- Yellow bar: Hero sections, highlights

---

#### Card Grids

**Responsive breakpoints:**
- Mobile (< 768px): 1 column
- Tablet (768px - 1023px): 2 columns
- Desktop (≥ 1024px): 3 columns

**Gap:** 24px (1.5rem)

---

### Interactive Elements

#### Filter Chips

**Visual States:**
- **Default:** White background, black border
- **Hover:** Black shadow appears
- **Active:** Red background, white text, black shadow

**Behavior:**
- Click toggles active state
- Only one filter can be active per category
- Updates content in real-time (no page reload)

---

#### Sticky Elements

**Navigation:** Always sticky at top (z-index: 50)

**Filter Bar (Events/Resources):** Sticky below navigation when scrolling (z-index: 40)

**Hierarchy:**
```
Navigation (z-50) - Always visible
Filter Bar (z-40) - Sticky on Events/Resources
Modals (z-50) - Overlay everything
```

---

### Accessibility Features

#### Keyboard Navigation

- All buttons and links are keyboard accessible
- Tab order follows visual hierarchy
- Focus states visible on all interactive elements
- Modal traps focus when open
- ESC key closes modals

#### Screen Reader Support

- Semantic HTML (`<nav>`, `<section>`, `<article>`, `<button>`)
- ARIA labels on icon-only buttons
- Alt text on all images
- Form labels properly associated with inputs
- Error messages announced to screen readers

#### Color Contrast

All text meets WCAG AA standards:
- White on Bauhaus Blue: AAA ✓
- White on Bauhaus Red: AA ✓
- Black on Bauhaus Yellow: AAA ✓
- Black on White: AAA ✓

#### Focus States

```css
focus:outline-none focus:border-[#E63946] /* Inputs */
focus:ring-2 focus:ring-[#E63946] /* Checkboxes */
```

---

### Mobile Optimizations

#### Typography

Headings scale down on mobile (see Typography section)

#### Navigation

Hamburger menu appears below 768px

#### Filter Chips

Horizontal scroll on mobile (< 768px) to prevent wrapping

#### Grids

All 3-column grids collapse to single column on mobile

#### Spacing

Container padding reduces from 32px to 16px on mobile

#### Geometric Shapes

Large decorative shapes resize or hide on mobile for performance

---

### Performance Considerations

#### Component Structure

- Pages split into multiple components
- Shared components reused across pages
- Lazy loading for modals (only render when open)

#### State Management

- Local state with React useState
- No unnecessary re-renders
- Filtered data computed client-side (no API calls)

#### Image Optimization

- Images from Unsplash CDN (optimized)
- Placeholder component for missing images

---

## Version

**Style Guide Version:** 1.0  
**Last Updated:** December 10, 2025  
**Design System:** Bauhaus Revival  
**Website:** Newark AI Town Hall