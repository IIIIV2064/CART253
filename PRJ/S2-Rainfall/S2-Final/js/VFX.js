/*
Generating the visuals of an explosion.
Extended from Globe for many of the parameters
should be shared / synced.
*/

class VFX extends Globe{
    constructor(){ //seetting parameters for the explosion
        super();

        this.size = 0; //size at the 'beginning' of the explosion
        this.maxSize = random(50,100); //max size of the explosion (aka of the fireball)


        this.color ={
          r:250,
          g:0,
          b:0,
        }

        this.boom = true;
    }


    bombVisual(){ //generating the explosion

        push();
            stroke(this.color.r,this.color.g,this.color.b);
            noFill();
            translate(random(-earth.scaledSize,earth.scaledSize),
                      random(-earth.scaledSize,earth.scaledSize),
                      random(-earth.scaledSize,earth.scaledSize));
            sphere(this.size);
        pop();
    }

    bombAnimation(){ //make the fireball expand and then disapear

        if( this.size < this.maxSize && this.size >= 0) {
            this.size = this.size + this.animationRate;
        }else{
            this.size = 0;
            this.boom = false;
        }
    }

}
