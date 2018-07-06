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
}

void MQTTHandler::connectMQTT()
{
  if (mqtt->connected())
   return;
 	Serial.print("Connecting to MQTT... ");
	while (mqtt->connect() != 0) {
		Serial.println("Error. Retrying MQTT connection in 5 seconds...");
	  mqtt->disconnect();
	  delay(5000);
	 }
	 Serial.print("MQTT connected ");
}
