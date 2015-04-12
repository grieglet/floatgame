(function() {
    'use strict';

    angular
        .module('dashboard')
        .controller('DashboardController', DashboardController);

    DashboardController.$inject = ['$scope', 'playerService', 'companyService'];

    function DashboardController($scope, playerService, companyService) {
        var vm = this;

        activate();

        function activate() {
            playerService.getPlayer().$bindTo($scope, 'player').then(function() {
                companyService.getCompanies().$bindTo($scope, 'companies').then(function() {
                    watchPlayerCompanies()
                });
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
