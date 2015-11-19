(function() {
	"use strict";
	angular
		.module("DecisionsApp")
		.controller("QuestionController", QuestionController);
	    
    function QuestionController($scope, $rootScope, $location) {
		
		$scope.$location = $location;
		$scope.gotoMethod = gotoMethod;
		
		/* Citations for help with radio buttons: 
		http://stackoverflow.com/questions/1423777/javascript-how-can-i-check-whether-a-radio-button-is-selected
		http://stackoverflow.com/questions/8681505/on-select-radio-redirect-to-a-link   */
		function gotoMethod() {  	
			if(document.getElementById('RadioProCon').checked) {
				window.location = "#/methodProCon";
			}
			else if(document.getElementById('RadioGrid').checked) {
				window.location = "#/methodGridOptions";
			}
			else if(document.getElementById('RadioIntuition').checked) {
				window.location = "#/methodIntuitionOptions";
			}
			else {
				alert("NO");
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
