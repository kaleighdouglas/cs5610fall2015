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
        
	
	function FindAllUsers() {
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

	 
	function findUserByCredentials(credentials) { 
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
    
	 
	function UpdateUser(ID, user) {
        var deferred = q.defer();
        //user.delete("_id");

        UserModel.update({_id: ID}, {$set: user}, function(err, status) {
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(status);
            }
        });

        return deferred.promise;
    }
	
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

};