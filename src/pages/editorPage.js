export class EditorPage {
    constructor (page)
    {
        this.page = page;

        this.newarticleButton = page.getByRole('link', { name: 'New Article' });
        this.publisharticleButton = page.getByRole('button', { name: 'Publish Article' });

        this.profileNameField =  page.getByRole('navigation');

        this.tiltearticleField = page.getByPlaceholder('Article Title');
        this.aboutarticleField = page.getByPlaceholder('What\'s this article about?');
        this.bodyarticleField = page.getByPlaceholder('Write your article (in');
        this.tagarticleField = page.getByPlaceholder('Enter tags');


    }

    async publishnewarticle (title,about,body,tag) {

        await this.tiltearticleField.click();
        await this.tiltearticleField.fill(title);
        await this.aboutarticleField.click();
        await this.aboutarticleField.fill(about);
        await this.bodyarticleField.click();
        await this.bodyarticleField.fill(body);
        await this.tagarticleField.click();
        await this.tagarticleField.fill(tag);
        await this.publisharticleButton.click();
    }
}