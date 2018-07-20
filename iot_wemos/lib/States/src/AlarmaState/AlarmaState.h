#ifndef ALARMA_STATE_H
#define ALARMA_STATE_H

#include "State.h"
#include "App.h"

class App;

class AlarmaState: public State {
private:
  App *app;

public:
  AlarmaState(App *app);
  void solicitarServicio(void);
  void pedidoTomado(void);
  void atendido(void);
  void prenderAlarma(void);
};
#endif
