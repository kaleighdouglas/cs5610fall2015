var model = require("../models/form.model.js")();

module.exports = function(app) {
	app.post("/api/assignment/form/:formId/field", Create);
	app.get("/api/assignment/form/:formId/field", FindAll);
	app.get("/api/assignment/form/:formId/field/:fieldId", FindById);
	app.delete("/api/assignment/form/:formId/field/:fieldId", Delete);
	app.put("/api/assignment/form/:formId/field/:fieldId", Update);
	
	
	function Create(req, res) {
		var form = req.body;
		model.Create(form);
	}
	
	function FindAll(req, res) {
		var formId = req.params.formId;  // Should I be passing userId as argument?
		res.json(model.FindAllFields(formId));
	}
	
	function FindById(req, res) {
		var formId = req.params.formId
		var fieldId = req.params.fieldId;
		res.json(model.FindField(formId, fieldId));
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