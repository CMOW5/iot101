#include "App.h"
#include "../../Events/src/IOEvents.h"
#include "../../Events/src/MQTTEvents.h"

// App::App() : mqttHandler(wifiHandler) {}

App::App(
	Pins* pins, MQTTHandler* mqHandler, WifiHandler* wHandler,
	MQTTEvents* mqttSubject, IOEvents* ioSubject) {

	// set the app pins
	this->pins = pins;

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
	setState(disponibleState);
}

App::~App() {
	_mqttSubject->detach(this);
	_ioSubject->detach(this);
}

void App::update(Subject* theChangedSubject) {

	if (theChangedSubject == _mqttSubject) { // mqtt event
		// print something
		Serial.println("event desde socket subject!!!");
		Serial.println("data = ");
		Serial.println(_mqttSubject->getData());
		Serial.println("channel = ");
		Serial.println(_mqttSubject->channel);

		char* newState = _mqttSubject->getData();
		setState(newState);

	}

	if (theChangedSubject == _ioSubject) {  // io pin event
		Serial.println("event desde io pins");
		int t_pin = _ioSubject->getPin();
		Serial.println("pin = ");
		Serial.println(t_pin);
		if (t_pin == 14) {
			solicitarServicio();
		} else {

		}

	}
}

// Initialize the aplication modules
void App::initialize()
{
  // initialize something
  // SYS_Initialize(); //initialize the system
  Serial.begin(9600);

  delay(3000);
  Serial.print("App initialized");
}

// actions

void App::solicitarServicio(void) {
  state->solicitarServicio();
}

void App::confirmado(void) {
  state->confirmado();
}

void App::setState(State *newState) {
  state = newState;
	if (state == disponibleState) {
		pins->D1.turnOn();
		pins->D2.turnOff();
		pins->D3.turnOff();
	} else if (state == solicitandoServicioState) {
		pins->D2.turnOn();
		pins->D1.turnOff();
		pins->D3.turnOff();
	} else if (state == pedidoTomadoState) {
		pins->D3.turnOn();
		pins->D1.turnOff();
		pins->D2.turnOff();
	}
	/*
		turn on the led with the given state
	*/
}

void App::setState(char* newStateName) {
  // state = newState;
	Serial.println("new state name = ");
	Serial.println(newStateName);
	if (strcmp(newStateName, "disponible") == 0) {
		setState(disponibleState);
	} else if (strcmp(newStateName, "pedido_tomado") == 0) {
		setState(pedidoTomadoState);
	} else if (strcmp(newStateName, "no_disponible") == 0) {

	}
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
