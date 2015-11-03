(function() {
	"use strict";
	angular
		.module("DecisionsApp")
		.controller("TabsController", TabsController);
	    
    function TabsController($scope, $location) {
		$scope.$location = $location;
    }
	
	
}) ();
