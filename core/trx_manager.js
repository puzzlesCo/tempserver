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
            // 2-2-1. Add transaction to DB
            trx.save(function (err) {
                if (err) return callback(err, null);
                // 2-2-2. Update user`s total amount
                user_db.update({ 'uid': trx.uid },{$inc:{ 'amount': trx.amount }}, {safe:true}, function(err,doc){
                    if (err) return callback(err, null);
                    return callback(null, trx);
                }); 
            });
        }
    );
}

// [Get top 10 transactions by user`s id]
method.getTopTrxById = function(uid, callback){

    // 1. find top 10 trxs in db by uid order by desc
    trx_db.find({ 'uid': uid }).sort({ 'date': -1 }).limit(10).exec(function (err, doc) {
        if(err) return callback(err, null);

        callback(null, doc);
    });
}

// [Get total amount of a user]
method.getTotalAmount = function(uid, callback){
    user_db.findOne({'uid': uid}, function(err, doc){
        if(err)  return callback(err, null);
        if(!doc) return callback("Not found user", null);

        return callback(null, {'amount': doc.amount});
    });
    
}

method.removeTrxsById = function(uid){
    return callback(err, null);
}

// [Clear all transaction and user info]
method.clearDB = function(callback){
     async.waterfall([
        function (cb) {
            // 1. Drop users collection
            user_db.remove({}, function(err, removed){
                if(err) return callback(err, null);
            });
            return cb();
        },
     ],
        function(){
            // 2. Drop transactions collection
            trx_db.remove({}, function(err, removed){
                if(err) return callback(err, null);
            });
            return callback(null, "success");
        }
     );
}


module.exports = trx_manager;