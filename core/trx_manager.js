var trx_db   = require('../model/transaction.js');
var user_db  = require('../model/user.js');
var async 	 = require('async');
var method   = trx_manager.prototype;

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
    var trx         = new trx_db();
    trx.uid         = data.uid;
	trx.amount      = data.amount;
	trx.content     = data.content;
    trx.depositType = 0; 
    trx.date        = new Date().toISOString().
                                 replace(/T/, ' ').   // replace T with a space
                                 replace(/\..+/, ''); // delete the dot and everything after
                            
    async.waterfall([
        // 2-1. If a user is not exist, enrol to db as new user
        function (cb) {
            // 2-1-1. Check exist user
            user_db.findOne({ 'uid': trx.uid }, function (err, user) {
                if (user == null) {
                    // 2-1-2. Init user info
                    var newUser     = new user_db();
                    newUser.uid     = trx.uid
                    newUser.amount  = 0;
                    newUser.date    = trx.date;

                    // 2-1-3. Enrol to db
                    //trx.save(cb);
                    newUser.save(function(err){
                        if (err) return callback(err, null);
                        return cb();
                    })
                }
                return cb();
            });
        },
    ],
        // 2-2. Update user`s amount
        function () {
            trx.save(function (err) {
                if (err) return callback(err, null);

                user_db.update({ 'uid': trx.uid },{$inc:{ 'amount': trx.amount }}, {safe:true}, function(err,doc){
                    if (err) return callback(err, null);

                    return callback(null, trx);
                }); 
            });
        }
    );
}

method.removeTrxsById = function(uid){
    return callback(err, null);
}
// [Clear all details of usage of user]
method.clear = function(){
    return callback(err, null);
}

module.exports = trx_manager;