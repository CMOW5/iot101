#ifndef BOOT_STATE_H
#define BOOT_STATE_H

#include "State.h"
#include "App.h"

class App;

class BootState: public State {
private:
  App *app;

public:
  BootState(App *app);
  void solicitarServicio(void);
  void pedidoTomado(void);
  void atendido(void);
  void prenderAlarma(void);
};
#endif
