import { test, expect } from '@playwright/test';
//const { test, expect } = require('@playwright/test');

test('ntest', async ({ page }) => {
  await page.goto('https://realworld.qa.guru/');
  await page.getByRole('link', { name: 'Login' }).click();
  await page.getByPlaceholder('Email').click();
  await page.getByPlaceholder('Email').fill('Ganzeev@gmail.com');
  await page.getByPlaceholder('Password').click();
  await page.getByPlaceholder('Password').fill('bB!123456');
  await page.getByRole('button', { name: 'Login' }).click();
  //await expect(page).toHaveTitle(/conduit/)
});