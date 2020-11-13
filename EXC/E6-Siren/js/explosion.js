class Explosion {

constructor(){ //setting up base values for the globe

    this.x = 500;
    this.y = 500;

    this.size = 200;

    this.fillColor = {
      r:0,
      g:150,
      b:150,
    }
    this.strokeColor = {
      r:0,
      g:0,
      b:0,
    };
    this.strokeThick;
}

display(){
    push();
      fill(this.fillColor.r,this.fillColor.g,this.fillColor.b);
      stroke(this.strokeColor.r,this.strokeColor.g,this.strokeColor.b);
      strokeWeight(this.strokeThick);

      ellipse(this.x,this.y,this.size)
    pop();
}

animation(){


}

mousePressed(){

    this.x = mouseX;
    this.y = mouseY;

    this.animation();
    this.display();

}

};
