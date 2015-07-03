var model = require('./deck.model'); // Get the models
var card = require('../card/card.model');
var middlewares = require('./../middlewares'); // Get the middleware modules
var controller = {}; // Define an object to export
// Middleware functions, controller can either grab the predefined on the modules or write its own.
controller.index = middlewares.indexFunction(model);
controller.create = middlewares.createFunction(model);
controller.destroy = middlewares.destroyFunction(model);
controller.show = middlewares.showFunction(model);
controller.update = function(req, res, next) {
    console.log('did we made it here?');
    model.findById(req.params.id, function(err, deck) {

      if (err) res.send(err);

      if(req.body.name) deck.name = req.body.name;
      if(req.body.description) deck.description = req.body.description;
      if(req.body.cards) deck.cards = req.body.cards;
      if(req.body.userId) deck.userId = req.body.userId;
      if(req.body.pic) deck.pic = req.body.pic;

      deck.save(function(err) {
        if (err) res.send(err);

        res.json({ message: 'Deck updated!' });
      });
    });
  };
//
module.exports = controller;
