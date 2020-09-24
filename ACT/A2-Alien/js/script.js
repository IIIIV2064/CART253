//basic values
h=720
w=720

function setup() {
  createCanvas(h,w);
  noStroke();
}

function draw() {
  background(0,10,20);

  //face
  fill(50,205,50);
  ellipse(h/2,w/2,400,500);

  //mouth
  fill(0);
  ellipse(h/2,500,50,50);

  //nose and eyes
  triangle(h/2,450,h/2-50,400,h/2+50,400);

  triangle(h/2,250,h/2-50,400,h/2+50,400);

  triangle(h/2-20,250,h/2-150,250,h/2-30,275);

  triangle(h/2+20,250,h/2+150,250,h/2+30,275);



}
