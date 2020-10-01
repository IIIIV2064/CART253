//Zhao's code.

//Basic settings

//Objects
  let bg ={
    r:0,
    g:0,
    b:0,
    w:1000,
    h:720,
    };

  let cov ={
    x:0,
    y:250,
    size:250,
    speed:10,
    r:250,
    };

  let me ={
    size: 100,
    rgb:250,
    };





function setup() {
    createCanvas(bg.w,bg.h);
    noStroke();
    noCursor();

    //set the value ONCE at the start
    cov.y=random(720);
    };


function draw() {

    background(bg.r,bg.g,bg.b);

    //move and draw covid
    cov.x=cov.x+cov.speed;
      if(cov.x>=bg.w){
        cov.x=0;
        cov.y=random(720);
        cov.speed+=2;
        if(cov.speed>=30){cov.speed=30};
      };

    fill(cov.r,0,0);
    ellipse(cov.x,cov.y,cov.size,cov.size);

    //draw ME!
    fill(me.rgb,me.rgb,me.rgb);
    ellipse(mouseX,mouseY,me.size,me.size);

    //does it touch?

    let d = int(dist(cov.x,cov.y,mouseX,mouseY));
    if(d <= cov.size/2 + me.size/2){
      noLoop();

      fill(250);
      textAlign(CENTER);
      textSize(50);
      text('YOU GOT THE COOF! Score:'+ cov.speed,bg.w/2,bg.h/2)
    };

    console.log(d);
    };


function point(){
  for( let pts =0; pts<=1000; pts++){
    
      stroke(255);
      point(random(cov.w),random(cov.h));

  }


};
