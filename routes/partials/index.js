var path = require('path');
var router = require('express').Router();

var controller = require(path.resolve('controllers')).partials;

router.get('/search/match', controller.partials);
router.get('/search/request', controller.partials);
router.get('/search/page', controller.partials);

module.exports = router;
