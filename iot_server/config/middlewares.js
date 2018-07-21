// register the app middlewares here 

'use strict';

var cookieParser = require('cookie-parser');
var cors = require('cors');
var logger = require('morgan');
var express = require('express');
var path = require('path');

module.exports = (app) => {
  app.use(cors());
  app.use(logger('dev'));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(express.static(path.join(__dirname, '../public')));
  app.use(express.static(path.join(__dirname, '../build')));
}