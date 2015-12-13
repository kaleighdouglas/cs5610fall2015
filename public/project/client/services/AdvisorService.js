(function(){
    "use strict";
    angular
        .module("DecisionsApp")
        .factory("AdvisorService", AdvisorService);

    function AdvisorService($http, $q) {
        

        var service = {
            createAdvisor: createAdvisor,
			getAllAdvisors: getAllAdvisors,
			getAdvisor: getAdvisor,
			deleteAdvisor: deleteAdvisor,
			updateAdvisor: updateAdvisor,
        };
        return service; 
		
        
        function createAdvisor(decisionId, advisor) {
            var deferred = $q.defer();
            $http.post("/api/decision/"+decisionId+"/advisor" , advisor)
                .success(function(response){
                    deferred.resolve(response);
                });
                
            return deferred.promise;
        }
        
        function getAllAdvisors(decisionId) {
            var deferred = $q.defer();
            $http.get("/api/decision/"+decisionId+"/advisor")
                .success(function(response){
                    deferred.resolve(response);
                });
                
            return deferred.promise;
        }
        
        function getAdvisor(decisionId, id) {
            console.log("decisionId in getAdvisor function");
            console.log(decisionId);
            console.log("advisorId in getAdvisor Function");
            console.log(id);
            var deferred = $q.defer();
            $http.get("/api/decision/"+decisionId+"/advisor/"+id)
                .success(function(response){
                    deferred.resolve(response);
                });
                
            return deferred.promise;
        }
        
        function deleteAdvisor(decisionId, id) {
            var deferred = $q.defer();
            $http.delete("/api/decision/"+decisionId+"/advisor/"+id)
                .success(function(response){
                    deferred.resolve(response);
                });
                
            return deferred.promise;
        }
        
        function updateAdvisor(decisionId, id, advisor) {
            var deferred = $q.defer();
            $http.put("/api/decision/"+decisionId+"/advisor/"+id, advisor)
                .success(function(response){
                    deferred.resolve(response);
                });
                
            return deferred.promise;
        }
			
    }
})();