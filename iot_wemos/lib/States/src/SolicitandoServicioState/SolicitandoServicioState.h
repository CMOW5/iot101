#ifndef SOLICITANDO_SERVICIO_STATE_H_
#define SOLICITANDO_SERVICIO_STATE_H_

#include "State.h"
#include "App.h"

class App;

class SolicitandoServicioState: public State {
private:
  App *app;
public:
  // SolicitandoServicioState(AppStateMachine *appStateMachine);
  SolicitandoServicioState(App *app);
  void solicitarServicio(void);
  void pedidoTomado(void);
  void atendido(void);
  void prenderAlarma(void);
};

#endif
