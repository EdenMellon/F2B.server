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
    this.getDefaultFormat = function() {
        return "YYYY년 MM월 DD일 HH시 mm분 ss초";
    };
    this.getDateTime = function getDateTime() {
        return new moment().format('YYYY-MM-DD HH:mm:ss');
    };
    this.getFullDate = function getFullDate() {
        return new moment().format(this.getDefaultFormat());
    };

    return this;
}

exports.getLogger = (function() { return getLogger })();
exports.getDate = (function() { return getDate })();