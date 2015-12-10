module.exports = function(mongoose) {
    var DecisionUserSchema = new mongoose.Schema({
        "firstName": String,
        "lastName": String,
        "username": String,
        "password": String,
        "email" : String,
        "googleId" : String,
        "token" : String
    }, {collection: "cs5610.project.user"});
    
    return DecisionUserSchema;
};