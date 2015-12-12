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
		model.findMatchingContacts = findMatchingContacts;
		model.addAdvisor = addAdvisor;
		model.selectAdvisor = selectAdvisor;
		model.deleteAdvisor = deleteAdvisor;
		model.updateAdvisor = updateAdvisor;
		model.emailDecision = emailDecision;
		model.goToOpinion = goToOpinion;
		
		var decisionId = $routeParams.decisionId;
		
		function init() {
			AdvisorService.getAllAdvisors(decisionId).then(function(response){
				model.advisors = response;
			});
			DecisionService.getDecision(decisionId).then(function(response){
				model.decision = response;
			});
		}
		init()
		
		UserService.findGoogleUser().then(function(response){
			console.log("getting googleuser in advice controller");
			console.log(response);
			currentUser = response;		
			findAllContacts()
			//findOneContact("kaleigh")
		});
		
		
		function emailDecision(advisor){
			if(model.decision.methodType == "ProCon"){
				var proconBody = "DecisionsDecisions is helping me decide on the following question: "+model.decision.question+
				"%0D%0D I would love to get your opinion! Use the following link to help me decide:%0D "+
				"http://cs5610-oharakaleigh.rhcloud.com/project/client/index.html#/user/"+advisor._id+"/decision/"+decisionId+"/ProCon";
				var proconSubject = "DecisionsDecisions...";
				
				window.location.href = "mailto:"+ advisor.email +"?subject="+proconSubject+"&body="+proconBody;
				
				
			} else if(model.decision.methodType == "Guess"){
				var guessBody = "DecisionsDecisions is helping me decide on the following question: "+model.decision.question+
				"%0D%0D I would love to get your opinion! Use the following link to help me decide:%0D "+
				"http://cs5610-oharakaleigh.rhcloud.com/project/client/index.html#/user/"+advisor._id+"/decision/"+decisionId+"/IntuitionEval";
				var guessSubject = "DecisionsDecisions...";
				
				window.location.href = "mailto:"+ advisor.email +"?subject="+guessSubject+"&body="+guessBody;
				
				
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
		
		
		function findAllContacts(){
			UserService.findAllContacts(currentUser.email, currentUser.token).then(function(response){
				console.log(response);
			});
		}
		
		function findOneContact(keyword){
			UserService.findOneContact(currentUser.email, currentUser.token, keyword).then(function(response){
				//model.advisorName = response.feed.entry[0].gd$name.gd$fullName.$t;
				//model.advisorEmail = response.feed.entry[0].gd$email.address;
				if(response.gd$name.gd$fullName.$t == null){
					console.log("contact's name could not be found, please search again")
				} else{
					var selectedName = response.gd$name.gd$fullName.$t;
				}
				
				if(response.gd$email == null){
					console.log("contact's email could not be found, please search again")
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
		
		function findMatchingContacts(keyword){
			UserService.findMatchingContacts(currentUser.email, currentUser.token, keyword).then(function(response){
				if(response == null){
					console.log("contact's name could not be found, please search again")
				} else{
					var matchingNames = response;
					console.log("matching names");
					console.log(matchingNames);
					//var selectedName = response.gd$name.gd$fullName.$t;
				}
				
				if(response == null){
					console.log("contact's email could not be found, please search again")
				} else{
					var matchingEmails = response;
					//var selectedEmail = response.gd$email[0].address;
					console.log("matching emails");
					console.log(matchingEmails);				
				}
			});
		}
		
/*		$(function() {
			var emailList = ["ActionScript",
						"AppleScript",
						"Asp",
						"BASIC",
						"C",
						"C++"]
	
				$( "#tags" ).autocomplete({
                	source: emailList
            	});	
		}); */
		
		
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

