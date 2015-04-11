(function() {
    'use strict';

    angular
        .module('states')
        .service('playerState', playerState);

    playerState.$inject = [];

    function playerState() {
        var playerState = {
        };

        return playerState;
    }
})();
