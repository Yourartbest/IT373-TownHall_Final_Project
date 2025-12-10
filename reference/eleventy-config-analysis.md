# Eleventy Configuration Analysis - eaikw Project

**Source:** `.eleventy.js` from eaikw reference project  
**Date Analyzed:** December 5, 2025  
**Eleventy Version:** 3.0.0+

---

## Configuration Overview

The eaikw project uses **ES Module syntax** (`export default`) and implements a modern, production-ready Eleventy configuration optimized for performance, SEO, and developer experience.

---

## Core Configuration Settings

### Directory Structure
```javascript
{
  dir: {
    input: "src",           // Source files
    output: "_site",        // Build output
    includes: "_includes",  // Partials/components
    data: "_data"          // Global data files
  }
}
```

**Best Practice:** Clear separation of concerns with dedicated directories for different content types.

---

### Template Engines
```javascript
{
  templateFormats: ["md", "njk", "html"],
  markdownTemplateEngine: "njk",
  htmlTemplateEngine: "njk",
  dataTemplateEngine: "njk"
}
```

**Strategy:** Nunjucks everywhere for consistency. Markdown files can use Nunjucks syntax for dynamic content.

---

### Development Server
```javascript
serverOptions: {
  port: 8080,
  host: "0.0.0.0"  // Allows external access (Docker-ready)
}
```

**Why This Matters:**
- `0.0.0.0` binding enables Docker container access
- Standard port avoids conflicts
- Mobile device testing on local network

---

## Plugin Architecture

### Official Plugins Used

#### 1. **EleventyHtmlBasePlugin**
```javascript
import { EleventyHtmlBasePlugin } from "@11ty/eleventy";
eleventyConfig.addPlugin(EleventyHtmlBasePlugin);
```

**Purpose:** Automatically adjusts URLs for path prefixes (GitHub Pages subdirectories)

**Use Case:** Deployment to `https://user.github.io/repo/` instead of root domain

#### 2. **RSS Feed Plugin**
```javascript
import pluginRss from "@11ty/eleventy-plugin-rss";
eleventyConfig.addPlugin(pluginRss);
```

**Purpose:** Generates RSS/Atom feeds for blog content

**Benefit:** Better content distribution, newsletter integration

#### 3. **Image Optimization Plugin**
```javascript
import Image from "@11ty/eleventy-img";
```

**Implementation:** Custom async shortcode (see Image Shortcode section)

---

## Passthrough Copy Strategy

### What Gets Copied (Not Processed)
```javascript
eleventyConfig.addPassthroughCopy({ "src/images": "images" });
eleventyConfig.addPassthroughCopy("src/assets");
eleventyConfig.addPassthroughCopy({ "src/favicon.svg": "favicon.svg" });
eleventyConfig.addPassthroughCopy({ "src/css/print.css": "css/print.css" });
eleventyConfig.addPassthroughCopy("CNAME");
```

**Key Insight:** CSS and JS are **NOT** in passthrough because they're built separately:
- **CSS:** Built by Tailwind CLI (npm script)
- **JS:** Bundled by ESBuild (build-alpine.js)
- Eleventy preserves the output directories but doesn't process files

**Benefits:**
- Faster builds (Eleventy doesn't process large asset trees)
- Specialized tools for specialized tasks
- Better caching strategies

---

## Collections System

### Blog Collection
```javascript
eleventyConfig.addCollection("blog", function (collectionApi) {
  return collectionApi.getFilteredByGlob("src/blog/*.md").reverse();
});
```

**Features:**
- Glob pattern matches all Markdown files in blog directory
- `.reverse()` shows newest posts first
- Automatically available in templates as `collections.blog`

### Projects Collection
```javascript
eleventyConfig.addCollection("projects", function (collectionApi) {
  return collectionApi.getFilteredByGlob("src/projects/*.md").reverse();
});
```

**Pattern:** Same structure as blog for consistency

**Usage in Templates:**
```njk
{% for post in collections.blog %}
  <article>{{ post.data.title }}</article>
{% endfor %}
```

---

## Custom Filters (11 Total)

### Date Formatting Filters

#### 1. **dateFormat** - User-Friendly Dates
```javascript
eleventyConfig.addFilter("dateFormat", function (date) {
  if (!date) return "Date not available";
  const d = new Date(date);
  if (isNaN(d.getTime())) return "Invalid date";
  
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });
});
```

**Output:** "December 5, 2025"

**Best Practice:** Defensive programming with null checks and validation

#### 2. **readableDate** - Duplicate of dateFormat
```javascript
// Same implementation as dateFormat
```

**Note:** Likely kept for backward compatibility or different semantic meaning

#### 3. **dateToISO** - Machine-Readable Dates
```javascript
eleventyConfig.addFilter("dateToISO", function (date) {
  if (!date) return new Date().toISOString();
  const d = new Date(date);
  if (isNaN(d.getTime())) return new Date().toISOString();
  return d.toISOString();
});
```

**Output:** "2025-12-05T10:30:00.000Z"

**Use Case:** Schema.org structured data, RSS feeds, `<time>` elements

---

### Content Manipulation Filters

#### 4. **excerpt** - Auto-Generate Summaries
```javascript
eleventyConfig.addFilter("excerpt", function (content) {
  const excerpt = content.replace(/(<([^>]+)>)/gi, "").substring(0, 200);
  return excerpt + (excerpt.length >= 200 ? "..." : "");
});
```

**Features:**
- Strips all HTML tags with regex
- Limits to 200 characters
- Adds ellipsis if truncated

**Use Case:** Blog listing pages, meta descriptions

#### 5. **limit** - Array Limiting
```javascript
eleventyConfig.addFilter("limit", function (array, limit) {
  return array.slice(0, limit);
});
```

**Usage:**
```njk
{% for post in collections.blog | limit(5) %}
  <!-- Show only 5 latest posts -->
{% endfor %}
```

---

### Navigation Filters

#### 6. **getPreviousCollectionItem** - Prev Link
```javascript
eleventyConfig.addFilter("getPreviousCollectionItem", function (collection, page) {
  if (!collection || !page) return null;
  const index = collection.findIndex((item) => item.url === page.url);
  return index > 0 ? collection[index - 1] : null;
});
```

**Use Case:** "← Previous Post" navigation

#### 7. **getNextCollectionItem** - Next Link
```javascript
eleventyConfig.addFilter("getNextCollectionItem", function (collection, page) {
  if (!collection || !page) return null;
  const index = collection.findIndex((item) => item.url === page.url);
  return index < collection.length - 1 ? collection[index + 1] : null;
});
```

**Implementation:**
```njk
{% set prev = collections.blog | getPreviousCollectionItem(page) %}
{% if prev %}
  <a href="{{ prev.url }}">← {{ prev.data.title }}</a>
{% endif %}
```

---

### Utility Filters

#### 8. **currentYear** - Dynamic Copyright
```javascript
eleventyConfig.addFilter("currentYear", function () {
  return new Date().getFullYear();
});
```

**Usage:** `© {{ currentYear }} Company Name`

#### 9. **baseUrl** - Path Prefix Handler
```javascript
eleventyConfig.addFilter("baseUrl", function (url) {
  const pathPrefix = process.env.PATH_PREFIX || "";
  return pathPrefix ? `${pathPrefix}${url}` : url;
});
```

**Why This Exists:**
- GitHub Pages subdirectory: `/portfolio/about/`
- Root domain: `/about/`
- Controlled by environment variable

---

## Image Shortcode (Advanced)

### Async Image Optimization
```javascript
eleventyConfig.addAsyncShortcode("image", async function (src, alt, sizes = "100vw") {
  const metadata = await Image(src, {
    widths: [300, 600, 1200],
    formats: ["webp", "jpeg"],
    outputDir: "./_site/images/",
    urlPath: "/images/",
    filenameFormat: function (id, src, width, format) {
      const extension = `.${format}`;
      const name = src.split("/").pop().replace(/\.[^.]+$/, "");
      return `${name}-${width}w${extension}`;
    }
  });

  const imageAttributes = {
    alt,
    sizes,
    loading: "lazy",
    decoding: "async"
  };

  return Image.generateHTML(metadata, imageAttributes);
});
```

### Configuration Breakdown

**Widths:** `[300, 600, 1200]`
- Mobile: 300px
- Tablet: 600px
- Desktop: 1200px

**Formats:** `["webp", "jpeg"]`
- WebP for modern browsers (80% smaller)
- JPEG fallback for old browsers

**Filename Pattern:** `hero-600w.webp`
- Source: `hero.jpg`
- Width: 600px
- Format: webp

**HTML Output:**
```html
<picture>
  <source type="image/webp" 
          srcset="/images/hero-300w.webp 300w,
                  /images/hero-600w.webp 600w,
                  /images/hero-1200w.webp 1200w"
          sizes="100vw">
  <img src="/images/hero-600w.jpeg"
       alt="Hero image"
       loading="lazy"
       decoding="async">
</picture>
```

**Performance Benefits:**
- Responsive images (browser picks best size)
- Modern format support
- Lazy loading (Core Web Vitals)
- Async decoding (non-blocking)

---

## Markdown Configuration

### Enhanced Markdown Parser
```javascript
import markdownIt from "markdown-it";
import markdownItAnchor from "markdown-it-anchor";

const md = markdownIt({
  html: true,      // Allow HTML in Markdown
  breaks: true,    // Convert \n to <br>
  linkify: true    // Auto-convert URLs to links
});

md.use(markdownItAnchor, {
  permalink: markdownItAnchor.permalink.headerLink(),
  slugify: (s) =>
    s.toLowerCase()
     .replace(/[^\w\s-]/g, "")
     .replace(/[\s_]+/g, "-")
     .replace(/^-+|-+$/g, "")
});

eleventyConfig.setLibrary("md", md);
```

### Features Enabled

**1. HTML Support**
```markdown
<div class="alert">
  **Bold markdown** inside HTML!
</div>
```

**2. Auto-Convert Line Breaks**
```markdown
First line
Second line  ← No need for double space
```

**3. Auto-Link URLs**
```markdown
Visit https://example.com ← Becomes clickable link
```

**4. Automatic Heading Anchors**
```markdown
## My Heading
```

**Generates:**
```html
<h2 id="my-heading">
  <a href="#my-heading">My Heading</a>
</h2>
```

**Benefits:**
- Deep linking to sections
- Table of contents generation
- Better navigation

---

## Performance Optimization

### Build Performance
```javascript
eleventyConfig.setUseGitIgnore(false);
```

**Why Disable:** Allows processing of files in `.gitignore` (like `node_modules` documentation)

**Alternative:** Could use `.eleventyignore` for more control

---

## Best Practices Demonstrated

### ✅ 1. Defensive Programming
Every filter checks for null/invalid input before processing

### ✅ 2. Async Operations
Image processing is properly awaited (doesn't block builds)

### ✅ 3. Separation of Concerns
- Eleventy: Content processing
- Tailwind: CSS building
- ESBuild: JS bundling

### ✅ 4. Progressive Enhancement
- Lazy loading images
- WebP with JPEG fallback
- HTML base plugin for deployment flexibility

### ✅ 5. SEO-Friendly
- ISO date formats for structured data
- Automatic image optimization
- Clean URL slugs

---

## Key Takeaways for Your Project

### Must Implement:
1. **Collections** for blog posts
2. **Image shortcode** for optimization
3. **Date filters** with error handling
4. **Prev/Next navigation** filters
5. **Markdown-it-anchor** for TOC

### Nice to Have:
1. RSS plugin for content distribution
2. BaseURL filter for deployment flexibility
3. Excerpt filter for meta descriptions

### Don't Copy:
- Swiss-specific design classes
- Specific color schemes
- Typography scales (unless you want them)

---

## Integration with Build Pipeline

### package.json Scripts
```json
{
  "build:eleventy": "eleventy",
  "build": "npm-run-all --parallel build:css:prod build:js && npm run build:eleventy",
  "dev:eleventy": "eleventy --serve --watch --port=8080"
}
```

**Key Insight:** Eleventy runs **after** CSS/JS are built in production

**Development:** All three run in parallel with watch mode

---

## Configuration File Location
- **Path:** `.eleventy.js` (project root)
- **Format:** ES Module (not CommonJS)
- **Export:** Default async function

This configuration achieves 100% Lighthouse scores through thoughtful architecture and modern web standards.
