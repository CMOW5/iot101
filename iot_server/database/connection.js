const Sequelize = require('sequelize');

const dbconnection = new Sequelize('allix_iot_restaurante', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  port: 3306,
  operatorsAliases: false,

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
});

dbconnection.DataTypes = Sequelize;

module.exports = dbconnection;

/*
dbconnection
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');

    
    Mesa.findById(1).then(mesa => {
      console.log(mesa.updatedAt);
      let end = mesa.updatedAt;
      let now = moment();
      let duration = moment.duration(now.diff(end));
      let hours = duration.asHours();
      console.log('mesa time = ', end);
      console.log('now =', now);
      console.log('hours =', hours);  
      
      MesaHistorial
      .findById(1)
      .then((mh) => {
        mh.timeDiff = hours;
        mh.save();
      }); 

    });
   

    
    Mesa.create({state: 'disponible'})
    .then((mesa) => {
      MesaHistorial
        .create({mesaId: mesa.id, from: 'alarma', to: 'no_disponible'});

      MesaHistorial
        .create({mesaId: mesa.id, from: 'alarma', to: 'pedido_tomado'});
    }) 
    
    




  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

  */