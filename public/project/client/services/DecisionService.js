(function(){
    "use strict";
    angular
        .module("DecisionsApp")
        .factory("DecisionService", DecisionService);

    function DecisionService($http, $q) {
        

        var service = {
            createDecision: createDecision,
			getAllDecisions: getAllDecisions,
			getDecision: getDecision,
			deleteDecision: deleteDecision,
			updateDecision: updateDecision
        };
        return service; 
		
        
        function createDecision(userId, decision) {
            console.log("creating new decision in DecisionService")
            console.log("userId");
            console.log(userId);
            var deferred = $q.defer();
            $http.post("/api/user/"+userId+"/decision" , decision)
                .success(function(response){
                    deferred.resolve(response);
                });
                
            return deferred.promise;
        }
        
        function getAllDecisions(userId) {
            var deferred = $q.defer();
            $http.get("/api/user/"+userId+"/decision")
                .success(function(response){
                    deferred.resolve(response);
                });
                
            return deferred.promise;
        }
        
        function getDecision(decisionId) {
            var deferred = $q.defer();
            $http.get("/api/decision/"+decisionId)
                .success(function(response){
                    deferred.resolve(response);
                });
                
            return deferred.promise;
        }
        
        function deleteDecision(decisionId) {
            var deferred = $q.defer();
            $http.delete("/api/decision/"+decisionId)
                .success(function(response){
                    deferred.resolve(response);
                });
                
            return deferred.promise;
        }
        
        function updateDecision(decisionId, decision) {
            var deferred = $q.defer();
            $http.put("/api/decision/"+decisionId, decision)
                .success(function(response){
                    deferred.resolve(response);
                });
                
            return deferred.promise;
        }
        }
})();