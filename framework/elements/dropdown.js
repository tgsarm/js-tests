const logger = require('../utils/logger');
const BaseElement = require('./baseElement');

module.exports = class Dropdown extends BaseElement {
    async getOption(value) {
        logger.logInfo(`Getting dropdown option with text '${value}' from ${this.name}`);
        return (await this.findElement()).$(`//*[text()='${value}']`);
    }

    async setValue(value) {
        logger.logInfo(`Setting value '${value}' into ${this.name}`);
        return (await this.getOption(value)).click();
    }
}