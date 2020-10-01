//Zhao's code.

//Basic settings

//Objects
  let bg ={
    r:0,
    g:0,
    b:0,
    w:720,
    h:800,
    };

  let cov ={
    x:bg.w/2,
    y:0,
    size:200,
    speed:10,
    r:250,
    };

  let me ={
    size: 100,
    rgb:250,
    x:bg.w/2,
    y:700,
    speed:7,
    left:false,
    right:false,
    };

  score = 0;



function setup() {
    createCanvas(bg.w,bg.h);
    noCursor();

    //set the value ONCE at the start
    cov.x=random(bg.w);
    }

//player movement

function keyPressed(){
        if (keyCode === LEFT_ARROW) {
          me.left = true;
          me.right = false;
        }

        else if (keyCode === RIGHT_ARROW) {
          me.right = true;
          me.left = false;
        }
       }

function draw() {
    //basic interface
    background(bg.r,bg.g,bg.b);



    //static
    for( let pts =0; pts<=1000; pts++){

        stroke('white');
        point(random(bg.w),random(bg.h));
        };

    //covid movement
    cov.y=cov.y+cov.speed;

      if(cov.y>=bg.h){
        //reset covid position
        cov.x=random(bg.w);
        cov.y=0;
        score++;
      }

    //player movement
      me.x = constrain(me.x,0,bg.w)

      if(me.left==true){
        me.x-=me.speed;
      }
      if(me.right==true){
        me.x+=me.speed;
      }

    //difficulty increase
      if(score<=10){
        cov.speed = cov.speed;

      }
      else if(score>10&&score<=20){
        cov.speed = 15

      }
      else{
        cov.speed = 20

      }

    //draw covid & me

    noStroke();
    fill(cov.r,0,0);
    ellipse(cov.x,cov.y,cov.size);

    noStroke();
    fill(me.rgb,me.rgb,me.rgb);
    ellipse(me.x,me.y,me.size);

    //does it touch?

    let d = int(dist(cov.x,cov.y,me.x,me.y));
    if(d <= cov.size/2 + me.size/2){
      noLoop();

      //notification when it does (aka when you lose)
      fill(cov.r,0,0);
      textAlign(CENTER);
      textSize(50);
      text('YOU GOT THE COOF!',bg.w/2,bg.h/2)
    }

    //scorebar
    fill(250);
    textAlign(RIGHT);
    textSize(25);
    text('VIRUS DODGED: '+ score,250,50)

    //console.log(score);
}
