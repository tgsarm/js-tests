const TextLabel = require('../../framework/elements/textLabel');
const Link = require('../../framework/elements/link');
const Button = require('../../framework/elements/button');
const BaseElement = require('../../framework/elements/baseElement');
const logger = require('../../utils/logger');
const WallPostComment = require('./wallPostComment');
const { testData } = require('../data/test.data');

module.exports = class WallPost extends BaseElement {

    get postText() { return new TextLabel(`${this.name} text`, `${this.locator}//div[contains(@id,'wpt')]`) }
    get postAuthor() { return new Link(`${this.name} author`, `${this.locator}//a[@class='author']`) }
    get likeButton() { return new Button(`${this.name} like button`, `${this.locator}//span[contains(@class,'_like_button_icon')]`) }
    get showNextCommentButton() { return new Button(`${this.name} next comment button`, `${this.locator}//div[contains(@class,'replies')]//span[contains(@class,'next_label')]`) }

    constructor(id) {
        super('Wall post', `//div[contains(@id,'post')and(contains(@id,'_${id}'))]`);
        this.id = id;
    }

    async getPostText() {
        return this.postText.getText();
    }

    async getPostAuthor() {
        return this.postAuthor.getText();
    }

    async waitForTextUpdate(currentText) {
        logger.logInfo(`Waiting for post text to change. Initial text: '${currentText}'`);
        return browser.waitUntil(async () => 
            (await this.getPostText()) != currentText, 
            { timeout: testData.browser.waitUntilTimeout }
        );
    }

    async getLastComment() {
        logger.logInfo(`Getting last comment for post ${this.id}`);
        return new WallPostComment(this);
    }

    async clickShowNextCommentButton() {
        return this.showNextCommentButton.click();
    }

    async clickLikeButton() {
        return this.likeButton.click();
    }

}
