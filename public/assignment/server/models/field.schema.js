module.exports = function(mongoose) {

    var FieldSchema = new mongoose.Schema({
        "_id": mongoose.Schema.Types.ObjectId,
        "label": String,
        "fieldType" : {type: String, enum: ["TEXT", "TEXTAREA", "RADIO", "CHECKBOX", "SELECT", "DATE"]},
        "options" : {
                    "label" : {type: String, default: "label"},
                    "value" : mongoose.Schema.Types.Mixed  //String?  
                },
        "placeholder": String
    }, {collection: "cs5610.assignment.form"});  //collection?
    
    return FieldSchema;
};