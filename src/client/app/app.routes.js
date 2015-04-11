(function () {
    'use strict';

    angular
        .module('app')
        .run(routeChangeFailureHandler)
        .config(routes);

    routeChangeFailureHandler.$inject = ['$rootScope', '$location'];

    function routeChangeFailureHandler($rootScope, $location) {
        $rootScope.$on("$routeChangeError", function (event, next, previous, error) {
            if (error === "AUTH_REQUIRED") {
                $location.path("/login");
            }
        });
    }

    routes.$inject = ['$routeProvider'];

    function routes($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'front/front.html',
                controller: 'FrontController',
                controllerAs: 'front',
                resolve: {
                    "currentAuth": ["Auth", function (Auth) {
                        return Auth.$waitForAuth();
                    }]
                }
            })
            .when('/dashboard', {
                templateUrl: 'dashboard/dashboard.html',
                controller: 'DashboardController',
                controllerAs: 'dashboard',
                resolve: {
                    "currentAuth": ["Auth", function (Auth) {
                        return Auth.$waitForAuth();
                    }]
                }
            })
            .when('/login', {
                templateUrl: 'login/login.html',
                controller: 'LoginController',
                controllerAs: 'login'
            })
            .otherwise({
                redirectTo: '/'
            });
    }
})();
