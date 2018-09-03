#include "PedidoTomadoState.h"

PedidoTomadoState::PedidoTomadoState(App *app) {
  this->app = app;
}

void PedidoTomadoState::solicitarServicio(void) {
  SerialHandler::println("solicitando servicio estando pedido tomado");
  app->mqttHandler->solicitarServicio();
  app->setState(app->getSolicitandoServicioState());
}

void PedidoTomadoState::pedidoTomado(void) {

}

void PedidoTomadoState::atendido(void) {

}

void PedidoTomadoState::prenderAlarma(void) {
  app->mqttHandler->prenderAlarma();
  app->setState(app->getAlarmaState());
}
