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
		FormService.findAllFormsForUser(currentUser.id).then(function(response){
				console.log("list of forms");
				console.log(response);
				model.forms = response;
		});
		
		
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
				"userId" : currentUser.id,	
			};
			FormService.updateFormById(model.form.id, newForm).then(function(response){ 
				model.forms = response;
			});
		}     
		
		
		function deleteForm(index) {
			selectForm(index);
			FormService.deleteFormById(model.form.id).then(function(response){  
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
			model.form = {
				title: model.forms[index].title,
				id: model.forms[index].id,
				userId: model.forms[index].userId,
				fields: model.forms[index].fields
			}
			console.log("selecting form");
			console.log(model.form);
			return model.form;
		}
	} 
		
		
}) ();

