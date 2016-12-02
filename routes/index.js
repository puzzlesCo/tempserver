var http 	= require("http");
var https   = require("https");
var request = require("request");
var async 	= require('async');

user        = require("../model/user.js");
user_list   = require("../memory/user_list.js");

trx_manager = require("../core/trx_manager.js")


var m_user_list   = new user_list();
var m_trx_manager = new trx_manager();

module.exports = function(app)
{
	// [Get top 10 transactions of a user order bt date]
	// ["baseurl/zoomoney/trxs/1" GET]
    app.get('/zoomoney/trxs/:id', function(req,res){
		
		// 1. Get user`s id
		var uid  = req.params.id;
    
		// 2. Get top 10 trxs
		m_trx_manager.getTopTrxById(uid, function(err, result){
			if(err) return res.status(400).json({'msg':'Not found user'});
			return res.status(200).json(result);
		});
    });

	// [Get total amount user have]
	// ["baseurl/zoomoney/total/1" GET]
    app.get('/zoomoney/total/:id', function(req,res){
		
		// 1. Get user`s id
		var uid  = req.params.id;
    
		// 2. Get total amount
		m_trx_manager.getTotalAmount(uid, function(err, result){
			if(err) return res.status(400).json({'msg':'Not found user'});
			return res.status(200).json(result);
		});
    });

	// [Save money user`s deposit]
	// ["baseurl/zoomoney/save" POST {uid, money}]
	app.post('/zoomoney/save', function(req,res){
        req.accepts('application/json');
		res.set({'content-type':'application/json; charset=utf-8'});

		// 1. Check params
        req_json = req.body;
        if(req_json.uid == null || req_json.amount == null
			|| req_json.depositType == null || req_json.content == null)
            return res.status(400).send({error: 'Wrong json value'});
		
		// 2. Add transaction to DB 
		m_trx_manager.addTransaction(req_json, function(err, result){
			if(err) return res.status(400).send({error: 'Transaction error!'});

			// 3. Return uid and saved money
			return res.status(200).json({'user':result.uid,'money':result.amount});
		});
	});

	// [Clear db data in server]
	// ["baseurl/zoomoney/clear" GET]
	app.get('/zoomoney/clear', function(req,res){
		m_trx_manager.clearDB(function(err, result){
			if(err) return res.status(400).send({error: 'There was a problem running'});
			return res.status(400).send({msg: 'Crearing is success'});
		})
	});
}