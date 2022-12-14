const GamePage = require('./game.page');
const Input = require('../../framework/utils/input');
const Checkbox = require('../../framework/elements/checkbox');
const Button = require('../../framework/elements/button');
const Link = require('../../framework/elements/link');

class InterestsPage extends GamePage {
    constructor() {
        super('//*[@class="page-indicator"]', 'Interests Page');
    }

    get unselectAllCheckbox() { return new Checkbox('Unselect all checkbox', '//label[@for="interest_unselectall"]') }
    get nextButton() { return new Button('Next button', '//button[text()="Next"]') }
    get uploadAvatarLink() { return new Link('Upload link', '//a[@class="avatar-and-interests__upload-button"]') }  
    get interestsCheckboxes() { 
        return $$('//label[@class="checkbox__label"and(not(contains(@for,"selectall")))]').
            map((c, index) => new Checkbox('Interest checkbox', `(//span[contains(@class,"checkbox small")])[${index+1}]`)) 
    }

    async clickUnselectAllCheckbox() {
        return this.unselectAllCheckbox.click();
    }

    async clickNextButton() {
        return this.nextButton.click();
    }

    async selectInterests(count) {
        const interestsCheckboxes = await this.interestsCheckboxes;

        while (count-- > 0) {
            await interestsCheckboxes.shift().click();
        }
    }

    async uploadAvatar(imgPath) {
        await this.uploadAvatarLink.click();     
        return Input.fileUpload(imgPath);
    }                                       
}

module.exports = new InterestsPage();