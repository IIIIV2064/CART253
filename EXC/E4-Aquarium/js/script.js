/**************************************************
Exercise 4
Zhao


You keep the 'fishes' alive by feeding them.
I tried to do an array counter, one that tracks the amount of item belonging to different state
(aka tracking the amount of dead fish vs alive fish)
it didn't pan out as I've hoped so I sratched that Idea
There might be some residual codes.
**************************************************/
"use strict";

//-----------------------------Objects-----------------------------//

let bg = {
  w: 500,
  h: 500,

  r:0,
  g:51,
  b:51,
}

let pointer = {
  x: 0,
  y: 0,

  size: 10,

  r:250,
  g:51,
  b:51,

}

let fishShrinkRate = 0.1;
let feedingGrowthRate = 1;
let fishCount;
let timer;


let fish;
let school = []; //arrays
let schoolSize = 6;



let gameState = 'game';
let pointerProximity = 'false';
let feedingAction = 'false';


//-----------------------------Setup-----------------------------//
function setup() { //creatng

  createCanvas(bg.w,bg.h);

  for( let i=0; i<schoolSize; i++){ //create fish in arrays
        let fish = createFish(random(0, width), random(0, height));

        school.push(fish);
        }
 }


function createFish(x, y) { //set fish objects w/ their full parameters
   let fish = {
     x: x,
     y: y,

     size: 50,

     vx: 0,
     vy: 0,
     speed: 2,

     alive: true,
   };
   return fish;

 }



//----------------------------Running Body-----------------------------//

function draw() {

  background(bg.r,bg.g,bg.b);

    playerControl(); //input logic

    timer = frameCount;

      if (gameState === 'game'){ //game state controller
          game();

      } else if( gameState === 'end1'){
          end1();

      } else if( gameState === 'end1'){
          end2();

      };

}

function game(){

     for (let i = 0; i < school.length; i++) { // generate objs according to array size

      feedingCheck(school[i]); //check interaction of player&fish and consequence

      fishGrowth(school[i]); //make fishes grow when feeded

      moveFish(school[i]); // make array objs move

      displayFish(school[i]); // display array objs

      lifeDetector(school[i]); //count fish alive

      }




    push(); //generate playerobj
        noStroke();
        fill(pointer.r,pointer.g,pointer.b);
        ellipse(pointer.x,pointer.y,pointer.size)
    pop();


}

function end1(){ //when 1 fish dies
  push();
      fill(250,0,0);
      textAlign(CENTER);
      textSize(25);
      textStyle(BOLDITALIC);

      text('THE FISH DIED',bg.w/2,bg.h/2)
  pop();
}


function end2(){ //when you kept them alive fot x amount of time
  push();
      fill(250,0,0);
      textAlign(CENTER);
      textSize(25);
      textStyle(BOLDITALIC);

      text('YOU KEPT THEM ALIVE',bg.w/2,bg.h/2)
  pop();

}

//----------------------------Mechanics Functions-----------------------------//

function playerControl(){

        pointer.x = mouseX;
        pointer.y = mouseY;

        if(mouseIsPressed){
          feedingAction = 'true'
        }else{ feedingAction = 'false' };
}

function feedingCheck(fish){

      let d = int(dist(pointer.x, pointer.y, fish.x, fish.y));

      if (d < pointer.size / 2 + fish.size / 2) {
        pointerProximity = 'true';
      }else{ pointerProximity  = 'false'}
}

function fishGrowth(fish){

      if ( pointerProximity === 'true' && feedingAction === 'true'){
        fish.size += feedingGrowthRate;
      }
}

function lifeDetector(fish){
      fishCount = school.length;

      if ( fish.size <=  5){
          end1();
      }

      if ( timer > 500 && fish.size > 5){
          end2();
      }
}


//----------------------------Visual Functions-----------------------------//

function moveFish(fish) { //fish movement logic
      let change = random(0, 1); // random movement generator

      if (change < 0.05) {
        fish.vx = random(-fish.speed, fish.speed);
        fish.vy = random(-fish.speed, fish.speed);
        }

      fish.x = fish.x + fish.vx;
      fish.y = fish.y + fish.vy;

      fish.x = constrain(fish.x, 0, width);   // movement constrain
      fish.y = constrain(fish.y, 0, height);
}


function displayFish(fish) { //draw fishe
      fish.size -= fishShrinkRate;

      if ( fish.size >= 5){
          push();
            fill(200, 100, 100);
            noStroke();
            ellipse(fish.x, fish.y, fish.size);
          pop();
      };

//----------------------------Else-----------------------------//
console.log(fish.alive)
}
