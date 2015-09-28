/* jshint esnext: true */

function setup() {
  createCanvas(windowWidth, windowHeight);
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
    step: 5, // step value for angle
    pointConnectThreshold: 200 // distance below which we connect points
  };

  // Global mutable state
  this.state = {
    angle: 0
  };

  this.points = [];
}


// Main draw loop
function draw() {
  // Calculate point, add it to points, draw it canvas
  let rad = radians(this.state.angle);
  let radius = this.config.radius * (0.4 + noise(mouseX, mouseY));
  let x = this.config.centX + (radius * cos(rad));
  let y = this.config.centY + (radius * sin(rad));
  this.points.push([x, y]);
  strokeWeight(mouseX / 100);
  point(x, y);

  // Draw curve between two random points
  // two extra points are used as control points
  if (this.points.length >= 4 && random() < 0.2) {
    strokeWeight(1);
    connectRandomPointsWithCurve.call(this);
  }

  // Increment angle by step with added noise
  this.state.angle += this.config.step * (1 + noise(this.config.step));
}

function connectRandomPoints() {
  let [x1, y1] = sample(this.points);
  let [x2, y2] = sample(this.points);
  line(x1, y1, x2, y2);
}

function connectRandomPointsWithCurve() {
  let [x1, y1] = sample(this.points); // control point
  let [x2, y2] = sample(this.points);
  let [x3, y3] = sample(this.points);
  let [x4, y4] = sample(this.points); // control point
  curve(x1, y1, x2, y2, x3, y3, x4, y4);
}

function connectNearbyPointsWithLine() {
  let point1 = [x1, y1] = sample(this.points);
  let point2 = [x2, y2] = sample(this.points);
  if (distanceBetweenPoints(point1, point2) < this.config.pointConnectThreshold) {
    line(x1, y1, x2, y2);
  }
}

function mousePressed() {
  loop(); // starts running the draw loop
}

function mouseReleased() {
  noLoop();
}

function keyReleased() {
  console.log(`CLEARED with: ${key}`);
  background(60);
}

function distanceBetweenPoints(point1, point2) {
  let [x1, y1] = point1;
  let [x2, y2] = point2;
  let dist = Math.sqrt(Math.pow((x1-x2), 2) + Math.pow((y1-y2), 2));
  return dist;
}

function sample(collection) {
  return collection[Math.floor(random(collection.length))];
}


