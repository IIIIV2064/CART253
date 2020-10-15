/**************************************************
Simulation 01
Zhao

Using the security cam and watch over something.. I guess
**************************************************/

// Creating the objects

let bg = {
  r: 0,
  g: 0,
  b: 0,

  w: 1200,
  h: 750,
};

let base ={
  x:bg.w/2,
  y:0,

  w:200,
  h:100,

  c:250,
};

let casing ={
  x:bg.w/2,
  y:base.h/2,

  size:200,

  c:20,
  alpha:400,
};

let lens ={
  x:0,
  y:0,

  size:40,

  c:250,
  alpha:200,
};

let inv ={
  x:0,
  y:0,

  size:50,

  c:250,
  speed:5,
};

let d=0;
inputMode = 'mouse'
state = 'title'
hp = 10;

// basic starup
function setup() {
        createCanvas(bg.w, bg.h);

        inv.y = random(bg.h);
}

// controls
function keyPressed() {
      if(state === 'title'){state = 'game'}
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
        if (state === 'end') {
          end();
        };

};

//working part of the game
function game() {

  //generate camera
    //lens movement (tracking + size change)
      lens.x=map(mouseX,0,bg.w,base.x-base.w/2,base.x+base.w/2);
      lens.y=map(mouseY,0,bg.h,casing.y,casing.y+casing.size/2);


    //draw the camera
      push();

        noStroke();

        fill(casing.c,casing.alpha);
        ellipse(casing.x,casing.y,casing.size);


        fill(lens.c,0,0,lens.alpaha)
        ellipse(lens.x,lens.y,lens.size)

        rectMode(CENTER);
        fill(base.c);
        rect(base.x,base.y,base.w,base.h);

        //text
        fill(0);
        textAlign(CENTER);
        textSize(30);
        text('HP '+hp+'/10',bg.w/2,40)

      pop();

  //generate invader
    //invader movement

      inv.x += inv.speed;
      inv.y = constrain(inv.y,casing.y+casing.size,bg.h);

    //draw invader
      push();

        noStroke();
        fill(inv.c,50);
        ellipse(inv.x,inv.y,inv.size);


      pop();


  //interaction with invader
      //reaching the end
          if(inv.x == bg.w ){
            inv.x = 0;
            inv.y = random(bg.h);
            hp --;
          };

      //cursor & inv
       d = int(dist(mouseX,mouseY,inv.x,inv.y));

      console.log(d)

    if (keyIsPressed && d <= inv.size){
                 inv.x = 0;
          inv.y = random(bg.h);
        };

};





  // title screen & end screen
  function title() {
          fill(250);
          textAlign(CENTER);
          textSize(50);
          text('PRESS ANY KEY',bg.w/2,bg.h/2);
  };

  function end() {
          bg.g = 0;
          bg.b = 0;

          fill(250);
          textAlign(CENTER);
          textSize(50);
          text('THEY GOT AWAY',bg.w/2,bg.h/2)
  };
