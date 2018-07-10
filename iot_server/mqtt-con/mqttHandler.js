var mqtt = require('mqtt');

var mqttHandler = {
  MQTT_SERVER: '192.168.0.13',
  MQTT_TOPIC_TEMPERATURE: 'ies/aula20/temperature',
  MQTT_TOPIC_HUMIDITY: 'ies/aula20/humidity',
  MQTT_FEEDS_ONOFF: '/feeds/onoff'
};

var client = mqtt.connect('mqtt://' + mqttHandler.MQTT_SERVER);

mqttHandler.client = client;

mqttHandler.publish = function () {
  console.log('publishin to feeds');
  client.publish('/feeds/onoff', 'hola from server');
}


module.exports = mqttHandler;



/*
export default class MqttHandler {
  constructor() {
    this.MQTT_SERVER = '192.168.0.13',
    this.MQTT_TOPIC_TEMPERATURE = 'ies/aula20/temperature',
    this.MQTT_TOPIC_HUMIDITY = 'ies/aula20/humidity'
    this.client = mqtt.connect('mqtt://' + this.MQTT_SERVER);

    // callbacks
    this.client.on('connect', () => {
        this.client.subscribe(this.MQTT_TOPIC_TEMPERATURE);
        this.client.subscribe(this.MQTT_TOPIC_HUMIDITY);
    });  
    
  }

  publish(topic, message) {
    this.client.publish(topic, message);
  }
}
*/

