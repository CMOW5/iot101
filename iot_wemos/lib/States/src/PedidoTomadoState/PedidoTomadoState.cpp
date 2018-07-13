#include "PedidoTomadoState.h"

PedidoTomadoState::PedidoTomadoState(App *app) {
  this->app = app;
}

void PedidoTomadoState::solicitarServicio(void) {
  Serial.println("solicitando servicio estando pedido tomado");
  app->mqttHandler->solicitarServicioFeed->publish("solicitando_servicio");
  app->setState(app->getSolicitandoServicioState());
}

void PedidoTomadoState::confirmado(void) {
  Serial.println("confirmado estando pedido tomado");
}
