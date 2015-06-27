var mongoose = require('mongoose'); // Get mongoose ORM
var deckSchema = new mongoose.Schema({
	name: String,
});
var Deck = mongoose.model('Deck', deckSchema);
module.exports = Deck; // Create and export Card model


