(function() {
	"use strict";
	angular
		.module("FormBuilderApp")
		.controller("FormController", FormController);
	    
    function FormController($scope, $rootScope, $location, FormService) {
		
		$scope.$location = $location;
		var model = this;
	  	model.addForm = addForm;
		model.updateForm = updateForm;
		model.deleteForm = deleteForm;
		model.selectForm = selectForm;
		

		var currentUser = $rootScope.user;
		$scope.userid = currentUser.id;	
		FormService.findAllFormsForUser(currentUser.id).then(function(response){
				console.log("list of forms");
				console.log(response);
				model.forms = response;
		});
		var currentFormId = null

		
		
		function addForm(formName) {
			var userId = currentUser.id;
			var newForm = {
				"title" : formName
			};
			FormService.createFormForUser(userId, newForm).then(function(response){
				model.forms = response;
				console.log(response);
				var newFormIndex = model.forms.length - 1;
				selectForm(newFormIndex);
			});	
		}  
		
		
		function updateForm(title) {					
			var newForm = {
				"title" : title,
				"id" : currentFormId,
				"userId" : currentUser.id,		
			};
			FormService.updateFormById(currentFormId, newForm).then(function(response){
				model.forms = response;
			});
		}     
		
		
		function deleteForm(index) {
			selectForm(index);
			FormService.deleteFormById(currentFormId).then(function(response){
				model.forms = response;
				if (model.forms.length > index) {
					selectForm(index);
				} else if (model.forms.length > 0) {
					selectForm(0);
				}
			});			
		}
		
		
		function selectForm(index) {
			$scope.selectedFormIndex = index;
			var formid = model.forms[index].id;
			currentFormId = formid;
			model.formName = model.forms[index].title;
			console.log(currentFormId);  
		}
	} 
		
		
}) ();

