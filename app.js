var express = require('express');
var app = express.createServer();
var mongoose = require('mongoose');
var adminController = require('./controllers/admin');
var blogController = require('./controllers/blog');
var helpers = require('./helpers');

//function autenticar(ususario, senha) {
  //return 'egenial' === ususario && 'nodejs' === senha;
//}

app.configure(function() {
  app.use(express.favicon());
  app.use(express.logger());
  //app.use(express.basicAuth(autenticar));
  app.use(express.cookieParser());
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.static(__dirname + '/public'));

  app.set('views', __dirname + '/views');
  app.register('.html', require('ejs'));
  app.set('view engine', 'html');
  app.set('view options', { layout: false });
});

app.configure('development', function() {
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
  app.set('db-uri', 'mongodb://localhost/blog_development');
});

app.configure('production', function() {
  app.use(express.errorHandler());
  app.set('db-uri', 'mongodb://localhost/blog');
});

app.db = mongoose.createConnection(app.set('db-uri'));

app.helpers(helpers.static);

adminController(app);
blogController(app);

app.listen(8000);
