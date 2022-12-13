const Button = require('../../framework/elements/button');
const BaseForm = require('../../framework/pageobjects/base.form');

module.exports = class CookiesForm extends BaseForm {
    get acceptButton() { return new Button("Decline cookies button", '//button[text()="Not really, no"]') }

    constructor() {
        super('//div[@class="cookies"]', 'Cookies form');
    }

    async clickAcceptButton() {
        return this.acceptButton.click();
    }
}
