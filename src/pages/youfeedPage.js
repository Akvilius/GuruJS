export class YoufeedPage {
    constructor (page)
    {
        this.page = page;

        this.newarticleButton = page.getByRole('link', { name: 'New Article' });
        this.settingButton = page.getByRole('link', { name: 'Settings' });
        this.logoutButton = page.getByRole('link', { name: 'Logout' });

        this.profileNameField = page.locator('.nav-link.dropdown-toggle.cursor-pointer'); //Элемент с именем пользователя для отрытия выпадающего списка
    }

    async gotonewarticle () {

        await this.newarticleButton.click();
    }

    async gotosetting () {
        await this.profileNameField.click();
        await this.settingButton.click();
    }

    async logout () {
        await this.profileNameField.click();
        await this.logoutButton.click();
    }
}

