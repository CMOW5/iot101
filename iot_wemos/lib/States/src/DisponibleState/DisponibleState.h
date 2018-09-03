#ifndef DISPONIBLE_STATE_H_
#define DISPONIBLE_STATE_H_

#include "State.h"
#include "App.h"

class App;

class DisponibleState: public State {
private:
  // AppStateMachine *appStateMachine;
  App *app;
public:
  DisponibleState(App *app);
  void solicitarServicio(void);
  void pedidoTomado(void);
  void atendido(void);
  void prenderAlarma(void);
};

#endif
