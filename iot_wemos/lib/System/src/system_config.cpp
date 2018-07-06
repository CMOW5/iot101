#include "system_config.h"

SystemConfig* SystemConfig::pInstance = 0;

SystemConfig* SystemConfig::instance() {
  if (pInstance == 0) {
    pInstance = new SystemConfig;
  }
  return pInstance;
}
