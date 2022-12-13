const assert = require('chai').assert;
const fs = require('fs/promises');
const {nextAlphanumericString} = require('../../framework/utils/randomizer');
const {testData} = require('../data/test.data');
const logger = require('../../framework/utils/logger');
const WelcomePage = require('../pageobjects/welcome.page');
const FeedPage = require('../pageobjects/feed.page');
const AuthPage = require('../pageobjects/auth.page');
const MyProfilePage = require('../pageobjects/myProfile.page');
const VkApiUtils = require('../api/vkApiUtils');
const FormData = require('form-data');
const Downloader = require('../../framework/utils/downloader');
const ImageUtils = require('../../framework/utils/imageUtils');

describe('Vk user actions', () => {
    before(async () => {
        await browser.setTimeout({ 'implicit': testData.browser.implicitWaitTimeout, });
    });

    beforeEach(async () => {
        await browser.url(testData.homeUrl);
        await browser.maximizeWindow();
    });

    it('should fill all register info', async () => {  
        logger.logInfo("[UI] Step #1. Opening home page.");
        
        assert.isTrue(await WelcomePage.isDisplayed(), `${WelcomePage.name} is not displayed`);

        logger.logInfo("[UI] Step #2. Authorization.");

        await WelcomePage.enterLogin(testData.login);
        await WelcomePage.clickSubmitButton();
    
        assert.isTrue(await AuthPage.isDisplayed(), `${AuthPage.name} is not displayed`);

        await AuthPage.enterPassword(testData.password);
        await AuthPage.clickSubmitButton();

        assert.isTrue(await FeedPage.isDisplayed(), `${FeedPage.name} is not displayed`);

        logger.logInfo("[UI] Step #3. Navigating to profile page.");

        await FeedPage.sidebar.clickMyProfileLink();

        if (browser.capabilities.browserName == 'firefox') {
            await FeedPage.sidebar.clickMyProfileLink();
        }

        assert.isTrue(await MyProfilePage.isDisplayed(), `${MyProfilePage.name} is not displayed`);

        logger.logInfo("[API] Step #4. Creating a wall post with random text.");

        const originalPostText = nextAlphanumericString(testData.random.stringLength);
        const postId = await VkApiUtils.createPost(originalPostText);

        logger.logInfo(`Newly created post id is '${postId}'`);
        logger.logInfo("[UI] Step #5. Checking created post text and author.");

        const createdPost = await MyProfilePage.wallForm.getWallPost(postId);
        await createdPost.isDisplayed();

        const userName = await VkApiUtils.getCurrentUserName();

        assert.equal(userName, await createdPost.getPostAuthor(), `Created post author is not ${userName}`);
        assert.equal(originalPostText, await createdPost.getPostText());

        logger.logInfo("[API] Step #6. Editing post.");

        const uploadUrl = await VkApiUtils.getWallUploadServer(postId);;
        const image = await fs.readFile(testData.imageToUpload);
        const form = new FormData();
        form.append(testData.formDataKey, image, testData.formDataValue);
        const { photo, server, hash } = await VkApiUtils.uploadPhotoToUrl(uploadUrl, form);
        const photoId = await VkApiUtils.saveWallPhoto(photo, server, hash);
        const exitedPostText = nextAlphanumericString(testData.random.stringLength);

        await VkApiUtils.editPost(postId, exitedPostText, photoId);

        logger.logInfo("[UI] Step #7. Checking if post text changed and it has right image attached.");

        await createdPost.waitForTextUpdate(originalPostText);

        const uploadedImageUrl = await VkApiUtils.getPhotoUrl(photoId);
        const downloader = new Downloader();
        await downloader.downloadImage(uploadedImageUrl, testData.uploadedImagePath);
        const imageUtils = new ImageUtils();
        const imageDiff = await imageUtils.getImageDifference(testData.imageToUpload, testData.uploadedImagePath);

        assert.notEqual(originalPostText, await createdPost.getPostText(), `Post text didn't change!`);
        assert.equal(imageDiff, testData.expectedImageDiff, `Images are not the same!`);
    
        logger.logInfo("[API] Step #8. Adding random comment to post.");

        const originalCommentText = nextAlphanumericString(testData.random.stringLength);
        await VkApiUtils.addComment(postId, originalCommentText);

        logger.logInfo("[UI] Step #9. Checking created comment author and text.");

        await createdPost.clickShowNextCommentButton();

        const createdComment = await createdPost.getLastComment();

        assert.equal(userName, await createdComment.getCommentAuthor(), `Created comment author is not ${userName}`);
        assert.equal(originalCommentText, await createdComment.getCommentText(), `Created comment text is not ${originalCommentText}`);

        logger.logInfo("[UI] Step #10. Leaving like on post.");

        await createdPost.clickLikeButton();

        const likeInfo = await VkApiUtils.getPostLikes(postId);

        logger.logInfo("[API] Step #11. Checking if like is from the current user.");

        assert.equal(1, likeInfo.likeCount, `There's no like under post`);
        assert.equal(userName, likeInfo.likedUser, `Posts liked user is not ${userName}`);

        logger.logInfo("[API] Step #12. Removing post.");

        await VkApiUtils.deletePost(postId);
        await createdPost.waitForNotExist();

        logger.logInfo("[UI] Step #13. Checking if post was deleted.");

        assert.isFalse(await createdPost.isDisplayed(), `Created post is still present on page`);
    });

    afterEach(async () => {
        await browser.reloadSession();
    });
});

