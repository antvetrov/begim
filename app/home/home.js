'use strict';

angular.module('myApp.home', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/', {
    templateUrl: 'home/home.html',
    controller: 'HomeCtrl'
  });
}])

.controller('HomeCtrl', ['$scope', 'FirebaseUrl', '$firebaseArray', 
  function($scope, FirebaseUrl, $firebaseArray) {

    $scope.users = $firebaseArray(FirebaseUrl.child("users"));

}]);