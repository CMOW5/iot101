#ifndef PEDIDO_TOMADO_STATE_H
#define PEDIDO_TOMADO_STATE_H

#include "State.h"
#include "App.h"

class App;

class PedidoTomadoState: public State {
private:
  App *app;

public:
  PedidoTomadoState(App *app);
  void solicitarServicio(void);
  void pedidoTomado(void);
  void atendido(void);
  void prenderAlarma(void);
};
#endif
