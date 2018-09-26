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
#include "../../States/src/BootState/BootState.h"
#include "../../States/src/SolicitandoServicioState/SolicitandoServicioState.h"
#include "../../States/src/DisponibleState/DisponibleState.h"
#include "../../States/src/PedidoTomadoState/PedidoTomadoState.h"
#include "../../States/src/AtendidoState/AtendidoState.h"
#include "../../States/src/AlarmaState/AlarmaState.h"

class IOEvents;
class MQTTEvents;

class App: public Observer
{
  private:
    Pins* pins;
    MQTTEvents* _mqttSubject;
    IOEvents* _ioSubject;

    //states
    State *state; // the current state
    State *bootState;
    State *disponibleState;
    State *solicitandoServicioState;
    State *pedidoTomadoState;
    State *atendidoState;
    State *alarmaState;

    void processEvents(void);

  public:
    App(Pins*, MQTTHandler*, WifiHandler*, MQTTEvents*, IOEvents*);
    virtual ~App();

    WifiHandler *wifiHandler;
    MQTTHandler *mqttHandler;

    /**
      init the app states and handlers
    */
    void initialize(void);

    /**
      this method process the app tasks
    */
    void tasks(void);

    /**
      this method is called when an mqtt or io event is triggered
      @param Subject* the subject that triggered the event
    */
    virtual void update(Subject*); // overrides Observer operation

    // actions ex => insertQuarter(), ejectQuarter() something that
    // triggers a state change in the app

    /**
      this method triggers a solicitar servicio state change
    */
    void solicitarServicio(void);

    /**
      this method triggers a alarma state change
    */
    void prenderAlarma(void);

    /**
      this method triggers a cargar datos state change
    */
    void cargarDatos(void);

    /**
      set the next state in a app state machine
      @param newState the next state
    */
    void setState(State *newState);

    /**
      set the next state in a app state machine (by name)
      @param newStateName the next state name
    */
    void setState(char* newStateName);

    /**
      get the disponibleState instance
      @return the disponibleState instance
    */
    State* getDisponibleState(void);

    /**
      get the solicitandoServicioState instance
      @return the solicitandoServicio instance
    */
    State* getSolicitandoServicioState(void);

    /**
      get the alarmaState instance
      @return the alarmaState instance
    */
    State* getAlarmaState(void);

};

#endif
