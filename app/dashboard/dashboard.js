'use strict';

angular.module('myApp.dashboard', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/dashboard', {
    templateUrl: 'dashboard/dashboard.html',
    controller: 'DashboardCtrl'
  });
}])

.controller('DashboardCtrl', ['$scope', 'FirebaseUrl', '$firebaseObject', '$firebaseAuth', '$firebaseArray', 
    '$firebaseAuth', 
    function($scope, FirebaseUrl, $firebaseObject, $firebaseAuth, $firebaseArray) {

	//Get user auth data
	var auth = $firebaseAuth(FirebaseUrl);
	
	// any time auth status updates, add the user data to scope
  auth.$onAuth(function(authData) {
    $scope.authData = authData;
    
    if (authData) {
      
      //Get user ID
      var userId = FirebaseUrl.getAuth().uid;
      $scope.user = $firebaseObject(FirebaseUrl.child("users/" + userId));
  
  		//
  		// Сheck new user
  		//
      var users = $firebaseArray(FirebaseUrl.child("users"));
      //show add user button
      users.$loaded()
        .then(function() {
          if (users.$indexFor(userId) === -1) {
            $scope.newUser = true;
          }
        });
  
      //
      // creat new user
      //
      $scope.createUser = function() {
        //workouts
        $scope.user.workout = {
          label: "Зарядка",
          diagram: [0, 40, 0, 0],
          lastDay: new Date().getTime() - 24*60*60*1000
        };
        //pull up
        $scope.user.pullUps = {
          label: "Подтягивание",
          diagram: [[0]],
          pullLabels: ["Занятие 1"],
        };
        //abdominal
        $scope.user.abdominal = {
          label: "Пресс",
          diagram: [[0]],
          labels: ["Занятие 1"],
        };
  			//save
  			$scope.user.$save();
  			$scope.newUser = "";
  		};
  
  		//
  		// Build diagram
  		//
  		//Workouts
  		$scope.workoutLabels = ["Выполнено", "Оcталось", "Рекорд", "Попытка"];
      //Bind elements
  	 	$scope.user.$bindTo($scope, "data").then(function() {
  	 	});
  
      //
      // Add event
      //
      //add workout
      $scope.saveWorkout = function() {
        // Сheck truancy
        $scope.user.$loaded().then(function() {
          var lastWorkout = Math.floor($scope.user.workout.lastDay/24/60/60/1000);
          var today = Math.floor(new Date().getTime()/24/60/60/1000);
          var truancy = today - lastWorkout;
          //check workout
          switch (truancy) {
            case 0:
              //hide button
              $scope.hideWorkoutButton = true;
              break
            case 1:
              //check attempt
              if ($scope.data.workout.diagram[0] === 0) {
                ++$scope.data.workout.diagram[3];
              }
              //done
              ++$scope.data.workout.diagram[0];
  						//duty
              --$scope.data.workout.diagram[1];
              //add time
              $scope.data.workout.lastDay = Firebase.ServerValue.TIMESTAMP;
              //check record
              if ($scope.data.workout.diagram[2] < $scope.data.workout.diagram[0]) {
                $scope.data.workout.diagram[2] = $scope.data.workout.diagram[0];
              }
              break
            default:
              //truancy
              $scope.data.workout.diagram[0] = 1;
              $scope.data.workout.diagram[1] = 39;
              //add new attempt
              ++$scope.data.workout.diagram[3];
              //add time
              $scope.data.workout.lastDay = Firebase.ServerValue.TIMESTAMP;
              alert("сброс")
          }
  	    });
      };
  			
  		//add pull up
      $scope.savePullUp = function() {
  			//add new week
  			$scope.data.pullUps.diagram[0].push($scope.pullUps);
  			//add new week
  			$scope.data.pullUps.pullLabels.push($scope.data.pullUps.pullLabels.length + 1);
  		};
  		
  		//add abdominal
      $scope.saveAbdominal = function() {
  			//add new week
  			$scope.data.abdominal.diagram[0].push($scope.abdominal);
  			//add new week
  			$scope.data.abdominal.labels.push($scope.data.abdominal.labels.length + 1);
  		};
  		
    }
  });
}]);