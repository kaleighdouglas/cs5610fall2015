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
		//console.log("user in forms controller");
		//console.log(currentUser);
		FormService.findAllFormsForUser(currentUser._id).then(function(response){
				model.forms = response;
		});
		
		
		function addForm(formName) {
			var userId = currentUser._id;
			var newForm = {
				"title" : formName
			};
			FormService.createFormForUser(userId, newForm).then(function(response){
				FormService.findAllFormsForUser(userId).then(function(response){
					model.forms = response;;
					var newFormIndex = model.forms.length - 1;
					selectForm(newFormIndex);
				})
			});	
		}  
		
		
		function updateForm(title) {					
			var newForm = {
				"title" : title,
				"userId" : currentUser._id,	
			};
			FormService.updateFormById(model.form._id, newForm).then(function(response){ 
				FormService.findAllFormsForUser(currentUser._id).then(function(response){
					model.forms = response;
				});
			});
		}     
		
		
		function deleteForm(index) {
			selectForm(index);
			FormService.deleteFormById(model.form._id).then(function(response){  
				FormService.findAllFormsForUser(currentUser._id).then(function(response){
					model.forms = response;
					//console.log("delete form response");
					//console.log(response);
					if (model.forms.length > index) {
						selectForm(index);
					} else if (model.forms.length > 0) {
						selectForm(0);
					}
				});
			});			
		}

		
		function selectForm(index) {
			$scope.selectedFormIndex = index;
			model.form = {
				title: model.forms[index].title,
				_id: model.forms[index]._id,
				userId: model.forms[index].userId,
				fields: model.forms[index].fields
			}
			//console.log("selecting form");
			//console.log(model.form);
			return model.form;
		}
	} 
		
		
}) ();

