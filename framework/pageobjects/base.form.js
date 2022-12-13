const logger = require("../utils/logger");
const { testData } = require("../../test/data/test.data");

module.exports = class BaseForm {
    constructor(uniqueLocator, name) {
        this.uniqueLocator = uniqueLocator;
        this.name = name;
    }
    
    async findPage() {
        logger.logInfo(`Searching for ${this.name}`);
        return $(`${this.uniqueLocator}`);
    } 

    async isDisplayed() {
        logger.logInfo(`Checking if ${this.name} is displayed`);
        return (await this.findPage()).isDisplayed();
    }  

    async waitForExist() {
        logger.logInfo(`Waiting for ${this.name} to exist`);
        return (await this.findPage()).waitForClickable({ timeout: testData.elementSearchTimeout });
    }

    async waitForNotExist() {
        logger.logInfo(`Waiting for ${this.name} to not exist`);
        return (await this.findPage()).waitForClickable({ reverse: true, timeout: testData.elementSearchTimeout });
    }
}
