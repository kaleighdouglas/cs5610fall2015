(function() {
	"use strict";
	angular
		.module("DecisionsApp")
		.controller("HistoryController", HistoryController);
	    
    function HistoryController($routeParams, $scope, $rootScope, $location, DecisionService, UserService) {
		var model = this;
		model.deleteDecision = deleteDecision;
		model.decisionDetails = decisionDetails;
		model.creatorName = creatorName;
		model.creatorProfile = creatorProfile;

		
		//model.getAllDecisions = getAllDecisions;
		//$scope.$location = $location;
		//$scope.title = "where to go for dinner";
		//var userId = $routeParams.userId;
		var userId = $rootScope.user._id;
		
		
		function init() {
			DecisionService.getAllDecisions(userId).then(function(response){
				model.decisions = response;
				decisionSearch()
			});
			
		}
		init()
		
		
		function decisionSearch() {
			var questionList = []
			console.log("decision list length")
			console.log(model.decisions.length);
			for(var i=0; i<model.decisions.length; i++) {
				questionList.push(model.decisions[i].question);
			}
			console.log("question list");
			console.log(questionList);
			//jQuery("#questionSearch").autocomplete({
			//	source: questionList
			//});
		}	


 /*   <script>
        $(function() {
            var availableTags = [
                "ActionScript",
                "AppleScript",
                "Asp",
                "BASIC",
                "C",
                "C++",
                "Clojure",
                "COBOL",
                "ColdFusion",
                "Erlang",
                "Fortran",
                "Groovy",
                "Haskell",
                "Java",
                "JavaScript",
                "Lisp",
                "Perl",
                "PHP",
                "Python",
                "Ruby",
                "Scala",
                "Scheme"
            ];
            $( "#tags" ).autocomplete({
                source: availableTags
            });
        });
    </script> */		
		
		
		
		function creatorName(decision) {
		console.log("decision in creatorName function");
		console.log(decision);
		UserService.findUserById(decision.creatorId).then(function(response){
			console.log("returned creator");
			console.log(response);
			model.creatorFirstName = response.firstName;
				});
		}
					
		
		function deleteDecision(decision) {
			console.log("deleting decision in history");
			DecisionService.deleteDecision(decision._id).then(function(response){
				model.decisions = response;
				console.log("deleted decision:");
				console.log(response);
			});
		}
		
		function decisionDetails(decision) {
			var method = decision.methodtype;
			var decisionId = decision._id;
			
			if(method == "ProCon") {
				$location.path("/user/"+userId+"/decision/"+decisionId+"/ProCon");
			}
			else if(method == "Grid") {
				$location.path("/methodGridOptions");
			}
			else if(method == "Guess") {
				$location.path("/user/"+userId+"/decision/"+decisionId+"/IntuitionOptions");
			}
			else {
				alert("Invalid path to decision details");
			}
		}
		
		function creatorProfile(decision){
			
		}
		
		
/*		
	
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

