#ifndef _APP_H_
#define _APP_H_

// #include "system_definitions.h"
// #include "system_interrupt.h"
#include <Arduino.h>
#include "../../System/src/system_config.h"
#include "Wifi_Handler.h"
#include "MQTT_Handler.h"
#include "Events.h"
#include "Pins.h"

class App
{
  private:
    int appState;
    Pins pins;
    WifiHandler wifiHandler;
    MQTTHandler mqttHandler;
    Events events;

    void processEvents(void);

  public:
    App();
    void initialize(void);
    void tasks(void);

};

#endif
