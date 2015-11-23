var model = require("../models/decision.model.js")();

module.exports = function(app) {
	app.post("/api/user/:userId/decision", createDecision);
	app.get("/api/user/:userId/decision", getAllDecisions);
	app.get("/api/decision/:decisionId", getDecision);
	app.put("/api/decision/:decisionId", updateDecision);
	app.delete("/api/decision/:decisionId", deleteDecision);
	
	
	function createDecision(req, res) {
		console.log("creating new decision in decision.service");
		var userId = req.params.userId;
		var decision = req.body;
		res.json(model.createDecision(userId, decision));
	}
	
	function getAllDecisions(req, res) {
		var userId = req.params.userId;
		res.json(model.getAllDecisions(userId));		
	}
	
	function getDecision(req, res) {
		var decisionId = req.params.decisionId;
		res.json(model.getDecision(decisionId));
	}
	
	function updateDecision(req, res) {
		var decisionId = req.params.decisionId;
		var decision = req.body;
		res.json(model.updateDecision(decisionId, decision));
	}
	
	function deleteDecision(req, res) {
		var decisionId = req.params.decisionId;
		res.json(model.deleteDecision(decisionId));
	}
}