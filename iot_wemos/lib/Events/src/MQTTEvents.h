/*
 * Clock.h
 *
 *  Created on: Jul 11, 2018
 *      Author: cristian
 */

#ifndef MQTT_EVENTS_H_
#define MQTT_EVENTS_H_

#include "Subject.h"
#include "Arduino.h"

class MQTTEvents : public Subject {
public:
	MQTTEvents();
	// MQTTEvents(WifiHandler*, MQTTHandler*);
	char *data;
	char *channel;
	uint16_t len;

	virtual void setData(char* );
	virtual void setLen(uint16_t);
	virtual char* getData();
	virtual uint16_t getLen();
	// virtual int GetMinute();
	// virtual int GetSecond();

	void Tick();
	static void eventConfirmado(char *data, uint16_t len);
};


#endif /* CLOCKTIMER_H_ */
