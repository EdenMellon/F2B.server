module.exports = {
    index: function index(req, res, next) {
        var pagePath = 'site/index';
        res.render(pagePath, {jsPath: pagePath});
    }
};