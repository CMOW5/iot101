/*
 * Clock.h
 *
 *  Created on: Jul 11, 2018
 *      Author: cristian
 */

#ifndef IO_EVENTS_H_
#define IO_EVENTS_H_

#include "Subject.h"
#include <Arduino.h>
#include <Ticker.h>

class IOEvents : public Subject {
public:
	IOEvents();

	// virtual int GetHour();
	// virtual int GetMinute();
	// virtual int GetSecond();

	void Tick();
};


#endif /* CLOCKTIMER_H_ */
