//var decisions = require("./decision.mock.json");
var q = require("q");

module.exports = function(app, db, mongoose){
    var DecisionSchema = require("./decision.schema.js") (mongoose);
    var DecisionModel = mongoose.model("DecisionModel", DecisionSchema);
    var api = {
		createDecision: createDecision,
		getAllDecisions: getAllDecisions,
		getDecisionById: getDecisionById,
	//	findFormByTitle: findFormByTitle,
		updateDecision: updateDecision,
		deleteDecision: deleteDecision,
        
        //Pro Con Functions
        getAllProCons: getAllProCons,
        getProCon: getProCon,
        deleteProCon: deleteProCon,
        createProCon: createProCon,
        updateProCon: updateProCon,
        getProConResult: getProConResult,
        
        //Intuition Functions
        createOption: createOption,
        getAllOptions: getAllOptions,
        getOption: getOption,
        getIntuitionResult: getIntuitionResult,
        updateOption: updateOption,
        deleteOption: deleteOption,
        
        //Advisor Functions
        createAdvisor: createAdvisor,
        getAllAdvisors: getAllAdvisors,
        getAdvisor: getAdvisor,
        updateAdvisor: updateAdvisor,
        deleteAdvisor: deleteAdvisor
    };
    return api;
    
	
	function createDecision(userId, decision) { 
        console.log("creating new decision in decision.model");
        decision["creatorId"] = userId;
        decision["userId"] = userId;
        if (decision.methodType == "ProCon") {
            decision["procons"] = [];  
        } else if (decision.methodType == "Guess") {
            decision["options"] = []; 
        } else if (decision.methodType == "Grid") {
            decision["options"] = [];
            decision["attributes"] = [];
        }    
        decision["advisors"] = [];
        
        var deferred = q.defer();
        DecisionModel.create(decision, function(err, decision) {
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(decision);
            }
        });
        return deferred.promise;     
    }
     
	
	function getAllDecisions(userId) {
        var deferred = q.defer();
        DecisionModel.find({userId: userId}, function(err, decisions) {
            if(err) {
                //console.log(err);
                deferred.reject(err);
            } else {
                //console.log(forms);
                deferred.resolve(decisions);
            }
        });
        return deferred.promise;
    }   
    
	
	function getDecisionById(ID) {
        var deferred = q.defer();

        DecisionModel.findById(ID, function(err, decision){
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(decision);
            }
        });
        return deferred.promise;
	}
    
	
	function updateDecision(ID, decision) { 
        var deferred = q.defer();
        delete decision["_id"];
        
        DecisionModel.update({_id: ID}, {$set: decision}, function(err, status) {
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(status);
            }
        });
        return deferred.promise; 
    }
        
	
	function deleteDecision(ID) {
        var deferred = q.defer();

        DecisionModel.remove({_id: ID}, function(err, status) {
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(status);
            }
        });
        return deferred.promise;    
    }
    
    
 /////////// ProCon Functions
    
    function getAllProCons(decisionId) {  
        var deferred = q.defer();

        DecisionModel.findById(decisionId, function(err, decision){
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(decision.procons);
            }
        });
        return deferred.promise;
    }
    
    
    function getProCon(decisionId, id) {  
        var deferred = q.defer();

            DecisionModel.findById(decisionId, function(err, decision){
                if(err) {
                    deferred.reject(err);
                } else {
                    for(var i=0; i<decision.procons.length; i++) {
                    var procon = decision.procons[i];
                    if(procon._id == id) {
                        deferred.resolve(procon);
                    }
                    }
                }
            });
            return deferred.promise;
    }
    
    
    function deleteProCon(decisionId, id) { 
        var deferred = q.defer();

        DecisionModel.findById(decisionId, function(err, decision){
            if(err) {
                    deferred.reject(err);
            } else {
                for(var i=0; i<decision.procons.length; i++) {
                var procon = decision.procons[i]
                if(procon.id == id) {
                    decision.procons.splice(i, 1);
                    decision.save(function(err, status){
                    deferred.resolve(status);
                });
                }
                }
            }
        });
        return deferred.promise;
    }
    
    
    function createProCon(decisionId, procon) {
        console.log("new procon in decision.models");
        var deferred = q.defer();

        DecisionModel.findById(decisionId, function(err, decision){
            if(err) {
                    deferred.reject(err);
            } else {
                procon._id = mongoose.Types.ObjectId();
                decision.procons.push(procon);
                decision.save(function(err, decision){
                    deferred.resolve(decision.procons);
                });
            }
        });
        return deferred.promise;
    }
    
  
    function updateProCon(decisionId, id, procon) {
        var deferred = q.defer();

        DecisionModel.findById(decisionId, function(err, decision){
            if(err) {
                deferred.reject(err);
            } else {
                for(var i=0; i<decision.procons.length; i++) {
                if(decision.procons[i]._id == id) {
                    decision.procons.splice(i, 1);
                    decision.procons.push(procon);
                    decision.save(function(err, decision){
                        deferred.resolve(decision);
                    });
                }
                }
            }   
        });
        return deferred.promise;
    }
    
    
    function getProConResult(decisionId) {
        console.log("ProCon Result in Model");
        var deferred = q.defer();

        DecisionModel.findById(decisionId, function(err, decision){
            if(err) {
                console.log("err on first function");
                deferred.reject(err);
            } else {
                console.log("entered else");
                var sum = 0;
                for(var i=0; i<decision.procons.length; i++) {
                    var currentProCon = decision.procons[i]
                    sum = sum + currentProCon.impact;
                    console.log("result sum");
                    console.log(sum);
                }
                DecisionModel.findById(decisionId, function(err, decision){
                if(err) {
                    console.log(err);
                    deferred.reject(err);
                } else {
                    var posResult = "YES!";
                    var negResult = "NO";
                    var undecidedResult = "Undecided. Try asking friends or using another method."
                    if (sum > 0) {
                        decision["myDecision"] = posResult;
                    } else if(sum < 0) {
                        decision["myDecision"] = negResult;
                    } else {
                        decision["myDecision"] = undecidedResult;
                    }
                    decision["finalDecision"] = decision["myDecision"];
                    
                    console.log("finalDecision");
                    console.log(decision.finalDecision);
                    decision.save(function(err, decision){
                        deferred.resolve(decision);
                    });
                }
                });
            }
        });
        return deferred.promise;
       
        
   /*     var ProCons = getAllProCons(decisionId);
        var sum = 0;
        for(var i=0; i<ProCons.length; i++) {
            var currentProCon = ProCons[i]
            sum = sum + currentProCon.impact;
        }
        
        console.log("Pro Con sum:");
        console.log(sum);
        var decision = getDecisionById(decisionId);
        var posResult = "YES!";
        var negResult = "NO";
        var undecidedResult = "Undecided. Try asking friends or using another method."
        if (sum > 0) {
            decision["myDecision"] = posResult;
        } else if(sum < 0) {
            decision["myDecision"] = negResult;
        } else {
            decision["myDecision"] = undecidedResult;
        }
        decision["finalDecision"] = decision["myDecision"];
        console.log("my decision");
        console.log(decision.myDecision);
        return decision;   */
    }
    
    
/////// Intuition Functions
    function createOption(decisionId, option) {
        console.log("new option in decision.models");
        var deferred = q.defer();

        DecisionModel.findById(decisionId, function(err, decision){
            if(err) {
                    deferred.reject(err);
            } else {
                option._id = mongoose.Types.ObjectId();
                decision.options.push(option);
                decision.save(function(err, decision){
                    deferred.resolve(decision.options);
                });
            }
        });
        return deferred.promise;
    }
    
    function getAllOptions(decisionId) {
        var deferred = q.defer();

            DecisionModel.findById(decisionId, function(err, decision){
                if(err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(decision.options);
                }
            });
            return deferred.promise;
    }
    
    
    function getOption(decisionId, id) {
        var deferred = q.defer();

        DecisionModel.findById(decisionId, function(err, decision){
            if(err) {
                deferred.reject(err);
            } else {
                for(var i=0; i<decision.options.length; i++) {
                var option = decision.options[i];
                if(option._id == id) {
                    deferred.resolve(option);
                }
                }
            }
        });
        return deferred.promise;
    }
    
    
    function getIntuitionResult(decisionId) {   //Incomplete
        console.log("Guess Result in Model");
    }
    
    
    function updateOption(decisionId, id, option) {
        var deferred = q.defer();

        DecisionModel.findById(decisionId, function(err, decision){
            if(err) {
                deferred.reject(err);
            } else {
                for(var i=0; i<decision.options.length; i++) {
                if(decision.options[i]._id == id) {
                    decision.options.splice(i, 1);
                    decision.options.push(option);
                    decision.save(function(err, status){
                        deferred.resolve(status);
                    });
                }
                }
            }   
        });
        return deferred.promise;
    }
    
    
    function deleteOption(decisionId, id) {
        var deferred = q.defer();

        DecisionModel.findById(decisionId, function(err, decision){
            if(err) {
                    deferred.reject(err);
            } else {
                for(var i=0; i<decision.options.length; i++) {
                var option = decision.options[i]
                if(option.id == id) {
                    decision.options.splice(i, 1);
                    decision.save(function(err, status){
                    deferred.resolve(status);
                });
                }
                }
            }
        });
        return deferred.promise;
    }
    
    
    //Advisor Functions
    function createAdvisor(decisionId, advisor){
        var deferred = q.defer();

        DecisionModel.findById(decisionId, function(err, decision){
            if(err) {
                    deferred.reject(err);
            } else {
                if(advisor._id == null) {
                    console.log("advisor not a registered user, creating new ID")
                    advisor._id = mongoose.Types.ObjectId();    
                }
                decision.advisors.push(advisor);
                decision.save(function(err, decision){
                    deferred.resolve(decision.advisors);
                });
            }
        });
        return deferred.promise;  
    }
    
    function getAllAdvisors(decisionId){
        var deferred = q.defer();
        DecisionModel.findById(decisionId, function(err, decision){
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(decision.advisors);
            }
        });
        return deferred.promise;   
    }
    
    function getAdvisor(){
    }
    
    function updateAdvisor(decisionId, id, advisor){
        var deferred = q.defer();
        DecisionModel.findById(decisionId, function(err, decision){
            if(err) {
                deferred.reject(err);
            } else {
                for(var i=0; i<decision.advisors.length; i++) {
                if(decision.advisors[i]._id == id) {
                    decision.advisors.splice(i, 1);
                    decision.advisors.push(advisor);
                    decision.save(function(err, decision){
                        deferred.resolve(decision);
                    });
                }
                }
            }   
        });
        return deferred.promise;
    }
    
    function deleteAdvisor(decisionId, id){
        var deferred = q.defer();
        DecisionModel.findById(decisionId, function(err, decision){
            if(err) {
                    deferred.reject(err);
            } else {
                for(var i=0; i<decision.advisors.length; i++) {
                var advisor = decision.advisors[i]
                if(advisor.id == id) {
                    decision.advisors.splice(i, 1);
                    decision.save(function(err, status){
                    deferred.resolve(status);
                });
                }
                }
            }
        });
        return deferred.promise;
    }
	
};