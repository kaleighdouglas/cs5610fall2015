(function() {
	"use strict";
	angular
		.module("DecisionsApp")
		.controller("HeaderController", HeaderController);
	    
    function HeaderController($scope, $location) {
		$scope.$location = $location;
    }
	
	
}) ();
