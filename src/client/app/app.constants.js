(function() {
    'use strict';

    angular.module('app')
        .constant('FIREBASE_URL', 'https://blazing-inferno-791.firebaseio.com/')
        .constant('PLAYER_START_VALUES', {
            networth: 50000,
            credits: 50000
        });
})();
