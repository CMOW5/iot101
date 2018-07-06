
#include "Wifi_Handler.h"


WifiHandler::WifiHandler() {
  // ...

  mqtt = new Adafruit_MQTT_Client(&client, MQTT_SERVER, MQTT_SERVERPORT, MQTT_USERNAME, MQTT_USERNAME, MQTT_KEY);
  temperatureFeed = new Adafruit_MQTT_Publish(mqtt, MQTT_FEED_TEMP);
  humidityFeed = new Adafruit_MQTT_Publish(mqtt, MQTT_FEED_HUMI);
}

void WifiHandler::connectWifi()
{
	const char* SSID = "192.168.0.13";
	const char* SSPASSWORD = "91121608540";
	WiFi.begin(SSID, SSPASSWORD);
  while (WiFi.status() != WL_CONNECTED) {
     delay(500);
     Serial.print(".");
		 Serial.print(WiFi.status());
  }
  Serial.println("WiFi connected");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());
}

void WifiHandler::connectMQTT()
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
