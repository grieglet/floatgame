(function() {
    'use strict';

    angular
        .module('login')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['$location', 'fbutils', 'playerService'];

    function LoginController($location, fbutils, playerService) {
        var vm = this;

        vm.authData = undefined;
        vm.authError = undefined;
        vm.playerRef = undefined;

        this.auth = auth;

        function auth() {
            fbutils.auth(vm.username).then(function(authData) {
                vm.authData = authData;
                vm.authError = undefined;

                playerService.getPlayer(vm.username, authData.uid);
                $location.url('/dashboard');
            }).catch(function(error) {
                vm.authData = undefined;
                vm.authError = error;
            });
        }
    }
})();
