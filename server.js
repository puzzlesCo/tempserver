var express     = require('express');
var app         = express();
var bodyParser  = require('body-parser');

// [CONFIGURE APP TO USE bodyParser]
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser()); 
app.set('etag', false);

// [CONFIGURE SERVER PORT]
var port = process.env.PORT || 8888;
 
// [CONFIGURE ROUTER] 
var router = require('./routes')(app);

// [RUN SERVER]
var server = app.listen(port, function(){
    console.log("Express server has started on port " + port)
});