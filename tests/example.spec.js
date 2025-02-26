/*
// @ts-check
const { test, expect } = require('@playwright/test');

test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});
*/

// @ts-check
//import {test, expect} from @playwright/test
//const { test, expect } = require('@playwright/test');

//test('reg_form', async ({ page }) => {
//  await page.goto('https://mc-stage.zveno.io/')
    //Поиск элемента по типу
// await page.getByRole('textbox', { name: 'login' }).click();
// await page.getByRole('textbox', { name: 'Email'}).fill('23');
 //Поиск элемента по классу
 // page.locator('.el-input__wrapper', {name: 'authorization-form-login-input'});

//.fill('23');
 // await page
//.locator('.el-button').click();

//.locator('#btn').click();
//});

