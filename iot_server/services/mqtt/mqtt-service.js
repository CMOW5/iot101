var mqtt = require('mqtt');

var mqttService = {
  MQTT_SERVER: '192.168.0.13',
  MQTT_FEED_CAMBIAR_ESTADO:  "restaurante/mesa_1/estado",
  MQTT_FEED_CARGAR_DATOS:   "restaurante/mesa_1/datos",
  MQTT_ENVIAR_ESTADO:  "restaurante/mesa_1/server/estado"
};

var client = mqtt.connect('mqtt://' + mqttService.MQTT_SERVER);

mqttService.client = client;

mqttService.publish = function (channel, message) {
  console.log('publishin to channel ' + channel + ' message = ' + message);
  client.publish(channel, message);
}

module.exports = mqttService;

