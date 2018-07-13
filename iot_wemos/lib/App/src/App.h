#ifndef _APP_H_
#define _APP_H_

#include <Arduino.h>
#include "../../System/src/system_config.h"

// RF connection
#include "../../WifiHandler/src/Wifi_Handler.h"
#include "../../MQTTHandler/src/MQTT_Handler.h"

#include "../../Pins/src/Pins.h"
#include "../../Events/src/Observer.h"

// states
#include "../../States/src/State.h"
#include "../../States/src/SolicitandoServicioState/SolicitandoServicioState.h"
#include "../../States/src/DisponibleState/DisponibleState.h"
#include "../../States/src/PedidoTomadoState/PedidoTomadoState.h"

class IOEvents;
class MQTTEvents;

class App: public Observer
{
  private:
    Pins* pins;
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
    App(Pins*, MQTTHandler*, WifiHandler*, MQTTEvents*, IOEvents*);
    virtual ~App();

    WifiHandler *wifiHandler;
    MQTTHandler *mqttHandler;

    // methods
    virtual void update(Subject*); // overrides Observer operation
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

    void setState(char* newStateName);

    /**
      get the disponibleState instance
      @return the disponibleState instance
    */
    State* getDisponibleState(void);

    /**
      get the solicitandoServicio instance
      @return the solicitandoServicio instance
    */
    State* getSolicitandoServicioState(void);

};

#endif
