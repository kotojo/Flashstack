angular.module('app.routes', ['ngRoute'])
	.config(function($routeProvider, $locationProvider){
		$routeProvider
		.when('/', {
			templateUrl: '/partials/home.html'
		})
		.when('/login', {
			templateUrl: 'partials/login.html',
			controller: 'mainController',
			controllerAs: 'login'
		});
		$locationProvider.html5Mode(true);
	});