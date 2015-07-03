
var mongoose = require('mongoose'); // Get mongoose ORM
var cardSchema = new mongoose.Schema({
	name: String,
	description: String,
	deckId: String
});
var Card = mongoose.model('Card', cardSchema);
module.exports = Card; // Create and export Card model as an object


