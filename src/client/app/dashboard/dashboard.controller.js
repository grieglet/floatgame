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
            playerService.getPlayer().$bindTo($scope, "player");
            companyService.getCompanies().$bindTo($scope, "companies");
        }
    }
})();
