class SFX{

constructor(){ //prepare for generating the sound effect

        this.explosion = new p5.Oscillator('sine');

        this.siren = new p5.Oscillator('sine');

        this.changeRate = 0.1;
        this.changeValue = 0;
}

sfxGenerator(){ //input the exact values for the oscillator

        let explosionFreq = 50;
            if( boomCount == 5){ //when humans are gone
              explosionFreq = 300;
            }
        let explosionAmp = map(mouseY,height*0.25,height*0.75,0.5,1,true)
         // closer to the globe = louder explosion, ik its not that big of a difference

        this.explosion.freq(explosionFreq);
        this.explosion.amp(explosionAmp);


        this.changeValue = this.changeValue + this.changeRate;
        let sirenFreq = map(sin(this.changeValue),-1,1,2000,2200,true);
        let sirenAmp = 0.3;

        this.siren.freq(sirenFreq,0.5); // I know it's a discordant siren,
        this.siren.amp(sirenAmp);// still trying to figure out the waves.
}


mousePressed(){ //play the oscillator on click (aka drop the bombs)

      if(boomCount == 0){ //before the first bomb falls, a brief moment of panick
          this.siren.start(); // make siren go off
          earth.strokeColor = {r:180,g:0,b:0} //the world turns red

          this.explosion.start(3); //then the bomb falls
          this.explosion.stop(3.5);
          this.siren.stop(3);
      }else{
          this.explosion.start();
          this.explosion.stop(0.5);
      }


}


};
