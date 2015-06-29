
var mongoose = require('mongoose'); // Get mongoose ORM module
var bcrypt = require('bcrypt-nodejs');
var userSchema = new mongoose.Schema({
 name: String,
 age: Number,
 username: {type: String, required: true, index: {unique: true}},
 password: {type: String, required: true, select: true}
});
userSchema.pre('save', function(next){
	var user = this; 
	if (!user.isModified('password')) return next();
	bcrypt.hash(user.password, null, null, function(err, hash){
		if (err) return next(err);
		user.password = hash;
		next();
	});
});
userSchema.methods.comparePassword = function(password){
	var user = this;
	return bcrypt.compareSync(password, user.password);
}
var User = mongoose.model('User', userSchema); 
module.exports = User; // Create and exports User model as an object	