/**************************************************
Activity 05
Zhao

Working with states: title screen, action screen and end screen for both BE and HE
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
  size: 100,
  r: 250,
  speed: 5,
  vx: 0,
  vy: 0,
};

let circle2 = {
  x: bg.w * 0.75,
  y: bg.h / 2,
  size: 100,
  speed: 5,
  vx: 0,
  vy: 0,
};

let offlimit = false;
let state = 'title';

// basic starup
function setup() {
        createCanvas(bg.w, bg.h);

        //determine the random movement of the circles
        circle1.vx = random(-circle1.speed, circle1.speed)
        circle1.vy = random(-circle1.speed, circle1.speed)
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
        if (state === 'game') {
          game();
        };
        if (state === 'win') {
          win();
        };
        if (state === 'lose') {
          lose();
        };

        //check for contact
        let d = int(dist(circle1.x, circle1.y, circle2.x, circle2.y));
        if (d <= circle1.size / 2 + circle2.size / 2) {
          state = 'win'
        };

        //check for off limits
        if (0 >= circle1.x || circle1.x >= bg.w ||
            0 >= circle1.y || circle1.y >= bg.h ||
            0 >= circle2.x || circle2.x >= bg.w ||
            0 >= circle2.y || circle2.y >= bg.h ) {
          offlimit = true;
        };

        if (offlimit == true) {
          state = 'lose'
        };

};

// start making things move
function game() {
        //making circles move
        circle1.x += circle1.vx;
        circle1.y += circle1.vy;
        circle2.x += circle2.vx;
        circle2.y += circle2.vy;

        //draw the circles
        noStroke();
        fill(circle1.r, 0, 0);
        ellipse(circle1.x, circle1.y, circle1.size);
        ellipse(circle2.x, circle2.y, circle2.size);
};

//win screen or lose screen


function win(){
        bg.g = 0;
        bg.b = 0;

        fill(250);
        textAlign(CENTER);
        textSize(50);
        text('THEY FOUND LOVE',bg.w/2,bg.h/2)
};

function lose(){
        bg.r = 0;
        bg.g = 0;
        bg.b = 0;

        fill(250);
        textAlign(CENTER);
        textSize(50);
        text('THEY DIED IN SADNESS',bg.w/2,bg.h/2)
};

  console.log(d)
