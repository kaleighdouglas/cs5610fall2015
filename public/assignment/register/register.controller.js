(function() {
	"use strict";
	angular
		.module("FormBuilderApp")
		.controller("RegisterController", RegisterController);
	    
    function RegisterController($scope, $rootScope, $location, UserService) {
        //$scope.userName = "MyName!!!!";
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
				"username" : $scope.userName,
				"password"  : $scope.userPassword,
				"email"  : $scope.userEmail,
			}; 
			$rootScope.user = UserService.createUser(newUser, callback)
			$location.path("/profile")
		}
	}
	
}) ();

