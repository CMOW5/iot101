/*
 * Clock.h
 *
 *  Created on: Jul 11, 2018
 *      Author: cristian
 */

#ifndef IO_EVENTS_H_
#define IO_EVENTS_H_

#include "Subject.h"
#include <string>
#include <cstring>

using namespace std;

class IOEvents : public Subject {
public:
	IOEvents();

	int pin;
	virtual int getPin();
	virtual void setPin(int);
	// virtual int GetPin();
	// virtual int GetHour();
	// virtual int GetMinute();
	// virtual int GetSecond();

	void Tick();
};


#endif /* CLOCKTIMER_H_ */
