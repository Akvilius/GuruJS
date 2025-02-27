export class GlobalFeedPage {
    constructor (page)
    {
        this.page = page;
        this.singupButton = page.getByRole('link', { name: 'Sign up' });
        this.newarticleButton = page.getByRole('link', { name: 'New Article' });
        this.globalFeedButton = page.getByRole('button', { name: 'Global Feed' });
        this.articleLink = page.getByRole('link').filter({ hasText: 'Akva ' }).first();
        

    }

    async gotoaricle () {
        await this.globalFeedButton.click();
        await this.articleLink.click();
    }
}