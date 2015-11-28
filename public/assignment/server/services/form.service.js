//var model = require("../models/form.model.js")();

module.exports = function(app, model) {
	app.post("/api/assignment/user/:userId/form", Create);
	app.get("/api/assignment/user/:userId/form", FindAll);
	app.get("/api/assignment/form/:formId", FindById);
	app.get("/api/assignment/form", FindFormByTitle);  // /api/assignment/form?title=title
	app.delete("/api/assignment/form/:formId", Delete);
	app.put("/api/assignment/form/:formId", Update);
	
	
	function Create(req, res) {
		var userId = req.params.userId;
		var form = req.body;
		model.Create(userId, form).then(function(form){
					res.json(form);
            });
		//res.json(model.Create(userId, form));
	}
	
	function FindAll(req, res) {
		var userId = req.params.userId;
		console.log("userId");
		console.log(userId);
		
		model.FindAll(userId).then(function(forms){
			console.log("finding all users from service");
			console.log(forms);
			res.json(forms);
            });
		//res.json(model.FindAll(userId));
	}
	
	function FindById(req, res) {
		var id = req.params.formId;
		console.log(id);
		model.FindById(id).then(function(form){
					res.json(form);
            });
		//res.json(model.FindById(id));
	}
	
	function FindFormByTitle(req, res) {
		var title = req.query.title;
		console.log(title);
		model.findFormByTitle(title).then(function(form){
					res.json(form);
            });
		//res.json(model.findFormByTitle(title));
	}
	
	
	function Delete(req, res) {
		var id = req.params.formId;
		model.Delete(id).then(function(status){
					res.json(status);
            });
		//res.json(model.Delete(id));
	}
	
	function Update(req, res) {
		var id = req.params.formId;
		var form = req.body;
		model.Update(id, form).then(function(form){
					res.json(form);
            });
		//res.json(model.Update(id, form));
	}
	
	
} 