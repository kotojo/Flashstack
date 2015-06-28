
// Get the router 
var express = require('express');
var router = express.Router();
//
var User = require('./user.model'); // Get the model
var UserController = require('./user.controller')// Get the controller
// Middleware for requests for user
router.route('/').get(UserController.index);
module.exports = router;