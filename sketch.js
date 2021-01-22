var ball;
var trail = [];
var trash;
var trailbutton;
var resetbutton;
var showtrail = false;
var crashsound;
var played = false;

function preload(){
  soundFormats('mp3');
  crashsound = loadSound('crash2.mp3');
}

function setup() {
  createCanvas(800, 500);
  ball = new Ball(8, width/2, height/2);
  frameRate(30);
  trailbutton = createButton('show trail');
  trailbutton.mousePressed(toggleTrail);
  resetbutton = createButton('reset');
  resetbutton.mousePressed(reset);
  resetbutton.position(20, 60);
  trailbutton.position(90, 60);
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
  background(237);
  strokeWeight(.2);
  for (var i = 0; i < 23; i++){
    line(0,40*i,width,40*i);
    line(40*i,0, 40*i, height);
  }
  ball.update();
  ball.checkEdges();
  if (frameCount%18 == 0){
    trail.push(new Ball( 4, ball.position.x, ball.position.y));
    trail.shift();
  }
  for (var i=0; i<trail.length; i++){
    if (showtrail){
      trail[i].display();
    }
  }
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

  for (var i=0; i<trail.length; i++){
    trail[i].position.x = ball.position.x;
    trail[i].position.y = ball.position.y;
    /*if (showtrail){
      trail[i].display();
    }
    */
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
  if (((this.position.y + 18 > height) || (this.position.y - 18 <0)) && !played){
    this.velocity.y = -0.2*this.velocity.y;
    this.velocity.x = 0.5*this.velocity.x;
    crashsound.play();
    played = true;
  }

  if (((this.position.x + 18 > width) || (this.position.x - 18<0)) && !played){
    this.velocity.y = 0.5*this.velocity.y;
    this.velocity.x = -0.2*this.velocity.x;
    crashsound.play();
    played = true;
  }

  if ((this.position.y + 20 < height) && (this.position.y - 20 >0) && (this.position.x +20 <width) && (this.position.x - 20>0)){
      played = false;
  }
};
