var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

// [Info about a transaction]
var UserSchema = new Schema({
	uid 	    : String,   // user id
	date        : String,   // join date
	amount  	: Number,   // total amount of money
});

module.exports = mongoose.model('users', UserSchema);