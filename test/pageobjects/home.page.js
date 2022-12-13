const Link = require('../../framework/elements/link');
const GamePage = require('./game.page');

class HomePage extends GamePage {
    get nextPageLink() { return new Link("Next button", '//a[@class="start__link"]') }

    constructor() {
        super('//button[@class="start__button"]', 'Home page');
    }

    async clickNextPageLink() {
        return this.nextPageLink.click();
    }
}

module.exports = new HomePage();
