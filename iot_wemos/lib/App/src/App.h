#ifndef _APP_H_
#define _APP_H_

// #include "system_definitions.h"
// #include "system_interrupt.h"
#include <Arduino.h>
#include "../../System/src/system_config.h"
#include "../../WifiHandler/src/Wifi_Handler.h"
#include "../../MQTTHandler/src/MQTT_Handler.h"
#include "../../Events/src/Events.h"
#include "../../Pins/src/Pins.h"

// states
#include "../../States/src/AppStateMachine.h"

class App
{
  private:
    int appState;
    Pins pins;
    WifiHandler wifiHandler;
    MQTTHandler mqttHandler;
    Events events;
    //states
    AppStateMachine appStateMachine;

    void processEvents(void);

  public:
    App();
    void initialize(void);
    void tasks(void);

};

#endif
