var forms = require("./form.mock.json");

module.exports = function(app){
    var api = {
		Create: Create,
		FindAll: FindAll,
		FindById: FindById,
		findFormByTitle: findFormByTitle,
		Update: Update,
		Delete: Delete,
        
        FindAllFields: FindAllFields,
        FindField: FindField,
        DeleteField: DeleteField,
        CreateField: CreateField,
        UpdateField: UpdateField
    };
    return api;
	
    
    function guid() {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
            s4() + '-' + s4() + s4() + s4();
    }
	
	function Create(userId, form) { 
        form["id"] = guid();
        form["userId"] = userId;
        form["fields"] = [];
        forms.push(form);
        var userForms = FindAll(userId);
        return userForms;
    }
	
	function FindAll(userId) {
        var userForms = []
        for(var i=0; i<forms.length; i++) {
            var form = forms[i]
            if(form.userId == userId) {
                userForms.push(form);
            }
        }
        return userForms;
    }
    
	
	function FindById(ID) {
		var foundForm = null
        for(var i=0; i<forms.length; i++) {
            var form = forms[i]
            if(form.id == ID) {
                foundForm = form;
            }
        }    
        return foundForm; 
	}
	
	function findFormByTitle(title) {
        var foundForm = null;
        for(var i=0; i<forms.length; i++) {
            var form = forms[i]
            if(form.title == title) {
                foundForm = form;
            }
        }    
        return foundForm; 
    }  
    
/*    function FindFormIdByIndex(index) {
        var form = forms[index];
        return form.id;
    } */
	
	function Update(ID, form) { 
        for(var i=0; i<forms.length; i++) {
            var currentForm = forms[i]
            if(currentForm.id == ID) {
                forms[i] = form;
                console.log("form being updated in model: ");
                console.log(form); 
            }
        }
        return FindAll(form.userId);
    }
	
	function Delete(ID) {
        var userId = 0;
        for(var i=0; i<forms.length; i++) {
            var form = forms[i]
            if(form.id == ID) {
                userId = form.userId;
                forms.splice(i, 1);
            }
        }
        return FindAll(userId);
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