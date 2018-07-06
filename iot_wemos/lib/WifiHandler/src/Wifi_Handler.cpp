
#include "Wifi_Handler.h"

WifiHandler::WifiHandler() {
	systemConfig = SystemConfig::instance();
}

void WifiHandler::connectWifi()
{
	WiFi.begin(systemConfig->WIFI_SSID, systemConfig->WIFI_PASS);
  while (WiFi.status() != WL_CONNECTED) {
     delay(500);
     Serial.print(".");
  }
  Serial.println("WiFi connected");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());
}
