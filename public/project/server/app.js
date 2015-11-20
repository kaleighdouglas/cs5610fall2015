module.exports = function(app) {
    var userModel = require("./models/user.model.js")();
    require("./services/user.service.js")(app, userModel);
    
    var decisionModel = require("./models/decision.model.js")();
    require("./services/decision.service.js")(app, decisionModel);
    require("./services/procon.service.js")(app, decisionModel);
};