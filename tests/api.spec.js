
// Подключение тестов
import { test, expect } from '@playwright/test';
import { ChallengerService, ChallengesService, TodosService, HeartbeatService, SecretService }  from '../src/service/index';
import { TodosBuilder } from '../src/helper/todos.builder';

// вынести в конфиги
let token;
const oldGuid = '61a63304-d598-4430-9cf5-6e55948d7721';

test.describe ('Challenge', ()=>{

 //1   
    test.beforeAll(async ({request}) => {

        const challengerService = new ChallengerService(request);
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
    test('POST /todos (201) max out content',{tag: '@13'}, async({ request }) => {
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
//34
    test('GET /challenger/guid (existing X-CHALLENGER)', {tag: '@Restore'}, async ({request})=>{ 

    const header = {'x-challenger': token};
    const challengerService = new ChallengerService(request);
    const response = await challengerService.getChallengerGuid(header,token);
    expect (response.status()).toBe(200);
    const data = await response.json();
    expect(data).toHaveProperty("challengeStatus");
    expect(data.xChallenger).toEqual(token);
    });

//35
    test('PUT /challenger/guid RESTORE', {tag: '@Restore'}, async ({request})=>{ 

        const header = {'x-challenger': token};
        const challengerService = new ChallengerService(request);
        const responseGet = await challengerService.getChallengerGuid(header,token);
        const data = await responseGet.json();
        const response = await challengerService.putChallengerGuid(header,data,token);
        expect (response.status()).toBe(200);
    });
//36
    test('PUT /challenger/guid CREATE', {tag: '@Restore'}, async ({request})=>{ 

        const header = {'x-challenger': token};
        const headerOld = {'x-challenger': oldGuid};
        const challengerService = new ChallengerService(request);
        const responseGet = await challengerService.getChallengerGuid(header,token);
        const data = await responseGet.json();
        data['xChallenger'] = oldGuid;
        delete data.xAuthToken;
        const response = await challengerService.putChallengerGuid(headerOld,data,oldGuid);
        expect (response.status()).toBe(201);// 200 если существует, повторный прогон
    });
//37
    test('GET /challenger/database/guid (200)', {tag: '@Restore'}, async ({request})=>{ 

        const header = {'x-challenger': token};
        const challengerService = new ChallengerService(request);
        const response = await challengerService.getDatabaseGuid(header,token);
        expect (response.status()).toBe(200);
    });
//38
    test('PUT /challenger/database/guid (Update)', {tag: '@Restore'}, async ({request})=>{ 
        const header = {'x-challenger': token};
        const challengerService = new ChallengerService(request);
        const responseGet = await challengerService.getDatabaseGuid(header,token);
        const data = await responseGet.json();
        const response = await challengerService.putDatabaseGuid(header,data,token);
        expect (response.status()).toBe(204);
    });

//39
    test('POST /todos XML to JSON', {tag: '@MixAccept'}, async ({request})=>{ 
    const header = {
        'x-challenger': token,
        'content-type': 'application/xml',
        'accept': `application/json`
     };
    const body = `
        <todo>
        <doneStatus>true</doneStatus>
        <description>test 006</description>
        <title>Create or not</title>
        </todo>`;
        const todosService = new TodosService(request);
        const response = await todosService.postTodos(header,body);
        expect (response.status()).toBe(201);
        //expect (body.challenges.length).toBe(59);
    });
//40
    test('POST /todos JSON to XML', {tag: '@MixAccept'}, async ({request})=>{ 

        const header = {
            'x-challenger': token,
            'content-type': 'application/json',
            'accept': `application/xml`
        };
        const todosService = new TodosService(request);
        const body = new TodosBuilder().addTitle(2).addDoneStatus().addDescription().genereteTodos();
        const response = await todosService.postTodos(header,body);
        expect (response.status()).toBe(201);
        //expect (body.challenges.length).toBe(59);
    });
//41
    test('DELETE /heartbeat (405)', {tag: '@StatusCode'}, async ({request})=>{ 

        const header = {'x-challenger': token};
        const heartbeatService = new HeartbeatService(request);
        const response = await heartbeatService.deleteHeartbeat(header);
        expect (response.status()).toBe(405);
        //expect (body.challenges.length).toBe(59);
    });
//42
    test('PATCH /heartbeat (500)', {tag: '@StatusCode'}, async ({request})=>{ 

        const header = {'x-challenger': token};
        const heartbeatService = new HeartbeatService(request);
        const response = await heartbeatService.patchHeartbeat(header);
        expect (response.status()).toBe(500);
        //expect (body.challenges.length).toBe(59);
    });
//43
    test('TRACE /heartbeat (501)', {tag: '@StatusCode'}, async ({request})=>{ 

        const header = {'x-challenger': token};
        const heartbeatService = new HeartbeatService(request);
        const response = await heartbeatService.traceHeartbeat(header);
        expect (response.status()).toBe(501);
        //expect (body.challenges.length).toBe(59);
    });
//44
    test('GET /heartbeat (204)', {tag: '@StatusCode'}, async ({request})=>{ 

        const header = {'x-challenger': token};
        const heartbeatService = new HeartbeatService(request);
        const response = await heartbeatService.getHeartbeat(header);
        expect (response.status()).toBe(204);
        //expect (body.challenges.length).toBe(59);
    });
//45
    test('POST /heartbeat as DELETE (405)', {tag: '@HTTP'}, async ({request})=>{ 

        const header = {'x-challenger': token, 'X-HTTP-Method-Override':'DELETE'};
        const heartbeatService = new HeartbeatService(request);
        const response = await heartbeatService.postHeartbeat(header);
        expect (response.status()).toBe(405);
        //expect (body.challenges.length).toBe(59);
    });
//46
    test('POST /heartbeat as PATCH (500)', {tag: '@HTTP'}, async ({request})=>{ 

        const header = {'x-challenger': token, 'X-HTTP-Method-Override':'PATCH'};
        const heartbeatService = new HeartbeatService(request);
        const response = await heartbeatService.postHeartbeat(header);
        expect (response.status()).toBe(500);
        //expect (body.challenges.length).toBe(59);
    });
//47
    test('POST /heartbeat as Trace (501)', {tag: '@HTTP'}, async ({request})=>{ 

        const header = {'x-challenger': token, 'X-HTTP-Method-Override':'TRACE'};
        const heartbeatService = new HeartbeatService(request);
        const response = await heartbeatService.postHeartbeat(header);
        expect (response.status()).toBe(501);
        //expect (body.challenges.length).toBe(59);
    });
//48
    test('POST /secret/token (401)', {tag: '@Authentication'}, async ({request})=>{ 
        const header = {'x-challenger': token, 'Authorization':"Basic " + Buffer.from("Admin1:Pa55word").toString("base64")};
        const secretService = new SecretService(request);
        const response = await secretService.postSecret(header);
        expect (response.status()).toBe(401);
        //expect (body.challenges.length).toBe(59);
    });
//49
    test('POST /secret/token (201)', {tag: '@Authentication'}, async ({request})=>{ 
        const header = {'x-challenger': token, 'Authorization':"Basic " + Buffer.from("admin:password").toString("base64")};
        const secretService = new SecretService(request);
        const response = await secretService.postSecret(header);
        expect (response.status()).toBe(201);
        //expect (body.challenges.length).toBe(59);
    });
//50
    test('GET /secret/note (403)', {tag: '@fast'}, async ({request})=>{ 
        const secretService = new SecretService(request);
        const header = {'x-challenger': token, 'X-AUTH-TOKEN': 'authToken+2'};
        const response = await secretService.getSecretNote(header);
        expect (response.status()).toBe(403);
        //expect (body.challenges.length).toBe(59);
    });
//51
    test('	GET /secret/note (401)', {tag: '@fast'}, async ({request})=>{ 

        const secretService = new SecretService(request);
        const header = {'x-challenger': token,};
        const response = await secretService.getSecretNote(header);
        expect (response.status()).toBe(401);
        //expect (body.challenges.length).toBe(59);
    });
//52
    test('GET /secret/note (200)', {tag: '@fast'}, async ({request})=>{ 

        const authheader = {'x-challenger': token, 'Authorization':"Basic " + Buffer.from("admin:password").toString("base64")};
        const secretService = new SecretService(request);
        const authToken = ((await secretService.postSecret(authheader)).headers())["x-auth-token"];
        const header = {'x-challenger': token, 'X-AUTH-TOKEN': authToken};
        const response = await secretService.getSecretNote(header);
        expect (response.status()).toBe(200);
        //expect (body.challenges.length).toBe(59);
    });
//53
    test('POST /secret/note (200)', {tag: '@fast'}, async ({request})=>{ 
        const secretService = new SecretService(request);
        const authheader = {'x-challenger': token, 'Authorization':"Basic " + Buffer.from("admin:password").toString("base64")};
        const authToken = ((await secretService.postSecret(authheader)).headers())["x-auth-token"];
        const header = {'x-challenger': token, 'X-AUTH-TOKEN': authToken, 'Content-Type': 'application/json'};
        const body = {note: "whot is it?"};
        const response = await secretService.postSecretNote(header,body);
        expect (response.status()).toBe(200);
        //expect (body.challenges.length).toBe(59);
    });
//54
    test('POST /secret/note (401)', {tag: '@fast'}, async ({request})=>{ 
        const secretService = new SecretService(request);
        const header = {'x-challenger': token, 'Content-Type': 'application/json'};
        const body = {note: "whot is it?"};
        const response = await secretService.postSecretNote(header,body);
        expect (response.status()).toBe(401);
        //expect (body.challenges.length).toBe(59);
    });
//55
    test('POST /secret/note (403)', {tag: '@fast'}, async ({request})=>{ 
        const secretService = new SecretService(request);
        const header = {'x-challenger': token, 'X-AUTH-TOKEN': 'authToken', 'Content-Type': 'application/json'};
        const body = {note: "whot is it?"};
        const response = await secretService.postSecretNote(header,body);
        expect (response.status()).toBe(403);
        //expect (body.challenges.length).toBe(59);
    });
//56
    test('GET /secret/note (Bearer)', {tag: '@fast'}, async ({request})=>{ 
        const secretService = new SecretService(request);
        const authheader = {'x-challenger': token, 'Authorization':"Basic " + Buffer.from("admin:password").toString("base64")};
        const authToken = ((await secretService.postSecret(authheader)).headers())["x-auth-token"];
        const header = {'x-challenger': token, 'Authorization':"Bearer " +  authToken};
        const response = await secretService.getSecretNote(header);
        expect (response.status()).toBe(200);
        //expect (body.challenges.length).toBe(59);
    });
//57
    test('POST /secret/note (Bearer)', {tag: '@fast'}, async ({request})=>{ 
        const secretService = new SecretService(request);
        const authheader = {'x-challenger': token, 'Authorization':"Basic " + Buffer.from("admin:password").toString("base64")};
        const authToken = ((await secretService.postSecret(authheader)).headers())["x-auth-token"];
        const header = {'x-challenger': token, 'Authorization':"Bearer " +  authToken};
        const body = {note: "whot is it?"};
        const response = await secretService.postSecretNote(header,body);
        expect (response.status()).toBe(200);
        //expect (body.challenges.length).toBe(59);
    });
});
