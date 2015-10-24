(function() {
	angular
		.module("FormBuilderApp")
		.controller("LoginController", LoginController);
	    
    function LoginController($scope, $rootScope, $location, UserService) {
        //$scope.userName = "MyName!!!!";
		//$scope.userPassword = "P";
	  $scope.$location = $location
	  
	  
	  function callback(value) {
            console.log(value);
        }
	  
	  
		$scope.login = login;

		function login() {
			var possibleUser = UserService.findUserByUsernameAndPassword($scope.userName, $scope.userPassword, callback)
			if (possibleUser != null) {
				$rootScope.user = possibleUser
				console.log("login")
				$location.path("/profile")
			} else {console.log("login not valid")	
			}
		}
	}
	
}) ();

