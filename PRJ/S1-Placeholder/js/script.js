/**************************************************
Simulation 01
Zhao

Using the security cam and watch over something.. I guess
Used a few non varibale numbers to specify anchors of images & colour of titles, I'm sorry :(
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

let hpbar ={
  x:bg.w/2,
  y:25,

  w:180,
  h:30,

  strokew:0.5,
  strokec:0,

  c:250,
  hpc:230,
  hpw:180,
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

  c:255,
  alpha:0,
  speed:5,
};

let cursor ={
  x:bg.w/2,
  y:bg.h/2,

  speed:10,
};

//few parameters

let d=0;
let hp = 10;
let score =0;

let inputMode = 'mouse';
let state = 'title';
let targeted = 'false';

let cross;
let inv;
let icon;

// fixed positions


//-----------------------------Setup-----------------------------//

function preload(){
        cross = loadImage('assets/images/Rcross.png');
        inv = loadImage('assets/images/Tinvader.png');
        icon = loadImage('assets/images/Yinvader.png')
};

function setup() {
        createCanvas(bg.w, bg.h);
        noCursor();

        invader.y = random(bg.h);
};

// controls option
function keyPressed() {
      if(state === 'title'){state = 'game'; inputMode = 'key'}
};

function doubleClicked(){
      if(state === 'title'){state = 'game'; inputMode = 'mouse'}
};



//-----------------------------Game Body-----------------------------//

function draw() { //state checking and state changing

        background(bg.r, bg.g, bg.b);  //refresh background

        if(inputMode === 'mouse'){ // use mouse to control the camera
          mouseControl();

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

      difficultyModifier();

      drawLight(); //draw light so it appears below camera

      drawInvader();

      drawCamera();

      interactionCheck();

      drawHP();


};

// LOGIC ENDS HERE //

//-----------------------------Mechanics related-----------------------------//

  function mouseControl(){ // if player use mouse input
        cursor.x = mouseX;
        cursor.y = mouseY;

        if(mouseIsPressed){
          targeted = 'true'; //detect if player is actively targeting the invader ( w/ mouse)
        }else{
          targeted = 'false';
        }

  };


  function keyControl(){ // if player use keyboardinput
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

        if(keyIsDown(32)){
          targeted = 'true'; //detect if player is actively targeting the invader ( w/ spacebar)
        }else{
          targeted = 'false';
        }


  };

  function difficultyModifier(){ // make the gameplay less same-ish

        if(score <= 2){
            light.size = 400

        }else if( 2 < score && score <= 4){
            light.size = 300

        }else if( 4 < score ){
            invader.speed = 7
        };

  };

  function interactionCheck(){
        d = int(dist(cursor.x,cursor.y,invader.x,invader.y));

        if (d <= light.size/2 + invader.size/2){
            invader.alpha = 500; //make the inv more visible when in proximity of spotlight
          }else{
            invader.alpha = 20; //make less visible outside of spotlight
          };



        if(invader.x >= bg.w ){
            resetInvaderPos(); // when invader reach end w/o interaction
            hp --;
        }else if( targeted === 'true' && d <= invader.size){ //when player hit the invader
            resetInvaderPos();
            score++
        };

        console.log(score)
  };


  function resetInvaderPos(){
        invader.x = 0;
        invader.y = random(bg.h);
  };


//------------------------------Object creations------------------------------//

  function drawCamera(){     //generate the camera

      //lens movement (tracking + size change WIP)
      lens.x=map(cursor.x,0,bg.w,base.x-base.w/2,base.x+base.w/2)
      lens.x=constrain(lens.x,base.x-base.w/2,base.x+base.w/2)

      lens.y=map(cursor.y,0,bg.h,casing.y,casing.y+casing.size/2)
      lens.y=constrain(lens.y,casing.y,casing.y+casing.size/2+lens.size/2);

      let lensZoom = int(dist(lens.x,lens.y,cursor.x,cursor.y));

      lens.size = map(lensZoom,0,800,20,60)

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


      pop();
  };

  function drawLight(){      //generate spotlight
      push();

        noStroke();

        fill(light.c);
        ellipse(cursor.x,cursor.y,light.size)

        image(cross,cursor.x-25,cursor.y-3); //input crosshair image,

      pop();
  };

  function drawInvader(){   //generate Invader

    //invader movement

      invader.x += invader.speed;
      invader.y = constrain(invader.y,casing.y+casing.size,bg.h); // so it oonly spawns underneeth camera

    //draw invader
      push();

        tint(invader.c,invader.alpha);
        image(inv,invader.x-25,invader.y-25,invader.size,invader.size); //input invader image,

      pop();
  };

  function drawHP(){ //generate hp bar

      hpbar.hpw = hp*18;

      push();

        stroke(hpbar.strokec) //contour
        strokeWeight(hpbar.strokew)

        rectMode(CENTER);
        noFill();
        rect(hpbar.x,hpbar.y,hpbar.w,hpbar.h);

        push();

          noStroke(); //actual dynamic hpbar
          fill(0,hpbar.c,0)
          rect(hpbar.x,hpbar.y,hpbar.hpw,hpbar.h);

        pop();

      pop();


  };

//------------------------------title screen & end screen------------------------------//

  function title() {
      push();
          fill(255,182,0);
          textAlign(CENTER);
          textSize(50);
          textStyle(BOLDITALIC);

          text('SPOT THE INTRUDER',bg.w*0.45,bg.h/3);

          push();
            fill(200);
            textSize(20);
            text('DOUBLECLICK TO USE MOUSE CONTROL (EASY) \n > Use Mouse to Move and Click to Target',bg.w/2,bg.h*0.65);
            text('PRESS ANY KEY TO USE KEYBOARD CONTROL (HARD) \n > Use Arrow Keys to Move and Space to Target',bg.w/2,bg.h*0.85);
          pop();

          image(icon,bg.w*0.7,bg.h*0.25,invader.size*2,invader.size*2);

      pop();
  };

  function end() {
      push();
          fill(250,0,0);
          textAlign(CENTER);
          textSize(50);
          textStyle(BOLDITALIC);

          text('THEY GOT IN',bg.w/2,bg.h/2)

          push();
            textSize(25)
            text('You caught ' + score + ' Intruders',bg.w/2,bg.h*0.6)
          pop();

     pop();

  };
