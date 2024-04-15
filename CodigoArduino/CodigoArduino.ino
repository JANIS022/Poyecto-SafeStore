#include <WiFi.h>
#include <HTTPClient.h>
#include <ArduinoJson.h>

const char* ssid = "Maxito";
const char* password = "201101ka";

const char* serverUrl = "http://172.20.10.2:3000/api/v1/movimiento"; // URL del servidor

const int pirPin = 2; // Pin donde está conectado el sensor PIR
const int ledPin = 4; // Pin donde está conectado el LED

void setup() {
  Serial.begin(9600);
  pinMode(pirPin, INPUT);
  pinMode(ledPin, OUTPUT);

  // Conexión WiFi
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Conectando a WiFi...");
  }
  Serial.println("Conexión WiFi establecida.");
}

void loop() {
  int movimiento = digitalRead(pirPin);
  if (movimiento == HIGH) {
    digitalWrite(ledPin, HIGH);  // Enciende el LED
    Serial.println("SE DETECTÓ MOVIMIENTO");

    if (WiFi.status() == WL_CONNECTED) {
      HTTPClient http;
      http.begin(serverUrl);
      http.addHeader("Content-Type", "application/json");

      // Creamos un objeto JSON para almacenar los datos
      StaticJsonDocument<200> jsonDoc;  
      jsonDoc["movementDetected"] = true;
      jsonDoc["mensaje"] = "Movimiento detectado en la sala.";

      // Convertimos el objeto JSON a una cadena de caracteres
      String jsonStr;
      serializeJson(jsonDoc, jsonStr);

      // Enviamos la solicitud POST con los datos JSON al servidor
      int httpResponseCode = http.POST(jsonStr);
      if (httpResponseCode > 0) {
        String response = http.getString();
        Serial.println("Respuesta del servidor: " + response);
      } else {
        Serial.print("Error en la solicitud HTTP: ");
        Serial.println(httpResponseCode);
      }

      http.end();
    } else {
      Serial.println("Error al conectar a WiFi");
    }

    delay(1000); // Esperamos 5 segundos antes de realizar la siguiente lectura y envío
  } else {
    digitalWrite(ledPin, LOW);  // Apaga el LED
  }
}