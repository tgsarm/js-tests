const logger = require ('./logger');
const download = require('image-downloader');
const path = require('path');

class Downloader {   

    async downloadImage(url, savePath) {
        const fullPath = await path.resolve(savePath);
        logger.logInfo(`Downloading image from ${url}`);
        return download.image({url: url, dest: fullPath});
    }

}

module.exports = Downloader;