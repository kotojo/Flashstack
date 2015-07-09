var model = require('./card.model'); // Get the models
var middlewares = require('./../middlewares'); // Middleware modules to get the function
var controller = {}; // Define an object to export

controller.index = middlewares.indexFunction(model);
controller.create = middlewares.createFunction(model);
controller.show = middlewares.showFunction(model);
controller.destroy = middlewares.destroyFunction(model);
module.exports = controller;