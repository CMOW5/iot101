#ifndef _WIFI_HANDLER_H_
#define _WIFI_HANDLER_H_

#include <ESP8266WiFi.h>
#include "Adafruit_MQTT.h"
#include "Adafruit_MQTT_Client.h"

// #define SSID      "192.168.0.13"
// #define SSPASSWORD  "91121608540"

#define MQTT_SERVER      "192.168.0.13"
#define MQTT_SERVERPORT  1883
#define MQTT_USERNAME    ""
#define MQTT_KEY         ""
#define MQTT_FEED_TEMP   "ies/aula20/temperature"
#define MQTT_FEED_HUMI   "ies/aula20/humidity"

class WifiHandler
{
  WiFiClient client;
  Adafruit_MQTT_Client* mqtt;
  Adafruit_MQTT_Publish* temperatureFeed;
  Adafruit_MQTT_Publish* humidityFeed;

  /*
  Adafruit_MQTT_Client mqtt(&client, MQTT_SERVER, MQTT_SERVERPORT, MQTT_USERNAME, MQTT_USERNAME, MQTT_KEY);
  Adafruit_MQTT_Publish temperatureFeed = Adafruit_MQTT_Publish(&mqtt, MQTT_FEED_TEMP);
  Adafruit_MQTT_Publish humidityFeed = Adafruit_MQTT_Publish(&mqtt, MQTT_FEED_HUMI);
  */

  public:
    WifiHandler();  // This is the constructor
    void connectWifi(void);
    void connectMQTT(void);
};

#endif
