var model = require("../models/user.model.js")();

module.exports = function(app) {
	
	app.get("/api/assignment/user", FindAll);
	
	
	
	
	function FindAll(req, res) {
		res.json(model.FindAll());
	}
}