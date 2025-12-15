export default {
  ci: {
    collect: {
      staticDistDir: './_site',
      numberOfRuns: 3,
      url: [
        'http://localhost/index.html'
      ]
    },
    assert: {
      assertions: {
        // Core category scores - target 90+
        'categories:performance': ['warn', { minScore: 0.8 }],
        'categories:accessibility': ['error', { minScore: 0.9 }],
        'categories:best-practices': ['warn', { minScore: 0.8 }],
        'categories:seo': ['error', { minScore: 0.9 }],
        
        // Performance metrics
        'first-contentful-paint': ['warn', { maxNumericValue: 3000 }],
        'largest-contentful-paint': ['warn', { maxNumericValue: 4000 }],
        'cumulative-layout-shift': ['warn', { maxNumericValue: 0.1 }],
        'total-blocking-time': ['warn', { maxNumericValue: 500 }],
        
        // Disable PWA audits (not a PWA)
        'installable-manifest': 'off',
        'maskable-icon': 'off',
        'splash-screen': 'off',
        'themed-omnibox': 'off',
        
        // Disable audits that are warnings/informational
        'csp-xss': 'off',
        'bootup-time': 'off',
        'mainthread-work-breakdown': 'off',
        'server-response-time': 'off',
        'dom-size': 'off',
        'total-byte-weight': 'off',
        'render-blocking-resources': 'off',
        'errors-in-console': 'off',
        
        // Accessibility - keep important ones
        'identical-links-same-purpose': 'off',
        'label-content-name-mismatch': 'off',
        'target-size': 'off',
        'tap-targets': 'off'
      }
    },
    upload: {
      target: 'temporary-public-storage'
    }
  }
}
