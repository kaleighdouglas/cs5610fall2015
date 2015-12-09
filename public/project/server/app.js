module.exports = function(app, db, mongoose, passport, GoogleStrategy, googleCredentials, cookieParser, session) {
    console.log(mongoose);
    var userModel = require("./models/user.model.js")(app, db, mongoose);
    require("./services/user.service.js")(app, userModel, passport, GoogleStrategy, googleCredentials, cookieParser, session);
    
    var decisionModel = require("./models/decision.model.js")(app, db, mongoose);
    require("./services/decision.service.js")(app, decisionModel);
    require("./services/procon.service.js")(app, decisionModel);
    require("./services/intuition.service.js")(app, decisionModel);
};