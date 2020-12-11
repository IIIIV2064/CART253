/**************************************************
Project 2

This is something, I guess.


Until only silence remains...


**************************************************/

"use strict";
//-----------------------------Variables & Objects-----------------------------//

let state = 'main';
let foont;
let bgm;
let level;

let earth, mapTexture; //obj related to earth

let explosions = [];
let numExplosion = 1;

let explosionSFX, explosionDetector; // obj related to explosions

//-----------------------------Setups-----------------------------//
function preload(){ //preload extenral assets such as images and musics
        foont = loadFont('assets/CASLON.ttf');
        mapTexture = loadImage('assets/map.png');
        bgm = loadSound('assets/BGM.mp3');

}


function setup() {
        createCanvas(windowWidth, windowHeight,WEBGL);

        earth = new Globe(); //create the globe

      /*  for( let i=0; i < numExplosion; i++){ //create an array for explosion effects
          explosions.push(new Explosion);
        } */

        explosionSFX = new SFX();

        //explosionVFX = new VFX();

        explosionDetector = new p5.Amplitude(); //create a detector of sound level

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

      earth.spin();
      earth.display(); //show the globe
      audioTrigger();

    /*  for( let i=0; i < explosions.length; i++){
        let explosionVFX = explosions[i];
        explosionVFX.display();
      } */


};

function endScreen(){ //display the end screen
      bgm.stop();

      push();
        textAlign(CENTER);
        fill(200);
        textFont(foont);
        textSize(20);
        text('now, its gone',0,0);
      pop();
};

//---------------------Mechanical Functions---------------------//

function resetWorld(){
        state ='main';
        earth.strokeColor = {r:0,g:0,b:180}
        explosions.explosionCount = 0;
};

function audioTrigger(){
      explosionDetector.setInput(bgm);

      level = explosionDetector.getLevel();
      earth.strokeThick = map(level,0,1,0.2,2,true);

      if(level > 0.05){
        bombDropping();
      };
      console.log(level);

};

function bombDropping(){
      explosionSFX.bombSound();
};

//-----------------------------User Inputs-----------------------------//

function mouseClicked(){

      if( state === 'main'){ //click to go into the simulation
          state = 'earth'
      }else if( state === 'earth'){
          if(bgm.isPlaying()){ //click to start the music.. and the downfall
            bgm.playMode('sustain');
          }else{
            bgm.play();
          };
      }else if( state === 'end'){ // reset
          resetWorld();
      }

};

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
