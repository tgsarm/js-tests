const {testData} = require('../data/test.data');

const requests = {
    getCurrentUser: () => `${testData.apiUrl}users.get?&access_token=${testData.token}&v=${testData.apiVersion}`,
    createPost: (text) => `${testData.apiUrl}wall.post?owner_id=${testData.userId}&message=${text}&access_token=${testData.token}&v=${testData.apiVersion}`,
    editPost: (postId, editedText, photoId) => `${testData.apiUrl}wall.edit?owner_id=${testData.userId}&post_id=${postId}&message=${editedText}&attachments=photo${testData.userId}_${photoId}&access_token=${testData.token}&v=${testData.apiVersion}`,
    addComment: (postId, randomComment) => `${testData.apiUrl}wall.createComment?owner_id=${testData.userId}&post_id=${postId}&message=${randomComment}&access_token=${testData.token}&v=${testData.apiVersion}`,
    getPostLikes: (postId) => `${testData.apiUrl}likes.getList?type=post&owner_id=${testData.userId}&item_id=${postId}&access_token=${testData.token}&v=${testData.apiVersion}&extended=${testData.likesListExt}`,
    deletePost: (postId) => `${testData.apiUrl}wall.delete?post_id=${postId}&owner_id=${testData.userId}&access_token=${testData.token}&v=${testData.apiVersion}`,
    getWallUploadServer: (postId) => `${testData.apiUrl}photos.getWallUploadServer?&owner_id=${testData.userId}?post_id=${postId}&access_token=${testData.token}&v=${testData.apiVersion}`,
    saveWallPhoto: (photo, server, hash) => `${testData.apiUrl}photos.saveWallPhoto?&user_id=${testData.userId}&access_token=${testData.token}&v=${testData.apiVersion}&photo=${photo}&server=${server}&hash=${hash}`,
    getPhotoUrl: (photoId) => `${testData.apiUrl}photos.getById?photos=${testData.userId}_${photoId}&access_token=${testData.token}&v=${testData.apiVersion}`
}

module.exports = {requests};