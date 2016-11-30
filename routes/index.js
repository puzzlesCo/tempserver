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
	// [Get money user have]
	// ["baseurl/zoomoney/1" GET]
    app.get('/zoomoney/:id', function(req,res){
		
		// 1. Get user`s id
		var uid  = req.params.id;//req.body.uid;
    
		// 2. Check exist user
		if((login_user = m_user_list.findById(uid)) == null)
            return res.status(400).json({'msg':'Not found user'});

        return res.status(200).json({'user':login_user.getId(),'money':login_user.getMoney()});
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

}