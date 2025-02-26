export class YoufeedPage {
    constructor (page)
    {
        this.page = page;
        this.profileNameField =  page.getByRole('navigation');
    }

}