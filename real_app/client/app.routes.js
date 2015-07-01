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
		})
		.when('/users/edit/:user_id', {
			templateUrl: 'partials/users/single.html',
			controller: 'userEditController',
			controllerAs: 'user'
		})
		.when('/users/:user_id', {
			templateUrl: 'partials/users/show.html',
			controller: 'userShowController',
			controllerAs: 'user'
		})
		.when('/decks', {
			templateUrl: 'partials/decks/all.html',
			controller: 'deckController',
			controllerAs: 'deck'
		})
		.when('/decks/create', {
			templateUrl: 'partials/decks/single.html',
			controller: 'deckCreateController',
			controllerAs: 'deck'
		})
		.when('/decks/edit/:deck_id', {
			templateUrl: 'partials/decks/single.html',
			controller: 'deckEditController',
			controllerAs: 'deck'
		})
		.when('/decks/:deck_id', {
			templateUrl: 'partials/decks/show.html',
			controller: 'deckShowController',
			controllerAs: 'deck'
		});
		$locationProvider.html5Mode(true);
	});
