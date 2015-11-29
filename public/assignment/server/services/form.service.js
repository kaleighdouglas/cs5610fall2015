//var model = require("../models/form.model.js")();

module.exports = function(app, model) {
	app.post("/api/assignment/user/:userId/form", CreateForm);
	app.get("/api/assignment/user/:userId/form", FindAllForms);
	app.get("/api/assignment/form/:formId", FindFormById);
	app.get("/api/assignment/form", FindFormByTitle);  // /api/assignment/form?title=title
	app.delete("/api/assignment/form/:formId", DeleteForm);
	app.put("/api/assignment/form/:formId", UpdateForm);
	
	
	function CreateForm(req, res) {
		var userId = req.params.userId;
		var form = req.body;
		model.CreateForm(userId, form).then(function(form){
					res.json(form);
            });
		//res.json(model.Create(userId, form));
	}
	
	function FindAllForms(req, res) {
		var userId = req.params.userId;
		console.log("userId");
		console.log(userId);
		
		model.FindAllForms(userId).then(function(forms){
			console.log("finding all users from service");
			console.log(forms);
			res.json(forms);
            });
		//res.json(model.FindAll(userId));
	}
	
	function FindFormById(req, res) {
		var id = req.params.formId;
		console.log(id);
		model.FindFormById(id).then(function(form){
					res.json(form);
            });
		//res.json(model.FindById(id));
	}
	
	function FindFormByTitle(req, res) {
		var title = req.query.title;
		console.log(title);
		model.FindFormByTitle(title).then(function(form){
					res.json(form);
            });
		//res.json(model.findFormByTitle(title));
	}
	
	
	function DeleteForm(req, res) {
		var id = req.params.formId;
		model.DeleteForm(id).then(function(status){
					res.json(status);
            });
		//res.json(model.Delete(id));
	}
	
	function UpdateForm(req, res) {
		var id = req.params.formId;
		var form = req.body;
		model.UpdateForm(id, form).then(function(form){
					res.json(form);
            });
		//res.json(model.Update(id, form));
	}
	
	
} 