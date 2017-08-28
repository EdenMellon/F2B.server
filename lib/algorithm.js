var _ = require('lodash');

var algorithm = {
    fibonach: {
        recursion: function(i) {
            i = parseInt(i, 10);

            if(i <= 0) {
                return 0;
            }
            if(i == 1) {
                return i;
            }
            return algorithm.fibonach.recursion(i - 1) + algorithm.fibonach.recursion(i - 2);
        },
        tail: function(i) {
            i = parseInt(i, 10);
            return algorithm.fibonach.tailRecursion(i, 0, 1);
        },
        tailRecursion: function(i, prev, next) {
            if(i <= 0) {
                return prev;
            }
            return algorithm.fibonach.tailRecursion(i -1, next, prev + next);
        },
        loop: function(i) {
            i = parseInt(i, 10);
            var prev = 0,
                current = 1,
                temp;

            if(i <= 0) {
                return 0
            }
            if(i == 1) {
                return 1
            }
            for(var num = 1; num < i; num++) {
                temp = current;
                current = prev + current;
                prev = temp;
            }
            return current;
        }
    }
};

module.exports = algorithm;