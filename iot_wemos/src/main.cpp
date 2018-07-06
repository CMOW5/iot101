#include <Arduino.h>
#include <ESP8266WiFi.h>
#include "Adafruit_MQTT.h"
#include "Adafruit_MQTT_Client.h"
#include "config.h"

#define MQTT_SERVER      "192.168.0.13"
#define MQTT_SERVERPORT  1883
#define MQTT_USERNAME    ""
#define MQTT_KEY         ""
#define MQTT_FEED_TEMP   "ies/aula20/temperature"
#define MQTT_FEED_HUMI   "ies/aula20/humidity"

/* interrupt flags */
volatile bool flagINT = 0;
volatile bool flagBtn1 = false;
volatile bool flagBtn2 = false;

// pines
//const byte interruptPin = 13;
const byte btn1 = 14; // D5
const byte btn2 = 12; // D6
// const byte btn3 = 13; // D7

// wifi - mqtt
WiFiClient client;
Adafruit_MQTT_Client mqtt(&client, MQTT_SERVER, MQTT_SERVERPORT, MQTT_USERNAME, MQTT_USERNAME, MQTT_KEY);
Adafruit_MQTT_Publish temperatureFeed = Adafruit_MQTT_Publish(&mqtt, MQTT_FEED_TEMP);
Adafruit_MQTT_Publish humidityFeed = Adafruit_MQTT_Publish(&mqtt, MQTT_FEED_HUMI);

// function definitions
void connectWiFi();
void connectMQTT();
void handleInterrupt();
void handleBtn1Interrupt();
void handleBtn2Interrupt();

void setup() {
  Serial.begin(9600);
  // pinMode(interruptPin, INPUT_PULLUP);
  pinMode(btn1, INPUT_PULLUP);
  pinMode(btn2, INPUT_PULLUP);
  attachInterrupt(digitalPinToInterrupt(btn1), handleBtn1Interrupt, FALLING);
  attachInterrupt(digitalPinToInterrupt(btn2), handleBtn2Interrupt, FALLING);
  connectWiFi();
  connectMQTT();
}

void loop() {
  delay(2000);

  // digitalWrite(LED_BUILTIN, ledStatus);
  if(flagINT){
      flagINT = false;
      Serial.print("An interrupt has occurred.");
  }

  if(flagBtn1){
      flagBtn1 = false;
      Serial.print("An bt1 interrupt has occurred.");
      temperatureFeed.publish("temp");
  }

  if(flagBtn2){
      flagBtn2 = false;
      Serial.print("An bt2 interrupt has occurred.");
      humidityFeed.publish("hum");
  }

}

void connectWiFi() {
  WiFi.begin(SSID, SSPASSWORD);
  while (WiFi.status() != WL_CONNECTED) {
     delay(500);
     Serial.print(".");
  }

  Serial.println("WiFi connected");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());
}

void connectMQTT() {
  if (mqtt.connected())
    return;

  Serial.print("Connecting to MQTT... ");
  while (mqtt.connect() != 0) {
       Serial.println("Error. Retrying MQTT connection in 5 seconds...");
       mqtt.disconnect();
       delay(5000);
  }
  Serial.print("MQTT connected ");
}

void handleInterrupt() {
  flagINT = true;
}

void handleBtn1Interrupt() {
  flagBtn1 = true;
}

void handleBtn2Interrupt() {
  flagBtn2 = true;
}
