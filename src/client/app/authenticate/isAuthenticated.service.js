(function() {
    'use strict';

    angular
        .module('authenticate')
        .service('isAuthenticated', isAuthenticated);

    function isAuthenticated(username) {
        var ref = new Firebase("https://docs-sandbox.firebaseio.com", username);
        return $firebaseAuth(ref);
    }
})();
