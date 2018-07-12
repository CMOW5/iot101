/*
 * Clock.cpp
 *
 *  Created on: Jul 11, 2018
 *      Author: cristian
 */

#include "MQTTEvents.h"

MQTTEvents::MQTTEvents() {

}

/*
MQTTEvents::MQTTEvents(WifiHandler* whandler, MQTTHandler* mhandler) {
    mqttHandler = mhandler;
    wifiHandler = wifiHandler;
}
*/

void MQTTEvents::Tick() {
	// update internal time-keeping state
	// ...
	notify();
}

char* MQTTEvents::getData() {
	return data;
}

uint16_t MQTTEvents::getLen() {
  return len;
}

void MQTTEvents::setData(char* newData) {
	data = newData;
}

void MQTTEvents::setLen(uint16_t newLen) {
  len = newLen;
}
