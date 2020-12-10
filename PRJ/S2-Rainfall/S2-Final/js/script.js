/**************************************************

**************************************************/

"use strict";
//-----------------------------Variables & Objects-----------------------------//

let state = 'main';

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

      earth.spin();
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
      if(explosionSFX.explosionCount == 5){
          state = 'end'
      }

};

function mouseClicked(){

      if( state === 'main'){ //click to go into the simulation
            state = 'earth'
      }else if( state === 'earth'){
          explosionSFX.bombDrop();
      }else if( state === 'end'){ // reset
          resetWorld();
      }

};

function resetWorld(){
        state ='main';
        earth.strokeColor = {r:0,g:0,b:180}
        explosionSFX.siren.stop();
        explosionSFX.explosionCount = 0;
};


//-----------------------------Visual Functions-----------------------------//

function mousePressed(){
      earth.mX.initial = mouseX;
      earth.mY.initial = mouseY;
};

function mouseReleased(){
      earth.mX.end = mouseX;
      earth.mY.end = mouseY;
};

function mouseWheel(event){
      earth.zoomLevel -= event.delta;

      console.log(earth.zoomLevel)
};

function explosionVFX(){ //make the thickness of the line change accroding to the *boom*

      let level = explostionDetector.getLevel();
      earth.strokeThick = map(level,0.2,1,0.2,2,true);

}
