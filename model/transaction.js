var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

// [Info about a transaction]
var transactionSchema = new Schema({
	uid 	    : String,   // user id
	date        : String,   // transaction date
	amount  	: Number,   // amount of money
	depositType	: Number,   // withdraw(1) or deposit(0)
	content     : String    // details of usage about transaction
});

module.exports = mongoose.model('transactions', transactionSchema);