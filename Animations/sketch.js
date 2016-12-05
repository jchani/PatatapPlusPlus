var row = 0; var col = 0; //row and column of the current key press (col set to 10 so no animations)
var colour;
var canvasColor = [127, "#00BFFF","#F5F5DC"]; // Array of colors to cycle through: Blue, Beige,
var canvasIndex = 0; 
var sound; //current sound

function preload(){
  sound1 = loadSound('sounds/pop.mp3');
  sound2 = loadSound('sounds/pop.mp3');
  sound3 = loadSound('sounds/pop.mp3');  
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
}


function keyTyped() { 
  println("Key typed is: " + int(keyCode))
  switch(keyCode){
    case 113: //Q
      row = 0;     
      col = 0;
      sound = sound1;
      resetFallingCircles();
      break;   
    case 119: //W
      row = 0;
      col = 1;
      sound = sound2;
      showStar = 50;
      break;
    case 101: //E
      row = 0;
      col = 2;
      sound = sound2;
      showColWheel = 50;
      resetColorWheel();
      break;
    case 114: //R
      row = 0;
      col = 3;
      sound = sound1;
      showLine = 40;
      resetShootingLine();
      break;
    case 116: ///T
      row = 0;
      col = 4;
      sound = sound1;
      resetFadingRectangle();
      break;
      
    case 97: //A
      row = 1;
      col = 0;
      //sound = sound11;      
      resetFallingCircles();
      break;
    case 115: //S
      row = 1;
      col = 1;
      sound = sound2;
      showStar = 50;
      break;    
    case 100: //D
      row = 1;
      col = 2;
      sound = sound2;
      showColWheel = 50;
      resetColorWheel();      
      break;
    case 102: //F
      row = 1;
      col = 3;
      sound = sound2;
      showLine = 40;
      resetShootingLine();      
      break;
    case 103: //G
      row = 1;
      col = 4;
      sound = sound2;
      showRect = 30;
      resetFadingRectangle();      
      break;
                  
      

    case 122: //Z
      row = 2;
      col = 0;
      //sound = sound20;
      resetFallingCircles();
      break;
    case 120: //X
      row = 2;
      col = 1;
      sound = sound2;
      showStar = 50;
      break;      
    case 99: //C
      row = 2;
      col = 2;
      showColWheel = 50;
      resetColorWheel(); 
      break;       
    case 118: //V
      row = 2;
      col = 3;
      showLine = 40;
      resetShootingLine(); 
      break;          
    case 98: //V
      row = 2;
      col = 4;
      showRect = 30;
      resetFadingRectangle(); 
      break;             
    //Spacebar
    case 32:
      row = 4;
      col = 11; //spacebar
      sound = sound1;
      changeCanvasColor();
      break;
  }
  sound.play();
  println(canvasColor[canvasIndex%canvasColor.length])
}











