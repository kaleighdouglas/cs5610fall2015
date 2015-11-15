//var q = require("q");
var forms = require("./form.mock.json");

module.exports = function(app){
    var api = {
		Create: Create,
		FindAll: FindAll,
		FindById: FindById,
		findFormByTitle: findFormByTitle,
        FindFormIdByIndex: FindFormIdByIndex,
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
	
	function Create(userId, form) {  //change
        form["id"] = guid();
        form["userId"] = userId;
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
    
    function FindFormIdByIndex(index) {
    //    userForms =
        var form = forms[index];
        return form.id;
    }
	
	function Update(ID, form) {   //change to only update title field
        //var userId = 0;
        console.log("form sent to model");
        console.log(form);
        console.log(form.userId);
        for(var i=0; i<forms.length; i++) {
            var currentForm = forms[i]
            if(currentForm.id == ID) {
              //  userId = form.userId;
              //  console.log("userId of form being updated in model: ");
              //  console.log(userId);
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
        console.log("fieldId");
        console.log(fieldId);
        console.log("remaining fields");
        console.log(Fields);
        return Fields;
    }
    
    function CreateField(formId, field) {   // change
        field["id"] = guid();
        var Fields = FindAllFields(formId)
        Fields.push(field);
        return Fields;
        
      //  FindById(formId).fields = Fields;
       // console.log("label");
      //  console.log(field.label);
      //  return forms;
    }
  
    function UpdateField(formId, fieldId, field) {  //complete
    }
    
	
};