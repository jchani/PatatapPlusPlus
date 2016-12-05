
var row = 0; var col = 0; //row and column of the current key press (col set to 10 so no animations)
var colour;
var canvasColor = [127, "#00BFFF","#F5F5DC"]; // Array of colors to cycle through: Blue, Beige,
var canvasIndex = 0; 
var sound; //current sound

var showStar = 0;var showColWheel = 0;var showLine = 0;//ints that will be decremented: 0 - no animation, any other number - animation

var colWheel = []; // holds colors of rectangles in color wheel
var numRectangles = 0; var colWheelX; var colWheelY;

var fallingCircles = []; // holds falling circles
var numfallingCircles = 0; //Number of objects in fallingCircles array

var shootingLineX = 0;var shootingLineY = 0;var lineDeltaX = 0;var lineDeltaY = 0;var startDir;//length of line is constant in one animation

var liquid; // Liquid

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
  FallingCircles(colour);
  shiningStar();
  colorWheel();
  shootingLine();
  
}


function keyTyped() { 
  println("Key typed is: " + int(keyCode))
  switch(keyCode){
    //Q-P
    case 113:
      row = 0;     
      col = 0;
      sound = sound1;
      resetFallingCircles();
      break;   
    case 119:
      row = 0;
      col = 1;
      sound = sound2;
      showStar = 50;
      break;
    case 101: 
      row = 0;
      col = 2;
      sound = sound2;
      showColWheel = 50;
      resetColorWheel();
      break;
    case 114:
      row = 0;
      col = 3;
      sound = sound1;
      showLine = 40;
      resetShootingLine();
      break;
    //A-S
    case 97:
      row = 1;
      col = 0;
      //sound = sound11;      
      resetFallingCircles();
      break;
    case 115:
      row = 1;
      col = 1;
      sound = sound2;
      showStar = 50;
      break;    
    //Z-X
    case 122:
      row = 2;
      col = 0;
      //sound = sound20;
      resetFallingCircles();
      break;
    case 120:
      row = 2;
      col = 1;
      sound = sound2;
      showStar = 50;
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

function changeCanvasColor(){
  canvasIndex++;
  background(canvasColor[canvasIndex%canvasColor.length]);
}

function shiningStar(){
  if(showStar > 0){
    var x = random(0,width);
    var y = random(0,height);
    stroke(0);
    strokeWeight(5);
    line(x,y,width/2,height/2);
    strokeWeight(1);
    fill(colour);    
    ellipse(width/2,height/2,20,20);
    //strokeWeight(0);
    //ellipse(x,y,40,40);
    
    showStar--;
  }
}

function resetShootingLine(){
  startDir = random([0,1,2,3])
  if(startDir === 0){//top
    shootingLineX = random(width);   
    shootingLineY = 0;
  }
  else if(startDir === 1){//right
    shootingLineX = width;   
    shootingLineY = random(height);    
  }
  else if(startDir ===2){//bottom
    shootingLineX = random(width);   
    shootingLineY = height;    
  }
  else{ //left
    shootingLineX = 0;
    shootingLineY = random(height);
  }

  lineDeltaX = Math.abs(shootingLineX - width/2)/10;
  lineDeltaY = Math.abs(shootingLineY - height/2)/10;
  println("lineDeltaX: " + lineDeltaX);
  println("lineDeltaY: " + lineDeltaY);
  
}

function shootingLine(){
  stroke(0);
  strokeWeight(2);
  if(showLine > 0){
    //translate(lineDeltaX,lineDeltaY);
    line(shootingLineX, shootingLineY, width/2, height/2);
  }
  showLine--;
}

function movingCircle(){
  
}

function flashingCircles(){
  
}

function wheelRectangle(framecount,colour){
  this.framecount = framecount;
  this.colour = colour;
}

// Restart all the color rectangles randomly
function resetColorWheel() {
  colWheel = [];
  numRectangles = 0;
  colWheelX = random(75, width-75);
  colWheelY = random(75, height-75);
}

function colorWheel(){
	if(showColWheel > 0){
	  for(var i = 0; i < numRectangles; i++){//re-draw previous rectangles
    	if(colWheel[i]!== null){
     	  fill(colWheel[i].colour);
    	  push();
    	  translate(colWheelX, colWheelY);
    		rotate(radians(colWheel[i].framecount*20));
    		rect(0, 0, 80, 20);
    		pop();    	  
    	}
	  }
	  //store new rectangle
    colWheel[numRectangles] = new wheelRectangle(frameCount, color(random(255), random(255), random(255)));	  
	  
    //draw new rectangle
    fill(colWheel[numRectangles].colour);
	  push();
	  translate(colWheelX, colWheelY);
  	rotate(radians(colWheel[numRectangles].framecount*20));
  	rect(0, 0, 80, 20);
    pop();   	  
    
	  numRectangles++;
	  showColWheel--;	 
	}
}

// Restart all the Mover objects randomly
function resetFallingCircles() {
  for (var i = 0; i < 9; i++) {
    fallingCircles[i] = new Mover(random(1, 3), (i+1) * height/10, 0);
  }
}

//Falling circles animation
function FallingCircles(colour){
  // Draw water
  liquid.display();

  for (var i = 0; i < fallingCircles.length; i++) {
    // Is the Mover in the liquid?
    if (liquid.contains(fallingCircles[i])) {
      // Calculate drag force
      var dragForce = liquid.calculateDrag(fallingCircles[i]);
      // Apply drag force to Mover
      fallingCircles[i].applyForce(dragForce);
    }

    // Gravity is scaled by mass here!
    var gravity = createVector(0, 0.5*fallingCircles[i].mass);
    // Apply gravity
    fallingCircles[i].applyForce(gravity);
   
    // Update and display
    //fallingCircles[i].clear();
    fallingCircles[i].update();
    fallingCircles[i].display(colour);
  }  
}

function Liquid(x, y, w, h, c) {
  this.x = x;
  this.y = y;
  this.w = w;
  this.h = h;
  this.c = c;
}
  
// Is the Mover in the Liquid?
Liquid.prototype.contains = function(m) {
  var l = m.position;
  return l.x > this.x && l.x < this.x + this.w &&
         l.y > this.y && l.y < this.y + this.h;
};
  
// Calculate drag force
Liquid.prototype.calculateDrag = function(m) {
  // Magnitude is coefficient * speed squared
  var speed = m.velocity.mag();
  var dragMagnitude = this.c * speed * speed;

  // Direction is inverse of velocity
  var dragForce = m.velocity.copy();
  dragForce.mult(-1);
  
  // Scale according to magnitude
  // dragForce.setMag(dragMagnitude);
  dragForce.normalize();
  dragForce.mult(dragMagnitude);
  return dragForce;
};
  
Liquid.prototype.display = function() {
  noStroke();
  noFill();
  rect(this.x, this.y, this.w, this.h);
};

function Mover(m,x,y) {
  this.mass = m;
  this.position = createVector(x,y);
  this.velocity = createVector(0,0);
  this.acceleration = createVector(0,0);
}

// Newton's 2nd law: F = M * A
// or A = F / M
Mover.prototype.applyForce = function(force) {
  var a = p5.Vector.div(force,this.mass);
  this.acceleration.add(a);
};
  
Mover.prototype.update = function() {
  // Velocity changes according to acceleration
  this.velocity.add(this.acceleration);
  // position changes by velocity
  this.position.add(this.velocity);
  // We must clear acceleration each frame
  this.acceleration.mult(0);
};

Mover.prototype.display = function(colour) {
  stroke(0);
  strokeWeight(2);
  fill(colour);
  ellipse(this.position.x,this.position.y,this.mass*16,this.mass*16);
};

Mover.prototype.clear = function() {
  stroke(canvasColor[canvasIndex%canvasColor.length]);
  strokeWeight(3);  
  fill(canvasColor[canvasIndex%canvasColor.length]);
  ellipse(this.position.x,this.position.y,this.mass*16,this.mass*16);
};

