'use strict';

angular.module('myApp.userProfile', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/userProfile', {
    templateUrl: 'userProfile/userProfile.html',
    controller: 'UserProfileCtrl'
  });
}])

.controller('UserProfileCtrl', ['$scope', 'FirebaseUrl', '$firebaseObject', 
  function($scope, FirebaseUrl, $firebaseObject) {
	 	//Get user training plan
	 	var userId = FirebaseUrl.getAuth().uid;
    var trainingPlan = $firebaseObject(FirebaseUrl.child("users/" + userId + "/trainingPlan"));
    trainingPlan.$bindTo($scope, "data");
}]);