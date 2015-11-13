//var q = require("q");
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
	
	
	function Create(form) {  //change
        forms.push(form);
        return forms;
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
	
	function Update(ID, form) {
        for(var i=0; i<forms.length; i++) {
            var currentForm = forms[i]
            if(currentForm.id == ID) {
                forms[i] = form;
            }
        }
        return form;
    }
	
	function Delete(ID) {
        for(var i=0; i<forms.length; i++) {
            var form = forms[i]
            if(form.id == ID) {
                forms.splice(i, 1);
            }
        }
        return forms;
    }
    
    
        // Fields Functions
    
        function FindAllFields(formId) {   
        var Fields = []
        for(var i=0; i<forms.length; i++) {
            var form = forms[i]
            if(form.id == formId) {
                Fields = form.fields;
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
        return forms;
    }
    
    function CreateField(formId, field) {   // change
        var Fields = FindAllFields(formId)
        Fields.push(field);
        FindById(formId).fields = Fields;
        return forms;
        
    }
  
    function UpdateField(formId, fieldId, field) {  //complete
    }
    
	
};