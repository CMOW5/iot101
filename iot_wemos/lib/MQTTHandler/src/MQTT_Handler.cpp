#include "MQTT_Handler.h"
#include "Client.h"

MQTTHandler::MQTTHandler(WifiHandler wifihandler) {
  systemConfig = SystemConfig::instance();

  mqtt = new Adafruit_MQTT_Client(
    &(wifihandler.client),
    systemConfig->MQTT_SERVER,
    systemConfig->MQTT_SERVERPORT,
    systemConfig->MQTT_USERNAME,
    systemConfig->MQTT_USERNAME,
    systemConfig->MQTT_KEY);

  temperatureFeed = new Adafruit_MQTT_Publish(mqtt, MQTT_FEED_TEMP);
  humidityFeed = new Adafruit_MQTT_Publish(mqtt, MQTT_FEED_HUMI);

  // Setup a feed called 'onoff' for subscribing to changes.
  onoffbutton = new Adafruit_MQTT_Subscribe(mqtt, MQTT_FEED_ONOFF, MQTT_QOS_1);
}

void MQTTHandler::initialize(void) {
  /* set the subscriptions callbacks */
  onoffbutton->setCallback(Events::eventConfirmado);

  // Setup MQTT subscription for time feed
  mqtt->subscribe(onoffbutton);
}

void MQTTHandler::connectMQTT() {
  if (mqtt->connected())
   return;
 	Serial.print("Connecting to MQTT... ");
	while (mqtt->connect() != 0) {
		Serial.println("Error. Retrying MQTT connection in 5 seconds...");
	  mqtt->disconnect();
	  delay(5000);
	 }
	 Serial.print("MQTT connected ");

   // ping the server to keep the mqtt connection alive
   // NOT required if you are publishing once every KEEPALIVE seconds
   if(!mqtt->ping()) {
     mqtt->disconnect();
     Serial.print("MQTT disconnected ");
   }
}

void MQTTHandler::processSubscriptions()
{
  // this is our 'wait for incoming subscription packets and callback em' busy subloop
  // this will block all other code execution
  mqtt->processPackets(1000);
}
