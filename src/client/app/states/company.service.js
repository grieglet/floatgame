(function () {
    'use strict';

    angular
        .module('states')
        .service('companyService', companyService);

    companyService.$inject = ['fbutils'];

    function companyService(fbutils) {
        var services = {
            getCompanies: getCompanies
        };

        return services;

        function getCompanies() {
            return fbutils.fbObject('companies');
        }
    }
})();
