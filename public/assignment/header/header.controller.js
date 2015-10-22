(function() {
	angular
		.module("FormBuilderApp")
		.controller("HeaderController", HeaderController);
	    
    function HeaderController($scope, $location) {
		$scope.$location = $location;
        $scope.hello = "Header!!!!X";
    }
	
	
}) ();
