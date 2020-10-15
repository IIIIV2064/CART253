/**************************************************
Simulation 01
Zhao

Using the security cam and watch over something.. I guess
**************************************************/
"use strict";

// Creating the objects

let bg = {
  r: 0,
  g: 0,
  b: 0,

  w: 1200,
  h: 750,
};

let base ={
  x:bg.w/2,
  y:0,

  w:200,
  h:100,

  c:250,
};

let casing ={
  x:bg.w/2,
  y:base.h/2,

  size:200,

  c:20,
  alpha:400,
};

let lens ={
  x:0,
  y:0,

  size:40,

  c:250,
  alpha:200,
};

let light ={
  x:0,
  y:0,

  size:200,

  c:250,


};

let invader ={
  x:0,
  y:0,

  size:50,

  c:0,
  alpha:0,
  speed:5,
};

let cursor ={
  x:bg.w/2,
  y:bg.h/2,

  speed:10,
};

let d=0;
let inputMode = 'mouse';
let state = 'title'
let hp = 10;

//fixed positions


// basic starup

function preload(){


};

function setup() {
        createCanvas(bg.w, bg.h);

        invader.y = random(bg.h);
};

// controls option
function keyPressed() {
      if(state === 'title'){state = 'game'; inputMode = 'key'}
};

function doubleClicked(){
      if(state === 'title'){state = 'game'; inputMode = 'mouse'}
};

// create the visuals
function draw() { //state checking and state changing

        background(bg.r, bg.g, bg.b);  //refresh background

        if(inputMode === 'mouse'){ // use mouse to control the camera
          cursor.x = mouseX;
          cursor.y = mouseY;

        }else if(inputMode === 'key'){ // use keyboard to control the camera (hard)
          keyControl();
        };

        if (state === 'title') {
          title();
        }
        if (state === 'game') {
          game();
        };
        if (state === 'end') {
          end();
        };

        //result check
        if (hp <= 0){
          state = 'end'
        }
};


function game() { //working part of game


      drawLight(); //draw light first so it appears below camera

      drawCamera();

      drawInvader();


      //interaction with invader
      //reaching the end
          if(invader.x == bg.w ){
            resetInvaderPos(); //reset position
            hp --;
          };

      //cursor meets invader
        d = int(dist(cursor.x,cursor.y,invader.x,invader.y));

        if (d <= invader.size + 100){
          invader.alpha = 500; //make the inv more visible when in proximity of spotlight
        }else{
          invader.alpha = 100; //make less visible outside of spotlight
        };

        if (mouseIsPressed && d <= invader.size){
            resetInvaderPos();
        };


        console.log(inputMode)
};
// control scheme for keyboard
  function keyControl(){
        if (keyIsDown(LEFT_ARROW)){
            cursor.x -= cursor.speed
        };
        if (keyIsDown(RIGHT_ARROW)){
            cursor.x += cursor.speed
        };
        if (keyIsDown(UP_ARROW)){
            cursor.y -= cursor.speed
        };
        if (keyIsDown(DOWN_ARROW)){
            cursor.y += cursor.speed
        };

  };


//object creations
  function drawCamera(){     //generate the camera

      //lens movement (tracking + size change WIP)
      lens.x=map(cursor.x,0,bg.w,base.x-base.w/2,base.x+base.w/2)
      lens.x=constrain(lens.x,base.x-base.w/2,base.x+base.w/2)

      lens.y=map(cursor.y,0,bg.h,casing.y,casing.y+casing.size/2)
      lens.y=constrain(lens.y,casing.y,casing.y+casing.size/2+lens.size/2);

      let lensZoom = int(dist(lens.x,lens.y,cursor.x,cursor.y));

      lens.size = map(lensZoom,0,800,20,60)

      console.log(lensZoom)

      //draw the camera
      push();

        noStroke();

        fill(casing.c,casing.alpha);
        ellipse(casing.x,casing.y,casing.size);


        fill(lens.c,0,0,lens.alpaha)
        ellipse(lens.x,lens.y,lens.size)

        rectMode(CENTER);
        fill(base.c);
        rect(base.x,base.y,base.w,base.h);

        //text
        fill(0);
        textAlign(CENTER);
        textSize(30);
        text('HP '+hp+'/10',bg.w/2,40)

      pop();
  };

  function drawLight(){      //generate spotlight
      push();

        noStroke();

        fill(light.c);
        ellipse(cursor.x,cursor.y,light.size)

      pop();
  };

  function drawInvader(){   //generate Invader

    //invader movement

      invader.x += invader.speed;
      invader.y = constrain(invader.y,casing.y+casing.size,bg.h); // so it oonly spawns underneeth camera

    //draw invader
      push();

        noStroke();
        fill(invader.c,invader.alpha);
        ellipse(invader.x,invader.y,invader.size);


      pop();
  };

  //reactions to interactions
  function resetInvaderPos(){
          invader.x = 0;
          invader.y = random(bg.h);
  };


  // title screen & end screen
  function title() {
      push();
          fill(250,0,0);
          textAlign(CENTER);
          textSize(50);
          textStyle(BOLDITALIC);

          text('SPOT THE INTRUDER',bg.w/2,bg.h/3);

          fill(200);
          textSize(25);
          text('DOUBLECLICK TO USE MOUSE CONTROL (EASY) \n Mouse to Move and Click to Target',bg.w/2,bg.h*0.65);
          text('PRESS ANY KEY TO USE KEYBOARD CONTROL (HARD) \n Arrow Keys to Move and Space to Target',bg.w/2,bg.h*0.85);
      pop();
  };

  function end() {
      push();
          fill(250,0,0);
          textAlign(CENTER);
          textSize(50);
          textStyle(BOLDITALIC);

          text('THEY GOT AWAY',bg.w/2,bg.h/2)
     pop();

  };
