var model = require("../models/form.model.js")();

module.exports = function(app) {
	app.post("/api/assignment/form", Create);
	app.get("/api/assignment/form", FindAll);
	
	
	function Create(req, res){}
	
	function FindAll(req, res) {
		res.json(model.FindAll());
	}
	
	
	
} 