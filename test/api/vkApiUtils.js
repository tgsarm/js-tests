const logger = require('../../utils/logger');
const {testData} = require('../data/test.data');
const {requests} = require('../requests/requests');
const axios = require('axios');

class VkApiUtils {

    static async getCurrentUser() {
        logger.logInfo(`Getting current user info`);
        return (await axios.get(requests.getCurrentUser())).data.response[0];
    }

    static async getCurrentUserName() {
        logger.logInfo(`Getting current user name`);
        const user = await this.getCurrentUser();
        return `${user.first_name} ${user.last_name}`;
    }

    static async createPost(randomText) {
        logger.logInfo(`Creating wall post with text '${randomText}'`);
        return (await axios.post(requests.createPost(randomText))).data.response.post_id;
    }

    static async editPost(postId, editedText, photoId) {
        logger.logInfo(`Editing post with id '${postId}'`);
        return axios.post(requests.editPost(postId, editedText, photoId));
    }

    static async addComment(postId, randomComment) {
        logger.logInfo(`Adding comment to wall post with id ${postId}`);
        return axios.get(requests.addComment(postId, randomComment));
    }

    static async getPostLikes(postId) {
        logger.logInfo(`Getting likes count from post with id ${postId}`);
        const res = await axios.get(requests.getPostLikes(postId));
        const firstItem = res.data.response.items[0];
        const likedUser = `${firstItem.first_name} ${firstItem.last_name}`;
        const likeCount = res.data.response.count;

        return {likeCount, likedUser};
    }

    static async deletePost(postId) {
        logger.logInfo(`Post deleting ${postId}`);
        return axios.get(requests.deletePost(postId));
    }

    static async getWallUploadServer(postId) {
        logger.logInfo(`Getting server to upload photo to the post ${postId}`);
        return (await axios.get(requests.getWallUploadServer(postId))).data.response.upload_url;
    }

    static async uploadPhotoToUrl(uploadUrl, form) {
        logger.logInfo(`Uploading photo to ${uploadUrl}`);
        let {photo, server, hash} = (await axios.post(uploadUrl, form, {headers: {...form.getHeaders()}})).data;
        return {photo, server, hash};
    }
    
    static async saveWallPhoto(photo, server, hash) {
        logger.logInfo(`Saving photo ${photo}`);
        return (await axios.post(requests.saveWallPhoto(photo, server, hash))).data.response[0].id;
    }

    static async getPhotoUrl(photoId) {
        logger.logInfo(`Getting URL of the uploaded photo ${photoId}`);
        console.log("пидор");
        console.log((await axios.get(requests.getPhotoUrl(photoId))).data.response[0]);
        return (await axios.get(requests.getPhotoUrl(photoId))).data.response[0].sizes[testData.imageSize].url;
    }

}


module.exports = VkApiUtils;