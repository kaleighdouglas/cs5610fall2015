//var model = require("../models/decision.model.js")();

module.exports = function(app, model) {
	app.post("/api/decision/:decisionId/intuition", createOption);
	app.get("/api/decision/:decisionId/intuition", getAllOptions);
	app.get("/api/decision/:decisionId/intuition/:id", getOption);
	app.get("/api/decision/:decisionId/intuitionResult", getIntuitionResult);
	app.put("/api/decision/:decisionId/intuition/:id", updateOption);
	app.delete("/api/decision/:decisionId/intuition/:id", deleteOption);
	
	
	function createOption(req, res) {
		var decisionId = req.params.decisionId;
		var option = req.body;
		model.createOption(decisionId, option).then(function(options){
			res.json(options);
            });
		//res.json(model.createOption(decisionId, option));
	}
	
	function getAllOptions(req, res) {
		var decisionId = req.params.decisionId;
		model.getAllOptions(decisionId).then(function(options){
			res.json(options);
            });
		//res.json(model.getAllOptions(decisionId));		
	}
	
	function getOption(req, res) {
		var decisionId = req.params.decisionId;
		var id = req.params.id;
		model.getOption(decisionId, id).then(function(option){
			res.json(option);
            });
		//res.json(model.getOption(decisionId, id));
	}
	
	function getIntuitionResult(req, res) {
		console.log("getting intuition result in procon.service");
		var decisionId = req.params.decisionId;
		model.getIntuitionResult(decisionId).then(function(result){
			res.json(result);
            });
		//res.json(model.getIntuitionResult(decisionId));
	}
	
	function updateOption(req, res) {
		var decisionId = req.params.decisionId;
		var id = req.params.id;
		var option = req.body;
		model.updateProCon(decisionId, id, option).then(function(status){
					res.json(status);
            });
		//res.json(model.updateOption(decisionId, id, option));
	}
	
	function deleteOption(req, res) {
		var decisionId = req.params.decisionId;
		var id = req.params.id;
		model.deleteOption(decisionId, id).then(function(status){
					res.json(status);
            });
		//res.json(model.deleteOption(decisionId, id));
	}
}