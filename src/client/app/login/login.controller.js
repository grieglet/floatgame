(function() {
    'use strict';

    angular
        .module('login')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['fbutils'];

    function LoginController(fbutils) {
        var vm = this;

        vm.authData = undefined;
        vm.authError = undefined;
        vm.playerRef = undefined;

        this.auth = auth;

        function auth() {
            fbutils.auth(vm.username).then(function(authData) {
                vm.authData = authData;
                vm.authError = undefined;
            }).catch(function(error) {
                vm.authData = undefined;
                vm.authError = error;
            });
        }
    }
})();
