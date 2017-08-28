var _ = require('lodash');
var path = require('path');
var lib = require(path.resolve('lib/index'));

function partials(hbs) {
    hbs.registerPartials(path.resolve('views/partials'));
}

function helper(hbs) {
    hbs.registerHelper('serverTime', function(name, context) {
        return lib.getFullDate();
    });
}

module.exports.partials = partials;
module.exports.helper = helper;