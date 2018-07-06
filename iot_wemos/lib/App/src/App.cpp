#include "App.h"

App::App() : mqttHandler(wifiHandler) {

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
  digitalWrite(pins.D4.getValue(), LOW);

  // Events
  attachInterrupt(digitalPinToInterrupt(pins.D5.getValue()), Events::eventButton1, FALLING);
  attachInterrupt(digitalPinToInterrupt(pins.D6.getValue()), Events::eventButton2, FALLING);

  delay(3000);
  Serial.print("App initialized");
  wifiHandler.connectWifi();
  mqttHandler.connectMQTT();
}

// the program main state machine
void App::tasks()
{
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
  if(events.event_btn1) {
    events.event_btn1 = false;
    Serial.println("event btn1");
    mqttHandler.temperatureFeed->publish("temp");
  }

  if(events.event_btn2) {
    events.event_btn2 = false;
    Serial.println("event btn2");
    mqttHandler.humidityFeed->publish("hum");
  }
}
