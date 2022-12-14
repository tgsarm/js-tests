const GamePage = require('./game.page');

class PersonalDetailsPage extends GamePage {
    constructor() {
        super('//div[@class="personal-details__form"]', 'Personal details page');
    }
}

module.exports = new PersonalDetailsPage();
