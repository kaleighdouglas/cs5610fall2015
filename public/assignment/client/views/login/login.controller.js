(function() {
	"use strict";
	angular
		.module("FormBuilderApp")
		.controller("LoginController", LoginController);
	    
    function LoginController($scope, $rootScope, $location, UserService) {	
	 	 $scope.$location = $location
	 // $scope.login = login;
	  
	  var model = this;
	  model.login = login;
		   
	  
		function login(userName, userPassword) {
			UserService.findUserByUsernameAndPassword(userName, userPassword).then(function(response){
				$rootScope.user = response;    // Should use if possibleUser != null?
				$location.path("/profile");
				
			});
		}	   
		   
		    
			
/*	  function callback(value) {
            console.log(value);
        }
	  
	  
		function login() {
			var possibleUser = UserService.findUserByUsernameAndPassword($scope.userName, $scope.userPassword, callback)
			if (possibleUser != null) {
				$rootScope.user = possibleUser
				console.log("login")
				$location.path("/profile")
			} else {console.log("login not valid")	
			}
		}   */
	}
	
}) ();

