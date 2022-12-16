const AuthorizedPage = require('./authorized.page');

class FeedPage extends AuthorizedPage {

    constructor() {
        super("Feed page", '//div[@id="main_feed"]');
    }
    
}

module.exports = new FeedPage();
