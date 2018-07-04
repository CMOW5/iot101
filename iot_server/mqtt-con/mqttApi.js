var mqtt = require('mqtt');

var mqttApi = {
  MQTT_SERVER: '192.168.0.13',
  // MQTT_SERVER = 'test.mosquitto.org',
  MQTT_TOPIC_TEMPERATURE: 'ies/aula20/temperature',
  MQTT_TOPIC_HUMIDITY: 'ies/aula20/humidity'
};

var client = mqtt.connect('mqtt://' + mqttApi.MQTT_SERVER);

client.on('connect', function () {
  client.subscribe(mqttApi.MQTT_TOPIC_TEMPERATURE);
  client.subscribe(mqttApi.MQTT_TOPIC_HUMIDITY);
});  

mqttApi.client = client;

module.exports = mqttApi;