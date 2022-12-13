const TextLabel = require('../../framework/elements/textLabel');
const Link = require('../../framework/elements/link');
const BaseElement = require('../../framework/elements/baseElement');
const logger = require('../../utils/logger');

module.exports = class WallPostComment extends BaseElement {

    get commentText() { return new TextLabel(`${this.name} text`, `${this.locator}//div[contains(@class,'wall_reply_text')]`) }
    get commentAuthor() { return new Link(`${this.name} author`, `${this.locator}//a[contains(@class,'author')]`) }

    constructor(wallPost) {
        super('Wall post comment', `${wallPost.locator}//div[contains(@class,'_reply_content')]`);
    }

    async getCommentText() {
        return this.commentText.getText();
    }

    async getCommentAuthor() {
        return this.commentAuthor.getText();
    }

    async waitForTextUpdate(currentText) {
        logger.logInfo(`Waiting for comment text to change. Initial text: '${currentText}'`);
        return browser.waitUntil(async () => (await this.getCommentText()) != currentText);
    }

}
