(function(){
    "use strict";
    angular
        .module("DecisionsApp")
        .factory("UserService", UserService);


    function UserService($http, $q) {
        
        var service = {
            findUserByUsernameAndPassword: findUserByUsernameAndPassword,
            findAllUsers: findAllUsers,
            findUserById: findUserById,
            createUser: createUser,
            deleteUserById: deleteUserById,
            updateUser: updateUser
        };
        return service;
         
  
        function findUserByUsernameAndPassword(username, password) {
            console.log("UserService");
            var deferred = $q.defer();
            $http.get("/api/user?username="+username+"&password="+password)
                .success(function(response){
                    deferred.resolve(response);
                });
                
            return deferred.promise;
        }
            

        function findAllUsers() {
            var deferred = $q.defer();
            $http.get("/api/user")
                .success(function(response){
                    deferred.resolve(response);
                });
                
            return deferred.promise;
        }
        
        function findUserById(id) {
            console.log("find user by Id called in service");
            var deferred = $q.defer();
            $http.get("/api/user/"+id)
                .success(function(response){
                    deferred.resolve(response);
                });
                
            return deferred.promise;
        }
        
        function createUser(user) {
            var deferred = $q.defer();
            $http.post("/api/user", user)
                .success(function(response){
                    deferred.resolve(response);
                });
                
            return deferred.promise;
        }
        
        function deleteUserById(id) {
            var deferred = $q.defer();
            $http.delete("/api/user/"+id)
                .success(function(response){
                    deferred.resolve(response);
                });
                
            return deferred.promise;
        }
        
        function updateUser(id, user) {
            var deferred = $q.defer();
            $http.put("/api/user/"+id , user)
                .success(function(response){
                    deferred.resolve(response);
                });
                
            return deferred.promise
        }
    
        
    }
})();    