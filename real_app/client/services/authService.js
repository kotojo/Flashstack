angular.module('authService', [])
// ===================================================
// auth factory to login and get information
// inject $http for communicating with the API
// inject $q to return promise objects
// inject AuthToken to manage tokens
// ===================================================
	.factory('Auth', function($window, $http, $q, AuthToken) {
		// create auth factory object
		var authFactory = {};
		authFactory.currentUserId = null;
		// log a user in
		authFactory.login = function(username, password) {
		// return the promise object and its data
			return $http.post('authenticate', {
				username: username,
				password: password
			})
			.success(function(data) {
				AuthToken.setToken(data.token);
				// Stored the current user id in localhost:
				$window.localStorage.setItem('currentUserId', data.user_id);
				authFactory.currentUserId = data.user_id;
				return data;
			});
		};
		// log a user out by clearing the token
		authFactory.logout = function() {
		// clear the token
			AuthToken.setToken();
			$window.localStorage.removeItem('currentUserId');
			authFactory.currentUserId = null;
		};
		// check if a user is logged in
		// checks if there is a local token
		authFactory.isLoggedIn = function() {
			if (AuthToken.getToken())
				return true;
			else
				return false;
		};
		// get the logged in user
		authFactory.getUser = function() {
			if (AuthToken.getToken())
				return $http.get('me', { cache: true });
			else
				return $q.reject({ message: 'User has no token.' });
		};
		// return auth factory object
		return authFactory;
	})
// ===================================================
// factory for handling tokens
// inject $window to store token client-side
// ===================================================
	.factory('AuthToken', function($window) {
		var authTokenFactory = {};
		// get the token out of local storage
		authTokenFactory.getToken = function() {
			return $window.localStorage.getItem('token');
		};
		// function to set token or clear token
		// if a token is passed, set the token
		// if there is no token, clear it from local storage
		authTokenFactory.setToken = function(token) {
			if (token)
				$window.localStorage.setItem('token', token);
			else
				$window.localStorage.removeItem('token');
		};
		return authTokenFactory;
	})
// ===================================================
// application configuration to integrate token into requests
// ===================================================
	.factory('AuthInterceptor', function($window, $q, $location, AuthToken) {
		var interceptorFactory = {};
		// this will happen on all HTTP requests
		interceptorFactory.request = function(config) {
			// console.log('Client request intercepted');
		// grab the token
			var token = AuthToken.getToken();
			// console.log(token);
			// if the token exists, add it to the header as x-access-token
			if (token) {
				console.log('Got token');
				config.headers['x-access-token'] = token;
			}
			// $window.localStorage['token'] = config.headers['x-access-token'];
			// console.log(config);
			return config;
		};
		// happens on response errors
		interceptorFactory.responseError = function(response) {
		// if our server returns a 403 forbidden response
			if (response.status == 403) {
				console.log('Redirecting to login');
				$location.path('/login');
				// return the errors from the server as a promise
			}
			return $q.reject(response);
		};
		return interceptorFactory;
	});
