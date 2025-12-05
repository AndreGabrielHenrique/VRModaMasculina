import { test } from '@playwright/test'

test('visual snapshots: home, products, cart', async ({ page }) => {
  await page.goto('/')

  // full page home screenshot
  await page.screenshot({ path: 'test-results/visual/home-full.png', fullPage: true })

  // products section
  const products = page.locator('section.produtos')
  if (await products.count() > 0) {
    await products.first().screenshot({ path: 'test-results/visual/products.png' })
  }

  // open cart and capture
  const cartButton = page.locator('button[aria-label="Abrir carrinho"]')
  if (await cartButton.isVisible()) {
    await cartButton.click()
    await page.waitForTimeout(300)
    const cart = page.locator('section.carrinho')
    if (await cart.count() > 0) {
      await cart.first().screenshot({ path: 'test-results/visual/cart.png' })
    } else {
      await page.screenshot({ path: 'test-results/visual/cart-fallback.png', fullPage: true })
    }
  }
})
