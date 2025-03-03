
// Подключение тестов
import { test, expect } from '@playwright/test';

import { UserBuilder, ArticleBuilder, CommentBuilder} from '../src/helpers/builder/index';
import { MainPage, RegPage, YoufeedPage, EditorPage, ArticlePage, SettingPage, LoginPage } from '../src/pages/index';



const URL_UI = 'https://realworld.qa.guru/';

test.describe ('Урок 5', ()=>{

    test.beforeEach(async({page})=>{ //Создание пользователя
        
        const mainPage = new MainPage(page);
        const regPage = new RegPage(page);
        const userBuilder = new UserBuilder()
            .addEmail()
            .addPassword()
            .addUsername()
            .genereteUser();

        await mainPage.open(URL_UI);
        await mainPage.goToReg();
        await regPage.reg(userBuilder.userName,userBuilder.userEmail,userBuilder.userPassword,);

    });

    test('Пользователь может опубликовать статью', async ({page})=>{ 

        const youfeedPage = new YoufeedPage(page);
        const editorPage = new EditorPage(page);
        const articlePage = new ArticlePage(page);
        const article = new ArticleBuilder()
            .addTitle()
            .addAbout()
            .addBody()
            .addTag()
            .genereteArticle();

        await youfeedPage.goToNewArticle();
        await editorPage.publishNewArticle(article.articleTitle,article.articleAbout,article.articleBody,article.articleTag);
        await expect(articlePage.paragraphField).toContainText(article.articleTitle);
    });

    test('Пользователь может оставить комментарий к статье', async ({page})=>{ 
        const articlePage = new ArticlePage(page);
        const youfeedPage = new YoufeedPage(page);
        const editorPage = new EditorPage(page);
        const article = new ArticleBuilder()
            .addTitle()
            .addAbout()
            .addBody()
            .addTag()
            .genereteArticle();
        const commentBuilder = new CommentBuilder()
            .addBody()
            .genereteComment();
        await youfeedPage.goToNewArticle();
        await editorPage.publishNewArticle(article.articleTitle,article.articleAbout,article.articleBody,article.articleTag); //Создаём статью

        //await globalFeedPage.gotoaricle(article.title);// Находим её. Не обязательно т.к. после создания сразу в неё проваливаемся
        await articlePage.addComment(commentBuilder.commentBody);
        await expect(page.locator('.card-text').last()).toContainText(commentBuilder.commentBody);//было падение из-за 2 комментариев к новости, поэтому смотрим на посследний
    });

    test('Пользователь может изменить пароль', async ({page})=>{ 
        const password =  new UserBuilder().addPassword(10);

        const mainPage = new MainPage(page);
        const youfeedPage = new YoufeedPage(page);
        const settingPage = new SettingPage (page);
        const loginPage = new LoginPage(page);

        await youfeedPage.goToSetting();
        const username = await page.getByPlaceholder('Your Name').inputValue(); // сохранием пользователя и почту для повторной авторизации
        const email = await page.getByPlaceholder('Email').inputValue();
        await settingPage.updatePassword(password.userPassword);

        await expect(settingPage.updateSettingButton).not.toBeVisible(); // Проверяем что изменения сохранились

        await youfeedPage.logout();
        await mainPage.goToLogin();
        await loginPage.login(email,password.userPassword);

        await expect(youfeedPage.profileNameField).toBeVisible();
        await expect(youfeedPage.profileNameField).toContainText(username);

    });
})
