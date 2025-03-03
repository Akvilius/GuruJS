
export class SettingPage {
    constructor (page)
    {
        this.page = page;
        //this.singupButton = page.getByRole('link', { name: 'Sign up' });
        //this.loginButton = page.getByRole('link', { name: 'Login' });
        //this.newarticleButton = page.getByRole('link', { name: 'New Article' });

        this.passwordField = page.getByPlaceholder('Password');
        this.updateSettingButton =page.getByRole('button', { name: 'Update Settings' });
    }

    async updatePassword (newpassword) {

        await this.passwordField.click();
        await this.passwordField.fill(newpassword);
        await this.updateSettingButton.click();
    }

}
