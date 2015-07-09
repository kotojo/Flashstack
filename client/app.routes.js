angular.module('app.routes', ['ngRoute'])
	.config(function($routeProvider, $locationProvider){
		$routeProvider
		.when('/', {
			templateUrl: '/partials/login.html'
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
			templateUrl: 'partials/decks/update.html',
			controller: 'deckEditController',
			controllerAs: 'deck'
		})
		.when('/decks/:deck_id', {
			templateUrl: 'partials/decks/show.html',
			controller: 'deckShowController',
			controllerAs: 'deck'
		})
		.when('/cards', {
			templateUrl: 'partials/cards/all.html',
			controller: 'cardController',
			controllerAs: 'card'
		})
		.when('/cards/create', {
			templateUrl: 'partials/cards/single.html',
			controller: 'cardCreateController',
			controllerAs: 'card'
		})
		.when('/cards/edit/:card_id', {
			templateUrl: 'partials/cards/single.html',
			controller: 'cardEditController',
			controllerAs: 'card'
		})
		.when('/cards/:card_id', {
			templateUrl: 'partials/cards/show.html',
			controller: 'cardShowController',
			controllerAs: 'card'
		});
		;

		$locationProvider.html5Mode(true);
	});
