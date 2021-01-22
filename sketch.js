let trail;
let trash;
let trailbutton;
let resetbutton;
let showtrail = false;
let crashsound;
let played = false;
let trailupdate;
let counter = 0;
let ball;
let home;

function preload() {
  soundFormats('mp3');
  crashsound = loadSound('crash.mp3');
}

function setup() {
  createCanvas(800, 500);
  frameRate(30);
  trailbutton = createButton('show trail');
  trailbutton.mousePressed(toggleTrail);
  resetbutton = createButton('reset');
  resetbutton.mousePressed(reset);
  resetbutton.position(20, 60);
  trailbutton.position(90, 60);
  home = createVector(width / 2, height / 2);
  ball = new Ball(4, home.x, home.y);
  trail = new Array(0);
}

function toggleTrail() {
  if (showtrail) {
    trailbutton.html('show trail');
  }
  if (!showtrail) {
    trailbutton.html('hide trail');
  }
  showtrail = !showtrail;
}

function draw() {
  background(237);
  strokeWeight(.2);
  stroke(50);
  //Floor grid
  for (let i = 0; i < 23; i++) {
    line(0, 40 * i, width, 40 * i);
    line(40 * i, 0, 40 * i, height);
  }
  ball.update();
  ball.checkEdges();
  ball.display();
  counter++;
}

function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    ball.force = createVector(-1, 0);
  }
  if (keyCode === RIGHT_ARROW) {
    ball.force = createVector(1, 0);
  }
  if (keyCode === UP_ARROW) {
    ball.force = createVector(0, -1);
  }
  if (keyCode === DOWN_ARROW) {
    ball.force = createVector(0, 1);
  }
  return false;
}

function reset() {
  ball.force.mult(0);
  ball.velocity.mult(0);
  ball.position = home;
}

function Ball(m, x, y) {
  this.mass = m;
  this.position = createVector(x, y);
  this.velocity = createVector(0, 0);
  this.force = createVector(0, 0);
}

Ball.prototype.update = function() {
  if (counter % 20 == 0) {
    trail.unshift({
      x: ball.position.x,
      y: ball.position.y
    });
  }
  if (trail.length > 8) {
    trail.pop();
  }


  this.force.div(this.mass);
  this.velocity.add(this.force);
  this.position.add(this.velocity);
  if (!(keyIsDown(LEFT_ARROW)||keyIsDown(RIGHT_ARROW)||keyIsDown(UP_ARROW)||keyIsDown(DOWN_ARROW))) {
    this.force.mult(0);
  } else {
    if (keyCode === LEFT_ARROW) {
      ball.force = createVector(-1, 0);
    }
    if (keyCode === RIGHT_ARROW) {
      ball.force = createVector(1, 0);
    }
    if (keyCode === UP_ARROW) {
      ball.force = createVector(0, -1);
    }
    if (keyCode === DOWN_ARROW) {
      ball.force = createVector(0, 1);
    }
  }
};

Ball.prototype.display = function() {


  if (showtrail) {
    for (const entry of trail) {
      stroke(0);
      strokeWeight(2);
      fill(10);
      ellipse(entry.x, entry.y, 32, 32);
      fill(200);
      ellipse(entry.x - 8, entry.y - 9, 7, 7);
      ellipse(entry.x, entry.y - 9, 7, 7);
      ellipse(entry.x - 4, entry.y - 3, 7, 7);
      noStroke();
      fill(color(200, 0, 0));
    }
  }
  stroke(0);
  strokeWeight(2);
  fill(10);
  ellipse(this.position.x, this.position.y, 32, 32);
  fill(200);
  ellipse(this.position.x - 8, this.position.y - 9, 7, 7);
  ellipse(this.position.x, this.position.y - 9, 7, 7);
  ellipse(this.position.x - 4, this.position.y - 3, 7, 7);
  noStroke();
  fill(color(200, 0, 0));

  if (keyIsPressed && keyCode == LEFT_ARROW) {
    triangle(this.position.x + 18, this.position.y,
      this.position.x + 28, this.position.y - 6,
      this.position.x + 28, this.position.y + 6
    );
  };
  if (keyIsPressed && keyCode == RIGHT_ARROW) {
    triangle(ball.position.x - 18, ball.position.y,
      ball.position.x - 28, ball.position.y - 6,
      ball.position.x - 28, ball.position.y + 6
    );
  };
  if (keyIsPressed && keyCode == DOWN_ARROW) {
    triangle(ball.position.x, ball.position.y - 18,
      this.position.x - 6, this.position.y - 28,
      this.position.x + 6, this.position.y - 28
    );
  };
  if (keyIsPressed && keyCode == UP_ARROW) {
    triangle(ball.position.x, ball.position.y + 18,
      this.position.x - 6, this.position.y + 28,
      this.position.x + 6, this.position.y + 28
    );
  };
};

Ball.prototype.checkEdges = function() {
  if (((this.position.y + 18 > height) || (this.position.y - 18 < 0)) && !played) {
    this.velocity.y = -0.2 * this.velocity.y;
    this.velocity.x = 0.5 * this.velocity.x;
    crashsound.play();
    played = true;
  }

  if (((this.position.x + 18 > width) || (this.position.x - 18 < 0)) && !played) {
    this.velocity.y = 0.5 * this.velocity.y;
    this.velocity.x = -0.2 * this.velocity.x;
    crashsound.play();
    played = true;
  }

  if ((this.position.y + 20 < height) && (this.position.y - 20 > 0) &&
    (this.position.x + 20 < width) && (this.position.x - 20 > 0)) {
    played = false;
  }
};
