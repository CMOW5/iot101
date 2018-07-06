

#include "App.h"

App app;

void setup() {
  // Initialize all app modules, including application(s).
  app.initialize();
}

void loop() {
  // the app state machine
  app.tasks();
}
