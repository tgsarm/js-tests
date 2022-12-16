const logger = require("../utils/logger");

module.exports = class BaseForm {

    constructor(name, uniqueLocator) {
        this.name = name;
        this.uniqueLocator = uniqueLocator;
    }
    
    async findPage() {
        logger.logInfo(`Searching for ${this.name}`);
        return $(`${this.uniqueLocator}`);
    } 

    async isDisplayed() {
        logger.logInfo(`Checking if ${this.name} is displayed`);
        return (await this.findPage()).isDisplayed();
    }

}
