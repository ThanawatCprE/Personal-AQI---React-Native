#include <SDS011.h>
#include <ESP8266WiFi.h>

#define SDS_RX D1
#define SDS_TX D2

//const char* ssid     = "Network_Lab";
//const char* password = "varavithya";
//
float p10,p25;
int error;
//
struct Air {
  float pm25;
  float pm10;
};
//
SDS011 sds;
//
void setup() {
    Serial.begin(9600);
    sds.begin(SDS_RX,SDS_TX);
//  connectToWiFi();
}
//
void loop() {
    Air airData = readPolution();
    Serial.println(airData.pm25);
    delay(1000);
}
//
//void connectToWiFi(){
//  WiFi.mode(WIFI_STA);
//  WiFi.begin(ssid, password);
// 
//  Serial.print("Connecting to ");
//  Serial.println(ssid); 
//
//  while (WiFi.status() != WL_CONNECTED) {
//    delay(500);
//    Serial.print(".");
//  }
//
//  Serial.println("");
//  Serial.println("WiFi connected");  
//  Serial.println("IP address: ");
//  Serial.println(WiFi.localIP());
//  startServer();
//}
//
Air readPolution(){
    error = sds.read(&p25,&p10);
  if (!error) {
    Serial.print("read");
   
    Air result = (Air){100, 200};
    return result;
  } else {
    Serial.println("Error reading SDS011");
    return (Air){0.0, 0.0};
  }
}
//
////Correction algorythm thanks to help of Zbyszek Kiliański (Krakow Zdroj)
////float normalizePM25(float pm25, float humidity){
////  return pm25/(1.0+0.48756*pow((humidity/100.0), 8.60068));
////}
//
////float normalizePM10(float pm10, float humidity){
////  return pm10/(1.0+0.81559*pow((humidity/100.0), 5.83411));
////}
//
//float calculatePolutionPM25(float pm25){
//  return pm25*100/25;
//}
//
//float calculatePolutionPM10(float pm10){
//  return pm10*100/50;
//}

