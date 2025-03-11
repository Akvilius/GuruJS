const URL = 'https://apichallenges.herokuapp.com/';

export class TodosService {
    constructor (request)
    {
        this.request = request;
    }

    async getTodos(token) {
        const response = await this.request.get(`${URL}todos`,{
            headers:{
                'x-challenger': token,
            }
        });
        return response;
    }

    async getTodo(token) {
        const response = await this.request.get(`${URL}todo`,{
            headers:{
                'x-challenger': token,
            }
        });
        return response;
    }

    async getTodosId(token, id) {
        const response = await this.request.get(`${URL}todos/${id}`,{
            headers:{
                'x-challenger': token,
            }
        });
        return response;
    }

    async getTodosFilter(token) {
        const response = await this.request.get(`${URL}todos?doneStatus=true`,{
            headers:{
                'x-challenger': token,
            }
        });
        return response;
    }

    async postTodos(token) {
        const response = await this.request.post(`${URL}todos`,{
            headers:{
                'x-challenger': token,
            },
            data: 
                {
                    'title': 'create todo process payroll',
                    'doneStatus': true,
                    'description': ''
                }
        });
        return response;
    }

    async headTodos(token) {
        const response = await this.request.head(`${URL}todos`,{
            headers:{
                'x-challenger': token,
            }
        });
        return response;
    }

}
