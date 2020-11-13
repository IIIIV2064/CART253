class Explosion{

constructor(){ //setting up base values for the globe

    this.explosion;

    this.explosion = new p5.Oscillator('sine');

}

sfxGenerator(){

    let freq = 100;
        if( boomCount == 5){ //when humans are gone
          freq = 300;
        }
    let amp = 1;

    this.explosion.freq(freq);
    this.explosion.amp(amp);

}

sfxStop(){
  this.explosion.stop();
}

mousePressed(){
    this.explosion.start();
    this.explosion.stop(0.5);
}


};
