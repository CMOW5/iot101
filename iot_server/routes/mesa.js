var express = require('express');
var router = express.Router();
var path = require('path');

/* repositories */
var Mesa = require('../models/mesa');

/* GET home page. */
router.get('/', function(req, res, next) { 
  // res.json({ user: 'tobi' });
  const mesaId = 1; // find the mesa id here
  Mesa.findById(mesaId).then((mesa) => {
    res.json({data: mesa});
  });
});

module.exports = router;
