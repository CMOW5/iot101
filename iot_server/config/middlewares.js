// register the app middlewares here
'use strict';

const cookieParser = require('cookie-parser');
const cors = require('cors');
const logger = require('morgan');
const express = require('express');
const path = require('path');

module.exports = (app) => {
  app.use(cors());
  app.use(logger('dev'));
  app.use(express.json());
  app.use(express.urlencoded({extended: false}));
  app.use(cookieParser());
  app.use(express.static(path.join(__dirname, '../public')));
};
