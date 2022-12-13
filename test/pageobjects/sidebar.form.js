const BaseForm = require('../../framework/pageobjects/base.form');
const Link = require('../../framework/elements/link');

module.exports = class Sidebar extends BaseForm {

    get myProfileLink() { return new Link("My profile", '//li[@id="l_pr"]//ancestor::a') }

    constructor() {
        super('Sidebar', '//li[@id="l_pr"]');
    }

    async clickMyProfileLink() {
        return this.myProfileLink.click();
    }
    
}
