(function() {
	"use strict";
	angular
		.module("DecisionsApp")
		.controller("HistoryController", HistoryController);
	    
    function HistoryController($routeParams, $scope, $rootScope, $location, DecisionService, UserService) {
		var model = this;
		model.deleteDecision = deleteDecision;
		model.decisionDetails = decisionDetails;
		model.creatorName = creatorName;

	
		var userId = null;
		
		function init() {
			UserService.findGoogleUser().then(function(response){
				console.log("getting googleuser in history controller");
				console.log(response);
				$rootScope.user = response;	
				userId = $rootScope.user._id;
				
				
				DecisionService.getAllDecisions(userId).then(function(response){
					model.decisions = response;
					decisionSearch()
				});
			});
		}
		init()
		
		function decisionSearch() {
			var questionList = []
			console.log("decision list length")
			console.log(model.decisions.length);
			for(var i=0; i<model.decisions.length; i++) {
				questionList.push(model.decisions[i].question);
			}
			console.log("question list");
			console.log(questionList);
		}	
	
		
		
		function creatorName(decision) {
			console.log("decision in creatorName function");
			console.log(decision);
			UserService.findUserById(decision.creatorId).then(function(response){
				console.log("returned creator");
				console.log(response);
				model.creatorFirstName = response.firstName;
			});
		}
					
		
		function deleteDecision(decision) {
			console.log("deleting decision in history");
			DecisionService.deleteDecision(decision._id).then(function(response){
				model.decisions = response;
				console.log("deleted decision:");
				console.log(response);
				
				DecisionService.getAllDecisions(userId).then(function(response){
				model.decisions = response;
				});
				
			});
		}
		
		function decisionDetails(decision) {
			var method = decision.methodtype;
			var decisionId = decision._id;
			
			if(method == "ProCon") {
				$location.path("/user/"+userId+"/decision/"+decisionId+"/ProCon");
			}
			else if(method == "Grid") {
				$location.path("/methodGridOptions");
			}
			else if(method == "Guess") {
				$location.path("/user/"+userId+"/decision/"+decisionId+"/IntuitionOptions");
			}
			else {
				alert("Invalid path to decision details");
			}
		}
		
	
		} 
}) ();

