var _ = require('lodash');
var path = require('path');
var logger = require(path.resolve('lib')).getLogger();
var fs = require('fs');
var async = require('async');

var express = require('express');
var router = express.Router();

var apps = {};

exports.load = function init(app) {
    app.use(require(path.resolve('routes')));
    loadRouterDir(function(error, result) {
        _.forEach(apps, function(router, name) {
            loadRouter(app, router, router.namespace || name);
        });

        var preController = require(path.resolve('controllers/init'));
        preController.load();
    });
};

function loadRouter(app, router, name) {
    if(name.substring(1) != '/') {
        name = '/' + name;
    }
    logger.info("Add resource of express route for %s ", name);
    app.use(name, router);
}

/* Router Auto Load Dir
 * 소스상에 require를 선언할때 path를 static으로 넣지 않기 위해 router/ 디렉토리를 로드하여 자동으로 require 시킨다.
 */
function loadRouterDir(callback) {
    var filenames,
        routerDir,
        routerName,
        fsStats;

    routerDir = path.resolve('routes') + '/';
    logger.info("router dir :", routerDir);

    filenames = fs.readdirSync(routerDir);

    apps["/"] = require(path.resolve(routerDir + 'index'));
    async.each(filenames, function(file, eachCallback) {
        if(file == 'init.js')
            return eachCallback();

        routerName = routerDir + file;

        fsStats = fs.statSync(routerName);
        if(fsStats && fsStats.isDirectory()) {
            apps[file] = require(path.resolve(routerName));
        }
        eachCallback();
    }, function done() {
        callback(null, null);
    });
}