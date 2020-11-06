class Globe{

constructor(){ //setting up base values for the globe

  this.x = width/2;
  this.y = height/2;

  this.sphereSize;
  this.strokeColor = {
    r:0,
    g:0,
    b:180,
  };
  this.strokeThick = 0.5;

  this.rorationRate = 0.005;
  this.rotationX ;
  this.rotationY ;


}


display(){

  this.sphereSize = map(mouseY,height*0.25,height*0.75,100,400,true) // decide the "zoom" level according to mouse Y position

  this.rotationX = mouseX;

  rotateY(this.rotationX * this.rorationRate) //rotate the earth on its Y axis, yeah it was kinda confusing at first



  stroke(this.strokeColor.r,this.strokeColor.g,this.strokeColor.b);
  strokeWeight(this.strokeThick);
  noFill();

  texture(mapTexture); //applying the map texture to the sphere
  sphere(this.sphereSize);


}

}
