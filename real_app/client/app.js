angular.module('flashcardApp', [
		'app.routes',
		'authService',
		'mainCtrl',
    'ui.bootstrap',
		// 'userCtrl',
		// 'userService'
	]);


















// angular.module('flashcardApp', []); // Create the main module for the app
// angular.module('flashcardApp')
// 	.controller('mainController', function($scope, $http){
// 		var vm = this;
// 		$http.get('/users')
// 			.success(function(data){
// 				$scope.users = data;
// 				console.log(data);
// 			})
// 			.error(function(data){
// 				console.log('Error: ' + data);
// 			});
// 	}); // Get the newly created module, create a controller and attach to the module
