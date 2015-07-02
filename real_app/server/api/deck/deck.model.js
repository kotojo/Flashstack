var mongoose = require('mongoose'); // Get mongoose ORM
var deckSchema = new mongoose.Schema({
	name: String,
  description: String,
  cards: Array,
  userId: String,
  pic: String
});
var Deck = mongoose.model('Deck', deckSchema);
module.exports = Deck; // Create and export Deck model as an object


