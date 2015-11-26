module.exports = function(mongoose) {

	var FormSchema = mongoose.Schema({
		"title": String,
		"userId" : mongoose.UserSchema.Types.ObjectId,  //from UserSchema
		"fields" : [mongoose.FieldSchema],  //from FieldSchema
		"placeholder": String
	}, {collection: "cs5610.assignment.form"});

    return FormSchema;
};