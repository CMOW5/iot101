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
// #include "../../States/src/AppStateMachine.h"
#include "../../States/src/State.h"
#include "../../States/src/SolicitandoServicioState/SolicitandoServicioState.h"
#include "../../States/src/DisponibleState/DisponibleState.h"
#include "../../States/src/PedidoTomadoState/PedidoTomadoState.h"

class AppStateMachine;

class App
{
  private:
    int appState;
    Pins pins;
    Events events;

    //states
    // AppStateMachine *appStateMachine;
    State *disponibleState;
    State *solicitandoServicioState;
    State *pedidoTomadoState;
    State *state; // the current state

    void processEvents(void);

  public:
    WifiHandler wifiHandler;
    MQTTHandler mqttHandler;
    App();
    void initialize(void);
    void tasks(void);

    //actions
    void solicitarServicio(void);
    // insertQuarter()
    // ejectQuarter()
    void setState(State *newState);
    State* getDisponibleState(void);
    State* getSolicitandoServicioState(void);

};

#endif
