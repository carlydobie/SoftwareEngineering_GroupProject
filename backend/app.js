var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var inventoryRouter = require('./routes/inventory');
var legacyRouter = require('./routes/legacy');
var indexRouter = require('./routes/');
var customerRouter = require('./routes/customer');
var orderRouter = require('./routes/orders');

//app
var app = express();

//using statements
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//set up router
app.use('/', indexRouter);
app.use('/legacy', legacyRouter);
app.use('/inventory', inventoryRouter);
app.use('/orders', orderRouter);
app.use('/customer', customerRouter);

//function for cross-origin cors stuff
app.use(function(req, res, next){
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8888');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);

  next();
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({ 'error': err.message });
});

module.exports = app;
