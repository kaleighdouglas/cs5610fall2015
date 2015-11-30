module.exports = function(mongoose) {

    var FieldSchema = new mongoose.Schema({
        "_id": mongoose.Schema.Types.ObjectId,
        "label": String,
        "type" : {type: String, enum: ["TEXT", "TEXTAREA", "RADIO", "CHECKBOX", "SELECT", "DATE"]},
        "options" : [{
                    "label" : {type: String, default: "label"},
                    "value" : String //mongoose.Schema.Types.Mixed?  
                }],
        "placeholder": String
    }, {collection: "cs5610.assignment.form"}); 
    
    return FieldSchema;
};