var path = require('path');
var router = require('express').Router();

var controller = require(path.resolve('controllers')).index;

router.get('/', controller.index);
router.post('/check', controller.checkPassword);
router.post('/search', controller.googleSearch);
router.get('/algorithm', controller.alTest);

module.exports = router;
