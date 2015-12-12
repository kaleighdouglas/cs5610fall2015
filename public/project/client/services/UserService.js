(function(){
    "use strict";
    angular
        .module("DecisionsApp")
        .factory("UserService", UserService);


    function UserService($http, $q) {
        
        var service = {
            findAllContacts: findAllContacts,
            findOneContact: findOneContact,
            findMatchingContacts: findMatchingContacts,
            findGoogleUser: findGoogleUser,
            findUserByUsernameAndPassword: findUserByUsernameAndPassword,
            findAllUsers: findAllUsers,
            findTempUser: findTempUser,
            findUserById: findUserById,
            findUserByEmail: findUserByEmail,
            createUser: createUser,
            deleteUserById: deleteUserById,
            updateUser: updateUser
        };
        return service;
        
        
        function findAllContacts(email, token){
            console.log("email in UserService, findAllContacts function");
            console.log(email);
            var deferred = $q.defer();
            $http.get("https://www.google.com/m8/feeds/contacts/"+email+"/full?access_token="+token+"&alt=json&max-results=100&updated-min=2012-01-01T00:00:00&v=3.0&q=.com")
         //   $http.get("https://www.google.com/m8/feeds/contacts/"+email+"/full?access_token="+token+"&alt=json&max-results=100&updated-min=2012-01-01T00:00:00&v=3.0&q=kaleigh")
        //  $http.get("https://www.google.com/m8/feeds/groups/"+email+"/full?access_token="+token+"&alt=json")

                .success(function(response){
                    deferred.resolve(response);
                });
                
            return deferred.promise;
        }
        
        function findOneContact(email, token, keyword){
            console.log("keyword in UserService, findOneContact function");
            console.log(keyword);
            var deferred = $q.defer();
            $http.get("https://www.google.com/m8/feeds/contacts/"+email+"/full?access_token="+token+"&alt=json&v=3.0&q="+keyword)

                .success(function(response){
                    deferred.resolve(response.feed.entry[0]);
                });
                
            return deferred.promise;
        }
        
        function findMatchingContacts(email, token, keyword){
            var deferred = $q.defer();
            $http.get("https://www.google.com/m8/feeds/contacts/"+email+"/full?access_token="+token+"&alt=json&v=3.0&q="+keyword)

                .success(function(response){
                    deferred.resolve(response.feed.entry);
                });
                
            return deferred.promise;
        }
        
        function findGoogleUser(){
            console.log("Get GoogleUser in UserService");
            var deferred = $q.defer();
            $http.get("/loggedin")
                .success(function(response){
                    deferred.resolve(response);
                });
                
            return deferred.promise;
        }
         
  
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
        
        function findUserByEmail(email) {
            console.log("find user by email called in service");
            var deferred = $q.defer();
            $http.get("/api/user?email="+email)
                .success(function(response){
                    deferred.resolve(response);
                });
            return deferred.promise;
        }
        
        function findTempUser() {
            console.log("find temp user called in service");
            var deferred = $q.defer();
            $http.get("/api/tempUser")
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