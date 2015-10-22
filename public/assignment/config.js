(function() {
	angular
		.module("FormBuilderApp", [])
		.config(Configure);
		
	function Configure ($routeProvider) {
		$routeProvider
		/** 	.when("/header/header.view", {
				templateUrl: "header.view.html",
				controller: "HeaderController"
			})
			.when("/sidebar/sidebar.view", {
				templateUrl: "sidebar.view.html",
				controller: "SidebarController"   
			}) */
		//	.when("/register", {
		//		templateUrl: "register.html"
		//	}) 
	}
	
}) ();