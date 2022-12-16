const BaseForm = require('../../framework/pageobjects/base.form');
const WallPost = require('../models/wallPost');

module.exports = class WallForm extends BaseForm {

    constructor() {
        super('Wall form', '//div[contains(@class,"WallLegacy"]');
    }

    async getWallPost(id) {
        return new WallPost(id);
    }

}