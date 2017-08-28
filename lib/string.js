var _ = require('lodash');

var stringLib = {
    checkIntValue: function(i) {
        return _.isInteger(i) && i >= 0 ? true: false;
    }
};

module.exports = stringLib;