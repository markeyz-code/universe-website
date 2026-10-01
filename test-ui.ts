import { test, expect } from '@playwright/test';
test('test signup flow', async ({ page }) => {
  await page.goto('http://localhost:3001/register');
  await page.fill('#firstName', 'Test');
  await page.fill('#lastName', 'User');
  await page.fill('#email', 'test@example.com');
  await page.fill('#password', 'Password123!');
  await page.click('button[type="submit"]');
  await page.waitForTimeout(2000);
  const text = await page.innerText('body');
  console.log("BODY AFTER SUBMIT:");
  console.log(text.substring(0, 1000));
});
