var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var cors = require('cors');
var logger = require('morgan');

/* mqtt config */
const mqttConfig = require('./mqtt-con/mqtt-config');

/* database config */
var dbconnection = require('./database/connection');
var Mesa = require('./models/mesa');


/* routes */
var indexRouter = require('./routes/index');
var mesaRouter = require('./routes/mesa');
var testRouter = require('./routes/test');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'build')));

/* routes */
app.use('/', indexRouter);
app.use('/mesa', mesaRouter);
app.use('/test', testRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

Mesa.findById(1).then(mesa => {
  console.log('mesa = ', mesa.estado);
});

// Mesa.testfunct();

/* db config */
/* dbconnection
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
        // search for known ids
    Mesa.findById(1).then(mesa => {
      console.log('mesa = ', mesa.estado);
    });
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
 */
/* mqtt config */
mqttConfig(app);

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
