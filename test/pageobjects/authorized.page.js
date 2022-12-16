const BaseForm = require('../../framework/pageobjects/base.form');
const Sidebar = require('./sidebar.form');

module.exports = class AuthorizedPage extends BaseForm {

    constructor(uniqueLocator, name) {
        super(uniqueLocator, name);
        this.sidebar = new Sidebar();
    }
    
}
