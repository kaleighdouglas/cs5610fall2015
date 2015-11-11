(function(){
    "use strict";
    angular
        .module("FormBuilderApp")
        .factory("UserService", UserService);


    function UserService() {
        
        var peter = {
            "firstname" : "Peter",
            "lastname"  : "Rabbit",
            "username"  : "PR",
            "password"  : "pr123",
            "id"        : "12345",
            "email"     : "pr@abc.com",
            };  
        var alice = {
            "firstname" : "Alice",
            "lastname"  : "Wonderland",
            "username"  : "AW",
            "password"  : "aw123",
            "id"        : "1111",
            "email"     : "aw@abc.com",
            };  
        var bob = {
            "firstname" : "Bob",
            "lastname"  : "Marley",
            "username"  : "BM",
            "password"  : "bm123",
            "id"        : "1112",
            "email"     : "bm@abc.com",
            };         
        var charlie = {
            "firstname" : "Charlie",
            "lastname"  : "Cholocate",
            "username"  : "CC",
            "password"  : "cc123",
            "id"        : "1113",
            "email"     : "cc@abc.com",
            };  
            
            
        
        var users = [peter, alice, bob, charlie];

        var service = {
            findUserByUsernameAndPassword: findUserByUsernameAndPassword,
            findAllUsers: findAllUsers,
            createUser: createUser,
            deleteUserById: deleteUserById,
            updateUser: updateUser
        };
        return service;
        
        function callback(value) {
            console.log(value);
        }
            
        function guid() {
            function s4() {
                return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
            }
            return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
                s4() + '-' + s4() + s4() + s4();
        }
  
        function findUserByUsernameAndPassword(username, password, callback) {
            var foundUser = null
            for(var i=0; i<users.length; i++) {
                var user = users[i]
                if(user.username == username && user.password == password) {
                    foundUser = user;
                }
            }
            callback(foundUser);
            return foundUser;
        }

        function findAllUsers(callback) {
            callback(users);
            return users;
        }
        
        function createUser(user, callback) {
            user["id"] = guid();
            users[users.length] = user;
            callback(user);
            return user;
        }
        
        function deleteUserById(userId, callback) {
            for(var i=0; i<users.length; i++) {
                var user = users[i]
                if(user.id == userId) {
                    users.splice(i,1);
                }
            }
            callback(users);
            return users;
        }
        
        function updateUser(userId, user, callback) {
            for(var i=0; i<users.length; i++) {
                var targetUser = users[i]
                if(targetUser.id == userId) {
                    users[i] = user;
                }
            }
            callback(user);
            return user;
        }            
    }
})();