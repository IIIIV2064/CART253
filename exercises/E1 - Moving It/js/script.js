//Basic values
w=1000
h=600


//Objects
let bg = {
  r:207,
  g:207,
  b:207,
};

let base ={
  x:290,
  y:0,
  w:420,
  h:200,
  fill:250,
};

let casing ={
  x:w/2,
  y:200,
  size:400,
  fill:0,
  alpha:400,
};

let lens ={
  x:w/2,
  y:200,
  size:78,
  fill:250,
  alpha:200,
};



function setup() {
  createCanvas(w,h);
  noStroke();

  //some borders values so i dont have to repeat the equation every single time
    lensBL = w/2-casing.size/2+lens.size/2;
    lensBR = w/2+casing.size/2-lens.size/2;
    lensBU = lens.y;
    lensBD = lens.y+casing.size/2-lens.size/2;
}

function draw() {


  //color of the background
  bg.r= map(mouseX,0,w,0,255);
  bg.g= map(mouseY,0,h,0,255);
  bg.b= map(mouseX,0,h,0,255);
  background(bg.r,bg.g,bg.b);



  //draw base
  fill(casing.fill,casing.alpha);
  ellipse(casing.x,casing.y,casing.size,casing.size);

  //draw lens and moving codes

    //size of the lens
    lens.size=map(mouseY,0,h,50,100)

    //moving the lens
    lens.x=map(mouseX,0,w,300,700);
    lens.x=constrain(lens.x,lensBL,lensBR);
    lens.y=map(mouseY,0,h,200,400)
    lens.y=constrain(lens.y,lensBU,lensBD);


  fill(lens.fill,0,0,lens.alpha);
  ellipse(lens.x,lens.y,lens.size,lens.size);

  //draw casing
  fill(base.fill)
  rect(base.x,base.y,base.w,base.h);


}
