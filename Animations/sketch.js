var row = 0; //row of the key 
var colour;
var canvasColor = [127, "#00BFFF","#F5F5DC"]; // Array of colors to cycle through: Blue, Beige,
var canvasIndex = 0; 
var sound; //current sound

var current; //current recordObj
var currentTime;
var recordMode = false; //used to toggle between real-time and record mode
var recording = []; //stores recordObj objects
var addIndex = 0; 
var loopIndex; var loopTime; //used when looping
var timeBarDX = 0;

function preload(){
  sound1 = loadSound('assets/Echo.mp3');
  sound2 = loadSound('assets/glock1.wav');
  sound3 = loadSound('assets/Vibraslap.mp3');  
  sound4 = loadSound('assets/Toot.mp3'); 
  sound5 = loadSound('assets/glock.wav');   
  
  sound11 = loadSound('assets/ConcreteThump.wav'); 
  sound12 = loadSound('assets/bass2.wav'); 
  sound13 = loadSound('assets/OpenHiHat.wav'); 
  sound14 = loadSound('assets/ViolinFade.mp3'); 
  sound15 = loadSound('assets/Snare.wav');  
  
  sound20 = loadSound('assets/FloorTom.wav');  
  sound21 = loadSound('assets/bass1.wav');  
  sound22 = loadSound('assets/OpenHiHat.wav');  
  sound23 = loadSound('assets/FingerSnap.wav');  
  sound24 = loadSound('assets/EDBass.wav');   
  
  noSound = loadSound('assets/silence.mp3')
}

function setup() {
  createCanvas(1000, 800);
  background(canvasColor[canvasIndex%canvasColor.length]);
  // Falling animation: Create liquid object
  liquid = new Liquid(0, height/2, width, height/2, 0.1);
}

function draw() {
  switch(row){
    case 0:
      colour = '#FF8000';
      break;
    case 1: 
      colour = '#99FF33';
      break;
    case 2: 
      colour = '#009999';
      break;
  }
  background(canvasColor[canvasIndex%canvasColor.length]);  
  animateFallingCircles(colour);
  animateShiningStar();
  animateColorWheel();
  animateShootingLine();
  animateFadingRectangle();
  
  if(recordMode){
    animateTimeBar();
    loopRecording();
  }
}

function keyTyped() { 
  println("Key typed is: " + int(keyCode))
  
  //Return key used to toggle recording mode
  if(keyCode === 13){
    recordMode = !recordMode; //toggle recordMode
    timeBarDX = 0;
    loopIndex = 0; 
    
  }
  
  //store recordObj objects
  if(recordMode && keyCode !== (0 || 13)){//will be 0 if no key pressed so exclude this case
    recording[addIndex] = new recordObj(millis(), keyCode);
    println("Size of recording array is " + recording.length);
    println("Array elements are: " + printRecordingArray());
    //println("Time in ms: " + millis());
    addIndex++;
  }
  
  keyMapping(keyCode);
  sound.play();
}

//Recording Aspects below
//stores data on recorded animation
function recordObj(time, code){
  this.time = time;
  this.code = code;
}

function animateTimeBar(){
  fill('black');
  rect(0, height - (height/50), timeBarDX, height/50);   
  if(timeBarDX < width){
    timeBarDX += width/600;
  }
}

function restartLoop(){
  timeBarDX = 0;
}

function loopRecording(){
  if(recording.length > 0){
    if(recording.length === 1){
      current = recording[loopIndex];
      loopIndex++;
    }
    
    currentTime = millis();  
    
    if(current.time %10000 < currentTime%10000){//duration of loop is 10 seconds (10000 ms)
      keyMapping(current.code); //play animation+sound
      current = recording[loopIndex]; //
      currentTime = millis();
      //println("current.code is " + current.code);
      //println("currentTime is: " + currentTime);  
      loopIndex++;
    }
    

   
    // if((current.time > previousTime%10000)&&(current.time <= currentTime%10000)){
    //   keyMapping(current.code); //play animation+sound
    //   previousTime = currentTime; 
    // }
  }
}

function printRecordingArray(){
  var str = "";
  for(var i = 0; i < recording.length; i++){
    str = str + "Time is " + recording[i].time + ", Code is " + recording[i].code;
  }
  return str;
}



//handles key presses for real-time animations
function keyMapping(keyNum){
    switch(keyNum){
    case 113: //Q
      row = 0;     
      sound = sound1;
      resetFallingCircles();
      break;   
    case 119: //W
      row = 0;
      sound = sound2;
      showStar = 50;
      break;
    case 101: //E
      row = 0;
      sound = sound3;
      showColWheel = 50;
      resetColorWheel();
      break;
    case 114: //R
      row = 0;
      sound = sound4;
      showLine = 40;
      resetShootingLine();
      break;
    case 116: ///T
      row = 0;
      sound = sound5;
      resetFadingRectangle();
      break;
      
      
    case 97: //A
      row = 1;
      sound = sound11;      
      resetFallingCircles();
      break;
    case 115: //S
      row = 1;
      sound = sound12;
      showStar = 50;
      break;    
    case 100: //D
      row = 1;
      sound = sound13;
      showColWheel = 50;
      resetColorWheel();      
      break;
    case 102: //F
      row = 1;
      sound = sound14;
      showLine = 40;
      resetShootingLine();      
      break;
    case 103: //G
      row = 1;
      sound = sound15;
      showRect = 30;
      resetFadingRectangle();      
      break;
                  
    
    case 122: //Z
      row = 2;
      sound = sound20;
      resetFallingCircles();
      break;
    case 120: //X
      row = 2;
      sound = sound21;
      showStar = 50;
      break;      
    case 99: //C
      row = 2;
      sound = sound22;
      resetColorWheel(); 
      break;       
    case 118: //V
      row = 2;
      sound = sound23;
      showLine = 40;
      resetShootingLine(); 
      break;          
    case 98: //B
      row = 2;
      sound = sound24;
      resetFadingRectangle(); 
      break;           
      
    //Spacebar
    case 32:
      row = 4;
      sound = noSound;
      changeCanvasColor();
      break;
  }
}



