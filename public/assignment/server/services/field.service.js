//var model = require("../models/form.model.js")();

module.exports = function(app, model) {
	app.post("/api/assignment/form/:formId/field", Create);
	app.get("/api/assignment/form/:formId/field", FindAll);
	app.get("/api/assignment/form/:formId/field/:fieldId", FindById);
	app.delete("/api/assignment/form/:formId/field/:fieldId", Delete);
	app.put("/api/assignment/form/:formId/field/:fieldId", Update);
	
	
	function Create(req, res) {
		var formId = req.params.formId;
		var field = req.body;
		model.CreateField(formId, field).then(function(field){
					res.json(field);
            });
		//res.json(model.CreateField(formId, field));
	}
	
	function FindAll(req, res) {
		var formId = req.params.formId;  // Should I be passing userId as argument?
		
		model.FindAllFields(formId).then(function(fields){
			res.json(fields);
            });
		//res.json(model.FindAllFields(formId));
	}
	
	function FindById(req, res) {
		var formId = req.params.formId
		var fieldId = req.params.fieldId;
		model.FindField(formId, fieldId).then(function(field){
					res.json(field);
            });
		//res.json(model.FindField(formId, fieldId));
	}
	
	function Delete(req, res) {
		var formId = req.params.formId;
		var fieldId = req.params.fieldId;
		model.DeleteField(formId, fieldId).then(function(status){
					res.json(status);
            });
		//res.json(model.DeleteField(formId, fieldId));
	}
	
	function Update(req, res) {
		var formId = req.params.formId
		var fieldId = req.params.fieldId;
		var field = req.body
		model.UpdateField(formId, fieldId, field).then(function(field){
					res.json(field);
            });
		//res.json(model.UpdateField(formId, fieldId, field));
	}
	
	
} 