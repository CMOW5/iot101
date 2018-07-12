/*
 * Subject.cpp
 *
 *  Created on: Jul 11, 2018
 *      Author: cristian
 */
#include "Subject.h"
#include "Observer.h"

void Subject::attach(Observer* o) {
	_observers.push_back(o);
}

void Subject::detach(Observer* o) {
	_observers.remove(o);
}

void Subject::notify() {
	std::list<Observer*>::iterator iterator;
	for (iterator = _observers.begin(); iterator != _observers.end(); ++iterator) {
		(*iterator)->update(this);
	}
}
