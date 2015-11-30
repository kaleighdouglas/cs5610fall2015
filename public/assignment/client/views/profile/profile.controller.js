(function() {
	"use strict";
	angular
		.module("FormBuilderApp")
		.controller("ProfileController", ProfileController);
	    
    function ProfileController($scope, $rootScope, $location, UserService) {
		var model = this;
		$scope.$location = $location;
		model.update = update;
		
		// update fields to existing user
		model.user = $rootScope.user;
		
		
		var currentUser = $rootScope.user;
		console.log("current user");
		console.log(currentUser);
		//function init() {
			
		model.userName = currentUser.username;
		model.userPassword = currentUser.password;
		model.userEmail = currentUser.email;
		model.userFName = currentUser.firstName;
		model.userLName = currentUser.lastName;
		//}
		//init()
 
	  	
		function update() {
			console.log("updating user")			
			
			var revisedUser = {
				"username" : model.userName,
				"password"  : model.userPassword,
				"email"  : model.userEmail,
				"firstName" : model.userFName,
				"lastName"  : model.userLName,
				"_id" : currentUser._id,
			}; 

			UserService.updateUser(currentUser._id, revisedUser).then(function(response){
				console.log(response);
				UserService.findUserById(currentUser._id).then(function(response){
					$rootScope.user = response;
					//console.log("updated user");
					//console.log(response);
					$location.path("/profile");
				})
			});	
		}
	}
	
}) ();

