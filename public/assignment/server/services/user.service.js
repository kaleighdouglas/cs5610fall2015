//var model = require("../models/user.model.js")();

module.exports = function(app, model) {
	app.post("/api/assignment/user", Create);
	app.get("/api/assignment/user", FindAll);
	app.get("/api/assignment/user/:id", FindById);
	app.get("/api/assignment/user?username=username", findUserByUsername);
	app.get("/api/assignment/user?username=username&password=password", findUserByCredentials);
	app.put("/api/assignment/user/:id", Update);
	app.delete("/api/assignment/user/:id", Delete);
	
	
	function Create(req, res) {
		var user = req.body;
		model.Create(user).then(function(user){
					res.json(user);
            });
		//res.json(model.Create(user));
	}
	
	function FindAll(req, res) {
		if(req.query.password != null) {
			findUserByCredentials(req, res);
		}
		else if(req.query.username != null) {
            findUserByUsername(req, res);
		}
			else {
				model.FindAll().then(function(users){
					res.json(users);
            });
				//res.json(model.FindAll());
			}		
	}
	
	function FindById(req, res) {
		var id = req.params.id;
		console.log(id);
		model.FindById(id).then(function(user){
					res.json(user);
            });
		//res.json(model.FindById(id));
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
		var credentials = {"username" : req.query.username, "password": req.query.password};
		model.findUserByCredentials(credentials).then(function(user){
					res.json(user);
            });
		//res.json(model.findUserByCredentials(credentials));
	}
	
	function Update(req, res) {
		var id = req.params.id;
		var user = req.body;
		model.Update(id, user).then(function(user){
					res.json(user);
            });
		//res.json(model.Update(id, user));
	}
	
	function Delete(req, res) {
		var id = req.params["id"];
		model.Delete(id).then(function(status){
					res.json(status);
            });
		//res.json(model.Delete(id));
	}
}