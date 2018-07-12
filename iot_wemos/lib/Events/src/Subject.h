/*
 * Subject.h
 *
 *  Created on: Jul 11, 2018
 *      Author: cristian
 */

#ifndef SUBJECT_H_
#define SUBJECT_H_
#include <list>

class Observer;

class Subject {
public:
	virtual ~Subject() {};
	virtual void attach(Observer*);
	virtual void detach(Observer*);
	virtual void notify();
protected:
	Subject() {};
private:
	// List<Observer*> *_observers;
	std::list<Observer*> _observers;
	// std::list<Observer> _observers;
};


#endif /* SUBJECT_H_ */
