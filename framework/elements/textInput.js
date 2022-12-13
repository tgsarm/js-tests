const logger = require("../utils/logger");
const BaseElement = require("./baseElement");

module.exports = class TextInput extends BaseElement { 
    
    async clearValue() {
        logger.logInfo(`Clearing ${this.name} input`);
        return (await this.findElement()).clearValue();
    }

    async setValue(value) {
        logger.logInfo(`Entering value '${value}' into ${this.name}`);
        return (await this.findElement()).setValue(value);
    }
    
}