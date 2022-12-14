const BaseForm = require('../../framework/pageobjects/base.form');
const HelpForm = require('./help.form');
const CookiesForm = require('./cookies.form');

module.exports = class GamePage extends BaseForm {
    constructor(uniqueLocator, name) {
        super(uniqueLocator, name);
        this.helpForm = new HelpForm();
        this.cookiesForm = new CookiesForm();
    }
}
