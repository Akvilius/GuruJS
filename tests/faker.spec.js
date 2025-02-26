
// Подключение тестов
import { test, expect } from '@playwright/test';
// Подключение фейкера
import { faker } from '@faker-js/faker';
//
import { MainPage } from '../src/pages/mainPage';
import { RegPage } from '../src/pages/regPage';
import { YoufeedPage } from '../src/pages/youfeedPage';


function getUsername() {
    return faker.person.firstName();
};

function getEmail() {
    return faker.internet.email();
};
function getPassword() {
    return faker.internet.password()
};


const URL_UI = 'https://realworld.qa.guru/';

test('Пользователь может авторизоваться', async ({page})=>{
  const username=getUsername();
  const email = getEmail();
  const password = getPassword({length: 10});
  const mainPage = new MainPage(page);
  const regPage = new RegPage(page);
  const youfeedPage = new YoufeedPage(page);

  await mainPage.open(URL_UI);
  await mainPage.gotoreg();
  // todo передать пользователя
  await regPage.reg(username,email,password);

  await expect(youfeedPage.profileNameField).toBeVisible();
  await expect(youfeedPage.profileNameField).toContainText(username);
  //await expect(page,getByText(youfeedPage.profileNameField));

});