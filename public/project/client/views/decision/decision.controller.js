(function() {
	"use strict";
	angular
		.module("DecisionsApp")
		.controller("DecisionController", DecisionController);
	    
    function DecisionController($scope, $rootScope, $location, $routeParams, AdvisorService, DecisionService, UserService) {
		
		$scope.$location = $location;
		var model = this;
		model.viewCreatorDecision = viewCreatorDecision;
		model.viewAdvisorDecision = viewAdvisorDecision;
		
		var currentUser = null;
		var decisionId = $routeParams.decisionId;
		
		function init() {
			AdvisorService.getAllAdvisors(decisionId).then(function(response){
				model.advisors = response;
			});
			
			DecisionService.getDecision(decisionId).then(function(response){
				model.decision = response;
				console.log("decision in decision controller");
				console.log(model.decision);
				
				UserService.findUserById(model.decision.creatorId).then(function(response){
				model.creator = response;
				console.log("creator in decision controller");
				console.log(model.creator);
				});
			});
			DecisionService.getFinalDecision(decisionId).then(function(response){
				console.log("final decision in decision controller");
				console.log(response);
				model.decision.finalDecision = response;
				
				DecisionService.updateDecision(decisionId, model.decision).then(function(response){
				console.log("update decision in controller");
				console.log(response);
				});
			}); 
			
		}
		init()
		
		UserService.findGoogleUser().then(function(response){
			console.log("getting googleuser in decision controller");
			console.log(response);
			currentUser = response;
		});
		
		
		function viewCreatorDecision(){
			if(model.decision.methodType == "ProCon"){
				$location.path("/user/"+model.decision.creatorId+"/decision/"+decisionId+"/ProCon");
				
			} else if(model.decision.methodType == "Guess"){
				$location.path("/user/"+model.decision.creatorId+"/decision/"+decisionId+"/IntuitionEval");
				
			} else if(model.decision.methodType == "Grid"){
				console.log("grid method in decision.controller");
			}
		}
		
		function viewAdvisorDecision(advisor){
			console.log("advisor in decision.controller viewAdvisorDecision function");
			console.log(advisor);
			if(model.decision.methodType == "ProCon"){
				$location.path("/user/"+advisor._id+"/decision/"+decisionId+"/ProCon");
				
			} else if(model.decision.methodType == "Guess"){
				$location.path("/user/"+advisor._id+"/decision/"+decisionId+"/IntuitionEval");
				
			} else if(model.decision.methodType == "Grid"){
				console.log("grid method in decision.controller");
			}
		}
		
		} 
}) ();

