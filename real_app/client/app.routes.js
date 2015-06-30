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
		})
		.when('/users', {
			templateUrl: 'partials/users/all.html',
			controller: 'userController',
			controllerAs: 'user'
		})
		.when('/users/create', {
			templateUrl: 'partials/users/single.html',
			controller: 'userCreateController',
			controllerAs: 'user'
		});
		$locationProvider.html5Mode(true);
	});
