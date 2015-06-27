
var mongoose = require('mongoose'); // Get mongoose ORM module
var userSchema = new mongoose.Schema({
 name: String,
 age: Number,
 username: String
}); 
var User = mongoose.model('User', userSchema); 
module.exports = User; // Create and exports User model as an object