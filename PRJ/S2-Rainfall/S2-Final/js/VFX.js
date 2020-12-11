/*
Generating the visuals of an explosion.
Extended from Globe for many of the parameters
should be shared / synced.
*/

class VFX extends Globe{
    constructor(){
        super();

        this.positionY = random(-this.sphereSize,this.sphereSize);


        this.size = 0;
        this.maxSize = random(50,100);


        this.color ={
          r:250,
          g:0,
          b:0,
        }

        this.boom = true;
    }


    bombVisual(){

        push();
            stroke(this.color.r,this.color.g,this.color.b);
            noFill();
            translate(0,0,this.scaledSize);
            sphere(this.size);
        pop();
    }

    bombAnimation(){

        if( this.size < this.maxSize && this.size >= 0) {
            this.size = this.size + this.animationRate;
        }else{
            this.size = 0;
            this.boom = false;
        }
    }

}
