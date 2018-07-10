// The MIT License (MIT)
//
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.

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
