'use strict';

angular.module('myApp.menu', [])

  .controller('MenuCtrl', ['$scope', 'FirebaseUrl', '$firebaseObject', 
    '$firebaseAuth',
    function($scope, FirebaseUrl, $firebaseObject, $firebaseAuth) {

	//Get user auth data
	var auth = $firebaseAuth(FirebaseUrl);
	
	// any time auth status updates, add the user data to scope
  auth.$onAuth(function(authData) {
    $scope.authData = authData;
  });
  
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
