const Button = require('../../framework/elements/button');
const BaseForm = require('../../framework/pageobjects/base.form');

module.exports = class HelpForm extends BaseForm {
    get hideButton() { return new Button("Send to bottom", '//button[contains(@class,"help-form__send-to-bottom-button")]') }

    constructor() {
        super('//h2[@class="help-form__title"]', 'Home page');
    }

    async clickHideButton() {
        return this.hideButton.click();
    }
}
