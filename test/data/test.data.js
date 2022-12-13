const testData = {
    'homeUrl': 'https://vk.com/',
    'apiUrl': 'https://api.vk.com/method/',
    'apiVersion': '5.131',
    'userId': '759352495',
    'login': '+77058709039',
    'password': 'vk159951',
    'token': 'vk1.a.RI4UqHCTOLJC-4knQEryvOcq-191pqu68Q-NpJuhcy6Hl30vBZIcvvttLkAAavC_q6bvW_atqbGCxFfRFcTtikk7hoEM6vAiJFCbnHH0As39fWx0XdWcNcMPSwJf-IRgYj9wC3dwZdKNCk68ZBctGJzI_ocJ_Wbp_qqkKbcwUQbQzfLB-9GjEYK6zIm6PpPMqad_Egejw09HYNDkEVAapQ',
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