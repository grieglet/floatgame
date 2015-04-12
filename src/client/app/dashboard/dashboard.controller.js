(function() {
    'use strict';

    angular
        .module('dashboard')
        .controller('DashboardController', DashboardController);

    DashboardController.$inject = ['$scope', 'fbutils', 'playerService', 'companyService'];

    function DashboardController($scope, fbutils, playerService, companyService) {
        var vm = this;

        activate();

        function activate() {
            playerService.getPlayer().$bindTo($scope, 'player').then(function() {
                companyService.getCompanies().$bindTo($scope, 'companies').then(function() {
                    watchPlayerCompanies()
                });
            });

            var tickRef = fbutils.fbObject('tick');
            vm.tick = tickRef;
            tickRef.$watch(function() {
                vm.tick = tickRef;
            });

            fbutils.fbObject('players').$watch(function(data) {
                vm.players = data;
            });
        }

        function watchPlayerCompanies() {
            playerService.getPlayer().$watch(function() {
                var playercompanies = {};

                if ($scope.player.stocks != undefined) {
                    for (var cname in $scope.player.stocks) {
                        var stock = $scope.player.stocks[cname];

                        if (stock > 0) {
                            playercompanies[cname] = $scope.companies[cname];
                        }
                    }
                }

                $scope.playercompanies = playercompanies;
            });
        }
    }
})();
