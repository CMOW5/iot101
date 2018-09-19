#include "App.h"
#include "../../Events/src/IOEvents.h"
#include "../../Events/src/MQTTEvents.h"
#include "../../SerialHandler/src/SerialHandler.h"

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

	bootState = new BootState(this);
	disponibleState = new DisponibleState(this);
  solicitandoServicioState = new SolicitandoServicioState(this);
  pedidoTomadoState = new PedidoTomadoState(this);
	atendidoState = new AtendidoState(this);
	alarmaState = new AlarmaState(this);
}

App::~App() {
	_mqttSubject->detach(this);
	_ioSubject->detach(this);
}

void App::update(Subject* theChangedSubject) {

	if (theChangedSubject == _mqttSubject) { // mqtt event
		// print something
		SerialHandler::println("event desde socket subject!!!");
		SerialHandler::println("data = ");
		SerialHandler::println(_mqttSubject->getData());
		SerialHandler::println("channel = ");
		SerialHandler::println(_mqttSubject->channel);

		char* newState = _mqttSubject->getData();
		setState(newState);

	}

	if (theChangedSubject == _ioSubject) {  // io pin event
		SerialHandler::println("event desde io pins");
		int t_pin = _ioSubject->getPin();
		SerialHandler::println("pin = ");
		SerialHandler::println(t_pin);
		if (t_pin == 14) {
			solicitarServicio();
		} else if (t_pin == 12) {
			prenderAlarma();
		}
	}
}

// Initialize the aplication modules
void App::initialize()
{
	wifiHandler->connect();
	mqttHandler->initialize();
	mqttHandler->connect();
	setState(bootState);

  SerialHandler::println("App initialized");
}

// the program main state machine
void App::tasks()
{
	mqttHandler->connect(); // keep the mqtt connection alive
	mqttHandler->processSubscriptions(); // keep watching for mqqt subcriptions events
}

// actions
void App::cargarDatos(void) {
	SerialHandler::println("obteniendo datos iniciales desde el servidor");
	mqttHandler->cargarDatos();
}

void App::solicitarServicio(void) {
  state->solicitarServicio();
}

void App::prenderAlarma(void) {
  state->prenderAlarma();
}

void App::setState(State *newState) {
  state = newState;
	if (state == bootState) {
		cargarDatos();
		pins->D1.turnOn();
		pins->D2.turnOn();
		pins->D3.turnOn();
	}
	else if (state == disponibleState) {
		pins->D1.turnOff();
		pins->D2.turnOn();
		pins->D3.turnOn();
	} else if (state == solicitandoServicioState) {
		pins->D3.turnOff();
		pins->D1.turnOn();
		pins->D2.turnOn();
	} else if (state == pedidoTomadoState) {
		pins->D2.intermitent();
		pins->D1.turnOn();
		pins->D3.turnOn();
	} else if (state == atendidoState) {
		pins->D2.turnOff();
		pins->D1.turnOn();
		pins->D3.turnOn();
	} else if (state == alarmaState) {
		pins->D1.intermitent();
		pins->D2.turnOn();
		pins->D3.turnOn();
	}
}

void App::setState(char* newStateName) {
  // state = newState;
	SerialHandler::println("new state name = ");
	SerialHandler::println(newStateName);
	if (strcmp(newStateName, "disponible") == 0) {
		setState(disponibleState);
	} else if (strcmp(newStateName, "solicitando_servicio") == 0) {
		setState(solicitandoServicioState);
	} else if (strcmp(newStateName, "pedido_tomado") == 0) {
		setState(pedidoTomadoState);
	} else if (strcmp(newStateName, "atendido") == 0) {
		setState(atendidoState);
	} else if (strcmp(newStateName, "alarma") == 0) {
		setState(alarmaState);
	}
}

/* state getters */

State* App::getDisponibleState(void) {
  return disponibleState;
}

State* App::getSolicitandoServicioState(void) {
  return solicitandoServicioState;
}

State* App::getAlarmaState(void) {
	return alarmaState;
}
