'use strict';

angular.module('myApp.exercises', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/exercises', {
    templateUrl: 'exercises/exercises.html',
    controller: 'ExercisesCtrl'
  });
}])

//Workout
.controller("ExercisesCtrl", ["$scope", "FirebaseUrl", "$firebaseArray",
	function($scope, FirebaseUrl, $firebaseArray) {
	  $scope.workouts = $firebaseArray(FirebaseUrl.child("exercises/workout"));
	  $scope.workouts02 = $firebaseArray(FirebaseUrl.child("exercises/workout02"));
	}
]);