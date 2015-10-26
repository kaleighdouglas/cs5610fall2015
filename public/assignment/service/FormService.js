(function(){
    angular
        .module("FormBuilderApp")
        .factory("FormService", FormService);

    function FormService() {
        var PRform = {
            "name" : "form1",
            "id" : 123,
            "userid" : 12345,
        }
        
        var forms = [PRform];

        var service = {
            createFormForUser: createFormForUser,
            findAllFormsForUser: findAllFormsForUser,
            deleteFormById: deleteFormById,
            updateFormById: updateFormById
        };
        return service;
        
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
                    form = newForm;
                }
            }
            callback(form);
            return form;
        }
    }
})();