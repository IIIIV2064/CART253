/**************************************************
Zhao's Prototype, now w/ sound

So I added sound effects and some more visuals to go with it

At first I wanted to generate explosions represented by spheres that 'glows' to the sound of explosion
that spawns at the mouse position.
But quickly I realized positioning in WEBGL is differentt since I have to deal with Z axis now.
So I put it aside for the exercise and will prob focus on that during the next weeks.

PS: I often encounter the error message "Uncaught TypeError: Cannot read property 'length'
of undefined" which seemingly pops up in the console at random moments. I can't find the exact
trigger for it but I believe its related to the Amplitude detector.
Might cause inconsistent performance.
**************************************************/

"use strict";
//-----------------------------Variables & Objects-----------------------------//

let state = 'main';
let boomCount = 0;

let earth, mapTexture, foont; // earth's model and texture + the font to be used

let explosionSFX, explostionDetector; // sound related objs

//-----------------------------Setups-----------------------------//
function preload(){
        foont = loadFont('assets/CASLON.ttf')
        mapTexture = loadImage('assets/images/map.png')

}


function setup() {
        createCanvas(1000, 750,WEBGL);

        earth = new Globe(); //create the globe

        explosionSFX = new SFX(); //create the sound effect

        explostionDetector = new p5.Amplitude(); //create a detector of sound level

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

      explosionSFX.sfxGenerator(); //generate and update values for the SFX
      explosionVFX(); //add visual changes dependent of the exploi

      earth.display(); //show the globe

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
            explosionSFX.mousePressed();

            //not exactly how it'll work in the final version, but here
            //the player will trigger the bombs for easier demonstration
            boomCount = boomCount + 1;
            console.log('boomCount:' + boomCount);

      }else if( state === 'end'){ // reset
            state ='main';
            boomCount = 0;
            earth.strokeColor = {r:0,g:0,b:180}
            explosionSFX.siren.stop();
      }

};


//-----------------------------Visual Functions-----------------------------//

function explosionVFX(){ //make the thickness of the line change accroding to the *boom*

    let level = explostionDetector.getLevel();
    earth.strokeThick = map(level,0.2,1,0.2,2,true);
    console.log('amp:' + level)

}
