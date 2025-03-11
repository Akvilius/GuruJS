const URL = 'https://apichallenges.herokuapp.com/';

export class DatabaseService {
    constructor (request)
    {
        this.request = request;
    }

    async post () {
        const response = await this.request.post(`${URL}challenger`);
        return response;
    }


}
