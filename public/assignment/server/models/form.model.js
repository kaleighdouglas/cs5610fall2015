var q = require("q");
//var forms = require("./form.mock.json");

module.exports = function(app, db, mongoose){
    var FormSchema = require("./form.schema.js") (mongoose);
    var FormModel = mongoose.model("FormModel", FormSchema);
    var api = {
		CreateForm: CreateForm,
		FindAllForms: FindAllForms,
		FindFormById: FindFormById,
		FindFormByTitle: FindFormByTitle,
		UpdateForm: UpdateForm,
		DeleteForm: DeleteForm,
        
        FindAllFields: FindAllFields,
        FindFieldById: FindFieldById,
        DeleteField: DeleteField,
        CreateField: CreateField,
        UpdateField: UpdateField
    };
    return api;
	
	
	function CreateForm(userId, form) {
        form["userId"] = userId;
        form["fields"] = [];
        var deferred = q.defer();

        FormModel.create(form, function(err, form) {
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(form);
            }
        });
        return deferred.promise;     
    }
	
	function FindAllForms(userId) { 
        var deferred = q.defer();
        FormModel.find({userId: userId}, function(err, forms) {
            if(err) {
                //console.log(err);
                deferred.reject(err);
            } else {
                //console.log(forms);
                deferred.resolve(forms);
            }
        });
        return deferred.promise;
    }
    
	
	function FindFormById(ID) {
        var deferred = q.defer();

        FormModel.findById(ID, function(err, form){
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(form);
            }
        });
        return deferred.promise;
	}
	
	function FindFormByTitle(title) {
        var deferred = q.defer();
        
        FormModel.findOne({title: title}, function(err, form){
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(form);
            }
        });
        return deferred.promise; 
    }  
    
	
	function UpdateForm(ID, form) { 
        var deferred = q.defer();

        //form.delete("_id");

        FormModel.update({_id: ID}, {$set: form}, function(err, form) {
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(form);
            }
        });
        return deferred.promise; 
    }
	
	function DeleteForm(ID) {
        var deferred = q.defer();

        FormModel.remove({_id: ID}, function(err, status) {
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(status);
            }
        });
        return deferred.promise;    
    }
    
    
    
    
   // Fields Functions
    
    function FindAllFields(formId) {  
        var deferred = q.defer();

        FormModel.findById(formId, function(err, form){
            if(err) {
                deferred.reject(err);
            } else {
                //console.log("found fields in model");
                //console.log(form);
                deferred.resolve(form.fields);
            }
        });
        return deferred.promise;
    }
    
    function FindFieldById(formId, fieldId) {  
        var deferred = q.defer();

            FormModel.findById(formId, function(err, form){
                if(err) {
                    deferred.reject(err);
                } else {
                    for(var i=0; i<form.fields.length; i++) {
                    var field = form.fields[i];
                    if(field._id == fieldId) {
                        deferred.resolve(field);
                    }
                    }
                }
            });
            return deferred.promise;
    }   

    
    
    function DeleteField(formId, fieldId) {  
        var deferred = q.defer();

        FormModel.findById(formId, function(err, form){
            if(err) {
                    deferred.reject(err);
            } else {
                for(var i=0; i<form.fields.length; i++) {
                var field = form.fields[i]
                if(field.id == fieldId) {
                    form.fields.splice(i, 1);
                    form.save(function(err, form){
                    deferred.resolve(form);
                });
                }
                }
            }
        });
        return deferred.promise;
    }
           
    
    function CreateField(formId, field) {
        var deferred = q.defer();

        FormModel.findById(formId, function(err, form){
            if(err) {
                    deferred.reject(err);
            } else {
                field._id = mongoose.Types.ObjectId();
                form.fields.push(field);
                //console.log("Form after adding new field");
                //console.log(form);
                //console.log("Fields after adding new field");
                //console.log(form.fields);
                form.save(function(err, form){
                    deferred.resolve(form);
                });
            }
        });
        return deferred.promise;
    }
  
  
    function UpdateField(formId, fieldId, field) {
        var deferred = q.defer();

        FormModel.findById(formId, function(err, form){
            if(err) {
                deferred.reject(err);
            } else {
                for(var i=0; i<form.fields.length; i++) {
                if(form.fields[i]._id == fieldId) {
                    form.fields[i].literal = field.literal;
                    form.save(function(err, form){
                        deferred.resolve(form);
                    });
                }
                }
            }   
        });
        return deferred.promise;
    }

	
};