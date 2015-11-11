//var q = require("q");
var forms = require("form.mock.json")

module.exports = function(app){
    var api = {
		findFormByTitle: findFormByTitle,
		Create: Create,
		FindAll: FindAll,
		FindById: FindById,
		Update: Update,
		Delete: Delete
    };
    return api;
	
	
	function findFormByTitle(title) {}
	
	function Create(user) {
        users.push(user);
        return users;
    }
	
	function FindAll() {
        return users;
    }
	
	function FindById(ID) {}
	
	function Update(ID) {}
	
	function Delete(ID) {}