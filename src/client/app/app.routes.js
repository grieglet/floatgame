(function () {
    'use strict';

    angular
        .module('app')
        .run(routeChangeFailureHandler)
        .config(routes);

    routeChangeFailureHandler.$inject = ['$rootScope', '$location'];

    function routeChangeFailureHandler($rootScope, $location) {
        $rootScope.$on('$routeChangeError', function (event, next, previous, error) {
            if (error === 'AUTH_REQUIRED') {
                console.log('AUTH_REQUIRED');
                $location.path('/login');
            }
        });
    }

    routes.$inject = ['$routeProvider'];

    function routes($routeProvider) {
        $routeProvider
            .when('/dashboard', {
                templateUrl: 'app/dashboard/dashboard.html',
                controller: 'DashboardController',
                controllerAs: 'game'
            })
            .when('/login', {
                templateUrl: 'app/login/login.html',
                controller: 'LoginController',
                controllerAs: 'login'
            })
            .when('/admin', {
                templateUrl: 'app/admin/admin.html',
                controller: 'AdminController',
                controllerAs: 'admin'
            })
            .otherwise({
                redirectTo: '/login'
            });
    }
})();
