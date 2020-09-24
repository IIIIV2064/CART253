//basic settings
w=1080
h=720
speedm=5
speedg=2

let bgc = {
r:0,
g:0,
b:0,

};

let circle1 = {
  x: 0,
  y: h/2,
  size: 200,
  fill: 255,
  alpha: 100,
}
let circle2 = {
  x: w,
  y: h/2,
  size: 100,
  fill: 255,
}



function setup() {
  createCanvas(w,h);
    noStroke();
}

function draw() {
  //background
  bgc.r = bgc.r+=1;
  background(bgc.r,0,0);



  //circle1

  circle1.size = circle1.size + speedg;
  circle1.x = circle1.x + speedm;
  circle1.x = constrain(circle1.x,0,w/2)

  fill(circle1.fill,circle1.alpha);
  ellipse(circle1.x, circle1.y, circle1.size);


  //circle2
  circle2.size = circle2.size + speedg;
  circle2.x = circle2.x - speedm;
  circle2.x = constrain(circle2.x,w/2,w)

  fill(circle2.fill);
  ellipse(circle2.x, circle2.y, circle2.size);
}
