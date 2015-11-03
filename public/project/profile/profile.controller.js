(function() {
	"use strict";
	angular
		.module("DecisionsApp")
		.controller("ProfileController", ProfileController);
	    
    function ProfileController($scope, $rootScope, $location, UserService) {
		
		$scope.$location = $location;
/*		$scope.update = update;
		
		// update fields to existing user
		var currentUser = $rootScope.user;
		$scope.userName = currentUser.username;
		$scope.userPassword = currentUser.password;
		$scope.userEmail = currentUser.email;
		$scope.userFName = currentUser.firstname;
		$scope.userLName = currentUser.lastname;
  
	  
	  	function callback(value) {
            console.log(value);
        }
	  	
		function update() {
			console.log("updating user...")			
			
			var revisedUser = {
				"username" : $scope.userName,
				"password"  : $scope.userPassword,
				"email"  : $scope.userEmail,
				"firstname" : $scope.userFName,
				"lastname"  : $scope.userLName,
				"id" : currentUser.id,
			}; 
			
			$rootScope.user = UserService.updateUser(currentUser.id, revisedUser, callback)
			$location.path("/profile")
		}   */
	}  
	
}) ();

