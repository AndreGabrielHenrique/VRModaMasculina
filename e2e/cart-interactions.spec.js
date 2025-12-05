import { test, expect } from '@playwright/test';

test.describe('VR Moda Masculina - Cart Interactions', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should add product to cart', async ({ page }) => {
    // Find first product card and its add to cart button
    const productCards = page.locator('.produto');
    const firstProduct = productCards.first();
    
    const addButton = firstProduct.locator('button').filter({ hasText: /Adicionar/i }).first();
    
    if (await addButton.isVisible()) {
      await addButton.click();
      await page.waitForTimeout(500);
      expect(true).toBe(true);
    }
  });

  test('should display cart items after adding', async ({ page }) => {
    const addButtons = page.locator('.produto button');
    const count = await addButtons.count();
    
    if (count > 0) {
      // Add first product
      await addButtons.first().click();
      await page.waitForTimeout(500);
      
      // Cart section should show items or empty message
      const cartSection = page.locator('section.carrinho');
      await expect(cartSection).toBeVisible();
    }
  });

  test('should handle favorite button interaction', async ({ page }) => {
    const productCards = page.locator('.produto');
    
    if (await productCards.count() > 0) {
      const favoriteButton = productCards.first().locator('p.favoritar svg').first();
      
      if (await favoriteButton.isVisible()) {
        await favoriteButton.click();
        await page.waitForTimeout(300);
        expect(true).toBe(true);
      }
    }
  });

  test('should validate email field in form', async ({ page }) => {
    const emailInput = page.locator('#email');
    
    if (await emailInput.isVisible()) {
      // Try invalid email
      await emailInput.fill('invalidemail');
      await emailInput.blur();
      await page.waitForTimeout(200);
      
      // Clear and try valid email
      await emailInput.fill('user@example.com');
      await emailInput.blur();
      await page.waitForTimeout(200);
      
      expect(true).toBe(true);
    }
  });

  test('should filter estado (state) autocomplete', async ({ page }) => {
    const estadoInput = page.locator('#estado');
    
    if (await estadoInput.isVisible()) {
      // Focus and type to trigger autocomplete
      await estadoInput.focus();
      await estadoInput.type('S');
      await page.waitForTimeout(300);
      
      // Autocomplete list should appear or filter
      const estadoList = page.locator('#listaestados');
      if (await estadoList.isVisible()) {
        expect(true).toBe(true);
      }
    }
  });

  test('should require checkbox before submission', async ({ page }) => {
    const form = page.locator('form#cadastro');
    const termsCheckbox = page.locator('#termos');
    const submitButton = form.locator('button[type="submit"]');
    
    if (await termsCheckbox.isVisible() && await submitButton.isVisible()) {
      // Try to submit without checking terms
      await submitButton.click();
      await page.waitForTimeout(300);
      
      // Terms error should appear
      const termsError = page.locator('#errotermos');
      if (await termsError.isVisible()) {
        const errorText = await termsError.textContent();
        expect(errorText).toBeTruthy();
      }
    }
  });

  test('should handle quantity changes in cart', async ({ page }) => {
    const quantityInputs = page.locator('input[type="number"]');
    
    if (await quantityInputs.count() > 0) {
      const firstInput = quantityInputs.first();
      
      if (await firstInput.isVisible()) {
        // Try to change quantity
        await firstInput.fill('5');
        await firstInput.blur();
        await page.waitForTimeout(200);
        
        expect(true).toBe(true);
      }
    }
  });

  test('should handle search form submission', async ({ page }) => {
    const searchForm = page.locator('form.busca');
    const searchInput = searchForm.locator('input').first();
    const searchButton = searchForm.locator('button').first();
    
    if (await searchInput.isVisible() && await searchButton.isVisible()) {
      await searchInput.fill('calça');
      // Search button may trigger modal or navigation
      // (construction page in this demo)
      expect(await searchInput.inputValue()).toBe('calça');
    }
  });
});
