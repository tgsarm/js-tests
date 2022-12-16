const TextInput = require('../../framework/elements/textInput');
const Button = require('../../framework/elements/button');
const AuthorizedPage = require('./authorized.page');
const WallForm = require('./wall.form');

class MyProfilePage extends AuthorizedPage {

    get loginInput() { return new TextInput('Login input', '//input[@name="login"]') }
    get submitButton() { return new Button('Submit button', '//button[@type="submit"]') }
    
    constructor() {
        super('My profile page', '//div[@class="ProfileInfo"]');
        this.wallForm = new WallForm();
    }

    async enterLogin(value) {
        return this.loginInput.setValue(value);
    }

    async clickSubmitButton() {
        return this.submitButton.click();
    }
    
}

module.exports = new MyProfilePage();
