int xpin=A1;
  int ypin=A2;
  int zpin=A3;
  float threshhold=80.0;
  float xval[100]={0};
  float yval[100]={0};
  float zval[100]={0};
  float xavg;
  float yavg;
  float zavg;
  int steps = 0;
  int state=0;
  void setup()
  {
  Serial.begin(9600);
  calibrate();
  }void loop()
  {
  int acc=0;
  float totvect[100]={0};
  float totave[100]={0};
  float xaccl[100]={0};
  float yaccl[100]={0};
  float zaccl[100]={0}; 
  for (int i=0;i<100;i++){
  xaccl[i]=float(analogRead(xpin));
  yaccl[i]=float(analogRead(ypin));
  zaccl[i]=float(analogRead(zpin));
  totvect[i] = sqrt(((xaccl[i]-xavg)* (xaccl[i]-xavg))+ ((yaccl[i] - yavg)(yaccl[i] - yavg)) + ((zval[i] - zavg)(zval[i] -zavg)));
  totave[i] = (totvect[i] + totvect[i-1]) / 2 ;
  Serial.println(totave[i]);
  delay(200);
  //calculating number of steps 
  if (totave[i]>threshhold && state==0){
  steps=steps+1;
  state=1;
  }
  if (totave[i] <threshhold  && state==1)
  {state=0;}
  Serial.println('\n');
  Serial.print("steps=");
  Serial.println(steps);
  };
  delay(1000);
  }
  void calibrate(){
  float sum=0;
  float sum1=0;
  float sum2=0;
  for (int i=0;i<100;i++){
  xval[i]=float(analogRead(xpin));
  sum=xval[i]+sum;
  }
  delay(100);
  xavg=sum/100.0;
  Serial.println(xavg);
  for (int j=0;j<100;j++){
  xval[j]=float(analogRead(xpin));
  sum1=xval[j]+sum1;
  }
  yavg=sum1/100.0;
  Serial.println(yavg);
  delay(100);
  for (int i=0;i<100;i++){
  zval[i]=float(analogRead(zpin));
  sum2=zval[i]+sum2;
  }
  zavg=sum2/100.0;
  delay(100);
  Serial.println(zavg); 
  }