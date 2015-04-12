(function () {
    'use strict';

    angular.module('intro')
        .controller('IntroController', IntroController);

    IntroController.$inject = ['$location'];

    function IntroController($location) {
        var vm = this;
        vm.interval = 5000;
        vm.slides = [];
        vm.login = login;

        activate();

        function activate() {
            for (var i = 0; i < 6; i++) {
                addSlides(i);
            }
        }

        function login() {
            $location.url('login/');
        }

        function addSlides(i) {
            vm.slides.push({
                image: '../images/slide_' + i + '.png'
            });
        }
    }
})();
