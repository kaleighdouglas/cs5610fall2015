//var q = require("q");
var forms = require("./form.mock.json");

module.exports = function(app){
    var api = {
		Create: Create,
		FindAll: FindAll,
		FindById: FindById,
		findFormByTitle: findFormByTitle,
		Update: Update,
		Delete: Delete
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
	
	function findFormByTitle(title) {}
	
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
	
};