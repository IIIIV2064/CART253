class Globe{

constructor(){ //setting up base values for the globe

      this.x = width/2;
      this.y = height/2;

      this.sphereSize;
      this.strokeThick = 0.5;
      this.strokeColor = {
        r:0,
        g:0,
        b:180,
      };

      this.zoomLevel = 300;
      this.rotationRate = 0.005;

      this.mX ={
        initial:0,
        end:0,
        velocity:0,
        amount:0,
        rotation:0,
      }

      this.mY ={
        initial:0,
        end:0,
        velocity:0,
        amount:0,
        rotation:0,
      }

}

display(){

      this.sphereSize =  constrain(this.zoomLevel,100,400);// decide the "zoom" level


      rotateY(this.mX.rotation); //make it spin!
      rotateX(this.mY.rotation);


      stroke(this.strokeColor.r,this.strokeColor.g,this.strokeColor.b);
      strokeWeight(this.strokeThick);
      noFill();

      texture(mapTexture); //applying the map texture to the sphere
      sphere(this.sphereSize);

}

spin(){
      this.mX.velocity = this.mX.end - this.mX.initial;
      this.mY.velocity = this.mY.end - this.mY.initial;

      if(this.mX.amount < this.mX.velocity){// when rot. to the right AKA velocity is positive
        this.mX.amount +=1;
        this.mX.rotation += this.rotationRate;
      }else if(this.mX.amount > this.mX.velocity){// when rot. to the left  AKA velocity is negative
        this.mX.amount -=1;
        this.mX.rotation -= this.rotationRate;
      }else if(this.mX.amount == this.mX.velocity){// when goal is reached, reset (not working as intended)
        this.mX.rotation = this.mX.rotation;
        this.mX.amount,this.mX.velocity = 0;
      };

      if(this.mY.amount < this.mY.velocity){
        this.mY.amount +=1;
        this.mY.rotation -= this.rotationRate;
      }else if(this.mY.amount > this.mY.velocity){
        this.mY.amount -=1;
        this.mY.rotation += this.rotationRate;
      }else if(this.mY.amount == this.mX.velocity){
        this.mX.rotation = this.mX.rotation;
        this.mX.amount,this.mX.velocity = 0;
      };


      console.log(this.mX.amount,this.mX.velocity)

}


}
