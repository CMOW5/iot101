#ifndef ATENDIDO_STATE_H
#define ATENDIDO_STATE_H

#include "State.h"
#include "App.h"

class App;

class AtendidoState: public State {
private:
  App *app;

public:
  AtendidoState(App *app);
  void solicitarServicio(void);
  void pedidoTomado(void);
  void atendido(void);
  void prenderAlarma(void);
};
#endif
