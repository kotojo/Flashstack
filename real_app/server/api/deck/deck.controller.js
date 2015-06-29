var model = require('./deck.model'); // Get the models
var middlewares = require('./../middlewares'); // Get the middleware modules
var controller = {}; // Define an object to export
// Middleware functions, controller can either grab the predefined on the modules or write its own.
controller.index = middlewares.indexFunction(model);
controller.create = middlewares.createFunction(model);
controller.show = middlewares.showFunction(model);
controller.destroy = middlewares.destroyFunction(model);
//
module.exports = controller;