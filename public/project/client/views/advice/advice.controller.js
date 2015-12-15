//var dateFormat = require('dateformat');

(function() {
	"use strict";
	angular
		.module("DecisionsApp")
		.controller("AdviceController", AdviceController);
	    
    function AdviceController($scope, $rootScope, $location, $routeParams, UserService, AdvisorService, DecisionService) {
		$scope.$location = $location;
		var model = this;		
		var currentUser = null;
		model.findOneContact = findOneContact;
		model.addAdvisor = addAdvisor;
		model.selectAdvisor = selectAdvisor;
		model.deleteAdvisor = deleteAdvisor;
		model.updateAdvisor = updateAdvisor;
		model.emailDecision = emailDecision;
		model.goToOpinion = goToOpinion;
		model.submitDeadline = submitDeadline;
		model.submitEmail = submitEmail;
		
		var decisionId = $routeParams.decisionId;
		
		function init() {
			AdvisorService.getAllAdvisors(decisionId).then(function(response){
				model.advisors = response;
			});
			DecisionService.getDecision(decisionId).then(function(response){
				model.decision = response;
				if(model.decision.deadline != null) {
					model.deadline = new Date(model.decision.deadline);
				}
			});
		}
		init()
		
		UserService.findGoogleUser().then(function(response){
			console.log("getting googleuser in advice controller");
			console.log(response);
			currentUser = response;
			model.creatorEmail = currentUser.email;
		});
		
		
		
		function submitEmail(email){		
			console.log("updating email");
			console.log(email);	
			currentUser.email = email;

			UserService.updateUser(currentUser._id, currentUser).then(function(response){
				$rootScope.user = response;
				console.log("updated user with email in advisor controller");
				console.log(response);
				model.creatorEmail = currentUser.email;
			});	
		}
		

		function emailDecision(advisor){
			var subject = "DecisionsDecisions...";
			var deadline = "next week";
			if(model.decision.deadline != null){
				var date = model.decision.deadline;
				console.log(date.slice(0,10));
				deadline = date.slice(5,7)+date.slice(7,10)+"-"+date.slice(0,4);
			}
			
			if(model.decision.methodType == "ProCon"){
				var proconBody = "DecisionsDecisions is helping me decide on the following question: "+model.decision.question+
				"%0D%0D I would love to get your opinion! Use the following link to help me decide:%0D "+
				"http://cs5610-oharakaleigh.rhcloud.com/project/client/index.html#/user/"+advisor._id+"/decision/"+decisionId+"/ProCon"+
				"%0D%0D I need to make a decision by "+deadline+" Thank you!"+
				"%0D%0D -"+currentUser.firstName;
				
				
				window.location.href = "mailto:"+ advisor.email +"?subject="+subject+"&body="+proconBody;
				
				
			} else if(model.decision.methodType == "Guess"){
				var guessBody = "DecisionsDecisions is helping me decide on the following question: "+model.decision.question+
				"%0D%0D I would love to get your opinion! Use the following link to help me decide:%0D "+
				"http://cs5610-oharakaleigh.rhcloud.com/project/client/index.html#/user/"+advisor._id+"/decision/"+decisionId+"/IntuitionEval"+
				"%0D%0D I'm planning to make a decision by "+deadline+". Thank you!"+
				"%0D%0D -"+currentUser.firstName;
				
				window.location.href = "mailto:"+ advisor.email +"?subject="+subject+"&body="+guessBody;
				
				
			} else if(model.decision.methodType == "Grid"){
				console.log("grid method in advice.controller");
			}
		}
		
		
		function goToOpinion(){
			if(model.decision.methodType == "ProCon"){
				$location.path("/user/"+currentUser._id+"/decision/"+decisionId+"/ProCon");

			} else if(model.decision.methodType == "Guess"){
				$location.path("/user/"+currentUser._id+"/decision/"+decisionId+"/IntuitionEval");
				
			} else if(model.decision.methodType == "Grid"){
				console.log("grid method in advice.controller");
			}
		}
		
		function submitDeadline(date) {
			model.decision.deadline = date;
			DecisionService.updateDecision(decisionId, model.decision).then(function(response){
				console.log(response);
			});
		}
		
		
		function findAllContacts(){
			UserService.findAllContacts(currentUser.email, currentUser.token).then(function(response){
				console.log(response);
			});
		}
		
		function findOneContact(keyword){
			model.searchMessage = "";
			UserService.findOneContact(currentUser.email, currentUser.token, keyword).then(function(response){
				if(response == null || response.gd$name.gd$fullName.$t == null){
					console.log("contact's name could not be found, please search again");
					model.searchMessage = "contact could not be found, please search again";
				} else{
					var selectedName = response.gd$name.gd$fullName.$t;
				}
				
				if(response == null || response.gd$email == null){
					console.log("contact's email could not be found, please search again");
					model.searchMessage = "contact could not be found, please search again";
				} else{
					var selectedEmail = response.gd$email[0].address;
					console.log("advisor's email");
					console.log(selectedEmail);
				}
				model.selected = {
					"name" : selectedName,
					"email" : selectedEmail
				}
			});
		}
		
		
		function addAdvisor(name, email, weight){
			var advisorId = null;
			UserService.findUserByEmail(email).then(function(response){
				advisorId = response
				console.log("advisorId in addAdvisor in controller");
				console.log(advisorId);
			
				var newAdvisor = {
						"name" : name,
						"email" : email,
						"weight" : weight,
						"_id" : advisorId
					}
					console.log("new Advisor being sent to server");
					console.log(newAdvisor);
					AdvisorService.createAdvisor(decisionId, newAdvisor).then(function(response){
					model.advisors = response;
					console.log("advisors returned to controller:");
					console.log(response);
					model.selected = null;
					});
			});
		}
		
		
		
		function selectAdvisor(advisor) {
			if(advisor == model.selected){
				model.selected = null;
			} else{
				model.selected = advisor;
				console.log("selected Advisor:");
				console.log(advisor);
			}
		}
		
		function deleteAdvisor(advisor){
			AdvisorService.deleteAdvisor(decisionId, advisor._id).then(function(response){
				console.log(response);
				
				AdvisorService.getAllAdvisors(decisionId).then(function(response){
				model.advisors = response;
				});
			});
		}
		
		function updateAdvisor(name, email, weight){
			var advisorId = model.selected._id;
			var advisor = {	
				"_id" : advisorId,
				"name" : name,
				"email" : email,
				"weight" : weight
			}
			console.log("selected advisor id");
			console.log(model.selected._id);
			AdvisorService.updateAdvisor(decisionId, advisorId, advisor).then(function(response){
				console.log("update advisor response");
				console.log(response);
				
				AdvisorService.getAllAdvisors(decisionId).then(function(response){
				model.advisors = response;
				});
			});
		}
		
		} 
}) ();

