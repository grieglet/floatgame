(function () {
    'use strict';

    angular.module('admin')
        .controller('AdminController', AdminController);

    AdminController.$inject = ['$http', 'fbutils'];

    function AdminController($http, fbutils) {
        var vm = this;

        vm.populate = populate;

        function populate() {
            populateNPCS();

            function populateNPCS() {
                $http.get('/json/npcs.json').success(function(data) {
                    var players = data['players'];
                    console.log(players);

                    for (var index in players) {
                        var playerData = players[index];

                        var player = fbutils.player(playerData['username']);

                        for (var key in playerData) {
                            player[key] = playerData[key];
                        }

                        player.username = playerData['username'];
                        player.ai = true;
                        player.$save();
                    }
                });
            }
        }


    }
})();
