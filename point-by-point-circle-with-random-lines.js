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

  this.points = [];

  this.reportDistanceOfLastPoints = function () {
    if (this.points.length < 2) {
      return false;
    }

    let distance = distanceBetweenPoints(
      this.points[this.points.length - 1],
      this.points[this.points.length - 2]
    );
    console.log(distance);
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

  // Add point to points and draw it to canvas
  this.points.push([x, y]);
  point(x, y);

  // Draw line connecting points
  this.connectRandomPoints = () => {
    if (this.points.length < 2) {
      return false;
    }
    let [x1, y1] = sample(this.points);
    let [x2, y2] = sample(this.points);
    line(x1, y1, x2, y2);
  };
  this.connectRandomPoints();

  // Increment angle by step with added noise
  this.state.angle += this.config.step * (1 + noise(this.config.step));
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
//   TODO add floor.
  return collection[Math.floor(random(collection.length))];
}


