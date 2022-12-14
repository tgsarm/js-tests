const robotjs = require('robotjs');
const path = require('path');
const logger = require('./logger');
const { testData } = require('../../test/data/test.data');

class Input {
    async fileUpload(filePath) {
        logger.logInfo("Simulating file upload input");

        const fullPath = await path.parse(await path.resolve(filePath));

        robotjs.setKeyboardDelay(testData.inputDelay);

        await this.keyTapRepeat('tab', 6);
        await this.keyTap('enter');
        await this.typeString(fullPath.dir);
        await this.keyTap('enter');
        await this.keyTapRepeat('tab', 6);
        await this.keyTap('enter');
        await this.typeString(fullPath.base);
        await this.keyTap('enter');
    }

    async keyTapRepeat(key, count) {
        for (let i = 0; i < count; i++) {
            await this.keyTap(key);
        }
    }

    async keyTap(key) {
        logger.logInfo(`Pressing '${key}' key`);
        return robotjs.keyTap(key);
    }

    async typeString(text) {
        logger.logInfo(`Typing '${text}'`);
        return robotjs.typeString(text);
    }
}

module.exports = new Input();