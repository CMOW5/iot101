#include "App.h"

App::App() : mqttHandler(wifiHandler) {
  disponibleState = new DisponibleState(this);
  solicitandoServicioState = new SolicitandoServicioState(this);
  pedidoTomadoState = new PedidoTomadoState(this);
  state = disponibleState;
}

// Initialize the aplication modules
void App::initialize()
{
  appState = 1;
  // initialize something
  // SYS_Initialize(); //initialize the system
  Serial.begin(9600);

  // pin init
  pins.D5.mode(INPUT_PULLUP);
  pins.D6.mode(INPUT_PULLUP);
  pins.D4.mode(OUTPUT);
  digitalWrite(pins.D4.value(), LOW);

  // Events
  attachInterrupt(digitalPinToInterrupt(pins.D5.value()), Events::eventButton1, FALLING);
  attachInterrupt(digitalPinToInterrupt(pins.D6.value()), Events::eventButton2, FALLING);

  delay(3000);
  Serial.print("App initialized");
  wifiHandler.connectWifi();
  mqttHandler.connectMQTT();
}

void App::solicitarServicio(void) {
  state->solicitarServicio();
}

void App::setState(State *newState) {
  state = newState;
}

State* App::getDisponibleState(void) {
  return disponibleState;
}

State* App::getSolicitandoServicioState(void) {
  return solicitandoServicioState;
}


// the program main state machine
void App::tasks()
{
  mqttHandler.connectMQTT(); // keep the mqtt connetion alive
  processEvents();
  /*
  // the state machine
  switch(appState) {
    case (1) :
      //init something
      // appData.state = APP_STATE_IDLE;
      break;

    case (2):
      // processEvents();
      //appData.state = APP_STATE_IDLE;
      break;

    case (3):
      // sleep mcu
      // sleep(SLEEP_IDLE);
      break;

    default:
      break;
    }
  */
}

// process the app events
void App::processEvents()
{
  if(events.solicitarServicio) {
    events.solicitarServicio = false;
    Serial.println("evento solicitar servicio");
    solicitarServicio();
    // mqttHandler.temperatureFeed->publish("temp");
  }

  if(events.event_btn2) {
    events.event_btn2 = false;
    Serial.println("event btn2");
    mqttHandler.humidityFeed->publish("hum");
  }
}
