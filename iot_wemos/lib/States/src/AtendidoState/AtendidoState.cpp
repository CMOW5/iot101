#include "AtendidoState.h"

AtendidoState::AtendidoState(App *app) {
  this->app = app;
}

void AtendidoState::solicitarServicio(void) {
  app->mqttHandler->solicitarServicio();
  app->setState(app->getSolicitandoServicioState());
}

void AtendidoState::pedidoTomado(void) {

}

void AtendidoState::atendido(void) {

}

void AtendidoState::prenderAlarma(void) {
  app->mqttHandler->prenderAlarma();
  app->setState(app->getAlarmaState());
}
