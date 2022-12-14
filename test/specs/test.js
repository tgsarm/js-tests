const assert = require('chai').assert;
const {testData} = require('../data/test.data');
const HomePage = require('../pageobjects/home.page');
const LoginPage = require('../pageobjects/login.page');
const InterestsPage = require('../pageobjects/interests.page');
const PersonalDetailsPage = require('../pageobjects/personalDetails.page');
const {nextAlphanumericString, nextValidString} = require('../../framework/utils/randomizer');
const logger = require('../../framework/utils/logger');

describe('Userinyerface forms', () => {
    beforeEach(async () => {
        await browser.url(testData.homeUrl);
        await browser.maximizeWindow();
    });

    it('should fill all register info', async () => {  
        logger.logInfo("Step #1. Opening home page.");
        
        assert.isTrue(await HomePage.isDisplayed(), `${HomePage.name} is not displayed`);

        logger.logInfo("Step #2. Navigating to next page.");

        await HomePage.clickNextPageLink();
        assert.isTrue(await LoginPage.isDisplayed(), `${LoginPage.name} is not displayed`);
        
        logger.logInfo("Step #3. Filling email and password info.");

        const email = nextValidString(testData.randomStringLength); 
        await LoginPage.clearEmailInput();
        await LoginPage.setEmail(email);

        const password = nextValidString(testData.randomStringLength);
        await LoginPage.clearPasswordInput();
        await LoginPage.setPassword(password);
        
        const emailDomain = nextAlphanumericString(testData.randomStringLength);
        await LoginPage.clearEmailDomainInput();
        await LoginPage.setDomain(emailDomain);

        await LoginPage.clickDomainDropdown();
        await LoginPage.setDomainDropdown(testData.emailDomain);
        await LoginPage.clickTermsCheckbox();
        await LoginPage.clickNextButton();

        assert.isTrue(await InterestsPage.isDisplayed(), `${InterestsPage.name} is not displayed`);

        logger.logInfo("Step #3. Setting interests and user avatar.");

        await InterestsPage.clickUnselectAllCheckbox();
        await InterestsPage.selectInterests(testData.interestsToSelect);
        await InterestsPage.uploadAvatar(testData.avatarPath);
        await InterestsPage.clickNextButton();

        assert.isTrue(await PersonalDetailsPage.isDisplayed(), `${PersonalDetailsPage.name} is not displayed`);
    });

    it('should hide help form', async () => {
        logger.logInfo("Step #1. Opening home page.");

        assert.isTrue(await HomePage.isDisplayed(), `${HomePage.name} is not displayed`);

        await HomePage.clickNextPageLink();

        assert.isTrue(await LoginPage.isDisplayed(), `${LoginPage.name} is not displayed`);

        logger.logInfo("Step #2. Hiding help form.");

        await LoginPage.helpForm.clickHideButton();
        assert.isTrue(await LoginPage.helpForm.waitForNotExist(), `${LoginPage.helpForm.name} is still displayed`);
    });

    it('should hide cookies form', async () => {
        logger.logInfo("Step #1. Opening home page.");

        assert.isTrue(await HomePage.isDisplayed(), `${HomePage.name} is not displayed`);

        await HomePage.clickNextPageLink();

        assert.isTrue(await LoginPage.isDisplayed(), `${LoginPage.name} is not displayed`);
        assert.isTrue(await LoginPage.cookiesForm.waitForExist(), `${LoginPage.cookiesForm.name} is not displayed`);

        logger.logInfo("Step #2. Accepting cookies.");
        
        await LoginPage.cookiesForm.clickAcceptButton();

        assert.isFalse(await LoginPage.cookiesForm.isDisplayed(), `${LoginPage.cookiesForm.name} is still displayed`);
    });

    it('should check timer start value', async () => {
        logger.logInfo("Step #1. Opening home page. Checking timer start value.");

        assert.isTrue(await HomePage.isDisplayed(), `${HomePage.name} is not displayed`);

        await HomePage.clickNextPageLink();

        assert.isTrue(await LoginPage.isDisplayed(), `${LoginPage.name} is not displayed`);
        assert.equal(await LoginPage.timerLabel.getText(), testData.timerStartValue, `Timer start value is not equal to ${testData.timerStartValue}`);
    });

    afterEach(async () => {
        await browser.reloadSession();
    });
});

