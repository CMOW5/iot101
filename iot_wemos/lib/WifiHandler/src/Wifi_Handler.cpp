
#include "Wifi_Handler.h"

WifiHandler::WifiHandler() {
	systemConfig = SystemConfig::instance();
}

void WifiHandler::connect()
{
	WiFi.begin(systemConfig->wifiNetwork().c_str(), systemConfig->wifiPassword().c_str());
  while (WiFi.status() != WL_CONNECTED) {
     delay(500);
     SerialHandler::println(".");
  }
  SerialHandler::println("WiFi connected");
  SerialHandler::println("IP address: ");
  SerialHandler::println(WiFi.localIP());
}
