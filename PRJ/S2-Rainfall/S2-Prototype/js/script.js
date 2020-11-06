/**************************************************
Zhao's Prototype

Creating a 3D Globe
**************************************************/

"use strict";
//-----------------------------Objects-----------------------------//
let mapTexture
let state = 'main'

let earth;
let foont;

//-----------------------------Setups-----------------------------//
function preload(){
  foont = loadFont('assets/CASLON.ttf')
  mapTexture = loadImage('assets/images/map.png')
}


function setup() {
  createCanvas(1000, 750, WEBGL);

  earth = new Globe(); //create the globe

}

//-----------------------------Running-----------------------------//
function draw() {
  background(0)

 if( state === 'main' ){
   push();
    textAlign(CENTER);
     fill(250);
     textSize(20);
     textFont(foont);
     text('click to see earth',0,0);
   pop();

 }else if (state === 'earth'){
     earth.display(); //show the globe and make it spin

 }else{
   push();
    textAlign(CENTER);
     fill(200);
     textFont(foont);
     textSize(20);
     text('POOF, its gone',0,0);
   pop();

 };
}


function mousePressed(){

  if( state === 'main'){
    state = 'earth'

  }else if( state === 'earth'){
    state = 'end'

  };

  console.log(state)
}
