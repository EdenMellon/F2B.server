var _ = require("lodash");
var config = require('config');
var moment = require('moment');
var log4js = require('log4js');

function getLogger(env) {
    var env = env || config.util.getEnv('NODE_ENV');
    var logger = log4js.getLogger(env);

    logger.level = env === 'development' ? 'trace' : 'warn';

    return logger;
};

function getDate(format) {
    if(!_.isUndefined(format)) {
        //noinspection JSAnnotator
        return this.getDate() = function getTime() {
            new moment().format(format);
        };
    }
    this.getFullDate = function getFullDate() {
        return new moment().format("YYYY년 MM월 DD일 HH시 mm분 ss초");
    };
    this.getDate = function getDate() {
        return moment().format("YYYY년 MM월 DD일");
    };
    this.getTime = function getTime() {
        return moment().format("HH시 mm분 ss초");
    };

    return this;
}

exports.getLogger = (function() { return getLogger })();
exports.getDate = (function() { return getDate })();