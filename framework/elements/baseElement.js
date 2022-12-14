const logger = require('../utils/logger');

module.exports = class BaseElement {
    constructor(name, locator) {
        this.name = name;
        this.locator = locator;
    }

    async findElement() {
        logger.logInfo(`Searching for ${this.name}`);
        return $(`${this.locator}`);
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
}
