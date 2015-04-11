(function() {
    'use strict';

    angular
        .module('firebaseutils')
        .service('fbutils', fbutils);

    fbutils.$inject = ['FIREBASE_URL', '$q', '$firebaseAuth', '$firebaseObject'];

    function fbutils(FIREBASE_URL, $q, $firebaseAuth, $firebaseObject) {
        var uid = undefined;

        var utils = {
            auth: authenticate,
            player: player,
            uid: uid
        };

        return utils;

        function firebaseAuth() {
            var ref = new Firebase(FIREBASE_URL);
            return $firebaseAuth(ref);
        }

        function player(uid) {
            var ref = new Firebase(FIREBASE_URL);
            var playerRef = ref.child('players/' + uid);
            return $firebaseObject(playerRef);
        }

        function authenticate() {
            var auth = firebaseAuth();
            return auth.$authAnonymously();
        }
    }
})();
