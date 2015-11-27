module.exports = function(app, db, mongoose) {
    console.log(mongoose);
    var userModel = require("./models/user.model.js")(app, db, mongoose);
    require("./services/user.service.js")(app, userModel);
    
    var formModel = require("./models/form.model.js")(app, db, mongoose);
    require("./services/form.service.js")(app, formModel);
    require("./services/field.service.js")(app, formModel); 
};