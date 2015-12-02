//var model = require("../models/decision.model.js")();

module.exports = function(app, model) {
	app.post("/api/user/:userId/decision", createDecision);
	app.get("/api/user/:userId/decision", getAllDecisions);
	app.get("/api/decision/:decisionId", getDecisionById);
	app.put("/api/decision/:decisionId", updateDecision);
	app.delete("/api/decision/:decisionId", deleteDecision);
	
	
	function createDecision(req, res) {
		console.log("creating new decision in decision.service");
		var userId = req.params.userId;
		var decision = req.body;
		model.createDecision(userId, decision).then(function(decision){
			res.json(decision);
            });
		//res.json(model.createDecision(userId, decision));
	}
	
	function getAllDecisions(req, res) {
		var userId = req.params.userId;
		model.getAllDecisions(userId).then(function(decisions){
			console.log("finding all users from service");
			console.log(decisions);
			res.json(decisions);
            });
		//res.json(model.getAllDecisions(userId));		
	}
	
	function getDecisionById(req, res) {
		var decisionId = req.params.decisionId;
		model.getDecisionById(decisionId).then(function(decision){
			res.json(decision);
            });
		//res.json(model.getDecision(decisionId));
	}
	
	function updateDecision(req, res) {
		var decisionId = req.params.decisionId;
		var decision = req.body;
		model.updateDecision(decisionId, decision).then(function(status){
					res.json(status);
            });
		//res.json(model.updateDecision(decisionId, decision));
	}
	
	function deleteDecision(req, res) {
		var decisionId = req.params.decisionId;
		model.deleteDecision(decisionId).then(function(status){
					res.json(status);
            });
		//res.json(model.deleteDecision(decisionId));
	}
}