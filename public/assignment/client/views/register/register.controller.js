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
		//$scope.register = register;
		
		var model = this;
	  	model.register = register;
	  
	  
		function register(userName, userPassword, userEmail) {
			var newUser = {
				"username" : userName,
				"password"  : userPassword,
				"email"  : userEmail
			};
			
			UserService.createUser(newUser).then(function(response){
				$rootScope.user = response;    // Should use if possibleUser != null?
				$location.path("/profile");
			});
			}
	  
	  
	  
	  
	  
/*	  	function callback(value) {
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
		}   */
	}
	
}) ();

