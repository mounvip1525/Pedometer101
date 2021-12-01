#include <LiquidCrystal.h>
const int rs = 12, en = 11, d4 = 5, d5 = 4, d6 = 3, d7 = 2;
LiquidCrystal lcd(rs,en,d4,d5,d6,d7);
int olda=0;
int oldtilt=0;
int tilt=0;

void setup(){
  int a=0,b=0,c=0;
  pinMode(7,INPUT);
  lcd.begin(16,2);
  lcd.print(" TOO SMALL!!!");
  Serial.begin(9600);
}

void loop(){
  int a=0,b=0,c=0;
  tilt=digitalRead(7);
  c=tilt;
  b=oldtilt;
  if(oldtilt==1)
  {
    tilt=0;
  }
  oldtilt=c;
  delay(1);
  a=olda+tilt;
  lcd.setCursor(0,1);
  lcd.print("Steps=");
  lcd.print(a);
  olda=a;
}
