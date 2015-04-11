(function() {
    'use strict';

    angular
        .module('firebaseutils')
        .service('fbutils', fbutils);

    fbutils.$inject = ['FIREBASE_URL', '$firebaseAuth', '$firebaseObject', '$firebaseArray'];

    function fbutils(FIREBASE_URL, $firebaseAuth, $firebaseObject, $firebaseArray) {
        var uid = undefined;

        var utils = {
            auth: authenticate,
            fbArray: fbArray,
            fbObject: fbObject,
            player: player,
            uid: uid
        };

        return utils;

        function firebaseAuth() {
            var ref = new Firebase(FIREBASE_URL);
            return $firebaseAuth(ref);
        }

        function fbObject(path, id) {
            var ref = new Firebase(FIREBASE_URL);
            var objRev = ref.child(path + '/' + id);
            return $firebaseObject(objRev);
        }

        function fbArray(path, id) {
            var ref = new Firebase(FIREBASE_URL);
            var objRev = ref.child(path + '/' + id);
            return $firebaseArray(objRev);
        }

        function player(uid) {
            return fbObject('players', uid);
        }

        function authenticate() {
            var auth = firebaseAuth();
            return auth.$authAnonymously();
        }
    }
})();
