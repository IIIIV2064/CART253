/**************************************************
Activity 05
Zhao

A representation of love; use arrows keys to control
**************************************************/

// Creating the objects

let bg = {
  r: 250,
  g: 250,
  b: 250,

  w: 1000,
  h: 500,
};


let circle1 = {
  x: bg.w * 0.25,
  y: bg.h / 2,
  size: 10,

  speed: 3,
  vx: 0,
  vy: 0,

  r: 250,
  g: 0,
  b: 0,
};

let circle2 = {
  x: bg.w * 0.75,
  y: bg.h / 2,
  size: 10,

  speed: 5,
  vx: 0,
  vy: 0,

  r: 250,
  g: 250,
  b: 0,
};

let d;
let offlimit = false;
let state = 'title';
let attempts = 20;

// basic starup
function setup() {
        createCanvas(bg.w, bg.h);

        //determine the random movement of circle2
        circle2.vx = random(-circle2.speed, circle2.speed)
        circle2.vy = random(-circle2.speed, circle2.speed)
}

// controls
function keyPressed() {
        if (state === 'title'){
          state = 'game';
        };
};

// create the visuals
function draw() {
        //refresh background
        background(bg.r, bg.g, bg.b);


        //draw selected state
        if (state === 'title') {
          title();
        }
        if (state === 'game') {
          game();
        };
        if (state === 'win') {
          win();
        };
        if (state === 'lose1') {
          lose1();
        };
        if (state === 'lose2') {
          lose2();
        };



        //check for proximity
        d = int(dist(circle1.x, circle1.y, circle2.x, circle2.y));
        if(d < 150){
          panik();
        };
        if (d <= circle1.size / 2 + circle2.size / 2) {
          state = 'win'
        };

        //make circle2 bounce around
        if (0 >= circle2.x || circle2.x >= bg.w ) {
          circle2.vx = -circle2.vx;
          attempts -= 1;
        };
        if (0 >= circle2.y || circle2.y >= bg.h ) {
          circle2.vy = -circle2.vy;
          attempts -= 1;
        };


        //losing
        if (0 >= circle1.x || circle1.x >= bg.w ||
            0 >= circle1.y || circle1.y >= bg.h ) {
            offlimit = true;
        };

        if (offlimit == true) {
          state = 'lose1'
        };
        if (attempts == 0) {
          state = 'lose2'
        };


};

// title screen
function title() {
        fill(0);
        textAlign(CENTER);
        textSize(50);
        text('PRESS ANY KEY',bg.w/2,bg.h/2);


};

// start making things move
function game() {
        //control of the player
        if (keyIsDown(LEFT_ARROW)){
            circle1.x -= circle1.speed
        };
        if (keyIsDown(RIGHT_ARROW)){
            circle1.x += circle1.speed
        };
        if (keyIsDown(UP_ARROW)){
            circle1.y -= circle1.speed
        };
        if (keyIsDown(DOWN_ARROW)){
            circle1.y += circle1.speed
        };

        //making circles move
        circle2.x += circle2.vx;
        circle2.y += circle2.vy;

        //draw the circles
        noStroke();
        fill(circle1.r, 0, 0);
        ellipse(circle1.x, circle1.y, circle1.size);

        fill(0,circle2.g, circle2.b);
        ellipse(circle2.x, circle2.y, circle2.size);

          // HP on c1
          fill(0);
          textAlign(CENTER);
          textSize(10);
          text( 'YOU',circle1.x,circle1.y - 10)
          text( attempts,circle1.x,circle1.y + 15)
          text( 'SOMEONE',circle2.x,circle2.y - 10)
};

// panik and run!
function panik() {
        circle2.vy = circle2.vy + random(-5,5);
        circle2.vx =  circle2.vx + random(-5,5)
}

//win screen or lose screen

function win() {
        bg.g = 0;
        bg.b = 0;

        fill(250);
        textAlign(CENTER);
        textSize(50);
        text('YOU FOUND LOVE',bg.w/2,bg.h/2)
};

function lose1() {
        bg.r = 0;
        bg.g = 0;
        bg.b = 0;

        fill(250);
        textAlign(CENTER);
        textSize(50);
        text('YOU GAVE UP',bg.w/2,bg.h/2)
};

function lose2() {
        bg.r = 0;
        bg.g = 0;
        bg.b = 0;

        fill(250);
        textAlign(CENTER);
        textSize(50);
        text('YOU"RE ALONE',bg.w/2,bg.h/2)
};
