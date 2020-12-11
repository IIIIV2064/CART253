/*
Generating the sounds of an explosion,
also some other generated sounds
*/

class SFX{
    constructor(){ //seetting parameters for the SFXs

          this.explosion = new p5.Oscillator('sine');

          this.siren = new p5.Oscillator('sine');

          this.changeValue = 0;
          this.changeRate = 0.1;

    }

    bombSound(){ //create the explosion sound effect ( a low thud)

          let explosionFreq = 50;
          let explosionAmp = 0.5;
          let duration = 0.5;

          this.explosion.freq(explosionFreq);
          this.explosion.amp(explosionAmp);

          this.explosion.start();
          this.explosion.stop(duration);

          this.explosionCount += 1;
    }

    sirenSound(){ //create the srien sound effect ( an annoying sreech)

          this.changeValue = this.changeValue + this.changeRate;
          let sirenFreq = map(sin(this.changeValue),-1,1,2000,2200,true);
          let sirenAmp = 0.3;

          this.siren.freq(sirenFreq,0.5); // I know it's a discordant siren,
          this.siren.amp(sirenAmp);// still trying to figure out the waves.

          this.siren.start();

    }


}
