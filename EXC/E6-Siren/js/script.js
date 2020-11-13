/**************************************************
Zhao's Prototype, now w/ sound

So I added sound effects and some more visuals to go with it
**************************************************/

"use strict";
//-----------------------------Objects-----------------------------//

let state = 'main';
let boomCount = 0;

let earth, mapTexture, foont; // earth's model and texture + the font to be used

let explosionSFX;

//-----------------------------Setups-----------------------------//
function preload(){
  foont = loadFont('assets/CASLON.ttf')
  mapTexture = loadImage('assets/images/map.png')
}


function setup() {
  createCanvas(1000, 750,WEBGL);

  earth = new Globe(); //create the globe

  explosionSFX = new Explosion();

}

//-----------------------------Running Body-----------------------------//
function draw() {
        background(0) //set background color

       if( state === 'main' ){ // state selector
          mainScreen();

       }else if ( state === 'earth' ){
          simScreen();

       }else if ( state === 'end' ){
          endScreen();
       };

}
//-----------------------------States-----------------------------//

function mainScreen(){ //display the main screen
      push();
        textAlign(CENTER);
        fill(250);
        textSize(20);
        textFont(foont);
        text('click to see earth',0,0);
      pop();

};

function simScreen(){

      earth.display(); //show the globe
      explosionSFX.sfxGenerator(); //
      boomCounter(); //count the # of boom

};

function endScreen(){ //display the end screen
      push();
        textAlign(CENTER);
        fill(200);
        textFont(foont);
        textSize(20);
        text('POOF, its gone',0,0);
      pop();
};

//---------------------Mechanical Functions---------------------//

function boomCounter(){ //count the number of explosions before humans are gone
      if(boomCount == 5){
          state = 'end'
      }

};

function mousePressed(){

      if( state === 'main'){ //click to go into the simulation
            state = 'earth'
      }else if( state === 'earth'){

            earth.strokeThick = 2;
            explosionSFX.mousePressed();

            //not exactly how it'll work in the final version, but here
            //the player will trigger the bombs for easier demonstration
            boomCount = boomCount + 1;
            console.log(boomCount);

      }else if( state === 'end'){ // turn back to title screen
            state ='main';
            boomCount = 0;
      }

};


//-----------------------------Visual Functions-----------------------------//
