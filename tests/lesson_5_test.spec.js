
// Подключение тестов
import { test, expect } from '@playwright/test';
// Подключение фейкера
import { faker } from '@faker-js/faker';
//
import { MainPage } from '../src/pages/mainPage';
import { RegPage } from '../src/pages/regPage';
import { YoufeedPage } from '../src/pages/youfeedPage';
import { EditorPage } from '../src/pages/editorPage';
import { ArticlePage } from '../src/pages/articlePage';
import { GlobalFeedPage } from '../src/pages/globalFeedPage';
import { SettingPage } from '../src/pages/settingPage';
import { LoginPage } from '../src/pages/loginPage';

const URL_UI = 'https://realworld.qa.guru/';

test.describe ('Урок 5', ()=>{

    test.beforeEach(async({page})=>{ //Пользователь может авторизоваться
        const user ={
            name: faker.person.firstName(),
            email: faker.internet.email(),
            password: faker.internet.password({length: 10})
        };
    
        const mainPage = new MainPage(page);
        const regPage = new RegPage(page);
        const youfeedPage = new YoufeedPage(page);

        await mainPage.open(URL_UI);
        await mainPage.gotoreg();
        await regPage.reg(user.name,user.email,user.password);
      
        await expect(youfeedPage.profileNameField).toBeVisible();
        await expect(youfeedPage.profileNameField).toContainText(user.name);

    });

    test('Пользователь может опубликовать статью', async ({page})=>{ 
        const article = {
                title: `Akva ${faker.lorem.sentence(2)} `,
                about: faker.lorem.sentence(5),
                body: faker.lorem.paragraph(5),
                tag: 'My_test',
            };
        const youfeedPage = new YoufeedPage(page);
        const editorPage = new EditorPage(page);
        const articlePage = new ArticlePage(page);

        await youfeedPage.gotonewarticle();
        await editorPage.publishnewarticle(article.title,article.about,article.body,article.tag);
        await expect(articlePage.paragraphField).toContainText(article.title);
    });

    test('Пользователь может оставить комментарий к статье', async ({page})=>{ 
        const comment = faker.lorem.sentence(5);
        const mainPage = new MainPage(page);
        const globalFeedPage = new GlobalFeedPage(page);
        const articlePage = new ArticlePage(page);

        await globalFeedPage.gotoaricle();
        await articlePage.addComment(comment);
        await expect(page.locator('.card-text').last()).toContainText(comment);//было падение из-за 2 комментариев к новости, поэтому смотрим на посследний
    });

    test('Пользователь может изменить пароль', async ({page})=>{ 
        const password = faker.internet.password({length: 10});
      

        const mainPage = new MainPage(page);
        const youfeedPage = new YoufeedPage(page);
        const settingPage = new SettingPage (page);
        const loginPage = new LoginPage(page);

        await youfeedPage.gotosetting();
        const username = await page.getByPlaceholder('Your Name').inputValue(); // сознанием пользователя и почту для повторной авторизации
        const email = await page.getByPlaceholder('Email').inputValue();
        await settingPage.updatepassword(password);

        await expect(settingPage.updatesettingButton).not.toBeVisible(); // Проверяем что изменения сохранились

        await youfeedPage.logout();
        await mainPage.gotologin();
        await loginPage.login(email,password);

        await expect(youfeedPage.profileNameField).toBeVisible();
        await expect(youfeedPage.profileNameField).toContainText(username);

    });
})
