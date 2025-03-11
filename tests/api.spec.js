
// Подключение тестов
import { test, expect } from '@playwright/test';
import { ChallengerService,ChallengesService, TodosService }  from '../src/service/index';

// вынести в конфиги
let token, challengerService;
const URL_UI = 'https://apichallenges.herokuapp.com/';

test.describe ('Challenge', ()=>{

    
    test.beforeAll(async ({request}) => {

        challengerService = new ChallengerService(request);
        const response = await challengerService.post();
        expect (response.status()).toBe(201);
        const headers = await response.headers();
        token = headers['x-challenger'];
        console.log('Это токен: '+token);
    });

    test('GET /challenges (200)', async ({request})=>{ 
        const challengesService = new ChallengesService(request);
        const response = await challengesService.get(token);
        const body = await response.json();
        expect (response.status()).toBe(200);
        expect (body.challenges.length).toBe(59);
    });

    test('GET /todos (200)', async ({request})=>{ 
        const todosService = new TodosService(request);
        const response = await todosService.getTodos(token);
        expect (response.status()).toBe(200);
        //expect (body.challenges.length).toBe(59);
    });

    test('GET /todo (404) not plural', async ({request})=>{ 
        const todoService = new TodosService(request);
        const response = await todoService.getTodo(token);
        expect (response.status()).toBe(404);
        //expect (body.challenges.length).toBe(59);
    });

    test('GET /todos/{id} (200)', async ({request})=>{ 
        const todoidService = new TodosService(request);
        const response = await todoidService.getTodosId(token,1);
        expect (response.status()).toBe(200);
        //expect (body.challenges.length).toBe(59);
    });

    test('GET /todos/{id} (404)', async ({request})=>{ 
        const todoidService = new TodosService(request);
        const response = await todoidService.getTodosId(token,99);
        expect (response.status()).toBe(404);
        //expect (body.challenges.length).toBe(59);
    });

    test('POST /todos/ (201)', async({ request }) => {
        const postTodosService = new TodosService(request);
        const response = await postTodosService.postTodos(token);
        expect (response.status()).toBe(201);
        //expect (body.challenges.length).toBe(59);
    });

    test('GET /todos (200) ?filter', async ({request})=>{ 
        const TodosFilterService = new TodosService(request);
        const response = await TodosFilterService.getTodosFilter(token);
        expect (response.status()).toBe(200);
        //expect (body.challenges.length).toBe(59);
    });

    test('	HEAD /todos (200)', async({ request }) => {
        const headTodosService = new TodosService(request);
        const response = await headTodosService.headTodos(token);
        expect (response.status()).toBe(200);
        //expect (body.challenges.length).toBe(59);
    });
    
    //Добавить конструктор для todos
    test('POST /todos/ (400) doneStatus', async({ request }) => {
        const postTodosService = new TodosService(request);
        const response = await postTodosService.postTodos(token);
        expect (response.status()).toBe(201);
        //expect (body.challenges.length).toBe(59);
    });
})
