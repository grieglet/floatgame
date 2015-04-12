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
            populateNPCS();
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

            updateStocks();
        }

        function updateStocks() {

        }
    }
})();
