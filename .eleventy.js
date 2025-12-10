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
