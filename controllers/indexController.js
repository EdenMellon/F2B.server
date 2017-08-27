module.exports = {
    index: function index(req, res, next) {
        var pagePath = 'index';
        res.render(pagePath, {jsPath: pagePath});
    }
};