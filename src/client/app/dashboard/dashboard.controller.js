(function() {
    'use strict';

    angular
        .module('dashboard')
        .controller('DashboardController', DashboardController);

    DashboardController.$inject = ['playerService'];

    function DashboardController(playerService) {
        var vm = this;

        activate();

        function activate() {
            vm.player = playerService.getPlayer();
        }
    }
})();
