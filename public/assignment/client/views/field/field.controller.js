(function() {
	"use strict";
	angular
		.module("FormBuilderApp")
		.controller("FieldController", FieldController);
	    
    function FieldController($routeParams, FieldService) {
		var model = this;
		model.addField = addField;
		model.removeField = removeField;
		
		var userId = $routeParams.userId;
		var formId = $routeParams.formId;
		
		//var currentUser = $rootScope.user;
		FieldService.getFieldsForForm(formId).then(function(response){
				console.log("list of fields");
				console.log(response);
				model.fields = response;
		});
		
		
		
		function addField(fieldType) {
			var newField = {}
			if(fieldType == "TEXT") {
				newField = {
					"id" : null,
					"label" : "New Text Field",
					"type" : "TEXT",
					"placeholder" : "New Field"
				};
			} else if (fieldType == "TEXTBOX") {
				newField = {
					"id" : null,
					"label" : "New Text Field",
					"type" : "TEXTAREA",
					"placeholder" : "New Field"
				};
			} else if (fieldType == "DATE") {
				newField = {
					"id" : null,
					"label" : "New Date Field",
					"type" : "DATE"
				};
			} else if (fieldType == "OPTIONS") {
				newField = {
					"id" : null,
					"label" : "New Dropdown",
					"type" : "OPTIONS",
					"options" : [
						{"label": "Option 1", "value": "OPTION_1"},
						{"label": "Option 2", "value": "OPTION_2"},
						{"label": "Option 3", "value": "OPTION_3"}
					]
				};
			} else if (fieldType == "CHECKBOXES") {
				newField = {
					"id" : null,
					"label" : "New Checkboxes",
					"type" : "CHECKBOXES",
					"options" : [
						{"label": "Option A", "value": "OPTION_A"},
						{"label": "Option B", "value": "OPTION_B"},
						{"label": "Option C", "value": "OPTION_C"}
					]
				};	
			} else if (fieldType == "RADIOS") {
				newField = {
					"id" : null,
					"label" : "New Radio Buttons",
					"type" : "RADIOS",
					"options" : [
						{"label": "Option X", "value": "OPTION_X"},
						{"label": "Option Y", "value": "OPTION_Y"},
						{"label": "Option Z", "value": "OPTION_Z"}
					]
				};
			} 
			FieldService.createFieldForForm(formId, newField).then(function(response){
				model.fields = response;
			});	
		}

		
		function removeField(field) {
			FieldService.deleteFieldFromForm(formId, field.id).then(function(response){
				model.fields = response;
			});
		}
		
		
	}
}) ();