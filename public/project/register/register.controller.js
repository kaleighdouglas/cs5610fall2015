(function() {
	"use strict";
	angular
		.module("DecisionsApp")
		.controller("RegisterController", RegisterController);
	    
    function RegisterController($scope, $rootScope, $location, UserService) {
        //$scope.firstName = "MyFirstName!!!!";
		//$scope.lastName = "MyLastName!!!!";
		//$scope.userPassword = "P";
		//$scope.verifyPassword = "P";
		//$scope.userEmail = "PQR@abc.com";
		$scope.$location = $location
		$scope.register = register;
	  
	  	function callback(value) {
            console.log(value);
        }
	  
		function register() {
			var newUser = {
				"firstname" : $scope.firstName,
				"lastname" : $scope.lastName,
				"password"  : $scope.userPassword,
				"email"  : $scope.userEmail,
			}; 
			$rootScope.user = UserService.createUser(newUser, callback)
			$location.path("/profile")
		}
	}
	
}) ();

