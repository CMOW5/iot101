
#include "Wifi_Handler.h"

WifiHandler::WifiHandler() {
	systemConfig = SystemConfig::instance();
}

void WifiHandler::connect()
{
	WiFi.begin(systemConfig->wifiNetwork().c_str(), systemConfig->wifiPassword().c_str());
  while (WiFi.status() != WL_CONNECTED) {
     delay(500);
     Serial.print(".");
  }
  Serial.println("WiFi connected");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());
}
