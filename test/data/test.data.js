const testData = {
    'homeUrl': 'https://vk.com/',
    'apiUrl': 'https://api.vk.com/method/',
    'apiVersion': '5.131',
    'userId': '759352495',
    'login': '',
    'password': '',
    'token': '',
    'imageToUpload': './test/data/avatar.jpg',
    'uploadedImagePath': './test/output/avatar.jpg',
    'imageSize': 3,
    'formDataKey': 'photo',
    'formDataValue': 'avatar.png',
    'expectedImageDiff': 0,
    'browser': {
        'implicitWaitTimeout': 30000,
        'waitUntilTimeout': 30000
    },
    'random': {
        'stringLength': 30
    },
    'imgDiff': {
        'threshold': 0.2
    }
};

module.exports = {testData}