var express = require('express');
var path = require('path');
var config = require('config');
var favicon = require('serve-favicon');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var lib = require(path.resolve('lib'));
var logger = lib.getLogger();
var date = lib.getDate();
var hbs = require('hbs');

var app = express();
var preRouter = require(path.resolve('routes/init'));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
// Use `.hbs` for extensions and find partials in `views/partials`.
app.set('views', __dirname + '/views');
app.set('view engine', 'hbs');
app.engine('hbs', require('hbs').__express);

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next) {
    res.locals.timeLib = res.timeLib = lib.getDate();
    res.locals.callTime = res.callTime = res.timeLib.getFullDate();
    logger.debug('call time: ', res.callTime);
    next();
});

preRouter.load(app);

require(path.resolve('lib/hbsRegister')).partials(hbs);
require(path.resolve('lib/hbsRegister')).helper(hbs);

// app.use(require(path.resolve('routes')));
// var index = require('./routes/index');
// app.use('/', index);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    logger.error(err);
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

process.env.PORT = config.port;
/**
 * Print Running Information
 */
logger.info('######################################');
logger.info('ENV            : ' + config.util.getEnv('NODE_ENV'));
logger.info('PORT           : ' + process.env.PORT);
logger.info('######################################');

module.exports = app;
