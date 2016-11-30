var transaction = require('../model/transaction');
var method       = trx_manager.prototype;

// [Constructor]
function trx_manager() {
}

// [Find a user using this id]
method.getTotalAmountById = function(uid) {
    return callback(err, null);
};

// [Remove a user from memory]
method.addTransaction = function(data, callback){

    // 1. init trx data
    var trx         = new transaction();
    trx.uid         = data.uid;
	trx.amount      = data.amount;
	trx.depositType = data.depositType;
	trx.content     = data.content;
    trx.date        = new Date().toISOString().
                                 replace(/T/, ' ').   // replace T with a space
                                 replace(/\..+/, ''); // delete the dot and everything after
                            
    // 2. Check exist user
    
    
    trx.save(function(err){
		if(err) return callback(err, null);

		
        
        return callback(null, trx);
	});
}

method.removeTrxsById = function(uid){
    return callback(err, null);
}
// [Clear all details of usage of user]
method.clear = function(){
    return callback(err, null);
}

module.exports = trx_manager;