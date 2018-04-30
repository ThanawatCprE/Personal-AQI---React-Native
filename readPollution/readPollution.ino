// SDS011 dust sensor example
// -----------------------------
//
// By R. Zschiegner (rz@madavi.de).
// April 2016

#include <SDS011.h>

const float concentrationBoundariesP25[7][2] =
{
        {0.0f,12.0f},
        {12.1f,35.4f},
        {35.5f,55.4f},
        {55.5f,150.4f},
        {150.5f,250.4f},
        {250.5f,350.4f},
        {350.5f,500.4f}
};
const float concentrationBoundariesP10[7][2] =
{
        {0.0f,54.0f},
        {55.0f,154.0f},
        {155.0f,254.0f},
        {255.0f,354.0f},
        {355.0f,424.0f},
        {425.0f,504.0f},
        {505.0f,604.0f}
};
const unsigned int indexBoundaries[7][2] =
{
        {0,50},
        {51,100},
        {101,150},
        {151,200},
        {201,300},
        {301,400},
        {401,500}
};

float p10, p25;
int error;
int aqi25, aqi10;
SDS011 my_sds;

void setup() {
  my_sds.begin(D1, D2); //RX, TX
  Serial.begin(9600);
}

void loop() {
  error = my_sds.read(&p25, &p10);
  if (!error) {
    Serial.println("P2.5: " + String(p25));
    aqi25 = calculateAirQualityIndex(12.0, concentrationBoundariesP25);
    Serial.println("AQI 2.5 " + String(aqi25));
    
    Serial.println("P10:  " + String(p10));
    aqi10 = calculateAirQualityIndex(54.0, concentrationBoundariesP10);
    Serial.println("AQI 10 " + String(aqi10));
  }
  delay(1000);
}

int calculateAirQualityIndex(float pm, const float concentrationBoundaries[7][2])
{
    int iLow, iHigh, ii;
    float cLow, cHigh;

    cLow = 0;
    cHigh = 0;
    iHigh = 0;
    iLow = 0;

    /* Finding out the boundary values and calculating the PM2.5 based off
        that */
    for(ii=0;ii<7;ii++)
    {
        if (concentrationBoundaries[ii][0] <= pm
                && concentrationBoundaries[ii][1] >= pm)
        {
            cLow = concentrationBoundaries[ii][0];
            cHigh = concentrationBoundaries[ii][1];
            iLow = indexBoundaries[ii][0];
            iHigh = indexBoundaries[ii][1];
            break;
        }
    }
        
    return (int)(((iHigh - iLow)/(cHigh - cLow)) * (pm - cLow)) + iLow;
}
