  //start module and inject the service
angular.module('userCtrl', ['userService'])

//user controller for main page and injecting factory
.controller('userController', function(User) {

  var vm = this;

  //processing variable to show loading things
  vm.processing = true;

  //grab all users
  User.all()
    .success(function(data) {

      //remove processing when we get users
      vm.processing = false;

      //bind users to vm when we get them
      vm.users = data;
    });

  vm.deleteUser = function(id) {
    vm.processing = true;

    //pass in user id as param
    User.delete(id)
      .success(function(data) {

        //reget all users and refresh list
        User.all()
          .success(function(data) {
            vm.processing = false;
            vm.users = data;
          });
      });
  };

});
