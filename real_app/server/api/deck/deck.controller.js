var model = require('./deck.model'); // Get the models
var middleware = require('./../middlewares'); // Get the middleware modules
var controller = {}; // Define an object to export
controller.index = middleware.indexFunction(model);

module.exports = controller;