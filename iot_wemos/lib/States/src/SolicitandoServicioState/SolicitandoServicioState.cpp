#include "SolicitandoServicioState.h"

SolicitandoServicioState::SolicitandoServicioState(App *app) {
    this->app = app;
}

void SolicitandoServicioState::solicitarServicio(void) {
    SerialHandler::println("solicitando servicio estando ya solicitando");
}

void SolicitandoServicioState::pedidoTomado(void) {

}

void SolicitandoServicioState::atendido(void) {

}

void SolicitandoServicioState::prenderAlarma(void) {
  app->mqttHandler->prenderAlarma();
  app->setState(app->getAlarmaState());
}
