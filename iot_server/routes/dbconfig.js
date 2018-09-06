const express = require('express');
const router = express.Router();

/* repositories */
const DbConfig = require('../models/dbconfig');

/* get the config */
router.get('/', async function(req, res, next) {
  try {
    const configData = await DbConfig.get();
    res.json({data: configData});
  } catch (error) {
    console.log('config error = ', error);
    res.json({error: error});
  }
});

/* update the config */
router.put('/', async function(req, res, next) {
  try {
    const configData = req.body;
    const response = await DbConfig.update(configData);
    res.json({data: response});
  } catch (error) {
    console.log('config error = ', error);
    res.json({error: error});
  }
});

module.exports = router;
