var q = require("q");
//var users = require("./user.mock.json");

module.exports = function(app, db, mongoose){
    var UserSchema = require("./user.schema.js") (mongoose);
    var UserModel = mongoose.model("UserModel", UserSchema);
    var api = {
		Create: CreateUser,
		FindAll: FindAllUsers,
		FindById: FindUserById,
        findUserByUsername: findUserByUsername,
		findUserByCredentials: findUserByCredentials,
		Update: UpdateUser,
		Delete: DeleteUser
    };
    return api;
	
	
	function CreateUser(user) {
        var deferred = q.defer();

        UserModel.create(user, function(err, user) {
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(user);
            }
        });
        
        return deferred.promise;
    }
        
 /*       user["id"] = guid();
        users.push(user);
        console.log("user created. New user:");
        console.log(user);
        return user;
    } */
	
	function FindAllUsers() {
        console.log("called findAll users");
        var deferred = q.defer();

        UserModel.find(function(err, users){
            if(err) {
                console.log(err);
                deferred.reject(err);
            } else {
                console.log(users);
                deferred.resolve(users);
            }
        });

        return deferred.promise;
    }
	
	function FindUserById(ID) {  
        var deferred = q.defer();

        UserModel.findById(ID, function(err, user){
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(user);
            }
        });

        return deferred.promise;
    }
               
 /*      var foundUser = null
        for(var i=0; i<users.length; i++) {
            var user = users[i]
            if(user.id == ID) {
                foundUser = user;
            }
        }    
        return foundUser; 
    } */
    
    function findUserByUsername(username) {
        var deferred = q.defer();
        
        UserModel.findOne({username: username}, function(err, user){
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(user);
            }
        });

        return deferred.promise;
    }     
  /*      var foundUser = null
        for(var i=0; i<users.length; i++) {
            var user = users[i]
            if(user.username == username) {
                foundUser = user;
            }
        }
        return foundUser; 
    } */
	 
	function findUserByCredentials(credentials) {  // iterate over list of users to find match
        var deferred = q.defer();
        
        var username = credentials.username;
        var password = credentials.password;
        UserModel.findOne({$and : [{username: username}, {password: password}]}, function(err, user){
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(user);
            }
        });

        return deferred.promise;
    
    }
    
  /*      var foundUser = null
        for(var i=0; i<users.length; i++) {
            var user = users[i]
            if(user.username == credentials.username && user.password == credentials.password) {
                foundUser = user;
            }
        }
        return foundUser; 
	} */
	 
	function UpdateUser(ID, user) {
        var deferred = q.defer();

        user.delete("_id");

        UserModel.update({_id: ID}, {$set: user}, function(err, user) {
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(user);
            }
        });

        return deferred.promise;
    }
           
  /*      for(var i=0; i<users.length; i++) {
            var currentUser = users[i]
            if(currentUser.id == ID) {
                users[i] = user;
            }
        }
        console.log("updating user in model");
        console.log(user);
        return user;
    } */
	
	function DeleteUser(ID) {
        var deferred = q.defer();

        UserModel.remove({_id: ID}, function(err, status) {
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(status);
            }
        });

        return deferred.promise;
    }
        
   /*     for(var i=0; i<users.length; i++) {
            var user = users[i]
            if(user.id == ID) {
                users.splice(i, 1);
            }
        }
        return users;
    } */

};