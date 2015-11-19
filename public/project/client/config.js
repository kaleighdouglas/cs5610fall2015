(function(){
    "use strict";
    angular
        .module("DecisionsApp")
        .config(Configure);

    function Configure($routeProvider) {
        $routeProvider
             .when("/home",{
                templateUrl: "views/home/home.view.html"
            })
            .when("/login", {
                templateUrl: "views/login/login.view.html",
                controller: "LoginController"
            }) 
            .when("/register", {
                templateUrl: "views/register/register.view.html",
                controller: "RegisterController"
            })
            .when("/profile", {
                templateUrl: "views/profile/profile.view.html",
                controller: "ProfileController"
            })
            .when("/history", {
                templateUrl: "views/history/history.view.html",
                controller: "HistoryController"
            })
            .when("/question", {
                templateUrl: "views/question/question.view.html",
                controller: "QuestionController"
            })
            .when("/methodProCon", {
                templateUrl: "views/methodProCon/methodProCon.view.html",
                controller: "MethodProConController"
            })
            .when("/methodIntuitionOptions", {
                templateUrl: "views/methodIntuition/methodIntuitionOptions.view.html",
                controller: "MethodIntuitionOptionsController"
            })
            .when("/methodIntuitionEval", {
                templateUrl: "views/methodIntuition/methodIntuitionEval.view.html",
                controller: "MethodIntuitionEvalController"
            })
            .when("/methodGridOptions", {
                templateUrl: "views/methodGrid/methodGridOptions.view.html",
                controller: "MethodGridOptionsController"
            })
            .when("/methodGridAttributes", {
                templateUrl: "views/methodGrid/methodGridAttributes.view.html",
                controller: "MethodGridAttributesController"
            })
            .when("/methodGridEval", {
                templateUrl: "views/methodGrid/methodGridEval.view.html",
                controller: "MethodGridEvalController"
            })
            .when("/advice", {
                templateUrl: "views/advice/advice.view.html",
                controller: "AdviceController"
            })
            .when("/decision", {
                templateUrl: "views/decision/decision.view.html",
                controller: "DecisionController"
            })
            .otherwise({
                redirectTo: "/home"
            });   
    }
})();
