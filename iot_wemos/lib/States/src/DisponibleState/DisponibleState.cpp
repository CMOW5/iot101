#include "DisponibleState.h"

DisponibleState::DisponibleState(App *app) {
  this->app = app;
}

void DisponibleState::solicitarServicio(void) {
  Serial.println("solicitando servicio estando disponible");
  app->mqttHandler->solicitarServicioFeed->publish("solicitando_servicio");
  app->setState(app->getSolicitandoServicioState());
}

void DisponibleState::confirmado(void) {
  Serial.println("confirmado estando disponible");
}
