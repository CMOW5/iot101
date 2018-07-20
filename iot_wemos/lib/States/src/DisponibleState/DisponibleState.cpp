#include "DisponibleState.h"

DisponibleState::DisponibleState(App *app) {
  this->app = app;
}

void DisponibleState::solicitarServicio(void) {
  Serial.println("solicitando servicio estando disponible");
  app->mqttHandler->solicitarServicio();
  app->setState(app->getSolicitandoServicioState());
}

void DisponibleState::pedidoTomado(void) {

}

void DisponibleState::atendido(void) {

}

void DisponibleState::prenderAlarma(void) {
  app->mqttHandler->prenderAlarma();
  app->setState(app->getAlarmaState());
}
