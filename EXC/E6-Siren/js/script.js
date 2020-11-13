/**************************************************
Zhao's Prototype, now w/ sound

So I added sound effects and some more visuals to go with it
**************************************************/

"use strict";
//-----------------------------Objects-----------------------------//

let state = 'main';
let boomCount = 0;

let earth, mapTexture, foont; // earth's model and texture + the font to be used

let explosion,explosionSFX; // everything related to the explosion effect

//-----------------------------Setups-----------------------------//
function preload(){
  foont = loadFont('assets/CASLON.ttf')
  mapTexture = loadImage('assets/images/map.png')
}


function setup() {
  createCanvas(1000, 750, WEBGL);

  earth = new Globe(); //create the globe

  explosion = new Explosion();

  explosionSFX = new p5.Oscillator('sine'); // create the explosionSFX
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

      earth.display(); //show the globe and make it spin
      sfxgenerator();
      boomCounter();

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

//---------------------Mechanical Functions(SoundRelated)---------------------//


function sfxgenerator(){ //generate the sound that will represent the explosion
      let freq = 100;
          if( boomCount == 5){
            freq = 300;
          }
      let amp = 1;

      explosionSFX.freq(freq);
      explosionSFX.amp(amp);
};

function stopSFX(){
      explosionSFX.stop();
}

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
            explosion.mousePressed();
            explosion.display();
            
            explosionSFX.start();
            setTimeout(stopSFX,500); //stop the explosionSFX after 0.5 sec
            // really want to know if there's a more efficient way of dong this

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
