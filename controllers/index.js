var customController = function customController() {
    /**
     * 알파벳 순서
     */
    return {
        index       :  require('./indexController'),
        site       :  require('./site/indexController')
    };
}

module.exports = customController();