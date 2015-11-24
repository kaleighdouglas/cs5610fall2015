(function(){
    "use strict";
    angular
        .module("DecisionsApp")
        .factory("IntuitionService", IntuitionService);

    function IntuitionService($http, $q) {
        

        var service = {
            createOption: createOption,
			getAllOptions: getAllOptions,
			getOption: getOption,
			deleteOption: deleteOption,
			updateOption: updateOption,
            getIntuitionResult: getIntuitionResult
        };
        return service; 
		
        
        function createOption(decisionId, option) {
            var deferred = $q.defer();
            $http.post("/api/decision/"+decisionId+"/intuition" , option)
                .success(function(response){
                    deferred.resolve(response);
                });
                
            return deferred.promise;
        }
        
        function getAllOptions(decisionId) {
            var deferred = $q.defer();
            $http.get("/api/decision/"+decisionId+"/intuition")
                .success(function(response){
                    deferred.resolve(response);
                });
                
            return deferred.promise;
        }
        
        function getOption(decisionId, id) {
            var deferred = $q.defer();
            $http.get("/api/decision/"+decisionId+"/intuition/"+id)
                .success(function(response){
                    deferred.resolve(response);
                });
                
            return deferred.promise;
        }
        
        function deleteOption(decisionId, id) {
            var deferred = $q.defer();
            $http.delete("/api/decision/"+decisionId+"/intuition/"+id)
                .success(function(response){
                    deferred.resolve(response);
                });
                
            return deferred.promise;
        }
        
        function updateOption(decisionId, id, option) {
            var deferred = $q.defer();
            $http.put("/api/decision/"+decisionId+"/intuition/"+id, option)
                .success(function(response){
                    deferred.resolve(response);
                });
                
            return deferred.promise;
        }
        
        function getIntuitionResult(decisionId) {
            console.log("getting intuition result in client service");
            var deferred = $q.defer();
            $http.get("/api/decision/"+decisionId+"/intuitionResult")
                .success(function(response){
                    deferred.resolve(response);
                });
                
            return deferred.promise;
        }
			
    }
})();