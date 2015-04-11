(function () {
    'use strict';

    angular
        .module('states')
        .service('playerService', playerService);

    playerService.$inject = ['PLAYER_START_VALUES', 'fbutils'];

    function playerService(PLAYER_START_VALUES, fbutils) {
        var player;

        var services = {
            getPlayer: getPlayer
        };

        return services;

        function getPlayer(username, uid) {
            if (player == undefined) {
                player = createPlayer(username, uid);
            }

            return player;
        }

        function createPlayer(username, uid) {
            if (!uid) {
                uid = 'dev';
            }

            if (!username) {
                username = 'developer';
            }

            var player = fbutils.player(uid);

            for (var key in PLAYER_START_VALUES) {
                if (PLAYER_START_VALUES.hasOwnProperty(key)) {
                    if (!player.hasOwnProperty(key)) {
                        player[key] = PLAYER_START_VALUES[key];
                    }
                }
            }

            player.username = username;
            player.$save();

            return player;
        }
    }
})();
