(function() {
    'use strict';

    angular
        .module('statusbar')
        .directive('statusbar', statusBar);

    function statusBar() {
        var directive = {
            restrict: 'EA',
            templateUrl: 'app/statusbar/statusbar.template.html',
            scope: {
                max: '='
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

    function Controller() {
        var vm = this;
    }
})();
