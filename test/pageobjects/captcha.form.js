const BaseForm = require('./base.form');

module.exports = class CaptchaForm extends BaseForm {

    constructor() {
        super('Captcha popup', '//form[contains(@class,"vkc__Captcha__container")]');
    }
    
}
