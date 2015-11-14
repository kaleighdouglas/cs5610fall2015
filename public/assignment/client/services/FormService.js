(function(){
    "use strict";
    angular
        .module("FormBuilderApp")
        .factory("FormService", FormService);

    function FormService($http, $q) {
        

        var service = {
            createFormForUser: createFormForUser,
            findAllFormsForUser: findAllFormsForUser,
            deleteFormById: deleteFormById,
            updateFormById: updateFormById,
            findFormByTitle: findFormByTitle,
            findFormIdByIndex: findFormIdByIndex
        };
        return service;     
        
        
        function createFormForUser(userId, form) {
            var deferred = $q.defer();
            $http.post("/api/assignment/user/"+userId+"/form" , form)
                .success(function(response){
                    deferred.resolve(response);
                });
                
            return deferred.promise;
        }

        function findAllFormsForUser(userId) {
            var deferred = $q.defer();
            $http.get("/api/assignment/user/"+userId+"/form")
                .success(function(response){
                    deferred.resolve(response);
                });
                
            return deferred.promise;
        }
        
        function deleteFormById(formId) {
            var deferred = $q.defer();
            $http.delete("/api/assignment/form/"+formId)
                .success(function(response){
                    deferred.resolve(response);
                });
                
            return deferred.promise;
        }
        
        function updateFormById(formId, newForm) {
            var deferred = $q.defer();
            $http.put("/api/assignment/form/"+formId, newForm)
                .success(function(response){
                    deferred.resolve(response);
                });
                
            return deferred.promise;
        }
        
        function findFormByTitle(title){
            var deferred = $q.defer();
            $http.get("/api/assignment/form?title="+title)
                .success(function(response){
                    deferred.resolve(response);
                });
                
            return deferred.promise;
        }
        
        function findFormIdByIndex(index) {
            var deferred = $q.defer();
            $http.get("/api/assignment/form?index="+index)
                .success(function(response){
                    deferred.resolve(response);
                });
                
            return deferred.promise;
        }
    }
})();








/*  var A = {
            "name" : "Registration Form",
            "id" : "123",
            "userid" : "12345",
        }
        var B = {
            "name" : "Contact List",
            "id" : "234",
            "userid" : "12345",
        }
        var C = {
            "name" : "To Do List",
            "id" : "345",
            "userid" : "12345",
        }
        var D = {
            "name" : "To Do List",
            "id" : "456",
            "userid" : "1111",
        }
        
        var forms = [A, B, C, D];
        
        function callback(value) {
            console.log(value);
        }
        
        function guid() {
            function s4() {
                return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
            }
            return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
                s4() + '-' + s4() + s4() + s4();
        }
        
        
        function createFormForUser(userId, form, callback) {
            form["id"] = guid();
            form["userid"] = userId;
            forms[forms.length] = form;
            callback(form);
            return form;
        }

        function findAllFormsForUser(userId, callback) {
            var userForms = []
            for(var i=0; i<forms.length; i++) {
                var form = forms[i]
                if(form.userid == userId) {
                    userForms[userForms.length] = form;
                }
            }
            callback(userForms);
            return userForms;
        }
        
        function deleteFormById(formId, callback) {
            for(var i=0; i<forms.length; i++) {
                var form = forms[i]
                if(form.id == formId) {
                    forms.splice(i,1);
                }
            }
            callback(forms);
            return forms;
        }
        
        function updateFormById(formId, newForm, callback) {
            for(var i=0; i<forms.length; i++) {
                var form = forms[i]
                if(form.id == formId) {
                    forms[i] = newForm;
                }
            }
            callback(newForm);
            return newForm;
        }    */