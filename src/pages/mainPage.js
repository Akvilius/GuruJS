export class MainPage {
    constructor (page)
    {
        this.page = page;
        this.singupButton = page.getByRole('link', { name: 'Sign up' });
    }

    async gotoreg () {

        await this.singupButton.click();
    }

    async open (url) {
        await this.page.goto(url);
    }


}