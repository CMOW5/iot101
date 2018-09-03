#include "AlarmaState.h"

AlarmaState::AlarmaState(App *app) {
  this->app = app;
}

void AlarmaState::solicitarServicio(void) {
  SerialHandler::println("solicitando servicio estando en alarma");
  app->mqttHandler->solicitarServicio();
  app->setState(app->getSolicitandoServicioState());
}

void AlarmaState::pedidoTomado(void) {

}

void AlarmaState::atendido(void) {

}

void AlarmaState::prenderAlarma(void) {

}
