(function() {
    'use strict';

    angular
        .module('stocks')
        .directive('stocklist', stockList);

    function stockList() {
        var directive = {
            restrict: 'EA',
            templateUrl: 'app/stocks/stocklist.template.html',
            scope: {
                own: '=',
                player: '=',
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
        vm.buy = buy;
        vm.sell = sell;

        function buy(name) {
            console.log('buying %s', name);
            var price = vm.companies[name].price.current;

            if (vm.companies[name].stocks.available > 0 && vm.player.credits >= price) {
                if (vm.player.stocks === undefined) {
                    vm.player.stocks = {};
                }

                if (vm.player.stocks[name] === undefined) {
                    vm.player.stocks[name] = 0;
                }

                vm.companies[name].stocks.available -= 1;
                vm.player.stocks[name] += 1;
                vm.player.credits -= price;
            }
        }

        function sell(name) {
            console.log('selling %s', name);
            var price = vm.companies[name].price.current;

            if (vm.player.stocks === undefined) {
                vm.player.stocks = {};
            }

            if (vm.player.stocks[name] === undefined) {
                vm.player.stocks[name] = 0;
            }

            if (vm.player.stocks[name] > 0) {
                vm.companies[name].stocks.available += 1;
                vm.player.stocks[name] -= 1;
                vm.player.credits += price;
            }
        }
    }
})();
