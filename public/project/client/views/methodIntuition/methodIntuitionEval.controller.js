(function() {
	"use strict";
	angular
		.module("DecisionsApp")
		.controller("MethodIntuitionEvalController", MethodIntuitionEvalController);
	    
    function MethodIntuitionEvalController($rootScope, $routeParams, DecisionService, IntuitionService, AdvisorService) {
		
		var model = this;
		model.submitDecision = submitDecision;
		
		var userId = $routeParams.userId;
		console.log("userId in intuition method");
		console.log(userId);
		var decisionId = $routeParams.decisionId;
		console.log("decisionId in intuition method:");
		console.log(decisionId);
		
		function init() {
			DecisionService.getDecision(decisionId).then(function(response){
				console.log("decision");
				console.log(response);
				model.decision = response;
			});
			
			IntuitionService.getAllOptions(decisionId).then(function(response){
				console.log("intuition eval options");
				console.log(response);
				model.options = response;	
			});
			
			AdvisorService.getAdvisor(decisionId, userId).then(function(response){
				console.log("intuition eval current advisor");
				console.log(response);
				model.currentUser = response;	
			});
		}
		init()
		
		
		
		function submitDecision() {
			for(var i=0; i<model.options.length; i++) {
				if(document.getElementById(model.options[i].label).checked) {
					console.log("checked radio");
					console.log(model.options[i].label);
					model.currentUser.decision = model.options[i].label;
					console.log("current user's decision");
					console.log(model.currentUser.decision);
					
					AdvisorService.updateAdvisor(decisionId, model.currentUser._id, model.currentUser).then(function(response){
						console.log("updated user");
						console.log(response);
						model.currentUser = response;
						
						DecisionService.getFinalDecision(decisionId).then(function(response){
							console.log("decision (after final decision updated) in intuition eval controller");
							console.log(response);
							model.decision = response;
							//model.decision.finalDecision = response;
							DecisionService.updateDecision(decisionId, model.decision).then(function(response){
							console.log("decision updated after final decision updated");
							console.log(response);
							});
						}); 
					});
				}
			}
		}
		} 
}) ();