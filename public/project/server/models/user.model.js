var q = require("q");
//var users = require("./user.mock.json");

module.exports = function(app, db, mongoose){
    var DecisionUserSchema = require("./user.schema.js") (mongoose);
    var DecisionUserModel = mongoose.model("DecisionUserModel", DecisionUserSchema);
    var api = {
        CreateGoogleUser: CreateGoogleUser,
		CreateUser: CreateUser,
        FindTempUser: FindTempUser,
		FindAllUsers: FindAllUsers,
		FindUserById: FindUserById,
        findUserByUsername: findUserByUsername,
		findUserByCredentials: findUserByCredentials,
		UpdateUser: UpdateUser,
		DeleteUser: DeleteUser
    };
    return api;
    
	
    function CreateGoogleUser(googleUser, accessToken){
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
            user.token = accessToken;
            if(googleUser.emails != null){
                user.email = googleUser.emails[0].value;  //Doesn't always return email
            }
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

	
    
    function FindTempUser(){
        var deferred = q.defer();
        
        DecisionUserModel.findOne({username: "temp"}, function(err, user){
            if(err) {
                deferred.reject(err);
                console.log(err);
            } else if(user == null){
                console.log("temp user is null");
                var newTempUser = {
                    "username": "temp"
                }
                DecisionUserModel.create(newTempUser, function(err, user) {
                    if(err) {
                        deferred.reject(err);
                    } else {
                        deferred.resolve(user);
                    }
                });

            } else {
                deferred.resolve(user);
                console.log("temp user:");
                console.log(user);
            }
        });

        return deferred.promise;

    }
    
    
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
        console.log("updating user in user.model");
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