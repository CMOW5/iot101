#ifndef _MQTT_HANDLER_H_
#define _MQTT_HANDLER_H_

#include "Adafruit_MQTT.h"
#include "Adafruit_MQTT_Client.h"
#include "../../WifiHandler/src/Wifi_Handler.h"
#include "../../Events/src/MQTTEvents.h"
#include "Utils.h"

// publishers
// TODO: make cargar datos an http request, or unsubscribe
#define MQTT_BASE_TOPIC  "restaurante/mesa_"

class MQTTEvents;

class MQTTHandler
{
  public:
    MQTTHandler(WifiHandler wifihandler);

    Adafruit_MQTT_Client* mqtt;

    // publishers
    Adafruit_MQTT_Publish* estadoFeed;
    Adafruit_MQTT_Publish* cargarDatosFeed;

    // subscribers
    Adafruit_MQTT_Subscribe* estadoSub;

    static MQTTEvents mqttEvents;

    // methods
    void initialize(void);
    void connect(void);
    void processSubscriptions(void);

    // mqtt topics channels
    String feedCargarDatosTopic(void);
    String feedStateChangeTopic(void);
    String subStateChangeTopic(void);

    void cargarDatos(void);
    void solicitarServicio(void);
    void prenderAlarma(void);

    static MQTTEvents* getEvents();
    static void mqttEvent(char *data, uint16_t len);

  private:
    String baseTopic(void);
    SystemConfig* systemConfig;
};

#endif
