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
		//$scope.forms = FormService.findAllFormsForUser(currentUser.id, callback);
		FormService.findAllFormsForUser(currentUser.id).then(function(response){
				console.log("list of forms");
				console.log(response);
				model.forms = response;
		});
		var currentFormId = null
		
		
		
/*		function addForm(form) {
			console.log("new form: ");
			console.log(form);
			var userId = currentUser.id;
			FormService.createFormForUser(userId, form).then(function(response){
				console.log("adding new form in controller");
				model.forms = response;
			});
		}  */
		
		
		function addForm(formName) {
			var userId = currentUser.id;
			var newForm = {
				"title" : formName
			};
			FormService.createFormForUser(userId, newForm).then(function(response){
				model.forms = response;
			});
		}  
		
		
		function updateForm(title) {
			//var currentForm = FormService.findFormByTitle(title);
			//var formId = currentForm.id;
			//var formId = FormService.FindFormIdByIndex(index);
			var newForm = {"title" : title};
			FormService.updateFormById(formId, newForm).then(function(response){
				model.forms = response;
			});
		}     
		
		
		function deleteForm(id) {
			FormService.deleteFormById(id).then(function(response){
				model.forms = response;
			});			
		}
		
		
		function selectForm(index) {
			$scope.selectedFormIndex = index;
			var formid = $scope.forms[index].id;
			currentFormId = formid
			$scope.formName = $scope.forms[index].name;  
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
		}
		}  */
}) ();

