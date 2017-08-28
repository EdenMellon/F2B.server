var _ = require('lodash');
var httpStatus = require('http-status');

var response = {
    code: httpStatus.OK,
    status: httpStatus[httpStatus.OK],
    data: null,
    message: null,
    setResponse: function(code, status) {
        response.code = code;
        response.status = status;
    },
    getResponse: function() {
        return {
            code: response.code,
            status: response.status
        }
    },
    success: function(code, status, data) {
        var res = response.setResponse(code, status);
        var result = response.getResponse();
        if(_.isUndefined(data) && _.isNull(data)) {
            result.data = data;
        }
        return result;
    },
    error: function (code, status, message) {
        var res = response.setResponse(code, status);
        var result = response.getResponse();
        result.message = message;
        return result;
    }
};

module.exports = response;