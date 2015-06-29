angular.module('userService', [])
	.factory('User', function($http){
		var userFactory = {};
		userFactory.get = function(id) {
			return $http.get('/users/' + id);
		};
		userFactory.delete = function(id) {
			return $http.delete('/users/' + id);
		};
		userFactory.all = function(id) {
			return $http.get('/users');
		};
		userFactory.create = function(data){
			return $http.post('/users', data);
		};
		userFactory.update = function(id, data){
			return $http.put('/users/' + id, data);
		};
		return userFactory;
	});