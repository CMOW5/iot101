var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mqttApi = require('./mqtt-con/mqttApi');
var mqttClient = mqttApi.client;
var socketApi = require('./socket/socketApi');
var io = socketApi.io;

/* routes */
var indexRouter = require('./routes/index');
var testRouter = require('./routes/test');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'build')));

/* routes */
app.use('/', indexRouter);
app.use('/test', testRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

/* mqtt init */
mqttClient.on('message', function (topic, message) {
  console.log(topic);
  console.log(message.toString());
 
  if (topic === mqttApi.MQTT_TOPIC_TEMPERATURE) {
    io.emit('temperature', { value: message.toString() });
  }

  if (topic === mqttApi.MQTT_TOPIC_HUMIDITY) {
    // io.sockets.emit('humidity', { raw: message.toString() });
  }
  // console.log('send temp', message.toString());
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
