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
	
	
	function Create(form) {
        forms.push(form);
        return forms;
    }
	
	function FindAll() {
        return forms;
    }
	
	function FindById(ID) {}
	
	function findFormByTitle(title) {}
	
	function Update(ID) {}
	
	function Delete(ID) {}
	
};