var customController = function customController() {
    /**
     * 알파벳 순서
     */
    return {
        index       :  require('./indexController'),
        site       :  require('./site/indexController'),
        partials       :  require('./partials/indexController')
    };
}

module.exports = customController();