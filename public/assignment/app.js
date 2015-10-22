(function() {
	"use strict";
	angular.module("FormBuilderApp", ["ngRoute"]);
	
}) ();


var app = angular.module("HelloWorldApp", []);

app.controller("HelloWorldController", HelloWorldController);

function HelloWorldController($scope) {
    $scope.hello = "Hello World from AngularJS";
}