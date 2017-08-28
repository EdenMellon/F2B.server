var _ = require('lodash');

var param = {
    checkParam: function(param) {
        if(typeof param == 'string') {
            if(param == 'undefined') {
                return false;
            }
        }
        if(_.isUndefined(param) || _.isNull(param)) {
            return false;
        }
        return true;
    }
};

module.exports = param;