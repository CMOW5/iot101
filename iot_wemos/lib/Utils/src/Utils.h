/*
 * File:   system_config.h
 * Author: CRISTIAN
 *
 * Created on July 5, 2018
 *
 * define the microcontroller configuration in this file
 */
#ifndef _UTILS_H_
#define _UTILS_H_

class Utils {
  public:
    static char* strTocc(String input) {
      int length = input.length();
      char *output = new char[length + 1];

      for (int i = 0; i < length; i++) {
        output[i] = input[i];
      }
      output[length] = '\0';
      
      return output;
    };

    int strToInt(String input) {
      return 0;
    };

  private:

};

#endif
