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
var stringUtil = require(path.resolve('lib/string'));
var algorithm = require(path.resolve('lib/algorithm'));


module.exports = {
    getTime: function(res, res, next) {
        var result = responseJson.success(httpStatus.OK, httpStatus[httpStatus.OK]
            , {
                time: res.timeLib.getDateTime(),
                format: res.timeLib.getDefaultFormat()
            });
        res.status(result.code).json(result);
    },
    index: function index(req, res, next) {
        var pagePath = 'index';
        res.render(pagePath, {jsPath: pagePath});
    },
    checkPassword: function checkPassword(req, res, next) {
        var pwd = req.body.pwd;

        var result = responseJson.success(httpStatus.OK, httpStatus[httpStatus.OK], req.body);
        if(!paramUtil.checkParam(pwd)) {
            result = responseJson.error(httpStatus.BAD_REQUEST
                , httpStatus[httpStatus.BAD_REQUEST]
                , "parameter가 존재하지 않습니다.");
            return res.status(result.code).json(result);
        }

        var regExp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&+=]).{8,}$/;
        if(!regExp.test(pwd)) {
            result = responseJson.error(httpStatus.FORBIDDEN
                , httpStatus[httpStatus.FORBIDDEN]
                , "패스워드 규칙에 맞지 않습니다.");
        }
        res.status(result.code).json(result);
    },
    googleSearch: function googleSearch(req, res, next) {
        var query = req.body.query;

        var result = responseJson.success(httpStatus.OK, httpStatus[httpStatus.OK], req.body);

        if(!paramUtil.checkParam(query)) {
            result = responseJson.error(httpStatus.BAD_REQUEST
                , httpStatus[httpStatus.BAD_REQUEST]
                , "parameter가 존재하지 않습니다.");
            return res.status(result.code).json(result);
        }

        async.auto({
            sendRequest: function(callback) {
                var googleSearchUri = config.externals.search.google.uri;

                var params = googleSearchUri.defaultParams;
                params.q = query;

                request.send(googleSearchUri.url
                    , googleSearchUri.method
                    , params
                    , function(error, result){
                        if(error) {
                            return callback(responseJson.error(error.code
                                , error.status
                                , error.errors.responseDetails));
                        }
                        res.status(result.code).json(result);
                    });
            }
        }, function(error, result) {
            if(error) {
                return res.status(error.code).json(error);
            }
            res.status(result.code).json(result);
        });
    },
    alTest: function alTest(req, res, next) {
        var num = parseInt(req.query.num, 10);
        var eCode = req.query.eCode;

        var result = responseJson.success(httpStatus.OK, httpStatus[httpStatus.OK], req.query);
        if(!paramUtil.checkParam(num)) {
            result = responseJson.error(httpStatus.BAD_REQUEST
                , httpStatus[httpStatus.BAD_REQUEST]
                , "parameter[num]가 존재하지 않습니다.");
            return res.status(result.code).json(result);
        }

        if(!paramUtil.checkParam(eCode)) {
            result = responseJson.error(httpStatus.BAD_REQUEST
                , httpStatus[httpStatus.BAD_REQUEST]
                , "parameter[eCode]가 존재하지 않습니다.");
            return res.status(result.code).json(result);
        }

        if(!stringUtil.checkIntValue(num)) {
            result = responseJson.error(httpStatus.BAD_REQUEST
                , httpStatus[httpStatus.BAD_REQUEST]
                , "숫자를 입력하세요.");
            return res.status(result.code).json(result);
        }

        var actionTime,
            alResult = [];
        for(var i = 0; i <= num ; i++) {
            alResult.push(algorithm.fibonach[eCode](i));
        }

        if(_.isUndefined(result.data)) {
            result.data = {};
        }
        result.data.eCode = eCode;
        result.data.response = alResult;

        res.status(result.code).json(result);
    }

};