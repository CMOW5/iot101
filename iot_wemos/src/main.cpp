#include <Arduino.h>
#include <ESP8266WiFi.h>
#include "Adafruit_MQTT.h"
#include "Adafruit_MQTT_Client.h"
#include "config.h"

#define MQTT_SERVER      "192.168.0.13"
#define MQTT_SERVERPORT  1883
#define MQTT_USERNAME    ""
#define MQTT_KEY         ""
#define MQTT_FEED_TEMP   "ies/aula20/temperature"
#define MQTT_FEED_HUMI   "ies/aula20/humidity"

float counter = 0;

WiFiClient client;

Adafruit_MQTT_Client mqtt(&client, MQTT_SERVER, MQTT_SERVERPORT, MQTT_USERNAME, MQTT_USERNAME, MQTT_KEY);

Adafruit_MQTT_Publish temperatureFeed = Adafruit_MQTT_Publish(&mqtt, MQTT_FEED_TEMP);

Adafruit_MQTT_Publish humidityFeed = Adafruit_MQTT_Publish(&mqtt, MQTT_FEED_HUMI);

void connectWiFi();
void connectMQTT();

void setup() {
  Serial.begin(115200);
  connectWiFi();
  connectMQTT();
}

void loop() {
  delay(2000);
  temperatureFeed.publish(++counter);
  Serial.println(counter);
  // digitalWrite(LED_BUILTIN, ledStatus);
}

void connectWiFi() {
  WiFi.begin(SSID, SSPASSWORD);
  while (WiFi.status() != WL_CONNECTED) {
     delay(500);
     Serial.print(".");
  }

  Serial.println("WiFi connected");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());
}

void connectMQTT() {
  if (mqtt.connected())
    return;

  Serial.print("Connecting to MQTT... ");
  while (mqtt.connect() != 0) {
       Serial.println("Error. Retrying MQTT connection in 5 seconds...");
       mqtt.disconnect();
       delay(5000);
  }
  Serial.print("MQTT connected ");
}
