var _ = require('lodash');
var path = require('path');
var async = require('async');
var config = require('config');
var httpStatus = require('http-status');

// custom module;
var request = require('meellon-request');

// project library;
var paramUtil = require(path.resolve('lib/param'));
var responseJson = require(path.resolve('lib/responseJson'));

module.exports = {
    partials: function partials(req, res, next) {
        var partials = req.query.partials;

        var result = responseJson.success(httpStatus.OK, httpStatus[httpStatus.OK], req.body);
        if(!paramUtil.checkParam(partials)) {
            result = responseJson.error(httpStatus.BAD_REQUEST
                , httpStatus[httpStatus.BAD_REQUEST]
                , "parameter가 존재하지 않습니다.");
            return res.status(result.code).json(result);
        }

        var pagePath = partials.substring(1, partials.length);
        res.render(pagePath, {layout: false, jsPath: pagePath});
    }
};