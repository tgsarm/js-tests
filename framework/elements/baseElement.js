const logger = require('../../utils/logger');
const testData = require('../../test/data/test.data');

module.exports = class BaseElement {

    constructor(name, locator) {
        this.name = name;
        this.locator = locator;
    }

    async findElement() {
        logger.logInfo(`Searching for ${this.name}`);
        return $(`${this.locator}`);
    }

    async isDisplayed() {
        logger.logInfo(`Checking if ${this.name} is displayed`);
        return (await this.findElement()).isDisplayed();
    }

    async click() {
        logger.logInfo(`Clicking on ${this.name}`);
        return (await this.findElement()).click();
    }

    async getText() {
        logger.logInfo(`Retrieving text from ${this.name}`);
        const text = await (await this.findElement()).getText();
        logger.logInfo(`Text of ${this.name}: '${text}'`);
        return text;
    }

    async waitForNotExist() {
        logger.logInfo(`Waiting for ${this.name} to not exist`);
        return (await this.findElement()).waitForDisplayed({ reverse: true, timeout: testData.elementSearchTimeout });
    }
    
}
