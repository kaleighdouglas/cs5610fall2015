var q = require("q");
//var users = require("./user.mock.json");

module.exports = function(app, db, mongoose){
    var DecisionUserSchema = require("./user.schema.js") (mongoose);
    var DecisionUserModel = mongoose.model("DecisionUserModel", DecisionUserSchema);
    var api = {
        CreateGoogleUser: CreateGoogleUser,
		CreateUser: CreateUser,
		FindAllUsers: FindAllUsers,
		FindUserById: FindUserById,
        findUserByUsername: findUserByUsername,
		findUserByCredentials: findUserByCredentials,
		UpdateUser: UpdateUser,
		DeleteUser: DeleteUser
    };
    return api;
	
    
 /*   function guid() {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
            s4() + '-' + s4() + s4() + s4();
    } */
	
    function CreateGoogleUser(googleUser){
        var deferred = q.defer();
        
        DecisionUserModel.find({googleId: googleUser.id}, function(err, doc){
            var user = null;
            if(doc && doc.length >0){
                user = doc[0];
            } else{
                user = new DecisionUserModel();
            }
            user.googleId = googleUser.id;
            user.firstName = googleUser.name.givenName;
            user.lastName = googleUser.name.familyName;
            //user.email = googleUser.emails[0].value;
            user.save(function(err, doc){
                deferred.resolve(doc);
            });
        });
        return deferred.promise;
    }
    
    
    
	
	function CreateUser(user) {
        var deferred = q.defer();

        DecisionUserModel.create(user, function(err, user) {
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(user);
            }
        });
        
        return deferred.promise;
    }

  /*      user["id"] = guid();
        users.push(user);
        console.log("user created. New user:");
        console.log(user);
        return user;
    } */
	
    
	function FindAllUsers() {
        var deferred = q.defer();

        DecisionUserModel.find(function(err, users){
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
  /*      return users;
    } */
	
	function FindUserById(ID) {   
        var deferred = q.defer();

        DecisionUserModel.findById(ID, function(err, user){
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
        
        DecisionUserModel.findOne({username: username}, function(err, user){
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
	
    
	function findUserByCredentials(credentials) {
        var deferred = q.defer();
        
        var username = credentials.username;
        var password = credentials.password;
        DecisionUserModel.findOne({$and : [{username: username}, {password: password}]}, function(err, user){
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(user);
            }
        });

        return deferred.promise;
    
    }

 /*       var foundUser = null
        for(var i=0; i<users.length; i++) {
            var user = users[i]
            if(user.username == credentials.username && user.password == credentials.password) {
                foundUser = user;
            }
        }
        return foundUser; 
	}  */
	
    
	function UpdateUser(ID, user) {
        var deferred = q.defer();
        //user.delete("_id");

        DecisionUserModel.update({_id: ID}, {$set: user}, function(err, status) {
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(status);
            }
        });

        return deferred.promise;
    }   
        
 /*       for(var i=0; i<users.length; i++) {
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

        DecisionUserModel.remove({_id: ID}, function(err, status) {
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(status);
            }
        });

        return deferred.promise;
    }
        
  /*      for(var i=0; i<users.length; i++) {
            var user = users[i]
            if(user.id == ID) {
                users.splice(i, 1);
            }
        }
        return users;
    } */

};