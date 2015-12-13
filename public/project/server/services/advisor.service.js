//var model = require("../models/decision.model.js")();

module.exports = function(app, model) {
	app.post("/api/decision/:decisionId/advisor", createAdvisor);
	app.get("/api/decision/:decisionId/advisor", getAllAdvisors);
	app.get("/api/decision/:decisionId/advisor/:id", getAdvisor);
	app.put("/api/decision/:decisionId/advisor/:id", updateAdvisor);
	app.delete("/api/decision/:decisionId/advisor/:id", deleteAdvisor);
	
	
	function createAdvisor(req, res) {
		//console.log("create advisor in advisor.service");
		var decisionId = req.params.decisionId;
		var advisor = req.body;
		model.createAdvisor(decisionId, advisor).then(function(advisors){
			res.json(advisors);
            });
	}
	
	function getAllAdvisors(req, res) {
		var decisionId = req.params.decisionId;
		model.getAllAdvisors(decisionId).then(function(advisors){
			res.json(advisors);
            });		
	}
	
	function getAdvisor(req, res) {
		var decisionId = req.params.decisionId;
		var id = req.params.id;
		model.getAdvisor(decisionId, id).then(function(advisor){
			res.json(advisor);
            });
	}
	
	function updateAdvisor(req, res) {
		var decisionId = req.params.decisionId;
		var id = req.params.id;
		var advisor = req.body;
		model.updateAdvisor(decisionId, id, advisor).then(function(advisor){
					res.json(advisor);
            });
	}
	
	function deleteAdvisor(req, res) {
		var decisionId = req.params.decisionId;
		var id = req.params.id;
		model.deleteAdvisor(decisionId, id).then(function(status){
					res.json(status);
            });
	}
}