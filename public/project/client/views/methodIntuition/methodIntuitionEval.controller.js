(function() {
	"use strict";
	angular
		.module("DecisionsApp")
		.controller("MethodIntuitionEvalController", MethodIntuitionEvalController);
	    
    function MethodIntuitionEvalController($scope, $rootScope, $location, $routeParams, DecisionService, IntuitionService) {
		
		$scope.$location = $location;
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
		}
		init()
		
		
		
		function submitDecision() {
			for(var i=0; i<model.options.length; i++) {
				if(document.getElementById(model.options[i].label).checked) {
					console.log("checked radio");
					console.log(model.options[i].label);
					model.decision.myDecision = model.options[i].label;
					model.decision.finalDecision = model.options[i].label;
					//console.log(model.decision);
					DecisionService.updateDecision(decisionId, model.decision).then(function(response){
						console.log("update decision response");
						console.log(response);
				
						DecisionService.getDecision(decisionId).then(function(response){
						model.decision = response;
						console.log(model.decision);
						});
					});
				}
			}
		}
		
/*		function callback(value) {
            console.log(value);
        }
			
		var currentUser = $rootScope.user;		
		$scope.forms = FormService.findAllFormsForUser(currentUser.id, callback);
		var currentFormId = null
		
		$scope.addForm = addForm;
		$scope.updateForm = updateForm;
		$scope.deleteForm = deleteForm;
		$scope.selectForm = selectForm;   
		

		
		function addForm() {
			var newForm = {
				"name" : $scope.formName,
			}; 
			FormService.createFormForUser($rootScope.user.id, newForm, callback);
			$scope.forms = FormService.findAllFormsForUser(currentUser.id, callback);
		}
		
		
		function updateForm() {
			var newForm = {
				"name" : $scope.formName,
				"id" : currentFormId,
				"userid" : currentUser.id,		
			};
			FormService.updateFormById(currentFormId, newForm, callback);
			$scope.forms = FormService.findAllFormsForUser(currentUser.id, callback);
			console.log($scope.forms);
		}   
		
		
		function deleteForm(index) {
			$scope.selectedFormIndex = index;
			var formid = $scope.forms[index].id
			FormService.deleteFormById(formid, callback)
			$scope.forms = FormService.findAllFormsForUser(currentUser.id, callback);
		}
		
		
		function selectForm(index) {
			$scope.selectedFormIndex = index;
			var formid = $scope.forms[index].id;
			currentFormId = formid
			$scope.formName = $scope.forms[index].name;  
		}  */
		} 
}) ();

