var ball;
var trail = [];
var trash;
var trailbutton;
var resetbutton;
var showtrail = false;
var crashsound;
var played = false;
//var obstacle;

function preload(){
  //soundFormats('mp3');
  crashsound = loadSound('https://dl.dropboxusercontent.com/u/16897511/crash.mp3');
}

function setup() {
  createCanvas(800, 500);
  ball = new Ball(8, width/2, height/2);
  frameRate(30);
  trailbutton = createButton('show trail');
  trailbutton.mousePressed(toggleTrail); 
  resetbutton = createButton('reset');
  resetbutton.mousePressed(reset);
  //obstacle = new Obstacle(width/3, height/2, 20, 40);
  trail = [];
  
  for (var i=0; i<6; i++){
    trail.push(new Ball( 4, ball.position.x, ball.position.y));
  }
  
}

function toggleTrail() {
  
  if (showtrail){
    trailbutton.html('show trail');
    trail = [];
    for (var i=0; i<6; i++){
      trail.push(new Ball( 4, ball.position.x, ball.position.y));
    }
   }
  if (!showtrail){
    trailbutton.html('hide trail');     
  }

  showtrail = !showtrail;
}

function draw() {
  background(137);
  ball.update();
  //obstacle.display();
  ball.checkEdges();
  //ball.checkCollision(obstacle);
  //if (showtrail){
    if (frameCount%18 == 0){
      trail.push(new Ball( 4, ball.position.x, ball.position.y))
      trash = trail.shift();
    }
    for (var i=0; i<trail.length; i++){
      if (showtrail){
        trail[i].display();
      }
    } 
  //}
  ball.display();
}

function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    ball.force = createVector(-1,0);
  }
  if (keyCode === RIGHT_ARROW) {
    ball.force = createVector(1,0);
  }
  if (keyCode === UP_ARROW) {
    ball.force = createVector(0,-1);
  }
  if (keyCode === DOWN_ARROW) {
    ball.force = createVector(0,1);
  }
  return false;
}

// Restart all the Mover objects randomly
function reset() {
  ball.position = createVector(width/2,height/2);
  ball.velocity.mult(0);
  ball.force.mult(0);
  ball.display();
  trail = [];
  if (showtrail){
    trailbutton.html('show trail');
    for (var i=0; i<6; i++){
      trail.push(new Ball( 4, ball.position.x, ball.position.y));
    }
    showtrail = false;
   }
}
  
function Ball(m,x,y) {
  this.mass = m;
  this.position = createVector(x,y);
  this.velocity = createVector(0,0);
  this.force = createVector(0,0);
}

Ball.prototype.update = function() {
  this.force.div(this.mass);
  this.velocity.add(this.force);
  this.position.add(this.velocity);
  if (!keyPressed){
    this.force.mult(0);
  }
};

Ball.prototype.display = function() {
  stroke(0);
  strokeWeight(2);
  fill(10);
  ellipse(this.position.x,this.position.y,32,32);
  fill(200);
  ellipse(this.position.x-8,this.position.y-9,7,7);
  ellipse(this.position.x,this.position.y-9,7,7);
  ellipse(this.position.x-4,this.position.y-3,7,7);
  noStroke();

  fill(color(200,0,0));
  if (keyIsPressed && keyCode==LEFT_ARROW){
    triangle(ball.position.x+18, ball.position.y, ball.position.x+28, ball.position.y-6, ball.position.x+28, ball.position.y+6);
  };
  if (keyIsPressed && keyCode==RIGHT_ARROW){
    triangle(ball.position.x-18, ball.position.y, ball.position.x-28, ball.position.y-6, ball.position.x-28, ball.position.y+6);
  };
  if (keyIsPressed && keyCode==DOWN_ARROW){
    triangle(ball.position.x, ball.position.y-18, ball.position.x-6, ball.position.y-28, ball.position.x+6, ball.position.y-28);
  };
  if (keyIsPressed && keyCode==UP_ARROW){
    triangle(ball.position.x, ball.position.y+18, ball.position.x-6, ball.position.y+28, ball.position.x+6, ball.position.y+28);
  };
};

Ball.prototype.checkEdges = function() {
  if ((this.position.y + 18 > height) || (this.position.y - 18 <0) ||(this.position.x +18 > width) || (this.position.x - 18<0)   ) {
    if (!played){
      crashsound.play();
      played = true;
    }
    this.velocity.mult(0);
  }
  else {
    played = false;
  }
};

/*
Ball.prototype.checkCollision = function(o) {
  if ((this.position.y + 17 > o.position.y) && (this.position.y -17 < (o.position.y+o.height)) && 
  (this.position.x +17> o.position.x) && (this.position.x -17 < (o.position.x+o.width))   ) {
    this.velocity.mult(0);
  }
}

function Obstacle(x,y,w,h) {
  this.position = createVector(x,y);
  this.width = w;
  this.height = h;
}

Obstacle.prototype.display = function(){
  fill(240);
  rect(this.position.x, this.position.y, this.width, this.height);
}
*/