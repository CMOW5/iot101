/*
 * File:   system_config.h
 * Author: CRISTIAN
 *
 * Created on July 5, 2018
 *
 * define the microcontroller configuration in this file
 */
#ifndef _SERIAL_HANDLER_H_
#define _SERIAL_HANDLER_H_

#include "../../System/src/system_config.h"

class SerialHandler {
  public:
    static bool enable;

    static void enableLogs();
    static void disableLogs();

    static void println(const __FlashStringHelper *);
    static void println(const String &s);
    static void println(const char[]);
    static void println(char);
    static void println(unsigned char, int = DEC);
    static void println(int);
    static void println(unsigned int, int = DEC);
    static void println(long, int = DEC);
    static void println(unsigned long, int = DEC);
    static void println(double, int = 2);
    static void println(const Printable&);
    static void println(void);

    static SystemConfig* systemConfig;

  private:
    static bool canPrint(void);


};

#endif
