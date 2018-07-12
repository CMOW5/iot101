#include "App.h"
#include "../../Events/src/IOEvents.h"
#include "../../Events/src/MQTTEvents.h"

// App::App() : mqttHandler(wifiHandler) {}

App::App(
	MQTTHandler* mqHandler, WifiHandler* wHandler,
	MQTTEvents* mqttSubject, IOEvents* ioSubject) {

	// subscribe to the subjects
	_mqttSubject = mqttSubject;
	_mqttSubject->attach(this);
	_ioSubject = ioSubject;
	_ioSubject->attach(this);

  // mqttHandler = new MQTTHandler(wifiHandler);
	mqttHandler = mqHandler;
	wifiHandler = wHandler;

	disponibleState = new DisponibleState(this);
  solicitandoServicioState = new SolicitandoServicioState(this);
  pedidoTomadoState = new PedidoTomadoState(this);
  state = disponibleState;
}

App::~App() {
	_mqttSubject->detach(this);
	_ioSubject->detach(this);
}

void App::update(Subject* theChangedSubject) {
	if (theChangedSubject == _mqttSubject) {
		// print something
		Serial.println("event desde socket subject!!!");
		Serial.println("data = ");
		Serial.println(_mqttSubject->getData());
		Serial.println("channel = ");
		Serial.println(_mqttSubject->channel);
	}

	if (theChangedSubject == _ioSubject) {
		// print something
		Serial.println("event desde io subject!!!");
	}
}

// Initialize the aplication modules
void App::initialize()
{
  // initialize something
  // SYS_Initialize(); //initialize the system
  Serial.begin(9600);

  // pin init
  pins.D5.mode(INPUT_PULLUP);
  pins.D6.mode(INPUT_PULLUP);
  // pins.D4.mode(OUTPUT);
  // digitalWrite(pins.D4.value(), LOW);

  delay(3000);
  Serial.print("App initialized");
}

void App::solicitarServicio(void) {
  state->solicitarServicio();
}

void App::confirmado(void) {
  state->confirmado();
}

void App::setState(State *newState) {
  state = newState;
	/*
		turn on the led with the given state
	*/
}

State* App::getDisponibleState(void) {
  return disponibleState;
}

State* App::getSolicitandoServicioState(void) {
  return solicitandoServicioState;
}

// the program main state machine
void App::tasks()
{
  processEvents();
}

// process the app events
void App::processEvents()
{

}

/*
switch(appState) {
  case (1) :
    //init something
    // appData.state = APP_STATE_IDLE;
    break;

  case (2):
    // processEvents();
    //appData.state = APP_STATE_IDLE;
    break;

  case (3):
    // sleep mcu
    // sleep(SLEEP_IDLE);
    break;

  default:
    break;
  }
*/
