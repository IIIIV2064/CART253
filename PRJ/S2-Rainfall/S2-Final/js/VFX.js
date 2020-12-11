/*
Generating the visuals of an explosion
*/

class VFX extends Explosion{

    bombVisual(){

        push();
            stroke(250);
            noFill();
            translate(0,0,earth.zoomLevel);
            sphere(50);
        pop();


  }

}
