
// Подключение тестов
import { test, expect } from '@playwright/test';
import { ChallengerService,ChallengesService, TodosService }  from '../src/service/index';
import { TodosBuilder } from '../src/helper/todos.builder';

// вынести в конфиги
let token, challengerService;
const URL = 'https://apichallenges.herokuapp.com/';

test.describe ('Challenge', ()=>{

 //1   
    test.beforeAll(async ({request}) => {

        challengerService = new ChallengerService(request);
        const response = await challengerService.post();
        expect (response.status()).toBe(201);
        const headers = await response.headers();
        token = headers['x-challenger'];
        console.log('Это токен: '+token);
    });
//2
    test('GET /challenges (200)', async ({request})=>{ 
        const challengesService = new ChallengesService(request);
        const response = await challengesService.get(token);
        const body = await response.json();
        expect (response.status()).toBe(200);
        expect (body.challenges.length).toBe(59);
    });
//3
    test('GET /todos (200)', async ({request})=>{ 
        const header = {
            'x-challenger': token,
        };
        const todosService = new TodosService(request);
        const response = await todosService.getTodos(header);
        expect (response.status()).toBe(200);
        //expect (body.challenges.length).toBe(59);
    });
//4
    test('GET /todo (404) not plural', async ({request})=>{ 
        const header = {
            'x-challenger': token,
        };
        const todoService = new TodosService(request);
        const response = await todoService.getTodo(header);
        expect (response.status()).toBe(404);
        //expect (body.challenges.length).toBe(59);
    });
//5
    test('GET /todos/{id} (200)', async ({request})=>{ 
        const header = {
            'x-challenger': token,
        };
        const todoidService = new TodosService(request);
        const response = await todoidService.getTodosId(header,1);
        expect (response.status()).toBe(200);
        //expect (body.challenges.length).toBe(59);
    });
//6
    test('GET /todos/{id} (404)', async ({request})=>{ 
        const header = {
            'x-challenger': token,
        };
        const todoidService = new TodosService(request);
        const response = await todoidService.getTodosId(header,99);
        expect (response.status()).toBe(404);
        //expect (body.challenges.length).toBe(59);
    });
//7
    test('GET /todos (200) ?filter', async ({request})=>{ 
        const header = {
            'x-challenger': token,
        };
        const postTodosService = new TodosService(request);
        const body = new TodosBuilder().addTitle().addDoneStatus().addDescription().genereteTodos();
        await postTodosService.postTodos(header,body);
        const TodosFilterService = new TodosService(request);
        const response = await TodosFilterService.getTodosFilter(header);
        expect (response.status()).toBe(200);
        //expect (body.challenges.length).toBe(59);
    });
//8
    test('	HEAD /todos (200)', async({ request }) => {
        const headTodosService = new TodosService(request);
        const response = await headTodosService.headTodos(token);
        expect (response.status()).toBe(200);
        //expect (body.challenges.length).toBe(59);
    });
 //9   
    test('POST /todos/ (201)', async({ request }) => {
        const header = {
            'x-challenger': token,
        };
        const postTodosService = new TodosService(request);
        const body = new TodosBuilder().addTitle().addDoneStatus().addDescription().genereteTodos();
        const response = await postTodosService.postTodos(header,body);
        expect (response.status()).toBe(201);
        //expect (body.challenges.length).toBe(59);
    });
//10
    test('POST /todos/ (400) doneStatus', async({ request }) => {
        const header = {
            'x-challenger': token,
        };
        const body = new TodosBuilder().addTitle(2).addDoneStatus(10).addDescription(1).genereteTodos();
        const postTodosService = new TodosService(request);
        const response = await postTodosService.postTodos(header,body);
        expect (response.status()).toBe(400);
        //expect (body.challenges.length).toBe(59);
    });
//11
    test('POST /todos (400) title too long', async({ request }) => {
        const header = {
            'x-challenger': token,
        };
        const body = new TodosBuilder().addTitle(100).addDoneStatus().addDescription(50).genereteTodos();
        const postTodosService = new TodosService(request);
        const response = await postTodosService.postTodos(header,body);
        expect (response.status()).toBe(400);
        //expect (body.challenges.length).toBe(59);
    });
//12
    test('POST /todos (400) description too long', async({ request }) => {
        const header = {
            'x-challenger': token,
        };
        const body = new TodosBuilder().addTitle(20).addDoneStatus().addDescription(201).genereteTodos();
        const postTodosService = new TodosService(request);
        const response = await postTodosService.postTodos(header,body);
        expect (response.status()).toBe(400);
        //expect (body.challenges.length).toBe(59);
    });
//13
    test('POST /todos (201) max out content', async({ request }) => {
        const header = {
            'x-challenger': token,
        };
        const body = new TodosBuilder().addTitle(50).addDoneStatus().addDescription(200).genereteTodos();
        const postTodosService = new TodosService(request);
        const response = await postTodosService.postTodos(header,body);
        expect (response.status()).toBe(201);
        //expect (body.challenges.length).toBe(59);
    });
//14
    test('POST /todos (413) content too long', async({ request }) => {
        const header = {
            'x-challenger': token,
        };
        const body = new TodosBuilder().addTitle(20).addDoneStatus().addDescription(5001).genereteTodos();
        const postTodosService = new TodosService(request);
        const response = await postTodosService.postTodos(header,body);
        expect (response.status()).toBe(413);
        //expect (body.challenges.length).toBe(59);
    });
//15
    test('POST /todos (400) extra', async({ request }) => {
        const header = {
            'x-challenger': token,
        };
        const body = new TodosBuilder().addTitle(20).addDoneStatus().addDescription(50).genereteTodos();
        body.extra = '';
        const postTodosService = new TodosService(request);
        const response = await postTodosService.postTodos(header,body);
        expect (response.status()).toBe(400);
        //expect (body.challenges.length).toBe(59);
    });

//16
    test('PUT /todos/{id} (400)', {tag: '@CreationPUT'}, async ({request})=>{ 

        const body = new TodosBuilder().addTitle().addDoneStatus().addDescription().genereteTodos();
        const todoidService = new TodosService(request);
        const todosList = await todoidService.getTodos(token);
        const count = await todosList.json();
        const response = await todoidService.putTodos(token,body,count.todos.length+10);
        expect (response.status()).toBe(400);
        //expect (body.challenges.length).toBe(59);
    });
//17
    test('POST /todos/{id} (200)', {tag: '@UpdatePOST'}, async ({request})=>{ 

        const body = new TodosBuilder().addTitle().addDoneStatus().addDescription().genereteTodos();
        const todoidService = new TodosService(request);
        const todosList = await todoidService.getTodos(token);
        const count = await todosList.json();
        const response = await todoidService.postTodosId(token,body,count.todos.length);
        expect (response.status()).toBe(200);
        //expect (body.challenges.length).toBe(59);
    });
//18
    test('POST /todos/{id} (404)', {tag: '@UpdatePOST'}, async ({request})=>{ 

        const body = new TodosBuilder().addTitle().addDoneStatus().addDescription().genereteTodos();
        const todoidService = new TodosService(request);
        const todosList = await todoidService.getTodos(token);
        const count = await todosList.json();
        const response = await todoidService.postTodosId(token,body,count.todos.length+10);
        expect (response.status()).toBe(404);
        //expect (body.challenges.length).toBe(59);
    });
//19
    test('PUT /todos/{id} full (200)', {tag: '@UpdatePUT'}, async ({request})=>{ 

        const body = new TodosBuilder().addTitle().addDoneStatus().addDescription().genereteTodos();
        const todoidService = new TodosService(request);
        const todosList = await todoidService.getTodos(token);
        const count = await todosList.json();
        const response = await todoidService.putTodos(token,body,count.todos.length);
        expect (response.status()).toBe(200);
        //expect (body.challenges.length).toBe(59);
    });
//20
    test('PUT /todos/{id} partial (200)', {tag: '@UpdatePUT'}, async ({request})=>{ 

        const body = new TodosBuilder().addTitle().genereteTodos();
        const todoidService = new TodosService(request);
        const todosList = await todoidService.getTodos(token);
        const count = await todosList.json();
        const response = await todoidService.putTodos(token,body,count.todos.length);
        expect (response.status()).toBe(200);
        //expect (body.challenges.length).toBe(59);
    });
//21
    test('PUT /todos/{id} no title (400)', {tag: '@UpdatePUT'}, async ({request})=>{ 

        const body = new TodosBuilder().addDoneStatus().addDescription().genereteTodos();
        const todoidService = new TodosService(request);
        const todosList = await todoidService.getTodos(token);
        const count = await todosList.json();
        const response = await todoidService.putTodos(token,body,count.todos.length);
        expect (response.status()).toBe(400);
        //expect (body.challenges.length).toBe(59);
    });
//22
    test('PUT /todos/{id} no amend id (400)', {tag: '@UpdatePUT'}, async ({request})=>{ 

        const body = new TodosBuilder().addTitle().addDoneStatus().addDescription().genereteTodos();
        body.id = 1;
        const todoidService = new TodosService(request);
        const todosList = await todoidService.getTodos(token);
        const count = await todosList.json();
        const response = await todoidService.putTodos(token,body,count.todos.length);
        expect (response.status()).toBe(400);
        //expect (body.challenges.length).toBe(59);
    });
//23
    test('DELETE /todos/{id} (200)', {tag: '@DELETE'}, async ({request})=>{ 

        const todoidService = new TodosService(request);
        const todosList = await todoidService.getTodos(token);
        const count = await todosList.json();
        const response = await todoidService.deleteTodos(token,count.todos.length);
        expect (response.status()).toBe(200);
        //expect (body.challenges.length).toBe(59);
    });
//25
    test('GET /todos (200) XML', {tag: '@Accept'}, async ({request})=>{ 

        const header = {
            'x-challenger': token,
            'accept': `application/xml`
        };

        const todosService = new TodosService(request);
        const response = await todosService.getTodos(header);
        expect (response.status()).toBe(200);
        //expect (body.challenges.length).toBe(59);
    });

//26
    test('GET /todos (200) JSON', {tag: '@Accept'}, async ({request})=>{ 

            const header = {
                'x-challenger': token,
                'accept': `application/json`
            };

        const todosService = new TodosService(request);
        const response = await todosService.getTodos(header);
        expect (response.status()).toBe(200);
        //expect (body.challenges.length).toBe(59);
    });
 //25
        test('GET /todos (200) ANY', {tag: '@Accept'}, async ({request})=>{ 

            const header = {
                'x-challenger': token,
                'accept': `*/*`
            };
        const todosService = new TodosService(request);
        const response = await todosService.getTodos(header);
        expect (response.status()).toBe(200);
        //expect (body.challenges.length).toBe(59);
    });

//28
     test('GET /todos (200) XML pref', {tag: '@Accept'}, async ({request})=>{ 

        const header = {
            'x-challenger': token,
            'accept': `application/xml, application/json`
        };
    const todosService = new TodosService(request);
    const response = await todosService.getTodos(header);
    expect (response.status()).toBe(200);
    //expect (body.challenges.length).toBe(59);
});
//29
     test('GET /todos (200) no accept', {tag: '@Accept'}, async ({request})=>{ 

        const header = {
            'x-challenger': token,
            'accept': ''
        };
    const todosService = new TodosService(request);
    const response = await todosService.getTodos(header);
    expect (response.status()).toBe(200);
    //expect (body.challenges.length).toBe(59);
});
//30
     test('GET /todos (406)', {tag: '@Accept'}, async ({request})=>{ 

        const header = {
            'x-challenger': token,
            'accept': `application/gzip`
        };
    const todosService = new TodosService(request);
    const response = await todosService.getTodos(header);
    expect (response.status()).toBe(406);
    //expect (body.challenges.length).toBe(59);
});
//31
     test('POST /todos XML', {tag: '@ContentType'}, async ({request})=>{ 

    const header = {
        'x-challenger': token,
        'content-type': 'application/xml',
        'accept': `application/xml`
    };
    const body = `
    <todo>
    <doneStatus>true</doneStatus>
    <description>test</description>
    <title>Create</title>
    </todo>`;
    const todosService = new TodosService(request);

    const response = await todosService.postTodos(header,body);
    expect (response.status()).toBe(201);
    //expect (body.challenges.length).toBe(59);
});
//32
    test('	POST /todos JSON', {tag: '@ContentType'}, async ({request})=>{ 

        const header = {
            'x-challenger': token,
            'content-type': 'application/json',
            'accept': `application/json`
        };
    const todosService = new TodosService(request);
    const body = new TodosBuilder().addTitle(3).addDoneStatus().addDescription(1).genereteTodos();
    const response = await todosService.postTodos(header,body);
    expect (response.status()).toBe(201);
    //expect (body.challenges.length).toBe(59);
    });
//33
    test('POST /todos (415)', {tag: '@ContentType'}, async ({request})=>{ 

        const header = {
            'x-challenger': token,
            'content-type': 'application/gzip',
            'accept': `application/json`
        };
    const todosService = new TodosService(request);
    const body = new TodosBuilder().addTitle(3).addDoneStatus().addDescription(1).genereteTodos();
    const response = await todosService.postTodos(header,body);
    expect (response.status()).toBe(415);
    //expect (body.challenges.length).toBe(59);
    });

});