var createError = require('http-errors');
var express = require('express');
var path = require('path');
const registerMiddlewares = require('./config/middlewares');

// services
const mqttConfig = require('./services/mqtt/mqtt-config');

// routes 
var indexRouter = require('./routes/index');
var mesaRouter = require('./routes/mesa');
var dbConfigRouter = require('./routes/dbconfig');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

registerMiddlewares(app);

app.use('/', indexRouter);
app.use('/api/mesas', mesaRouter);
app.use('/api/config', dbConfigRouter);
// app.use('/test', testRouter);

// mqtt config 
mqttConfig(app);

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
  res.render('error');
});

module.exports = app;
