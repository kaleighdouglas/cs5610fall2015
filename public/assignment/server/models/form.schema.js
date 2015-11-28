module.exports = function(mongoose) {
	var FieldSchema = require("./field.schema.js") (mongoose);

	var FormSchema = mongoose.Schema({
		"title": String,
		"userId" : mongoose.Schema.Types.ObjectId,  //from UserSchema - mongoose.UserSchema.Types.ObjectId
		"fields" : [FieldSchema],  //from FieldSchema
		"placeholder": String
	}, {collection: "cs5610.assignment.form"});

    return FormSchema;
};