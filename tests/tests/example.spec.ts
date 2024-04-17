import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Xojo/);
});

test('has a "press me" button', async ({page}) => {
  await page.goto('/');
  await expect(page.getByTestId('test-btn')).toHaveText('Press me');
});
