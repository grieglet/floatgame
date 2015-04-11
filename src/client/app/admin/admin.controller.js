(function () {
    'use strict';

    angular.module('admin')
        .controller('AdminController', AdminController);

    AdminController.$inject = ['$http', 'fbutils'];

    function AdminController($http, fbutils) {
        var vm = this;

        vm.populate = populate;

        function populate() {
            populateNPCS();
            populateCompanies();

            function populateNPCS() {
                $http.get('/json/npcs.json').success(function(data) {
                    var players = data['players'];
                    console.log(players);

                    for (var index in players) {
                        var playerData = players[index];

                        var player = fbutils.player(playerData['username']);

                        for (var key in playerData) {
                            player[key] = playerData[key];
                        }

                        player.username = playerData['username'];
                        player.ai = true;
                        player.$save();
                    }
                });
            }

            function populateCompanies() {
                $http.get('/json/companies.json').success(function(data) {
                    var companies = data['companies'];
                    console.log(companies);

                    for (var index in companies) {
                        var companyData = companies[index];

                        var company = fbutils.fbObject('companies', companyData['companyname']);

                        for (var key in companyData) {
                            company[key] = companyData[key];
                        }

                        company.companyname = companyData['companyname'];
                        company.$save();
                    }
                });
            }
        }


    }
})();
