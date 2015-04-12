(function() {
    'use strict';

    angular
        .module('timer')
        .directive('timer', timer);

    function timer() {
        var directive = {
            restrict: 'EA',
            templateUrl: 'app/timer/timer.template.html',
            scope: {
                time: '='
            },
            link: linkFunc,
            controller: Controller,
            controllerAs: 'vm',
            bindToController: true
        };

        return directive;

        function linkFunc(scope, el, attr, ctrl) {
        }
    }

    Controller.$inject = ['TICKDELAY', '$scope', 'fbutils'];

    function Controller(TICKDELAY, $scope, fbutils) {
        var vm = this;
        vm.max = TICKDELAY;

        var timeRef = fbutils.fbObject('time');
        timeRef.$watch(function() {
            vm.time = timeRef.$value;
        });
    }
})();
