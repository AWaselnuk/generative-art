// Drawing a circle point by point using p5.js

/* jshint esnext: true */

function setup() {
  createCanvas(640, 480);
  background(60); // set background canvas color
  strokeWeight(2);
  stroke(255, 255, 255); // set stroke color
  noFill(); // Don't fill shapes
  noLoop(); // Don't run the draw loop
}

// Drawing a circle

function draw() {
  background(60);
  let radius = 100;
  let centX = (width / 2);
  let centY = (height / 2);
  let step = 5;
  // Draw a circle point by point using
  // radians calculations
  for (let ang = 0; ang <= 360; ang += step) {
    let rad = radians(ang);
    let x = centX + (radius * cos(rad));
    let y = centY + (radius * sin(rad));
    point(x, y);
  }
}

