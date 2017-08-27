var path = require('path');
var router = require('express').Router();

var controller = require(path.resolve('controllers')).index;

router.get('/', controller.index);

module.exports = router;
