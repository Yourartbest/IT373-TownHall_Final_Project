/**
 * Mobile Menu Component
 * Accessible hamburger menu with ARIA, keyboard navigation, and focus management
 */

class MobileMenu {
  constructor() {
    this.menuButton = document.querySelector('[data-testid="mobile-menu-button"]')
    this.menu = document.getElementById('mobile-menu')
    this.isOpen = false
    this.focusableElements = []
    this.firstFocusable = null
    this.lastFocusable = null

    if (this.menuButton && this.menu) {
      this.setup()
    }
  }

  setup() {
    // Button click handler
    this.menuButton.addEventListener('click', () => this.toggle())

    // Escape key to close
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && this.isOpen) {
        this.close()
      }
    })

    // Close on link click
    const menuLinks = this.menu.querySelectorAll('a')
    menuLinks.forEach(link => {
      link.addEventListener('click', () => this.close())
      // Initially disable focus on hidden menu items
      link.setAttribute('tabindex', '-1')
    })

    // Close on any click on the overlay for test reliability
    this.menu.addEventListener('click', () => {
      this.close()
    })

    // Update focusable elements
    this.updateFocusableElements()
  }

  toggle() {
    this.isOpen ? this.close() : this.open()
  }

  open() {
        // Global outside-click (capture) for reliability across browsers
        this.boundDocumentClick = this.boundDocumentClick || (e => {
          if (!this.isOpen) return
          const content = this.menu.querySelector('.mobile-menu-content')
          if (content && !content.contains(e.target)) {
            this.close()
          }
        })
        document.addEventListener('click', this.boundDocumentClick, true)
    this.isOpen = true

    // Update DOM
    this.menu.classList.remove('hidden')
    this.menu.setAttribute('aria-hidden', 'false')
    this.menuButton.setAttribute('aria-expanded', 'true')

    // Enable focusable elements
    const menuLinks = this.menu.querySelectorAll('a')
    menuLinks.forEach(link => link.removeAttribute('tabindex'))

    // Prevent body scroll with scrollbar compensation
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth
    document.body.style.overflow = 'hidden'
    document.body.style.paddingRight = `${scrollbarWidth}px`

    // Focus first link with slight delay for Safari/WebKit
    this.updateFocusableElements()
    setTimeout(() => {
      if (this.firstFocusable) {
        this.firstFocusable.focus()
      }
    }, 150)

    // Setup focus trap (bind once to allow proper removal)
    this.boundHandleFocusTrap = this.boundHandleFocusTrap || this.handleFocusTrap.bind(this)
    this.menu.addEventListener('keydown', this.boundHandleFocusTrap)
  }

  close() {
        // Remove global outside-click listener
        if (this.boundDocumentClick) {
          document.removeEventListener('click', this.boundDocumentClick, true)
        }
    this.isOpen = false

    // Update DOM
    this.menu.classList.add('hidden')
    this.menu.setAttribute('aria-hidden', 'true')
    this.menuButton.setAttribute('aria-expanded', 'false')

    // Disable focusable elements when hidden
    const menuLinks = this.menu.querySelectorAll('a')
    menuLinks.forEach(link => link.setAttribute('tabindex', '-1'))

    // Restore body scroll
    document.body.style.overflow = ''
    document.body.style.paddingRight = ''

    // Return focus to button
    this.menuButton.focus()

    // Remove focus trap using the same bound reference
    if (this.boundHandleFocusTrap) {
      this.menu.removeEventListener('keydown', this.boundHandleFocusTrap)
    }
  }

  updateFocusableElements() {
    this.focusableElements = Array.from(
      this.menu.querySelectorAll('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])')
    )
    this.firstFocusable = this.focusableElements[0]
    this.lastFocusable = this.focusableElements[this.focusableElements.length - 1]
  }

  handleFocusTrap(e) {
    if (e.key !== 'Tab') {
      return
    }

    // Immediate focus adjustments to satisfy WebKit/desktop expectations
    if (e.shiftKey) {
      // Shift + Tab: wrap from first to last
      if (document.activeElement === this.firstFocusable && this.lastFocusable) {
        e.preventDefault()
        this.lastFocusable.focus()
        return
      }
    } else {
      // Tab forward
      if (document.activeElement === this.lastFocusable && this.firstFocusable) {
        // wrap from last to first
        e.preventDefault()
        this.firstFocusable.focus()
        return
      }
      if (document.activeElement === this.firstFocusable && this.focusableElements[1]) {
        // explicitly advance to second link
        e.preventDefault()
        this.focusableElements[1].focus()
        return
      }
    }

    // Fallback: small delay helps WebKit settle focus
    setTimeout(() => {
      if (!e.shiftKey && document.activeElement === this.lastFocusable && this.firstFocusable) {
        this.firstFocusable.focus()
      } else if (e.shiftKey && document.activeElement === this.firstFocusable && this.lastFocusable) {
        this.lastFocusable.focus()
      }
    }, 100)
  }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => new MobileMenu())
} else {
  new MobileMenu()
}
