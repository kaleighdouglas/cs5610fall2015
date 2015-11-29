//var model = require("../models/form.model.js")();

module.exports = function(app, model) {
	app.post("/api/assignment/form/:formId/field", CreateField);
	app.get("/api/assignment/form/:formId/field", FindAllFields);
	app.get("/api/assignment/form/:formId/field/:fieldId", FindFieldById);
	app.delete("/api/assignment/form/:formId/field/:fieldId", DeleteField);
	app.put("/api/assignment/form/:formId/field/:fieldId", UpdateField);
	
	
	function CreateField(req, res) {
		var formId = req.params.formId;
		var field = req.body;
		model.CreateField(formId, field).then(function(field){
					res.json(field);
            });
		//res.json(model.CreateField(formId, field));
	}
	
	function FindAllFields(req, res) {
		var formId = req.params.formId;  // Should I be passing userId as argument?
		
		model.FindAllFields(formId).then(function(fields){
			res.json(fields);
            });
		//res.json(model.FindAllFields(formId));
	}
	
	function FindFieldById(req, res) {
		var formId = req.params.formId
		var fieldId = req.params.fieldId;
		model.FindFieldById(formId, fieldId).then(function(field){
					res.json(field);
            });
		//res.json(model.FindField(formId, fieldId));
	}
	
	function DeleteField(req, res) {
		var formId = req.params.formId;
		var fieldId = req.params.fieldId;
		model.DeleteField(formId, fieldId).then(function(status){
					res.json(status);
            });
		//res.json(model.DeleteField(formId, fieldId));
	}
	
	function UpdateField(req, res) {
		var formId = req.params.formId
		var fieldId = req.params.fieldId;
		var field = req.body
		model.UpdateField(formId, fieldId, field).then(function(field){
					res.json(field);
            });
		//res.json(model.UpdateField(formId, fieldId, field));
	}
	
	
} 