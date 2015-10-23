(function(){
    angular
        .module("FormBuilderApp")
        .factory("UserService", UserService);


    function UserService() {
        var users = [];

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
        }

        function findAllUsers(callback) {
            callback(users);
        }
        
        function createUser(user, callback) {
            user["id"] = guid();
            users[users.length] = user;
            callback(users);
        }
        
        function deleteUserById(userId, callback) {
            for(var i=0; i<users.length; i++) {
                var user = users[i]
                if(user.id == userId) {
                    users.splice(i,1);
                }
            }
            callback(users);
        }
        
        function updateUser(userId, user, callback) {
            for(var i=0; i<users.length; i++) {
                var targetUser = users[i]
                if(targetUser.id == userId) {
                    users[i] = user;
                }
            }
            callback(user);
        }            
    }
})();