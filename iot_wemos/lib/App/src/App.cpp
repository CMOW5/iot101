#include "App.h"
// #include "app_events.h"
/*
App::App()
{
  // empty constructor
}
*/

void App::initialize()
{
  // initialize something
  // SYS_Initialize(); //initialize the system
  Serial.begin(9600);
  delay(3000);
  Serial.print("App initialized");
  wifiHandler.connectWifi();
  wifiHandler.connectMQTT();
}

void App::tasks()
{
  // the state machine
}
