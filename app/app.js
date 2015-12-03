'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'firebase',
  'chart.js',
  'myApp.menu',
  'myApp.home',
  'myApp.dashboard',
  'myApp.exercises',
  'myApp.trophy',
  'myApp.userProfile'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/'});
}]).
factory("FirebaseUrl", [
    function() {
      // Reference to the database node where we will store our data
      // devbegim.firebaseio.com - dev server
      // begim.firebaseio.com - prod server
      var ref = new Firebase("https://begim.firebaseio.com/");
      return ref;
    }
  ]);

