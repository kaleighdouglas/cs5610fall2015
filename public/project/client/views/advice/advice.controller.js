(function() {
	"use strict";
	angular
		.module("DecisionsApp")
		.controller("AdviceController", AdviceController);
	    
    function AdviceController($scope, $rootScope, $location, $routeParams, UserService, AdvisorService) {
		
		$scope.$location = $location;
		var model = this;		
		var currentUser = null;
		model.findOneContact = findOneContact;
		model.addAdvisor = addAdvisor;
		
		var decisionId = $routeParams.decisionId;
		
		function init() {
			AdvisorService.getAllAdvisors(decisionId).then(function(response){
				model.advisors = response;
			});
		}
		init()
		
		UserService.findGoogleUser().then(function(response){
			console.log("getting googleuser in advice controller");
			console.log(response);
			currentUser = response;		
			findAllContacts()
			//findOneContact("kaleigh")
		});
		
		function findAllContacts(){
			UserService.findAllContacts(currentUser.email, currentUser.token).then(function(response){
				console.log(response);
			});
		}
		
		function findOneContact(keyword){
			
			UserService.findOneContact(currentUser.email, currentUser.token, keyword).then(function(response){
				//model.advisorName = response.feed.entry[0].gd$name.gd$fullName.$t;
				//model.advisorEmail = response.feed.entry[0].gd$email.address;
				if(response.gd$name.gd$fullName.$t == null){
					console.log("contact's name could not be found, please search again")
				} else{
					model.advisorName = response.gd$name.gd$fullName.$t;
				}
				
				if(response.gd$email == null){
					console.log("contact's email could not be found, please search again")
				} else{
					model.advisorEmail = response.gd$email[0].address;
					console.log("advisor's email");
					console.log(model.advisorEmail);}
				
			});
		}
		
		function addAdvisor(name, email, weight){
			var newAdvisor = {
					"name" : name,
					"email" : email,
					"weight" : weight
				}
				console.log("new Advisor");
				console.log(newAdvisor);
				AdvisorService.createAdvisor(decisionId, newAdvisor).then(function(response){
				model.advisors = response;
				console.log("advisors returned to controller:");
				console.log(response);
				});
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

