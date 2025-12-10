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
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen) {
        this.close()
      }
    })
    
    // Close on link click
    const menuLinks = this.menu.querySelectorAll('a')
    menuLinks.forEach(link => {
      link.addEventListener('click', () => this.close())
    })
    
    // Close on outside click
    this.menu.addEventListener('click', (e) => {
      if (e.target === this.menu) {
        this.close()
      }
    })
    
    // Update focusable elements
    this.updateFocusableElements()
  }
  
  toggle() {
    this.isOpen ? this.close() : this.open()
  }
  
  open() {
    this.isOpen = true
    
    // Update DOM
    this.menu.classList.remove('hidden')
    this.menu.setAttribute('aria-hidden', 'false')
    this.menuButton.setAttribute('aria-expanded', 'true')
    
    // Prevent body scroll with scrollbar compensation
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth
    document.body.style.overflow = 'hidden'
    document.body.style.paddingRight = `${scrollbarWidth}px`
    
    // Focus first link
    this.updateFocusableElements()
    if (this.firstFocusable) {
      this.firstFocusable.focus()
    }
    
    // Setup focus trap
    this.menu.addEventListener('keydown', this.handleFocusTrap.bind(this))
  }
  
  close() {
    this.isOpen = false
    
    // Update DOM
    this.menu.classList.add('hidden')
    this.menu.setAttribute('aria-hidden', 'true')
    this.menuButton.setAttribute('aria-expanded', 'false')
    
    // Restore body scroll
    document.body.style.overflow = ''
    document.body.style.paddingRight = ''
    
    // Return focus to button
    this.menuButton.focus()
    
    // Remove focus trap
    this.menu.removeEventListener('keydown', this.handleFocusTrap.bind(this))
  }
  
  updateFocusableElements() {
    this.focusableElements = Array.from(
      this.menu.querySelectorAll('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])')
    )
    this.firstFocusable = this.focusableElements[0]
    this.lastFocusable = this.focusableElements[this.focusableElements.length - 1]
  }
  
  handleFocusTrap(e) {
    if (e.key !== 'Tab') return
    
    if (e.shiftKey) {
      // Shift + Tab
      if (document.activeElement === this.firstFocusable) {
        e.preventDefault()
        this.lastFocusable.focus()
      }
    } else {
      // Tab
      if (document.activeElement === this.lastFocusable) {
        e.preventDefault()
        this.firstFocusable.focus()
      }
    }
  }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => new MobileMenu())
} else {
  new MobileMenu()
}
