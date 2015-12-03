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
        deleteOption: deleteOption
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
     
  /*      console.log(decision);
        decisions.push(decision);
        //console.log("all decisions for user");
        //console.log(decisions);
        return decision;
    } */
	
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
        
 /*       var userDecisions = []
        for(var i=0; i<decisions.length; i++) {
            var decision = decisions[i]
            if(decision.userId == userId) {
                userDecisions.push(decision);
            }
        }
        return userDecisions;
    } */
    
	
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
    
	/*	var foundDecision = null
        for(var i=0; i<decisions.length; i++) {
            var decision = decisions[i]
            if(decision.id == ID) {
                foundDecision = decision;
            }
        }    
        return foundDecision; 
	} */
	
/*	function findFormByTitle(title) {
    }   */

	
	function updateDecision(ID, decision) { 
        var deferred = q.defer();
        //form.delete("_id");
        DecisionModel.update({_id: ID}, {$set: decision}, function(err, status) {
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(status);
            }
        });
        return deferred.promise; 
    }
        
  /*      for(var i=0; i<decisions.length; i++) {
            var currentDecision = decisions[i]
            if(currentDecision.id == ID) {
                decisions[i].question = decision.question;
                console.log("decision being updated in model: ");
                console.log(decision); 
            }
        }
        return getAllDecisions(decision.userId);
    } */
	
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
    
    /*    var userId = 0;
        for(var i=0; i<decisions.length; i++) {
            var decision = decisions[i]
            if(decision.id == ID) {
                userId = decision.userId;
                decisions.splice(i, 1);
            }
        }
        return getAllDecisions(userId);
    } */
    
    
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
            
            
             
 /*       var ProCons = []
        console.log("getAllProCons called");
        for(var i=0; i<decisions.length; i++) {
            var decision = decisions[i]
            if(decision.id == decisionId) {
                ProCons = decision.procons;   
                console.log("ProCons found");
                console.log(ProCons);
            }  
        }
        return ProCons;  */
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
            
        
 /*       var ProCons = getAllProCons(decisionId)
        var foundProCon = null
        for(var i=0; i<ProCons.length; i++) {
            var ProCon = ProCons[i]
            if(ProCon.id == id) {
                foundProCon = ProCon;
            }
        }
        return foundProCon;  */
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
             
  /*      var ProCons = getAllProCons(decisionId)
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
        return ProCons;  */
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
        
  /*      procon["id"] = guid();
        var ProCons = getAllProCons(decisionId);
        ProCons.push(procon);
        return ProCons; */
    }
  
    function updateProCon(decisionId, id, procon) {
        var deferred = q.defer();

        DecisionModel.findById(decisionId, function(err, decision){
            if(err) {
                deferred.reject(err);
            } else {
                for(var i=0; i<decision.procons.length; i++) {
                if(decision.procons[i]._id == id) {
                    decision.procons[i].literal = procon.literal;
                    decision.save(function(err, status){
                        deferred.resolve(status);
                    });
                }
                }
            }   
        });
        return deferred.promise;
        
  /*      var ProCons = getAllProCons(decisionId);
        for(var i=0; i<ProCons.length; i++) {
            var currentProCon = ProCons[i]
            if(currentProCon.id == id) {
                ProCons[i] = procon;
            }
        }
        return ProCons; */
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
            
  /*      console.log("decisionId in createOption function in model");
        console.log(decisionId);
        option["id"] = guid();
        var Options = getAllOptions(decisionId);
        console.log("existing options in createOption function in model");
        console.log(Options);
        Options.push(option);
        console.log("all options after adding new");
        console.log(Options);
        return Options;  */
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
         
  /*      var Options = []
        for(var i=0; i<decisions.length; i++) {
            var decision = decisions[i]
            if(decision.id == decisionId) {
                console.log("existing options")
                console.log(decision.options);
                Options = decision.options;   
            }
        }
        return Options; */
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
                    decision.options[i].literal = option.literal;
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
	
};