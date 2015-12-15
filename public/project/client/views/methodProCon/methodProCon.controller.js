(function() {
	"use strict";
	angular
		.module("DecisionsApp")
		.controller("MethodProConController", MethodProConController);
	    
    function MethodProConController($routeParams, DecisionService, ProConService, AdvisorService) { //$scope, $rootScope, $location
		
		//$scope.$location = $location;
		var model = this;
		model.createProCon = createProCon;
		model.deleteProCon = deleteProCon;
		model.selectProCon = selectProCon;
		model.updateProCon = updateProCon;
		model.calculateDecision = calculateDecision;
		
		var userId = $routeParams.userId;
		console.log("userId in procon method");
		console.log(userId);
		var decisionId = $routeParams.decisionId;
		console.log("decisionId in procon method:");
		console.log(decisionId);
		
		function init() {
			console.log("proCon Init function");
			DecisionService.getDecision(decisionId).then(function(response){
				model.decision = response;
			});
			
			ProConService.getAllProCons(decisionId).then(function(response){
				model.procons = response;
			});
			AdvisorService.getAdvisor(decisionId, userId).then(function(response){
				console.log("intuition eval current advisor");
				console.log(response);
				model.currentUser = response;	
			});
	
		}
		init()
		
		function createProCon(label, impact) {
			var newProCon = {
					"label" : label,
					"impact": impact
				}
				console.log("new ProCon");
				console.log(newProCon);
				ProConService.createProCon(decisionId, newProCon).then(function(response){
				model.procons = response;
				console.log("procons returned to controller:");
				console.log(response);
				model.selected = null;
				});
		}
		
		function updateProCon(label, impact) {
			var proconId = model.selected._id;
			var procon = {	
				"_id" : proconId,
				"label" : label,
				"impact": impact
			}
			console.log("selected procon id");
			console.log(model.selected._id);
			ProConService.updateProCon(decisionId, proconId, procon).then(function(response){
				console.log("update procon response");
				console.log(response);
				
				ProConService.getAllProCons(decisionId).then(function(response){
				model.procons = response;
				model.selected = null;
				});
			});
		}
		
		function deleteProCon(procon) {
			ProConService.deleteProCon(decisionId, procon._id).then(function(response){
				console.log(response);
				
				ProConService.getAllProCons(decisionId).then(function(response){
				model.procons = response;
				model.selected = null;
				});
			});
		}
		
		function selectProCon(procon) {
			if(procon == model.selected){
				model.selected = null;
			} else{
				model.selected = procon;
				console.log("selected ProCon:");
				console.log(procon);
			}
		}
		
		function calculateDecision() {
			console.log("calculate Decision called in controller");
			console.log("decision id in controller results function");
			console.log(decisionId);
			ProConService.getProConResult(decisionId, model.currentUser).then(function(response){
				console.log("ProCon Result");
				console.log(response);
				
				//model.currentUser.decision = model.decision.myDecision;
				model.currentUser.decision = response;
				AdvisorService.updateAdvisor(decisionId, userId, model.currentUser).then(function(response){
				console.log("current advisor with decision");
				console.log(response);
				model.currentUser = response;	
				model.selected = null;
			});
			});
		}
		
		} 
}) ();

