var model = require("../models/form.model.js")();

module.exports = function(app) {
	app.post("/api/assignment/user/:userId/form", Create);
	app.get("/api/assignment/user/:userId/form", FindAll);
	app.get("/api/assignment/form/:formId", FindById);
	app.get("/api/assignment/form?title=title", FindFormByTitle);
	app.delete("/api/assignment/form/:formId", Delete);
	app.put("/api/assignment/form/:formId", Update);
	
	
	function Create(req, res) {
		var userId = req.params.userId;
		var form = req.body;
		res.json(model.Create(userId, form));
	}
	
	function FindAll(req, res) {
		var userId = req.params.userId;  // Should I be passing userId as argument?
		res.json(model.FindAll(userId));
	}
	
	function FindById(req, res) {
		var id = req.params.formId;
		console.log(id);
		res.json(model.FindById(id));
	}
	
	function FindFormByTitle(req, res) {
		var title = req.query.title;
		console.log(title);
		res.json(model.findFormByTitle(title));
	}
	
	
	function Delete(req, res) {
		var id = req.params.formId;
		res.json(model.Delete(id));
	}
	
	function Update(req, res) {
		var id = req.params.formId;
		var form = req.body;
		res.json(model.Update(id, form));
	}
	
	
} 