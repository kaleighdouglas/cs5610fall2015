var model = require("../models/user.model.js")();

module.exports = function(app) {
	app.post("/api/assignment/user", Create);
	app.get("/api/assignment/user", FindAll);
	app.get("/api/assignment/user/:id", FindById);
	app.get("/api/assignment/user?username=username", findUserByUsername);
	app.get("/api/assignment/user?username=username&password=password", findUserByCredentials);
	app.put("/api/assignment/user/:id", Update);
	app.delete("/api/assignment/user/:id", Delete);
	
	
	function Create(req, res) {
		var user = req.body;
		//var user = {"id": 678, "firstName": "K", "lastName": "O", "username": "k", "password": "k"}
		model.Create(user);
	}
	
	function FindAll(req, res) {
		res.json(model.FindAll());
	}
	
	function FindById(req, res) {
		var id = req.params.id;
		console.log(id);
		res.json(model.FindById(id));
	}
	
	function findUserByUsername(req, res) {
		var username = req.query.username;
		console.log(username);
		res.json(model.findUserByUsername(username));
	}
	
	function findUserByCredentials(req, res) {
//		var username = req.query.username;
//		var password = req.query.password;
		var credentials = {"username" : req.query.username, "password": req.query.password};
		res.json(model.findUserByCredentials(credentials));
	}
	
	function Update(req, res) {}
	
	function Delete(req, res) {
		var id = req.params["id"];
		res.json(model.Delete(id));
	}
}