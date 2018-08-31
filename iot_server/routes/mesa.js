const express = require('express');
const router = express.Router();

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

/* GET home page. */
router.post('/register', function(req, res, next) {
  res.json({ request: req.body });
});

module.exports = router;
