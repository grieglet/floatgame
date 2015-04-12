(function () {
    'use strict';

    angular.module('admin')
        .controller('AdminController', AdminController);

    AdminController.$inject = ['$scope', '$http', '$interval', 'TICKDELAY', 'fbutils'];

    function AdminController($scope, $http, $interval, TICKDELAY, fbutils) {
        var vm = this;

        $scope.time = { $value: 0 };
        $scope.tick = { $value: 0 };

        vm.populate = populate;
        vm.clear = clear;
        vm.startTicks = startTicks;

        function populate() {
            //populateNPCS();
            populateCompanies();

            function populateNPCS() {
                $http.get('/json/npcs.json').success(function (data) {
                    var players = data['players'];

                    for (var index in players) {
                        if (players.hasOwnProperty(index)) {
                            var playerData = players[index];

                            var player = fbutils.player(playerData['username']);

                            for (var key in playerData) {
                                if (playerData.hasOwnProperty(key)) {
                                    player[key] = playerData[key];
                                }
                            }

                            player.username = playerData['username'];
                            player.ai = true;
                            player.$save();
                        }
                    }

                    console.log('populated npcs');
                });
            }

            function populateCompanies() {
                $http.get('/json/companies.json').success(function (data) {
                    var companies = data['companies'];
                    console.log(companies);

                    for (var name in companies) {
                        if (companies.hasOwnProperty(name)) {
                            var companyData = companies[name];
                            var company = fbutils.fbObject('companies/' + name);

                            for (var key in companyData) {
                                if (companyData.hasOwnProperty(key)) {
                                    company[key] = companyData[key];
                                }
                            }

                            company.$save();
                        }
                    }

                    console.log('populated companies');
                });
            }}

        function clear() {
            var ref = fbutils.fbObject('/');
            ref.$remove();

            var time = fbutils.fbObject('time');
            var tick = fbutils.fbObject('tick');
            time.$value = 0;
            tick.$value = 0;
            time.$save();
            tick.$save();

            console.log('CLEARED ALL RECORDS!');
        }

        function startTicks() {
            var tickRef = fbutils.fbObject('tick');
            var timeRef = fbutils.fbObject('time');

            tickRef.$bindTo($scope, 'tick').then(function() {
                timeRef.$bindTo($scope, 'time').then(function() {
                    var cancelTimer = $interval(updateTime, 1000);

                    $scope.$on('$destroy', function() {
                        cancelTimer();
                    });
                });
            });
        }

        function updateTime() {
            $scope.time.$value += 1;

            if ($scope.time.$value > TICKDELAY) {
                updateTicks();
            }
        }

        function updateTicks() {
            $scope.time.$value = 0;
            $scope.tick.$value += 1;
            console.log('tick: ' + $scope.tick.$value);

            updateStocks(updatePlayerNet);
        }

        function updateStocks() {
            var ref = fbutils.fbObject('companies');
            ref.$loaded(function(companies) {
                for (var cname in companies) {
                    if (companies.hasOwnProperty(cname)) {
                        var company = companies[cname];
                        if (company != null && company.hasOwnProperty('price')) {
                            console.log(company);
                            var price = company.price.current;
                            var initial = company.price.initial;

                            if (price < initial * 0.25) {
                                price += price * getRandomArbitrary(0.03, 0.09)
                            } else if (price < initial * 0.5) {
                                price += price * getRandomArbitrary(0.02, 0.08)
                            } else if (price < initial * 0.75) {
                                price += price * getRandomArbitrary(0.01, 0.06)
                            } else if (price < initial * 0.85) {
                                price += price * getRandomArbitrary(-0.01, 0.05)
                            } else if (price > initial * 1) {
                                price += price * getRandomArbitrary(-0.03, 0.03)
                            } else if (price > initial * 1.25) {
                                price += price * getRandomArbitrary(-0.03, 0.01)
                            } else if (price > initial * 1.5) {
                                price += price * getRandomArbitrary(-0.05, 0.01)
                            } else {
                                price += price * getRandomArbitrary(-0.03, 0.05)
                            }

                            company.price.current = price;
                        }
                    }
                }

                companies.$save();
                updatePlayerNet(companies);
            });
        }

        function updatePlayerNet(companies) {
            var playerRef = fbutils.fbObject('players');
            playerRef.$loaded(function(players) {
                for (var pname in players) {
                    if (players.hasOwnProperty(pname)) {
                        var player = players[pname];
                        if (player != null && player.hasOwnProperty('stocks')) {
                            var net = player.credits;
                            var stocks = player.stocks;

                            for (var sname in stocks) {
                                var owned = stocks[sname];
                                var worth = owned * companies[sname].price.current;
                                net += worth;
                            }

                            player.networth = net;
                        }
                    }
                }

                players.$save();
            });
        }

        function getRandomArbitrary(min, max) {
            return Math.random() * (max - min) + min;
        }
    }
})();
