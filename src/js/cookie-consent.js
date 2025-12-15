/**
 * GDPR-Compliant Cookie Consent Banner
 * - Blocks Google Analytics until user consents
 * - Stores consent in localStorage
 * - Provides Accept/Reject/Preferences options
 */

(function () {
  'use strict'

  const CONSENT_KEY = 'newark_ai_cookie_consent'
  const GA_MEASUREMENT_ID = 'G-HM9KGTZTTW'

  // Check if consent was already given
  function getConsent() {
    try {
      const consent = localStorage.getItem(CONSENT_KEY)
      return consent ? JSON.parse(consent) : null
    } catch (e) {
      return null
    }
  }

  // Save consent to localStorage
  function saveConsent(consentData) {
    try {
      localStorage.setItem(CONSENT_KEY, JSON.stringify(consentData))
    } catch (e) {
      console.warn('Could not save consent to localStorage')
    }
  }

  // Load Google Analytics
  function loadGoogleAnalytics() {
    if (window.gaLoaded) return
    window.gaLoaded = true

    // Load gtag.js script
    const script = document.createElement('script')
    script.async = true
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`
    document.head.appendChild(script)

    // Initialize gtag
    window.dataLayer = window.dataLayer || []
    function gtag() {
      window.dataLayer.push(arguments)
    }
    window.gtag = gtag
    gtag('js', new Date())
    gtag('config', GA_MEASUREMENT_ID, {
      anonymize_ip: true,
      cookie_flags: 'SameSite=None;Secure',
    })
  }

  // Create and show the consent banner
  function showConsentBanner() {
    const banner = document.createElement('div')
    banner.id = 'cookie-consent-banner'
    banner.setAttribute('role', 'dialog')
    banner.setAttribute('aria-labelledby', 'cookie-consent-title')
    banner.setAttribute('aria-describedby', 'cookie-consent-description')
    banner.innerHTML = `
      <div class="cookie-consent-container">
        <div class="cookie-consent-content">
          <h2 id="cookie-consent-title" class="cookie-consent-title">🍪 Cookie Preferences</h2>
          <p id="cookie-consent-description" class="cookie-consent-text">
            We use cookies to analyze site traffic and improve your experience. 
            Analytics cookies help us understand how visitors use our site.
            <a href="/privacy/" class="cookie-consent-link">Learn more in our Privacy Policy</a>
          </p>
        </div>
        <div class="cookie-consent-actions">
          <button type="button" id="cookie-reject" class="cookie-btn cookie-btn-secondary">
            Reject All
          </button>
          <button type="button" id="cookie-preferences" class="cookie-btn cookie-btn-secondary">
            Preferences
          </button>
          <button type="button" id="cookie-accept" class="cookie-btn cookie-btn-primary">
            Accept All
          </button>
        </div>
      </div>
      
      <!-- Preferences Modal -->
      <div id="cookie-preferences-modal" class="cookie-modal hidden" role="dialog" aria-labelledby="cookie-prefs-title" aria-modal="true">
        <div class="cookie-modal-content">
          <h3 id="cookie-prefs-title" class="cookie-modal-title">Cookie Preferences</h3>
          
          <div class="cookie-option">
            <div class="cookie-option-header">
              <label class="cookie-option-label">
                <strong>Essential Cookies</strong>
              </label>
              <span class="cookie-always-on">Always On</span>
            </div>
            <p class="cookie-option-desc">Required for the website to function. Cannot be disabled.</p>
          </div>
          
          <div class="cookie-option">
            <div class="cookie-option-header">
              <label class="cookie-option-label" for="analytics-toggle">
                <strong>Analytics Cookies</strong>
              </label>
              <label class="cookie-toggle">
                <input type="checkbox" id="analytics-toggle" checked>
                <span class="cookie-toggle-slider"></span>
              </label>
            </div>
            <p class="cookie-option-desc">Help us understand how visitors interact with our website using Google Analytics.</p>
          </div>
          
          <div class="cookie-modal-actions">
            <button type="button" id="cookie-save-prefs" class="cookie-btn cookie-btn-primary">
              Save Preferences
            </button>
          </div>
        </div>
      </div>
    `

    document.body.appendChild(banner)

    // Event listeners
    document.getElementById('cookie-accept').addEventListener('click', function () {
      saveConsent({ analytics: true, timestamp: Date.now() })
      loadGoogleAnalytics()
      hideBanner()
    })

    document.getElementById('cookie-reject').addEventListener('click', function () {
      saveConsent({ analytics: false, timestamp: Date.now() })
      hideBanner()
    })

    document.getElementById('cookie-preferences').addEventListener('click', function () {
      document.getElementById('cookie-preferences-modal').classList.remove('hidden')
    })

    document.getElementById('cookie-save-prefs').addEventListener('click', function () {
      const analyticsEnabled = document.getElementById('analytics-toggle').checked
      saveConsent({ analytics: analyticsEnabled, timestamp: Date.now() })
      if (analyticsEnabled) {
        loadGoogleAnalytics()
      }
      hideBanner()
    })

    // Close modal on escape key
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        document.getElementById('cookie-preferences-modal').classList.add('hidden')
      }
    })

    // Focus trap for accessibility
    banner.querySelector('#cookie-accept').focus()
  }

  function hideBanner() {
    const banner = document.getElementById('cookie-consent-banner')
    if (banner) {
      banner.classList.add('cookie-consent-hidden')
      setTimeout(() => banner.remove(), 300)
    }
  }

  // Initialize on DOM ready
  function init() {
    const consent = getConsent()

    if (consent === null) {
      // No consent recorded, show banner
      showConsentBanner()
    } else if (consent.analytics === true) {
      // User previously accepted analytics
      loadGoogleAnalytics()
    }
    // If consent.analytics === false, do nothing (user rejected)
  }

  // Run when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init)
  } else {
    init()
  }
})()
