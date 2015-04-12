(function() {
    'use strict';

    angular
        .module('playerlist')
        .directive('player-list', playerlist);

    function playerlist() {
        var directive = {
            restrict: 'EA',
            templateUrl: 'app/playerlist/playerlist.template.html',
            scope: {
                players: '='
            },
            link: linkFunc,
            controller: Controller,
            controllerAs: 'playerlist',
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
