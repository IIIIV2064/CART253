/**************************************************
Project 2 - "Rainfall"
by Yaodongfang Zhao

This simulation features a sphere that represents Earth

Once the user clicks/ starts dragging the Earth around,
the sequence begins.
A song will play, and the simulation will react to the song
by creating *explosions* using SFXs and VFXs.
The simulation ends when too much explosions happen.

**************************************************/

"use strict";
//-----------------------------Variables & Objects-----------------------------//

let state = 'main'; // state which the simulation is in
let foont; //font used
let bgm; // the music

let volume,level; // var for sound level
let scale = 1; // var for zoom level

let earth, mapTexture; //obj related to earth

let explosions = []; //array of explosions

let exoSFX, exoVFX, explosionDetector; // obj related to explosions

//-----------------------------Setups-----------------------------//
function preload(){ //preload extenral assets such as images and musics
        foont = loadFont('assets/CASLON.ttf');
        mapTexture = loadImage('assets/land.png');
        bgm = loadSound('assets/BGM.mp3');

}


function setup() { //setup the canvas and the js objects
        createCanvas(windowWidth, windowHeight,WEBGL);

        earth = new Globe(); //create the globe

        exoSFX = new SFX();

        exoVFX = new VFX();

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

function simScreen(){ //display the simulation

      earth.spin();
      earth.display(); //show the globe

      audioTrigger();

      for( let i=0; i < explosions.length; i++){
          if(exoVFX.boom == true){
              exoVFX.bombAnimation(explosions[i]);
              exoVFX.bombVisual(explosions[i]);
            }
      }

      bombCounting();
};

function endScreen(){ //display the end screen
      bgm.stop();
      exoSFX.sirenSound();

      push();
        textAlign(CENTER);
        fill(200);
        textFont(foont);
        textSize(20);
        text('now, its gone',0,0);
      pop();
};

//---------------------Mechanical Functions---------------------//

function resetWorld(){ //reset when the simulation ends
        earth.strokeColor.b = 180;
        earth.strokeColor.r = 0;
        exoSFX.siren.stop();
        explosions = [];

        state ='main';
};

function audioTrigger(){
      //triggers the explosion when pass a certain treshhold
      //and makes the lines 'vibrate'

      explosionDetector.setInput(bgm); //set input to the background music

      level = explosionDetector.getLevel(); //get level
      volume = map(level,0.001,0.2,1,10,true); //match the level to a readable scale

      if(volume > 4.5){ // the treshhold
          bombDropping();
          earth.strokeColor.r = 250; // make the earth go red
          earth.strokeColor.b = 0;
      };

      console.log(level)

};

function bombDropping(){ //setting the explosion in motion
      exoSFX.bombSound(); //call the sound
      explosions.push(exoVFX); //call the visual
      exoVFX.boom=true;


};

function bombCounting(){ //count how far til the end
  if(explosions.length >= 1000){
    state = 'end';
  }
  console.log(explosions.length);
};

//-----------------------------User Inputs-----------------------------//

function mouseClicked(){ //main input: mouse click

      if( state === 'main'){ //clicking in main
          state = 'earth'
      }else if( state === 'earth'){
          if(bgm.isPlaying()){ //no reptetion once music started
            bgm.playMode('sustain');
          }else{
            bgm.play(); //click to start the music.. and the downfall
          };
      }else if( state === 'end'){ //clicking in end screen to reset
          resetWorld();
      }

};

function mousePressed(){ //drag input for spinning earth
      earth.mX.initial = mouseX;
      earth.mY.initial = mouseY;
};

function mouseReleased(){
      earth.mX.end = mouseX;
      earth.mY.end = mouseY;
};

function mouseWheel(event){
      scale = scale - (event.delta/1000)
};
