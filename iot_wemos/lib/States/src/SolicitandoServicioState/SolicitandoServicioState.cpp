#include "SolicitandoServicioState.h"

SolicitandoServicioState::SolicitandoServicioState(App *app) {
    this->app = app;
}

void SolicitandoServicioState::solicitarServicio(void) {
  Serial.println("solicitando servicio estando ya solicitando");
  // app->mqttHandler.temperatureFeed->publish("temp");
  // app->setState(app->getSolicitandoServicioState());
}

void SolicitandoServicioState::confirmado(void) {
  Serial.println("confirmado estando solicitando");
}
