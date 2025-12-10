import { test, expect } from '@playwright/test'

test.describe('Mobile Menu Workflow', () => {
  test.beforeEach(async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto('/')
  })

  test('should open mobile menu when button clicked', async ({ page }) => {
    const menuBtn = page.locator('.mobile-menu-btn')
    const mobileMenu = page.locator('#mobile-menu')
    
    // Menu should be hidden initially
    await expect(mobileMenu).toHaveClass(/hidden/)
    await expect(menuBtn).toHaveAttribute('aria-expanded', 'false')
    
    // Click to open
    await menuBtn.click()
    
    // Menu should be visible
    await expect(mobileMenu).not.toHaveClass(/hidden/)
    await expect(menuBtn).toHaveAttribute('aria-expanded', 'true')
    await expect(mobileMenu).toHaveAttribute('aria-hidden', 'false')
  })

  test('should close mobile menu when clicking outside', async ({ page }) => {
    const menuBtn = page.locator('.mobile-menu-btn')
    const mobileMenu = page.locator('#mobile-menu')
    
    // Open menu
    await menuBtn.click()
    await expect(mobileMenu).not.toHaveClass(/hidden/)
    
    // Click outside (on the overlay)
    await mobileMenu.click({ position: { x: 10, y: 10 } })
    
    // Menu should close
    await expect(mobileMenu).toHaveClass(/hidden/)
    await expect(menuBtn).toHaveAttribute('aria-expanded', 'false')
  })

  test('should close mobile menu when pressing Escape', async ({ page }) => {
    const menuBtn = page.locator('.mobile-menu-btn')
    const mobileMenu = page.locator('#mobile-menu')
    
    // Open menu
    await menuBtn.click()
    await expect(mobileMenu).not.toHaveClass(/hidden/)
    
    // Press Escape
    await page.keyboard.press('Escape')
    
    // Menu should close
    await expect(mobileMenu).toHaveClass(/hidden/)
  })

  test('should have accessible navigation links', async ({ page }) => {
    const menuBtn = page.locator('.mobile-menu-btn')
    
    // Open menu
    await menuBtn.click()
    
    // Check navigation links
    const navLinks = page.locator('.mobile-menu-link')
    await expect(navLinks).toHaveCount(4)
    
    // All links should be visible and have text
    for (let i = 0; i < 4; i++) {
      const link = navLinks.nth(i)
      await expect(link).toBeVisible()
      const text = await link.textContent()
      expect(text.length).toBeGreaterThan(0)
    }
  })

  test('should trap focus within mobile menu', async ({ page }) => {
    const menuBtn = page.locator('.mobile-menu-btn')
    
    // Open menu
    await menuBtn.click()
    
    // Tab through menu items
    const firstLink = page.locator('.mobile-menu-link').first()
    await expect(firstLink).toBeFocused()
    
    // Tab to next items
    await page.keyboard.press('Tab')
    const secondLink = page.locator('.mobile-menu-link').nth(1)
    await expect(secondLink).toBeFocused()
  })

  test('should have proper ARIA attributes', async ({ page }) => {
    const menuBtn = page.locator('.mobile-menu-btn')
    const mobileMenu = page.locator('#mobile-menu')
    
    // Check button ARIA
    await expect(menuBtn).toHaveAttribute('aria-controls', 'mobile-menu')
    await expect(menuBtn).toHaveAttribute('aria-label')
    
    // Check menu ARIA
    await expect(mobileMenu).toHaveAttribute('role', 'dialog')
    await expect(mobileMenu).toHaveAttribute('aria-modal', 'true')
  })

  test('should prevent body scroll when menu is open', async ({ page }) => {
    const menuBtn = page.locator('.mobile-menu-btn')
    
    // Open menu
    await menuBtn.click()
    
    // Body should have overflow hidden (check via JS)
    const bodyOverflow = await page.evaluate(() => {
      return window.getComputedStyle(document.body).overflow
    })
    
    expect(bodyOverflow).toBe('hidden')
  })
})
