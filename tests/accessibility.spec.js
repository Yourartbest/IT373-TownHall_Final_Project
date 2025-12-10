import { test, expect } from '@playwright/test'

test.describe('Accessibility', () => {
  test('should have proper document structure', async ({ page }) => {
    await page.goto('/')
    
    // Check for single h1
    const h1Count = await page.locator('h1').count()
    expect(h1Count).toBe(1)
    
    // Check for proper heading hierarchy
    const h2s = await page.locator('h2').count()
    expect(h2s).toBeGreaterThan(0)
  })

  test('should have ARIA landmarks', async ({ page }) => {
    await page.goto('/')
    
    // Check for main landmark
    const main = page.locator('main[role="main"]')
    await expect(main).toBeVisible()
    
    // Check for banner (header)
    const banner = page.locator('header[role="banner"]')
    await expect(banner).toBeVisible()
    
    // Check for contentinfo (footer)
    const footer = page.locator('footer[role="contentinfo"]')
    await expect(footer).toBeVisible()
  })

  test('should have alt text for all images', async ({ page }) => {
    await page.goto('/')
    
    const images = page.locator('img')
    const count = await images.count()
    
    for (let i = 0; i < count; i++) {
      const img = images.nth(i)
      const alt = await img.getAttribute('alt')
      expect(alt).toBeTruthy()
    }
  })

  test('should have proper focus indicators', async ({ page }) => {
    await page.goto('/')
    
    // Tab to first focusable element (skip link)
    await page.keyboard.press('Tab')
    
    // Check that something is focused
    const focused = await page.evaluate(() => {
      return document.activeElement !== document.body
    })
    
    expect(focused).toBeTruthy()
  })

  test('should have proper button labels', async ({ page }) => {
    await page.goto('/')
    
    const buttons = page.locator('button')
    const count = await buttons.count()
    
    for (let i = 0; i < count; i++) {
      const button = buttons.nth(i)
      
      // Button should have either text content or aria-label
      const text = await button.textContent()
      const ariaLabel = await button.getAttribute('aria-label')
      
      expect(text || ariaLabel).toBeTruthy()
    }
  })

  test('should have proper link text', async ({ page }) => {
    await page.goto('/')
    
    const links = page.locator('a')
    const count = await links.count()
    
    for (let i = 0; i < count; i++) {
      const link = links.nth(i)
      const text = await link.textContent()
      const ariaLabel = await link.getAttribute('aria-label')
      
      // Links should have meaningful text or aria-label
      expect((text?.trim() || ariaLabel)?.length).toBeGreaterThan(0)
    }
  })

  test('should have proper color contrast', async ({ page }) => {
    await page.goto('/')
    
    // Check that primary text is visible (basic smoke test)
    const heroText = page.locator('.hero-text')
    await expect(heroText).toBeVisible()
    
    // In a real project, you'd use axe-core or similar for contrast checking
  })

  test('should support keyboard navigation', async ({ page }) => {
    await page.goto('/')
    
    // Tab through several elements
    for (let i = 0; i < 5; i++) {
      await page.keyboard.press('Tab')
    }
    
    // Check that we've moved focus
    const activeElement = await page.evaluate(() => {
      return document.activeElement?.tagName
    })
    
    expect(['A', 'BUTTON', 'INPUT']).toContain(activeElement)
  })
})
