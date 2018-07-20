#include "AtendidoState.h"

AtendidoState::AtendidoState(App *app) {
  this->app = app;
}

void AtendidoState::solicitarServicio(void) {

}

void AtendidoState::pedidoTomado(void) {

}

void AtendidoState::atendido(void) {

}

void AtendidoState::prenderAlarma(void) {
  app->mqttHandler->prenderAlarma();
  app->setState(app->getAlarmaState());
}
