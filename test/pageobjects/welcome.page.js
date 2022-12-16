const BaseForm = require('../../framework/pageobjects/base.form');
const TextInput = require('../../framework/elements/textInput');
const Button = require('../../framework/elements/button');

class WelcomePage extends BaseForm {

    get loginInput() { return new TextInput('Login input', '//input[@name="login"]') }
    get submitButton() { return new Button('Submit button', '//button[@type="submit"]') }
    
    constructor() {
        super('Welcome page', '//div[@id="index_login"]');
    }

    async enterLogin(value) {
        return this.loginInput.setValue(value);
    }

    async clickSubmitButton() {
        return this.submitButton.click();
    }
    
}

module.exports = new WelcomePage();
