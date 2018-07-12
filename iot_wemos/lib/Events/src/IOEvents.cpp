/*
 * Clock.cpp
 *
 *  Created on: Jul 11, 2018
 *      Author: cristian
 */

#include "IOEvents.h"

IOEvents::IOEvents() {

}

void IOEvents::Tick() {
	// update internal time-keeping state
	// ...
	notify();
}
