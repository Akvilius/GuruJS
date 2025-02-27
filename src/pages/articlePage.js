export class ArticlePage {
    constructor (page)
    {
        this.page = page;

        this.pastComment = page.getByRole('button', { name: 'Post Comment' });

        this.paragraphField = page.locator("div[class='container'] h1");
        this.commentField = page.getByPlaceholder('Write a comment...');
    }

    async addComment (comment){
        await this.commentField.click();
        await this.commentField.fill(comment);
        await this.pastComment.click();
    }

}
