/*
 * Clock.cpp
 *
 *  Created on: Jul 11, 2018
 *      Author: cristian
 */

#include "IOEvents.h"

IOEvents::IOEvents() {

}

int IOEvents::getPin() {
	return pin;
}

void IOEvents::setPin(int value) {
	pin = value;
	// strcpy(pin, value);
}

void IOEvents::Tick() {
	// update internal time-keeping state
	// ...
	notify();
}
