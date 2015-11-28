var q = require("q");
//var forms = require("./form.mock.json");

module.exports = function(app, db, mongoose){
    var FormSchema = require("./form.schema.js") (mongoose);
    var FieldSchema = require("./field.schema.js") (mongoose);  // here?
    var FormModel = mongoose.model("FormModel", FormSchema);
 //   var FieldModel = mongoose.model("FieldModel", FieldSchema);  //necessary?
    var api = {
		Create: CreateForm,
		FindAll: FindAllForms,
		FindById: FindFormById,
		findFormByTitle: findFormByTitle,
		Update: UpdateForm,
		Delete: DeleteForm,
        
        FindAllFields: FindAllFields,
        FindField: FindField,
        DeleteField: DeleteField,
        CreateField: CreateField,
        UpdateField: UpdateField
    };
    return api;
	
    
 /*   function guid() {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
            s4() + '-' + s4() + s4() + s4();
    } */
	
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
    /*    forms.push(form);
        var userForms = FindAllForms(userId);
        return userForms; */
    }
	
	function FindAllForms(userId) { 
        var deferred = q.defer();
        console.log("finding forms in model");
        FormModel.find({userId: userId}, function(err, forms) {
            if(err) {
                console.log(err);
                deferred.reject(err);
            } else {
                console.log(forms);
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
	
	function findFormByTitle(title) {
        var deferred = q.defer();
        
        FormModel.find({title: title}, function(err, form){
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(form);
            }
        });

        return deferred.promise; 
    }  
    
/*    function FindFormIdByIndex(index) {
        var form = forms[index];
        return form.id;
    } */
	
	function UpdateForm(ID, form) { 
        var deferred = q.defer();

        form.delete("_id");

        FormModel.update({_id: ID}, {$set: form}, function(err, form) {
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(form);
            }
        });

        return deferred.promise;     
  /*      for(var i=0; i<forms.length; i++) {
            var currentForm = forms[i]
            if(currentForm.id == ID) {
                forms[i].title = form.title;
                console.log("form being updated in model: ");
                console.log(form); 
            }
        }
        return FindAllForms(form.userId); */
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
   /*     var userId = 0;
        for(var i=0; i<forms.length; i++) {
            var form = forms[i]
            if(form.id == ID) {
                userId = form.userId;
                forms.splice(i, 1);
            }
        }
        return FindAllForms(userId); */
    }
    
    
    
    
        // Fields Functions
    
        function FindAllFields(formId) {   
        var Fields = []
        console.log("FindAllFields called");
        for(var i=0; i<forms.length; i++) {
            var form = forms[i]
            if(form.id == formId) {
                console.log("match found");
                Fields = form.fields;   
                console.log("Fields assigned");
                console.log(Fields);
            }
        }
        return Fields;
    }
    
    function FindField(formId, fieldId) {  
        var Fields = FindAllFields(formId)
        var foundField = null
        for(var i=0; i<Fields.length; i++) {
            var field = Fields[i]
            if(field.id == fieldId) {
                foundField = field;
            }
        }
        return foundField;
    }
    
    
    function DeleteField(formId, fieldId) {  
        var Fields = FindAllFields(formId)
        for(var i=0; i<Fields.length; i++) {
            var field = Fields[i]
            if(field.id == fieldId) {
                Fields.splice(i, 1);
            }
        }
        console.log("fieldId");
        console.log(fieldId);
        console.log("remaining fields");
        console.log(Fields);
        return Fields;
    }
    
    function CreateField(formId, field) {
        console.log("new field in form.models");
        console.log("field:");
        console.log(field);
        console.log("formId");
        console.log(formId);
        field["id"] = guid();
        var Fields = FindAllFields(formId);
        console.log("Fields");
        console.log(Fields);
        Fields.push(field);
        return Fields;
    }
  
    function UpdateField(formId, fieldId, field) {
        var Fields = FindAllFields(formId);
        for(var i=0; i<Fields.length; i++) {
            var currentField = Fields[i]
            if(currentField.id == fieldId) {
                Fields[i] = field;
            }
        }
        return Fields;
    }
	
};