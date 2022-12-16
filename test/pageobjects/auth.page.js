const BaseForm = require('../../framework/pageobjects/base.form');
const TextInput = require('../../framework/elements/textInput');
const Button = require('../../framework/elements/button');

class AuthPage extends BaseForm {

    get passwordInput() { return new TextInput('Password input', '//input[@name="password"]' )}
    get submitButton() { return new Button('Submit button', '//button[@type="submit"]') }
    
    constructor() {
        super('Auth page', '//div[contains(@class,"VKIDPanel")]');
    }

    async enterPassword(value) {
        return this.passwordInput.setValue(value)
    }

    async clickSubmitButton() {
        return this.submitButton.click();
    }
    
}

module.exports = new AuthPage();
