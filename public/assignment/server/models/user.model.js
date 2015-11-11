//var q = require("q");
var users = require("./user.mock.json");

module.exports = function(app){
    var api = {
		findUserByUsername: findUserByUsername,
		findUserByCredentials: findUserByCredentials,
		Create: Create,
		FindAll: FindAll,
		FindById: FindById,
		Update: Update,
		Delete: Delete
    };
    return api;
	
	
	function findUserByUsername(username) {}
	
	function findUserByCredentials(credentials) {
		credentials.username
		credentials.password
	}
	
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
	
	
/*
    function addContent(pageId, contentType) {
        var deferred = q.defer();

        PageModel.findById(pageId, function(err, page){
            var content = {
                contentType: contentType,
                list: {listType: 'ORDERED', items: ["Item 1", "Item 2", "Item 3"]}
            };
            page.content.push(content);
            page.save(function(err, doc){
                deferred.resolve(doc);
            });
        });

        return deferred.promise;
    }

    function getPageById(id) {
        var deferred = q.defer();

        PageModel.findById(id, function(err, page){
            deferred.resolve(page);
        });

        return deferred.promise;
    }

    function getAllPages() {
        var deferred = q.defer();

        PageModel.find(function(err, pages){
            deferred.resolve(pages);
        });

        return deferred.promise;
    }

    function addPage(page) {
        var deferred = q.defer();

        PageModel.create(page, function(err, doc){
            PageModel.find(function(err, pages){
                deferred.resolve(pages);
            });
        });

        return deferred.promise;
    }  */
};