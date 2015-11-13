//var q = require("q");
var users = require("./user.mock.json");

module.exports = function(app){
    var api = {
		Create: Create,
		FindAll: FindAll,
		FindById: FindById,
        findUserByUsername: findUserByUsername,
		findUserByCredentials: findUserByCredentials,
		Update: Update,
		Delete: Delete
    };
    return api;
	
	
	
	function Create(user) {
        users.push(user);
        return users;
    }
	
	function FindAll() {
        return users;
    }
	
	function FindById(ID) {      
       var foundUser = null
        for(var i=0; i<users.length; i++) {
            var user = users[i]
            if(user.id == ID) {
                foundUser = user;
            }
        }    
        return foundUser; 
    }
    
    function findUserByUsername(username) {
        var foundUser = null
        for(var i=0; i<users.length; i++) {
            var user = users[i]
            if(user.username == username) {
                foundUser = user;
            }
        }
        return foundUser; 
    }
	
	function findUserByCredentials(credentials) {  // iterate over list of users to find match
        var foundUser = null
        for(var i=0; i<users.length; i++) {
            var user = users[i]
            if(user.username == credentials.username && user.password == credentials.password) {
                foundUser = user;
            }
        }
        return foundUser; 
	}
	
	function Update(ID, user) {
        for(var i=0; i<users.length; i++) {
            var currentUser = users[i]
            if(currentUser.id == ID) {
                users[i] = user;
            }
        }
        return user;
    }
	
	function Delete(ID) {
        for(var i=0; i<users.length; i++) {
            var user = users[i]
            if(user.id == ID) {
                users.splice(i, 1);
            }
        }
        return users;
    }

};