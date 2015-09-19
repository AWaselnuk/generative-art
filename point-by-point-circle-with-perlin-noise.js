/* jshint esnext: true */

function setup() {
  createCanvas(640, 480);
  background(60); // set background canvas color
  strokeWeight(3);
  stroke(255, 255, 255); // set stroke color
  noFill(); // Don't fill shapes
  noLoop(); // Don't run the draw loop

  // Global config
  this.config = {
    radius: width / 3,
    centX: width / 2,
    centY: height / 2,
    step: 5 // step value for angle
  };

  // Global mutable state
  this.state = {
    angle: 0
  };
}


// Main draw loop
function draw() {
  strokeWeight(mouseX / 100);
  stroke(random(150, 255)); // random whiteness
  let rad = radians(this.state.angle);
  let radius = this.config.radius * (0.4 + noise(mouseX, mouseY));
  let x = this.config.centX + (radius * cos(rad));
  let y = this.config.centY + (radius * sin(rad));
  point(x, y);
  this.state.angle += this.config.step * (1 + noise(this.config.step));
}

function mousePressed() {
  loop(); // starts running the draw loop
}

function mouseReleased() {
  noLoop();
}

function keyReleased() {
  log(`CLEARED with: ${key}`);
  background(60);
}

// Utils
function log(msg) {
  console.log(msg);
}


