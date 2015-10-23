(function(){
    angular
        .module("FormBuilderApp")
        .factory("FormService", FormService);

    function FormService() {
        var forms = [];

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
        
        function createFormForUser(userId, form, callback) {
            callback(forms);
        }

        function findAllFormsForUser(userId, callback) {
            callback(forms);
        }
        
        function deleteFormById(formId, callback) {
            callback(forms);
        }
        
        function updateFormById(formId, newForm, callback) {
            callback(forms);
        }
    }
})();