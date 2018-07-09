#include "PedidoTomadoState.h"

PedidoTomadoState::PedidoTomadoState(App *app) {
  this->app = app;
}

void PedidoTomadoState::solicitarServicio(void) {
  Serial.println("solicitando servicio estando pedido tomado");
}
