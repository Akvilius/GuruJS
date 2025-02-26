
// Подключение тестов
import { test, expect } from '@playwright/test';
// Подключение фейкера
import { faker } from '@faker-js/faker';

function getUsername() {
    return faker.person.firstName();
};

function getEmail() {
    return faker.internet.email();
};
function getPassword() {
    return faker.internet.password()
};
//const  getPassword = () =>  faker.internet.password();

function newUser() {
   // return faker.internet.password()
};
test('Sing Up', async ({ page }) => {
    const USERNAME = getUsername();
  await page.goto('https://realworld.qa.guru/');
  await page.getByRole('link', { name: 'Sign up' }).click();
  await page.getByPlaceholder('Your Name').click();
  await page.getByPlaceholder('Your Name').fill(USERNAME);
  await page.getByPlaceholder('Email').click();
  await page.getByPlaceholder('Email').fill(getEmail());
  await page.getByPlaceholder('Password').click();
  await page.getByPlaceholder('Password').fill(getPassword());
  await page.getByRole('button', { name: 'Sign up' }).click();
  await expect(page.getByRole('navigation')).toContainText(USERNAME)
});

//Пользователь может опубликовать статью
test('Sing Up', async ({ page }) => {
    const USERNAME = getUsername();
  await page.goto('https://realworld.qa.guru/');
  await page.getByRole('link', { name: 'Sign up' }).click();
  await page.getByPlaceholder('Your Name').click();
  await page.getByPlaceholder('Your Name').fill(USERNAME);
  await page.getByPlaceholder('Email').click();
  await page.getByPlaceholder('Email').fill(getEmail());
  await page.getByPlaceholder('Password').click();
  await page.getByPlaceholder('Password').fill(getPassword());
  await page.getByRole('button', { name: 'Sign up' }).click();
  await expect(page.getByRole('navigation')).toContainText(USERNAME)
});

//Пользователь может оставить комментарий к статье
test('Sing Up', async ({ page }) => {
    const USERNAME = getUsername();
  await page.goto('https://realworld.qa.guru/');
  await page.getByRole('link', { name: 'Sign up' }).click();
  await page.getByPlaceholder('Your Name').click();
  await page.getByPlaceholder('Your Name').fill(USERNAME);
  await page.getByPlaceholder('Email').click();
  await page.getByPlaceholder('Email').fill(getEmail());
  await page.getByPlaceholder('Password').click();
  await page.getByPlaceholder('Password').fill(getPassword());
  await page.getByRole('button', { name: 'Sign up' }).click();
  await expect(page.getByRole('navigation')).toContainText(USERNAME)
});

//Пользователь может изменить пароль (не забудьте проверить, что можно залогиниться с новым паролем)
test('Sing Up', async ({ page }) => {
    const USERNAME = getUsername();
  await page.goto('https://realworld.qa.guru/');
  await page.getByRole('link', { name: 'Sign up' }).click();
  await page.getByPlaceholder('Your Name').click();
  await page.getByPlaceholder('Your Name').fill(USERNAME);
  await page.getByPlaceholder('Email').click();
  await page.getByPlaceholder('Email').fill(getEmail());
  await page.getByPlaceholder('Password').click();
  await page.getByPlaceholder('Password').fill(getPassword());
  await page.getByRole('button', { name: 'Sign up' }).click();
  await expect(page.getByRole('navigation')).toContainText(USERNAME)
});