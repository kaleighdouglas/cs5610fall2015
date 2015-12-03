//var model = require("../models/user.model.js")();

module.exports = function(app, model) {
	app.post("/api/user", CreateUser);
	app.get("/api/user", FindAllUsers);
	app.get("/api/user/:id", FindUserById);
	app.get("/api/user?username=username", findUserByUsername);
	app.get("/api/user?username=username&password=password", findUserByCredentials);
	app.put("/api/user/:id", UpdateUser);
	app.delete("/api/user/:id", DeleteUser);
	
	
	function CreateUser(req, res) {
		var user = req.body;
		model.CreateUser(user).then(function(user){
			res.json(user);
		})
		//res.json(model.CreateUser(user));
	}
	
	function FindAllUsers(req, res) {
		if(req.query.password != null) {
			findUserByCredentials(req, res);
		}
		else if(req.query.username != null) {
            findUserByUsername(req, res);
		}
			else {
				model.FindAllUsers().then(function(users){
					res.json(users);
				})
				//res.json(model.FindAllUsers());
			}		
	}
	
	function FindUserById(req, res) {
		console.log("findUserById in server called");
		var id = req.params.id;
		console.log(id);
		model.FindUserById(id).then(function(user){
					res.json(user);
            });
		//res.json(model.FindUserById(id));
	}
	
	function findUserByUsername(req, res) {  
		var username = req.query.username;
		console.log(username);
		model.findUserByUsername(username).then(function(user){
					res.json(user);
            });
		//res.json(model.findUserByUsername(username));
	}
	
	function findUserByCredentials(req, res) { 
		console.log("find user by credentials in user.service");
		var credentials = {"username" : req.query.username, "password": req.query.password};
		model.findUserByCredentials(credentials).then(function(user){
					res.json(user);
            });
		//res.json(model.findUserByCredentials(credentials));
	}
	
	function UpdateUser(req, res) {
		var id = req.params.id;
		var user = req.body;
		model.UpdateUser(id, user).then(function(status){
					res.json(status);
            });
		//res.json(model.UpdateUser(id, user));
	}
	
	function DeleteUser(req, res) {
		var id = req.params["id"];
		model.DeleteUser(id).then(function(status){
					res.json(status);
            });
		//res.json(model.DeleteUser(id));
	}
}