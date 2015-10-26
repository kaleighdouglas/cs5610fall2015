(function() {
	angular
		.module("FormBuilderApp")
		.controller("FormController", FormController);
	    
    function FormController($scope, $rootScope, $location, FormService) {
		
		$scope.$location = $location;
		$scope.forms = FormService.forms;
	//	$scope.form.name = "MyName!!!!";
		$scope.addForm = addForm;
		$scope.updateForm = updateForm;
		$scope.deleteForm = deleteForm;
		$scope.selectForm = selectForm;
		
		function callback(value) {
            console.log(value);
        }
		
		function addForm() {
			var newForm = {
				"name" : $scope.form.name
			}; 
			FormService.createFormForUser($rootScope.user.id, newForm, callback);
			$scope.forms = FormService.forms;
		}
		
		
		function updateForm(index) {
			$scope.selectedFormIndex = index;
			formid = $scope.forms[index].id
			var newForm = {
				"name" : $scope.form.name
						//$scope.forms[$scope.selectedFormIndex].name = $scope.form.name;
						//$scope.forms[$scope.selectedFormIndex].id = form.id;
						//$scope.forms[$scope.selectedFormIndex].userid = form.userid;			
			}
			FormService.updateFormById(formid, newForm, callback)
		}
		
		function deleteForm(index) {
			$scope.selectedFormIndex = index;
			formid = $scope.forms[index].id
			FormService.deleteFormById(formid, callback)
		}
		
		function selectForm(index) {
			$scope.selectedFormIndex = index;
			formid = $scope.forms[index].id
			var newForm = {
			$scope.forms[$scope.selectedFormIndex].name = $scope.form.name;
			$scope.forms[$scope.selectedFormIndex].id = form.id;
			$scope.forms[$scope.selectedFormIndex].userid = form.userid;			
			}
			FormService.updateFormById(formid, newForm, callback)   
		}
		}
}) ();

