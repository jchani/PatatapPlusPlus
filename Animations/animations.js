//ints that will be decremented: 0 - no animation, any other number - animation
var showStar = 0;var showLine = 0;


var arrFadingRectangles = []; //stores all instances of fading rectangles

var shootingLineX = 0;var shootingLineY = 0;var lineDeltaX = 0;var lineDeltaY = 0;var startDir;//length of line is constant in one animation

var arrColorWheels = [];

var arrFallingCircles = []; //stroes all instances of falling circles

var liquid; // slow-mo zone

//Spacebar
function changeCanvasColor(){
  canvasIndex++;
  background(canvasColor[canvasIndex%canvasColor.length]);
}

//P

//O, L


//I, K
function popcorn(){
  
}

//U, J, M
function circlesinCircle(){
  
}

//Y, H, N
function flashingCircles(){
  
}

//T, G, B
function fadingRectangle(x,y,width,height, show){
  this.x = x;
  this.y = y;
  this.rectWidth = width;
  this.rectHeight = height;
  this.colour = colour;
  this.show;
}

function resetFadingRectangle(){
  arrFadingRectangles.push(new fadingRectangle(width/4, height/3, width/2, height/4, 30));
}

function animateFadingRectangle(){
  //println("The elements in arrFadingRectangles are: " + arrFadingRectangles.toString());
  
  // for(var i = 0; i < arrFadingRectangles.length; i++){
  //   var r = arrFadingRectangles[i];
  //   if(r.rectWidth > 0){
  //     stroke(colour);
  //     fill('white');
  //     rect(r.x, r.y, r.rectWidth, r.rectHeight);
  //     r.rectWidth = r.rectWidth - 20;
  //   }
  // }
  println("length of arrFadingRectangles: " + arrFadingRectangles.length);
  for(var i = 0; i < arrFadingRectangles.length; i++){
    var r = arrFadingRectangles[i];
    if(r.rectWidth > 0){
      stroke(colour);
      fill('white');
      rect(r.x, r.y, r.rectWidth, r.rectHeight);
      r.rectWidth = r.rectWidth - 20;
    }
  }  
}

//R, F, V
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

  linerectanglesX = Math.abs(shootingLineX - width/2)/10;
  lineDeltaY = Math.abs(shootingLineY - height/2)/10;
  //println("lineDeltaX: " + lineDeltaX);
  //println("lineDeltaY: " + lineDeltaY);
  
}

function animateShootingLine(){
  stroke(0);
  strokeWeight(2);
  if(showLine > 0){
    //translate(lineDeltaX,lineDeltaY);
    line(shootingLineX, shootingLineY, width/2, height/2);
  }
  showLine--;
}

//E, D, C
function colorWheel(show,x,y){
  this.show = show; //if > 0, animation will be drawn
  this.rectangles = []; // holds colors of rectangles in color wheel
  this.numRectangles = 0; //current number of rectangles 
  this.x = x;
  this.y = y;
}

function wheelRectangle(framecount,colour){
  this.framecount = framecount;
  this.colour = colour;
}

// Restart all the color rectangles randomly
function resetColorWheel() {
  arrColorWheels.push(new colorWheel(50, random(75, width-75),random(75, height-75)));
}

function animateColorWheel(){
  for(var i = 0; i < arrColorWheels.length; i++){
    var cw = arrColorWheels[i]; //current Color Wheel
  	if(cw.show > 0){
  	  var rectangles = cw.rectangles;
  	  for(var j = 0; j < cw.numRectangles; j++){//re-draw previous rectangles
      	if(rectangles[j]!== null){
       	  fill(rectangles[j].colour);
      	  push();
      	  translate(cw.x, cw.y);
      		rotate(radians(rectangles[j].framecount*20));
      		rect(0, 0, 80, 20);
      		pop();    	  
      	}
  	  }
  	  //store new rectangle
      rectangles[cw.numRectangles] = new wheelRectangle(frameCount, color(random(255), random(255), random(255)));	  
  	  
      //draw new rectangle
      fill(rectangles[cw.numRectangles].colour);
  	  push();
  	  translate(cw.x, cw.y);
    	rotate(radians(rectangles[cw.numRectangles].framecount*20));
    	rect(0, 0, 80, 20);
      pop();   	  
  	  cw.numRectangles++;
  	  cw.show--;	 
  	}
  }
}



//W, S, X
function animateShiningStar(){
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



//Q, A, Z
function fallingCircles(circles){
  this.circles = circles; // holds falling circles
  this.numCircles = 0; //Number of objects in fallingCircles array
  this.colour = colour;
}


function resetFallingCircles() {
  var circles = [];
  for (var i = 0; i < 9; i++) {
    circles[i] = new Mover(random(1, 3), (i+1) * height/10, 0);
  }
  arrFallingCircles.push(new fallingCircles(circles));
}
function animateFallingCircles(){
  // Draw water
  liquid.display();
  for(var j = 0; j < arrFallingCircles.length; j++){
    var fc = arrFallingCircles[j];
    var circles = fc.circles;
    for (var i = 0; i < circles.length; i++) {
      // Is the Mover in the liquid?
      if (liquid.contains(circles[i])) {
        // Calculate drag force
        var dragForce = liquid.calculateDrag(circles[i]);
        // Apply drag force to Mover
        circles[i].applyForce(dragForce);
      }
  
      // Gravity is scaled by mass here!
      var gravity = createVector(0, 0.5*circles[i].mass);
      // Apply gravity
      circles[i].applyForce(gravity);
     
      // Update and display
      circles[i].update();
      circles[i].display(fc.colour);
    }  
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
