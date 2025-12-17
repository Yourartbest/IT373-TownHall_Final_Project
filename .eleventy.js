import { DateTime } from 'luxon'

export default function(eleventyConfig) {
  // Date formatting filter
  eleventyConfig.addFilter('dateFormat', (dateObj) => {
    return DateTime.fromJSDate(new Date(dateObj)).toLocaleString(DateTime.DATE_MED)
  })
  
  // ISO date format for datetime attribute
  eleventyConfig.addFilter('dateISO', (dateObj) => {
    return DateTime.fromJSDate(new Date(dateObj)).toISO()
  })
  
  // Absolute URL filter for SEO
  eleventyConfig.addFilter('absoluteUrl', (url, base) => {
    try {
      return new URL(url, base).toString()
    } catch (e) {
      return url
    }
  })
  
  // Passthrough copy for static assets
  eleventyConfig.addPassthroughCopy('src/css')
  eleventyConfig.addPassthroughCopy('src/js')
  eleventyConfig.addPassthroughCopy('src/images')
  
  // Watch targets for hot reload
  eleventyConfig.addWatchTarget('src/css/')
  eleventyConfig.addWatchTarget('src/js/')
  
  // Server options
  eleventyConfig.setServerOptions({
    port: 8080,
    showAllHosts: true
  })
  
  return {
    // Use a path prefix for GitHub Pages project sites so absolute URLs work
    // Example: https://yourusername.github.io/IT373-TownHall_Final_Project/
    // This ensures `{{ '/css/styles.css' | url }}` becomes `/IT373-TownHall_Final_Project/css/styles.css`
    // IMPORTANT: Comment out pathPrefix for LOCAL DEVELOPMENT, uncomment for GitHub Pages deployment
    // pathPrefix: "/IT373-TownHall_Final_Project",
    dir: {
      input: 'src',
      output: '_site',
      includes: '_includes',
      data: '_data'
    },
    templateFormats: ['njk', 'md', 'html', 'css', 'js'],
    htmlTemplateEngine: 'njk',
    markdownTemplateEngine: 'njk'
  }
}
