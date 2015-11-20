var model = require("../models/user.model.js")();

module.exports = function(app) {
	app.post("/api/assignment/user", CreateUser);
	app.get("/api/assignment/user", FindAllUsers);
	app.get("/api/assignment/user/:id", FindUserById);
	app.get("/api/assignment/user?username=username", findUserByUsername);
	app.get("/api/assignment/user?username=username&password=password", findUserByCredentials);
	app.put("/api/assignment/user/:id", UpdateUser);
	app.delete("/api/assignment/user/:id", DeleteUser);
	
	
	function CreateUser(req, res) {
		var user = req.body;
		res.json(model.CreateUser(user));
	}
	
	function FindAllUsers(req, res) {
		if(req.query.password != null) {
			findUserByCredentials(req, res);
		}
		else if(req.query.username != null) {
            findUserByUsername(req, res);
		}
			else {
				res.json(model.FindAllUsers());
			}		
	}
	
	function FindUserById(req, res) {
		var id = req.params.id;
		console.log(id);
		res.json(model.FindUserById(id));
	}
	
	function findUserByUsername(req, res) {  
		var username = req.query.username;
		console.log(username);
		res.json(model.findUserByUsername(username));
	}
	
	function findUserByCredentials(req, res) { 
		console.log("find user by credentials in user.service");
		var credentials = {"username" : req.query.username, "password": req.query.password};
		res.json(model.findUserByCredentials(credentials));
	}
	
	function UpdateUser(req, res) {
		var id = req.params.id;
		var user = req.body;
		res.json(model.UpdateUser(id, user));
	}
	
	function DeleteUser(req, res) {
		var id = req.params["id"];
		res.json(model.DeleteUser(id));
	}
}