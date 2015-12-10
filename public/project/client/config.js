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
                controller: "LoginController",
                controllerAs: "model"
            }) 
            .when("/register", {
                templateUrl: "views/register/register.view.html",
                controller: "RegisterController",
                controllerAs: "model"
            })
            .when("/profile", {
                templateUrl: "views/profile/profile.view.html",
                controller: "ProfileController",
                controllerAs: "model"
            })
            .when("/history", {
                templateUrl: "views/history/history.view.html",
                controller: "HistoryController"
            })
            .when("/question", {
                templateUrl: "views/question/question.view.html",
                controller: "QuestionController"
            })
            // ProCon Method
            .when("/methodProCon", {
                templateUrl: "views/methodProCon/methodProCon.view.html",
                controller: "MethodProConController"
            })
            .when("/user/:userId/decision/:decisionId/ProCon", {
                templateUrl: "views/methodProCon/methodProCon.view.html",
               // controller: "MethodProConController"
            })
            // IntuitionMethod
            .when("/methodIntuitionOptions", {
                templateUrl: "views/methodIntuition/methodIntuitionOptions.view.html",
                controller: "MethodIntuitionOptionsController"
            })
            .when("/user/:userId/decision/:decisionId/IntuitionOptions", {
                templateUrl: "views/methodIntuition/methodIntuitionOptions.view.html",
               // controller: "MethodProConController"
            })
            .when("/methodIntuitionEval", {
                templateUrl: "views/methodIntuition/methodIntuitionEval.view.html",
                controller: "MethodIntuitionEvalController"
            })
            .when("/user/:userId/decision/:decisionId/IntuitionEval", {
                templateUrl: "views/methodIntuition/methodIntuitionEval.view.html",
               // controller: "MethodProConController"
            })
            // Grid Method
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
            .when("/user/:userId/decision/:decisionId/advice", {
                templateUrl: "views/advice/advice.view.html",
                //controller: "AdviceController"
            })
            .when("/decision", {
                templateUrl: "views/decision/decision.view.html",
                controller: "DecisionController"
            })
            .when("/user/:userId/decision/:decisionId", {
                templateUrl: "views/decision/decision.view.html",
                //controller: "DecisionController"
            })
            .otherwise({
                redirectTo: "/home"
            });   
    }
})();

