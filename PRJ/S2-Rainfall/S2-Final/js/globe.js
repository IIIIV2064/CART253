/*
class for the primary earth,
also in charge of the rotation mechanics
*/

class Globe{

constructor(){ //setting up base values for the globe

      this.sphereSize = 300; //inital size

      this.strokeThick;
      this.strokeColor = {
        r:0,
        g:0,
        b:180,
      };



      this.scaledSize; //size after zoom scales
      this.animationRate = 5;
      this.rotationRate = 0.005;

      this.mX ={ //parameters for the mouse drag on X
        initial:0,
        end:0,
        velocity:0,
        amount:0,
        rotation:0,
      }

      this.mY ={ //parameters for the mouse drag on Y
        initial:0,
        end:0,
        velocity:0,
        amount:0,
        rotation:0,
      }

}

display(){ //generating the globe

      this.scaledSize = this.sphereSize*constrain(scale,0.1,2); //generate the dynamic size
      this.strokeThick = map(volume,1,6,0.3,5,true); //generate the dynamic line width

      rotateY(this.mX.rotation);
      rotateX(this.mY.rotation);


      stroke(this.strokeColor.r,this.strokeColor.g,this.strokeColor.b);
      strokeWeight(this.strokeThick);
      noFill();

      texture(mapTexture);
      sphere(this.scaledSize);

}

spin(){ //inputs for dragging
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


}


}
