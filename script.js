var doc;
var canvas;
var ctx;
var WIDTH = 400, HEIGHT = 400;
var bubbles;
var loc;

class Bubble {
  constructor (x, y, r, startAngle, endAngle, clockwise, ranColor) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.startAngle = startAngle;
    this.endAngle = endAngle;
    this.clockwise = clockwise;
    this.ranColor = ranColor;
  }

  clicked() {
    let d;
    d = dist(loc.x, loc.y, this.x, this.y);

    if ( d < this.r ) {
     var red = genRan(0, 255);
      var green = genRan(0, 255);
      var blue = genRan(0, 255);
      var aph = genRan(1, 10)/10;
      this.ranColor = 'rgba('+red+', '+green+', '+blue+', '+aph+')';
    }
  }

  move() {
    this.x += genRan(-1, 1);
    this.y += genRan(-1, 1);
  }

  draw() {
   ctx.save();
    ctx.lineWidth = genRan(-10, 10)/5;
    ctx.strokeStyle = "#fff";
    ctx.fillStyle = this.ranColor;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, this.startAngle, this.endAngle, this.clockwise);
    ctx.stroke();
    ctx.fill();
    ctx.restore();
  }
}

function main() {
  doc = document;
  canvas = doc.createElement('canvas');
  ctx = canvas.getContext('2d');
  canvas.width = WIDTH;
  canvas.height = HEIGHT;

  doc.body.appendChild(canvas);

  init();

  var loop = function() {
    draw();
    window.requestAnimationFrame(loop, canvas);
  }

  canvas.addEventListener('click', mouseClicked, false);
  window.requestAnimationFrame(loop, canvas);
}

function init() {

  createBubble();

}

function drawBackground() {
  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, WIDTH, HEIGHT);
}

function genRan(val1, val2) {
  var ranNum = Math.floor(Math.random()*((val2 - val1) + 1) )+val1;
  return ranNum;
}

function dist(x1, y1, x2, y2) {
  var distX;
  var distY;
  var magnitude;

  distX = x2 - x1;
  distY = y2 - y1;
  magnitude = Math.sqrt(Math.pow(distX, 2) + Math.pow(distY, 2));

  return magnitude;
}

function windowToCanvas(canvas, x, y) {
  var bbox = canvas.getBoundingClientRect();

  return {
    x: x - bbox.left * ( canvas.width / bbox.width ),
    y: y - bbox.top * ( canvas.height / bbox.height )
  }
}

function mouseClicked(e) {
  var evt = e;
  loc = windowToCanvas(canvas, e.clientX, e.clientY);

  //if I delete two bubbles in the same time and the one of the bubbles
  //came right before the other, the index will have some problem, because
  //the next one will not be checked, this way to not have this problem,
  //I change the for loop
  for ( let i = bubbles.length-1; i >= 0; i-- ) {
    let d;
    d = dist(loc.x, loc.y, bubbles[i].x, bubbles[i].y);

    if ( d < bubbles[i].r ) {
      console.log(bubbles[i]);
      bubbles.splice(i, 1);
    }
  }

}

function createBubble(evt) {
  bubbles = [];

  var radius;
  var startAngle;
  var endAngle;

 for ( let i = 0; i < 5; i++ ) {
    radius = genRan(WIDTH / 20, WIDTH / 5);
    posX = genRan(0 + radius, WIDTH - radius);
    posY = genRan(0 + radius, HEIGHT - radius);
    startAngle = 0;
    endAngle = Math.PI * 2;

    b = new Bubble(posX, posY, radius, startAngle, endAngle, true, 0);

    bubbles.push(b);
 }
}

function draw() {

  drawBackground();

  for ( let b of bubbles ) {
    b.move();
    b.draw();
  }

}

main();
