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

#include "../../Events/src/Observer.h"

// states
// #include "../../States/src/AppStateMachine.h"
#include "../../States/src/State.h"
#include "../../States/src/SolicitandoServicioState/SolicitandoServicioState.h"
#include "../../States/src/DisponibleState/DisponibleState.h"
#include "../../States/src/PedidoTomadoState/PedidoTomadoState.h"

class AppStateMachine;
class IOEvents;
class MQTTEvents;

class App: public Observer
{
  private:
    Pins pins;
    MQTTEvents* _mqttSubject;
    IOEvents* _ioSubject;

    //states
    // AppStateMachine *appStateMachine;
    State *disponibleState;
    State *solicitandoServicioState;
    State *pedidoTomadoState;
    State *state; // the current state

    void processEvents(void);

  public:
    App(MQTTHandler*, WifiHandler*, MQTTEvents*, IOEvents*);
    virtual ~App();
    virtual void update(Subject*); // overrides Observer operation
    WifiHandler *wifiHandler;
    MQTTHandler *mqttHandler;
    // App();
    void initialize(void);
    void tasks(void);

    //actions
    void solicitarServicio(void);
    void confirmado(void);
    // insertQuarter()
    // ejectQuarter()
    /**
      set the next state in a app state machine
      @param newState the next state
    */
    void setState(State *newState);
    /**
      get the disponibleState instance
      @return the disponibleState instance
    */
    State* getDisponibleState(void);
    State* getSolicitandoServicioState(void);

};

#endif
