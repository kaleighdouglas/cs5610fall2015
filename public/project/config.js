(function(){
    "use strict";
    angular
        .module("DecisionsApp")
        .config(Configure);

    function Configure($routeProvider) {
        $routeProvider
             .when("/home",{
                templateUrl: "home/home.view.html"
            })
            .when("/login", {
                templateUrl: "login/login.view.html",
                controller: "LoginController"
            }) 
            .when("/register", {
                templateUrl: "register/register.view.html",
                controller: "RegisterController"
            })
            .when("/profile", {
                templateUrl: "profile/profile.view.html",
                controller: "ProfileController"
            })
            .when("/history", {
                templateUrl: "history/history.view.html",
                controller: "HistoryController"
            })
            .otherwise({
                redirectTo: "/home"
            });   
    }
})();

