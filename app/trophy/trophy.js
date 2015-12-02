'use strict';

angular.module('myApp.trophy', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/trophy', {
    templateUrl: 'trophy/trophy.html',
    controller: 'TrophyCtrl'
  });
}])

.controller('TrophyCtrl', ['$scope', 'FirebaseUrl', '$firebaseArray', 
  function($scope, FirebaseUrl, $firebaseArray) {

    $scope.users = $firebaseArray(FirebaseUrl.child("users"));

}]);