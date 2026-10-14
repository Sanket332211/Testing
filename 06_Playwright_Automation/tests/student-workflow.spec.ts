import { test, expect } from '@playwright/test';

/**
 * AbleSpace E2E Test Suite
 * Evaluates core user flow:
 * Authentication -> Caseload Management -> Student Search & Form Validation
 *
 * Rules followed:
 * - Credentials loaded securely from environment variables (.env).
 * - Stable, accessible locators (roles, text, accessible labels).
 * - Meaningful assertions and descriptive test steps.
 */

test.describe('AbleSpace Caseload and Student Workflows', () => {
  const userEmail = process.env.ABLESPACE_USER_EMAIL || '';
  const userPassword = process.env.ABLESPACE_USER_PASSWORD || '';

  test.beforeEach(async ({ page }) => {
    // Verify that environment variables are supplied
    if (!userEmail || !userPassword) {
      console.warn(
        'Warning: ABLESPACE_USER_EMAIL or ABLESPACE_USER_PASSWORD is not set. Please configure .env file.'
      );
    }

    // Navigate to base staging URL
    await page.goto('/');
  });

  test('TC-E2E-01: User should log in and verify caseload dashboard is rendered', async ({ page }) => {
    // 1. Locate and fill Email input
    const emailInput = page.getByRole('textbox', { name: /email/i })
      .or(page.getByPlaceholder(/email|enter email/i))
      .or(page.locator('input[type="email"]'));
    await expect(emailInput.first()).toBeVisible({ timeout: 15000 });
    await emailInput.first().fill(userEmail);

    // 2. Locate and fill Password input
    const passwordInput = page.getByRole('textbox', { name: /password/i })
      .or(page.getByPlaceholder(/password/i))
      .or(page.locator('input[type="password"]'));
    await expect(passwordInput.first()).toBeVisible();
    await passwordInput.first().fill(userPassword);

    // 3. Click Login / Sign in button
    const loginButton = page.getByRole('button', { name: /log in|sign in|continue/i });
    await expect(loginButton.first()).toBeEnabled();
    await loginButton.first().click();

    // 4. Assert successful login by verifying dashboard / caseload URL and elements
    await expect(page).toHaveURL(/.*(dashboard|students|home|caseload).*/i, { timeout: 20000 });

    // 5. Verify presence of main Caseload or Students navigation heading
    const mainHeading = page.getByRole('heading', { name: /students|caseload|dashboard/i })
      .or(page.getByText(/my students|caseload/i));
    await expect(mainHeading.first()).toBeVisible();
  });

  test('TC-E2E-02: Should search for a student in caseload and verify filtered results', async ({ page }) => {
    // 1. Perform login
    const emailInput = page.locator('input[type="email"]').or(page.getByPlaceholder(/email/i));
    const passwordInput = page.locator('input[type="password"]').or(page.getByPlaceholder(/password/i));
    await emailInput.first().fill(userEmail);
    await passwordInput.first().fill(userPassword);
    await page.getByRole('button', { name: /log in|sign in|continue/i }).first().click();

    // 2. Wait for Caseload view
    await page.waitForLoadState('networkidle');

    // 3. Locate search bar
    const searchInput = page.getByPlaceholder(/search student|search caseload|search/i)
      .or(page.getByRole('searchbox'));
    await expect(searchInput.first()).toBeVisible({ timeout: 15000 });

    // 4. Execute search for student test data
    const searchTerm = 'Alex';
    await searchInput.first().fill(searchTerm);
    await page.keyboard.press('Enter');

    // 5. Assert that filtered table row or matching card appears
    const resultItem = page.getByRole('cell', { name: new RegExp(searchTerm, 'i') })
      .or(page.getByText(new RegExp(searchTerm, 'i')));
    await expect(resultItem.first()).toBeVisible({ timeout: 10000 });
  });

  test('TC-E2E-03: Should trigger mandatory validation when submitting empty Add Student form', async ({ page }) => {
    // 1. Perform login
    const emailInput = page.locator('input[type="email"]').or(page.getByPlaceholder(/email/i));
    const passwordInput = page.locator('input[type="password"]').or(page.getByPlaceholder(/password/i));
    await emailInput.first().fill(userEmail);
    await passwordInput.first().fill(userPassword);
    await page.getByRole('button', { name: /log in|sign in|continue/i }).first().click();

    await page.waitForLoadState('networkidle');

    // 2. Click "+ Add Student" button
    const addStudentBtn = page.getByRole('button', { name: /add student|new student/i });
    await expect(addStudentBtn.first()).toBeVisible({ timeout: 15000 });
    await addStudentBtn.first().click();

    // 3. Attempt to save immediately without entering any values
    const submitBtn = page.getByRole('button', { name: /save|save student|submit/i });
    await expect(submitBtn.first()).toBeVisible();
    await submitBtn.first().click();

    // 4. Verify that validation error message is rendered
    const validationError = page.getByText(/required|first name is required|please enter/i);
    await expect(validationError.first()).toBeVisible({ timeout: 5000 });
  });
});
