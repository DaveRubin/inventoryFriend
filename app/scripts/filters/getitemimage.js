'use strict';

angular.module('firebaseApp')
    .filter('getItemImage', function () {
        return function (input) {
            var str = 'images/' + input + '.jpg';
            return str;
        };
    });
