#ifndef _MQTT_HANDLER_H_
#define _MQTT_HANDLER_H_

#include "Adafruit_MQTT.h"
#include "Adafruit_MQTT_Client.h"
#include "../../WifiHandler/src/Wifi_Handler.h"
#include "../../Events/src/Events.h"
#include "../../Events/src/MQTTEvents.h"

#define MQTT_FEED_TEMP   "ies/aula20/temperature"
#define MQTT_FEED_HUMI   "ies/aula20/humidity"
#define MQTT_FEED_ONOFF  "/feeds/onoff"

class MQTTEvents;

class MQTTHandler
{
  /*
  Adafruit_MQTT_Client mqtt(&client, MQTT_SERVER, MQTT_SERVERPORT, MQTT_USERNAME, MQTT_USERNAME, MQTT_KEY);
  Adafruit_MQTT_Publish temperatureFeed = Adafruit_MQTT_Publish(&mqtt, MQTT_FEED_TEMP);
  Adafruit_MQTT_Publish humidityFeed = Adafruit_MQTT_Publish(&mqtt, MQTT_FEED_HUMI);
  */

  public:
    Adafruit_MQTT_Client* mqtt;
    // publishers
    Adafruit_MQTT_Publish* temperatureFeed;
    Adafruit_MQTT_Publish* humidityFeed;
    // subscribers
    Adafruit_MQTT_Subscribe* onoffbutton;
    static MQTTEvents mqttEvents;

    // methods
    MQTTHandler(WifiHandler wifihandler);
    void initialize(void);
    void connectMQTT(void);
    void processSubscriptions(void);

    static MQTTEvents* getEvents();
    static void mqttEvent(char *data, uint16_t len);

  private:
    SystemConfig* systemConfig;
};

#endif
