/* jshint esnext: true */

function setup() {
  createCanvas(640, 480);
  background(60); // set background canvas color
  strokeWeight(2);
  stroke(255, 255, 255); // set stroke color
  noFill(); // Don't fill shapes
  noLoop(); // Don't run the draw loop

  // Global config
  this.config = {
    radius: 100,
    centX: (width / 2),
    centY: (height / 2),
    step: 5 // step value for angle
  };

  // Global mutable state
  this.state = {
    angle: 0
  };
}



// Main draw loop
function draw() {
  let rad = radians(this.state.angle);
  let x = this.config.centX + (this.config.radius * cos(rad));
  let y = this.config.centY + (this.config.radius * sin(rad));
  point(x, y);
  this.state.angle += this.config.step;
}

function mousePressed() {
  loop();
}

function mouseReleased() {
  noLoop();
}
