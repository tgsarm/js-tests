const Button = require('../../framework/elements/button');
const Checkbox = require('../../framework/elements/checkbox');
const GamePage = require('./game.page');
const Dropdown = require('../../framework/elements/dropdown');
const TextInput = require('../../framework/elements/textInput');
const TextLabel = require('../../framework/elements/textLabel');

class LoginPage extends GamePage {
    get passwordInput() { return new TextInput('Password input', '//input[@placeholder="Choose Password"]') }
    get emailInput() { return new TextInput('Email input', '//input[@placeholder="Your email"]') }
    get emailDomainInput() { return new TextInput('Email domain input', '//input[@placeholder="Domain"]') }
    get domainComboBox() { return new Dropdown('Domain dropdown', '//div[contains(@class,"dropdown--gray")]') }
    get termsCheckbox() { return new Checkbox('Accept terms checkbox', '//span[@class="checkbox__box"]') }
    get nextPageBtn() { return new Button('Next button', '//a[text()="Next"]') }
    get timerLabel() { return new TextLabel('Timer label', '//div[contains(@class,"timer")]') }

    constructor() {
        super('//div[@class="login-form"]', 'Login page');
    }

    async clearPasswordInput() {
        return this.passwordInput.clearValue();
    }

    async clearEmailInput() {
        return this.emailInput.clearValue();
    }

    async clearEmailDomainInput() {
        return this.emailDomainInput.clearValue();
    }

    async setEmail(value) {
        return this.emailInput.setValue(value);
    }

    async setPassword(value) {
        return this.passwordInput.setValue(value);
    } 

    async setDomain(value) {
        return this.emailDomainInput.setValue(value);
    }

    async clickDomainDropdown() {
        return this.domainComboBox.click();
    }

    async setDomainDropdown(value) {
        return this.domainComboBox.setValue(value);
    }

    async clickTermsCheckbox() {
        return this.termsCheckbox.click();
    }

    async clickNextButton() {
        return this.nextPageBtn.click();
    }
}

module.exports = new LoginPage();
