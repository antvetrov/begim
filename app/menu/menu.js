'use strict';

angular.module('myApp.menu', [])

  .controller('MenuCtrl', ['$scope', 'FirebaseUrl', '$firebaseArray', 
    '$firebaseAuth',
    function($scope, FirebaseUrl, $firebaseArray, $firebaseAuth) {

	//Get user auth data
	var auth = $firebaseAuth(FirebaseUrl);
	
	// any time auth status updates, add the user data to scope
  auth.$onAuth(function(authData) {
    $scope.authData = authData;
  });
  
  //Todo list
  var today = new Date().getDay();
  var userId = FirebaseUrl.getAuth().uid;
  var weekdays = ["sunday","monday","tuesday","wednesday","thursday","friday","saturday"];
  $scope.trainingPlan = $firebaseArray(FirebaseUrl.child("users/" + userId + 
    "/trainingPlan/" + weekdays[today]));

 	//Login with facebook
 	$scope.loginFacebook = function() {
		FirebaseUrl.authWithOAuthPopup("facebook", function(authData) {
		});
 	};
 	
  //Logout
  $scope.logOut = function() {
    FirebaseUrl.unauth();
  };

}]);
