var bodyParser = require('body-parser'),
    ejs = require('ejs'),
    express = require('express'),
    http = require('http'),
    mongoose = require('mongoose'),
    path = require('path'),
    app;

app = express();

mongoose.connect('mongodb://localhost/anxiety-inventory');

app.set('port', process.env.PORT || 8888);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

//app.use(express.favicon());
//app.use(express.logger('dev'));
//app.use(express.methodOverride());
app.use(express.static(path.join(__dirname, '../app')));

require('./routes/url')(app, bodyParser);
require('./routes/json')(app, bodyParser);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

module.exports = app;
