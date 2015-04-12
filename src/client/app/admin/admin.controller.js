(function () {
    'use strict';

    angular.module('admin')
        .controller('AdminController', AdminController);

    AdminController.$inject = ['$http', 'fbutils'];

    function AdminController($http, fbutils) {
        var vm = this;

        vm.populate = populate;
        vm.clear = clear;

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

            console.log('CLEARED ALL RECORDS!');
        }
    }
})();
