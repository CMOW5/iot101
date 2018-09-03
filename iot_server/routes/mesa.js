const express = require('express');
const router = express.Router();
const serialPortService = require('../services/serial/serial_port');

/* repositories */
const Mesa = require('../models/mesa');

/* GET home page. */
router.get('/', function(req, res, next) {
  // res.json({ user: 'tobi' });
  Mesa.findAll().then((mesas) => {
    res.json({data: mesas});
  });

  /*
  const mesaId = 1; // find the mesa id here
  Mesa.findById(mesaId).then((mesa) => {
    res.json({data: mesa});
  });
  */
});

/* register a new mesa */
router.post('/register', function(req, res, next) {
  const mesaData = req.body;
  serialPortService.writeRegistrationData(mesaData).then(function (data) {
    console.log('done');
    res.json({message: data});
  }).catch(function(err) {
    console.log('error = ', err);
    res.json({error: err});
  });
});

module.exports = router;
