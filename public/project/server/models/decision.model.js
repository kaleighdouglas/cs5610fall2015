var decisions = require("./decision.mock.json");

module.exports = function(app){
    var api = {
		createDecision: createDecision,
		getAllDecisions: getAllDecisions,
		getDecision: getDecision,
	//	findFormByTitle: findFormByTitle,
		updateDecision: updateDecision,
		deleteDecision: deleteDecision,
        
        getAllProCons: getAllProCons,
        getProCon: getProCon,
        deleteProCon: deleteProCon,
        createProCon: createProCon,
        updateProCon: updateProCon
    };
    return api;
    
    function guid() {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
            s4() + '-' + s4() + s4() + s4();
    }
	
	function createDecision(userId, decision) { 
        console.log("creating new decision in decision.model");
        decision["id"] = guid();
        decision["creatorId"] = userId;
        decision["userId"] = userId;
        if (decision.methodtype == "ProCon") {
            decision["procons"] = [];  
        } else if (decision.methodtype == "Guess") {
            decision["options"] = []; 
        } else if (decision.methodtype == "Grid") {
            decision["options"] = [];
            decision["attributes"] = [];
        }    
        decision["advisors"] = [];
        decisions.push(decision);
        var userDecisions = getAllDecisions(userId);
        return userDecisions;
    }
	
	function getAllDecisions(userId) {
        var userDecisions = []
        for(var i=0; i<decisions.length; i++) {
            var decision = decisions[i]
            if(decision.userId == userId) {
                userDecisions.push(decision);
            }
        }
        return userDecisions;
    }
    
	
	function getDecision(ID) {
		var foundDecision = null
        for(var i=0; i<decisions.length; i++) {
            var decision = decisions[i]
            if(decision.id == ID) {
                foundDecision = decision;
            }
        }    
        return foundDecision; 
	}
	
/*	function findFormByTitle(title) {
        var foundForm = null;
        for(var i=0; i<forms.length; i++) {
            var form = forms[i]
            if(form.title == title) {
                foundForm = form;
            }
        }    
        return foundForm; 
    }   */
    
/*    function FindFormIdByIndex(index) {
        var form = forms[index];
        return form.id;
    } */
	
	function updateDecision(ID, decision) { 
        for(var i=0; i<decisions.length; i++) {
            var currentDecision = decisions[i]
            if(currentDecision.id == ID) {
                decisions[i].question = decision.question;
                console.log("decision being updated in model: ");
                console.log(decision); 
            }
        }
        return getAllDecisions(decision.userId);
    }
	
	function deleteDecision(ID) {
        var userId = 0;
        for(var i=0; i<decisions.length; i++) {
            var decision = decisions[i]
            if(decision.id == ID) {
                userId = decision.userId;
                decisions.splice(i, 1);
            }
        }
        return getAllDecisions(userId);
    }
    
    
        // ProCon Functions
    
        function getAllProCons(decisionId) {   
        var ProCons = []
        console.log("getAllProCons called");
        for(var i=0; i<decisions.length; i++) {
            var decision = decisions[i]
            if(decision.id == decisionId) {
                ProCons = decision.procons;   
                console.log("ProCons found");
                console.log(ProCons);
            }
        }
        return ProCons;
    }
    
    function getProCon(decisionId, id) {  
        var ProCons = getAllProCons(decisionId)
        var foundProCon = null
        for(var i=0; i<ProCons.length; i++) {
            var ProCon = ProCons[i]
            if(ProCon.id == id) {
                foundProCon = ProCon;
            }
        }
        return foundProCon;
    }
    
    
    function deleteProCon(decisionId, id) {  
        var ProCons = getAllProCons(decisionId)
        for(var i=0; i<ProCons.length; i++) {
            var ProCon = ProCons[i]
            if(ProCon.id == id) {
                ProCons.splice(i, 1);
            }
        }
        console.log("deleting procon with id:");
        console.log(id);
        console.log("remaining ProCons:");
        console.log(ProCons);
        return ProCons;
    }
    
    function createProCon(decisionId, procon) {
        console.log("new procon in decision.models");
        console.log("procon:");
        console.log(procon);
        console.log("decisionId");
        console.log(decisionId);
        procon["id"] = guid();
        var ProCons = getAllProCons(decisionId);
        ProCons.push(procon);
        return ProCons;
    }
  
    function updateProCon(decisionId, id, procon) {
        var ProCons = getAllProCons(decisionId);
        for(var i=0; i<ProCons.length; i++) {
            var currentProCon = ProCons[i]
            if(currentProCon.id == id) {
                ProCons[i] = procon;
            }
        }
        return ProCons;
    }
	
};