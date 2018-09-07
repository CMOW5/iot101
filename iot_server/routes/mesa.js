const express = require('express');
const router = express.Router();

/* services */
const serialPortService = require('../services/serial/serial_port');
const mqttService = require('../services/mqtt/mqtt-service');

/* repositories */
const Mesa = require('../models/mesa');
const DbConfig = require('../models/dbconfig');

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
router.delete('/:id', async function(req, res, next) {
  const mesaId = req.params.id;
  const mesa =  await Mesa.findById(mesaId);

  if (mesa) {
    await mesa.destroy();
    res.json({data: 'mesa borrada'});
  } else {
    res.status(404).json({errors: 'la mesa no existe'});
  }
});

/* register a new mesa */
router.get('/validateconnection', async function(req, res, next) {
  serialPortService.verifyConnection().then(function(response) {
    res.json({message: response});
  }).catch(function(error) {
    res.status(404).json({errors: 'connection failed'});
  });
});

/* register a new mesa */
router.post('/', async function(req, res, next) {
  try {
    // get the wifi network, wifi password, 
    // mqtt server, user and port
    const dbconfig = await DbConfig.get();

    if (!dbconfig) {
      res.status(422).json({message: "no config found"});
    }

    const mesaNumber = req.body.mesa;

    const mesaData = {
      mesa: mesaNumber,
      ...dbconfig.toJSON(),
    }

    delete mesaData.id;

    const serialResponse = await serialPortService.writeRegistrationData(mesaData);
    
    let mesa = await Mesa.findById(mesaNumber);

    if (!mesa) {
      mesa = await Mesa.create({id: mesaData.mesa, state: Mesa.states.disponible});
    }

    // TODO: VALIDATE THIS SUBSCRIPTION
    mqttService.subscribeToMesa(mesa.id);
    res.json({data: mesa, serialResponse: serialResponse});  

  } catch (error) {
    console.log('registration error = ', error);
    res.json({error: error});
  }
});

module.exports = router;
