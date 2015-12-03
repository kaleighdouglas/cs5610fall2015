(function(){
    "use strict";
    angular
        .module("DecisionsApp")
        .factory("ProConService", ProConService);

    function ProConService($http, $q) {
        

        var service = {
            createProCon: createProCon,
			getAllProCons: getAllProCons,
			getProCon: getProCon,
			deleteProCon: deleteProCon,
			updateProCon: updateProCon,
            getProConResult: getProConResult
        };
        return service; 
		
        
        function createProCon(decisionId, procon) {
            var deferred = $q.defer();
            $http.post("/api/decision/"+decisionId+"/procon" , procon)
                .success(function(response){
                    deferred.resolve(response);
                });
                
            return deferred.promise;
        }
        
        function getAllProCons(decisionId) {
            var deferred = $q.defer();
            $http.get("/api/decision/"+decisionId+"/procon")
                .success(function(response){
                    deferred.resolve(response);
                });
                
            return deferred.promise;
        }
        
        function getProCon(decisionId, id) {
            var deferred = $q.defer();
            $http.get("/api/decision/"+decisionId+"/procon/"+id)
                .success(function(response){
                    deferred.resolve(response);
                });
                
            return deferred.promise;
        }
        
        function deleteProCon(decisionId, id) {
            var deferred = $q.defer();
            $http.delete("/api/decision/"+decisionId+"/procon/"+id)
                .success(function(response){
                    deferred.resolve(response);
                });
                
            return deferred.promise;
        }
        
        function updateProCon(decisionId, id, procon) {
            var deferred = $q.defer();
            $http.put("/api/decision/"+decisionId+"/procon/"+id, procon)
                .success(function(response){
                    deferred.resolve(response);
                });
                
            return deferred.promise;
        }
        
        function getProConResult(decisionId) {
            console.log("getting pro con result in client service");
            var deferred = $q.defer();
            $http.get("/api/decision/"+decisionId+"/proconResult")
                .success(function(response){
                    console.log(response);
                    deferred.resolve(response);
                });
                
            return deferred.promise;
        }
		
/*		function createFieldForForm(formId, field) {
			var deferred = $q.defer();
            $http.post("/api/assignment/form/"+formId+"/field" , field)
                .success(function(response){
                    deferred.resolve(response);
                });
                
            return deferred.promise;
		}  */
		
        
        
/*		function getFieldsForForm(formId) {
			var deferred = $q.defer();
            $http.get("/api/assignment/form/"+formId+"/field")
                .success(function(response){
                    deferred.resolve(response);
                });
                
            return deferred.promise;
		} 
        
        
		
		function getFieldForForm(formId, fieldId) {
			var deferred = $q.defer();
            $http.get("/api/assignment/form/"+formId+"/field/"+fieldId)
                .success(function(response){
                    deferred.resolve(response);
                });
                
            return deferred.promise;
		}  
		
		
		function deleteFieldFromForm(formId, fieldId) {
			var deferred = $q.defer();
            $http.delete("/api/assignment/form/"+formId+"/field/"+fieldId)
                .success(function(response){
                    deferred.resolve(response);
                });
                
            return deferred.promise;
		}  
		
		function updateField(formId, fieldId, field) {
			var deferred = $q.defer();
            $http.put("/api/assignment/form/"+formId+"/field/"+fieldId , field)
                .success(function(response){
                    deferred.resolve(response);
                });
                
            return deferred.promise;
		}  */
			
    }
})();