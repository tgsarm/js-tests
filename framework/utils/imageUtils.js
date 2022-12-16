const {imgDiff} = require("img-diff-js");
const {testData} = require('../../test/data/test.data');
const logger = require ('./logger');

class ImageUtils {
    async getImageDifference(firstImagePath, secondImagePath) {
        logger.logInfo(`Comparing images ${testData.firstImagePath} and ${testData.secondImagePath}`);
        const result = await imgDiff({
            actualFilename: firstImagePath, 
            expectedFilename: secondImagePath,
            options: {
                threshold: testData.imgDiff.threshold
            }
        });
        logger.logInfo(`Image comparison result: ${result.diffCount}}`)
        return result.diffCount;
    }
}

module.exports = ImageUtils;