(function() {
	angular
		.module("FormBuilderApp")
		.controller("FormController", FormController);
	    
    function FormController($scope, $rootScope, $location, FormService) {
		
		$scope.$location = $location;
		
		function callback(value) {
            console.log(value);
        }
		
		
		currentUser = $rootScope.user;		
		$scope.forms = FormService.findAllFormsForUser(currentUser.id, callback);
		console.log($scope.forms)
		var currentFormId = null
		
		$scope.addForm = addForm;
		$scope.updateForm = updateForm;
		$scope.deleteForm = deleteForm;
		$scope.selectForm = selectForm;   
		
/*		currentUser = $rootScope.user;
		function getForms() {
			user = $rootScope(user)
			findAllFormsForUser(userId, callback)
		}
		
		var form = {
            "name" : "form1",
            "id" : 123,
            "userid" : 12345,
        }
		
		function callback(value) {
            console.log(value);   
        }                                */
		
		function addForm() {
			var newForm = {
				"name" : $scope.formName,
			}; 
			FormService.createFormForUser($rootScope.user.id, newForm, callback);
			$scope.forms = FormService.findAllFormsForUser(currentUser.id, callback);
		}
		
		
		function updateForm() {
			//$scope.selectedFormIndex = index;
			//formid = $scope.forms[index].id;

			console.log("Form NAME Updated");
			console.log($scope.formName);
			console.log("Form ID Updated");
			console.log(currentFormId);
			
			var newForm = {
				"name" : $scope.formName,
				"id" : currentFormId,
				"userid" : currentUser.id,
						//$scope.forms[$scope.selectedFormIndex].name = $scope.form.name;
						//$scope.forms[$scope.selectedFormIndex].id = form.id;
						//$scope.forms[$scope.selectedFormIndex].userid = form.userid;			
			};
			FormService.updateFormById(currentFormId, newForm, callback);
			$scope.forms = FormService.findAllFormsForUser(currentUser.id, callback);
			console.log($scope.forms);
		}   
		
		function deleteForm(index) {
			$scope.selectedFormIndex = index;
			formid = $scope.forms[index].id
			FormService.deleteFormById(formid, callback)
			$scope.forms = FormService.findAllFormsForUser(currentUser.id, callback);
		}
		
		function selectForm(index) {
			$scope.selectedFormIndex = index;
			formid = $scope.forms[index].id;
			currentFormId = formid
			console.log("Form ID Selected");
			console.log(currentFormId);
			Zname = $scope.forms[index].name;
			$scope.formName = $scope.forms[index].name;
			//console.log("Form Selected");
			//console.log(Zname);
		//	FormService.updateFormById(formid, newForm, callback)   
		}
		} 
}) ();

