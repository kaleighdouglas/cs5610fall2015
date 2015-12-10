module.exports = function(mongoose) {
	//var ProConSchema = require("./procon.schema.js") (mongoose);
	//var AdvisorSchema = require("./advisor.schema.js") (mongoose);
	//var OptionSchema = require("./option.schema.js") (mongoose);

	var DecisionSchema = new mongoose.Schema({
		"creatorId" : mongoose.Schema.Types.ObjectId,
		"userId" : mongoose.Schema.Types.ObjectId,
		"question": String,
		"myDecision": String,
		"deadline" : Date,
		"finalDecision": String,
		"methodType": {type: String, enum: ["ProCon", "Guess", "Grid"]},
		"options": [{
					"_id" : mongoose.Schema.Types.ObjectId,
					"label" : String,
                    "description" : String,
                    "url" : String  
                }],
		"advisors": [{
					"_id" : mongoose.Schema.Types.ObjectId,
					"name" : String,
					"email" : String,
					"weight" : { type: Number, min: 0, max: 1.00 },
                    "decision" : String 
                }],
		"procons" : [{
					"_id" : mongoose.Schema.Types.ObjectId,
					"label" : String,
                    "impact" : { type: Number, min: -5, max: 5 }
                }],
	}, {collection: "cs5610.project.decision"});

    return DecisionSchema;
};