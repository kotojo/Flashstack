
var model = require('./user.model');// Get the models
var middleware = require('./../middlewares');
var controller = {}; // Define an object to export
// Defines the middleware functions for the controller
controller.index = middleware.indexFunction(model);
module.exports = controller;