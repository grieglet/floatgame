(function() {
    'use strict';

    angular
        .module('stocks')
        .directive('stocklist', stockList);

    function stockList() {
        var directive = {
            restrict: 'EA',
            templateUrl: 'app/statusbar/statusbar.template.html',
            scope: {
                companies: '='
            },
            link: linkFunc,
            controller: Controller,
            controllerAs: 'stocklist',
            bindToController: true
        };

        return directive;

        function linkFunc(scope, el, attr, ctrl) {
        }
    }

    function Controller() {
        var vm = this;

        activate();

        function activate() {
        }
    }
})();
