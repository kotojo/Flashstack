var model = require('./card.model'); // Get the models
var middleware = require('./../middlewares'); // Middleware modules to get the function
var controller = {}; // Define an object to export

controller.index = middleware.indexFunction(model);
module.exports = controller;