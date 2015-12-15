(function() {
	"use strict";
	angular
		.module("DecisionsApp")
		.controller("HomeController", HomeController);
	    
    function HomeController($rootScope, UserService) {
		
		UserService.findGoogleUser().then(function(response){
			if(response != 0){
				$rootScope.user = response;
			}
		});
	} 
}) ();

