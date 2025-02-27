export class MainPage {
    constructor (page)
    {
        this.page = page;
        this.singupButton = page.getByRole('link', { name: 'Sign up' });
        this.loginButton = page.getByRole('link', { name: 'Login' });
        this.newarticleButton = page.getByRole('link', { name: 'New Article' });
    }

    async gotoreg () {

        await this.singupButton.click();
    }
    async gotologin () {

        await this.loginButton.click();
    }
    async gotopublishnewarticle () {

        await this.newarticleButton.click();
    }

    async open (url) {
        await this.page.goto(url);
    }


}