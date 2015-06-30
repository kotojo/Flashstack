angular.module('mainCtrl', [])
	.controller('mainController', function($rootScope, $location, Auth){
		var vm = this;
		vm.loggedIn = Auth.isLoggedIn();
		$rootScope.$on('$routeChangeStart', function() {
			vm.loggedIn = Auth.isLoggedIn();
				// get user information on route change
			Auth.getUser()
			.then(function(data) {
				vm.user = data;
			});
		});
		vm.doLogin = function() {
			vm.processing = true;
			vm.error = '';
			Auth
			.login(vm.loginData.username, vm.loginData.password)
			.success(function(data) {
				vm.processing = false;
				// if a user successfully logs in, redirect to users page
				if (data.success) 
					$location.path('/api/users');
				else
					vm.error = data.message;
			});
		};
		vm.doLogout = function() {
			Auth.logout();
			// reset all user info
			vm.user = {};
			$location.path('/login');
		};
	});