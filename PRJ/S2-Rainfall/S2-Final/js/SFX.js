/*
Generating the sounds of an explosion,
also some other generated sounds
*/

class SFX extends Explosion{

    soundGenerator(){
          this.siren = new p5.Oscillator('sine');


      // explosion sounds




      //siren sounds
          this.changeValue = this.changeValue + this.changeRate;
          let sirenFreq = map(sin(this.changeValue),-1,1,2000,2200,true);
          let sirenAmp = 0.3;

          this.siren.freq(sirenFreq,0.5); // I know it's a discordant siren,
          this.siren.amp(sirenAmp);// still trying to figure out the waves.

    }

    bombSound(){
          this.explosion = new p5.Oscillator('sine');

          let explosionFreq = 50;
          let explosionAmp = 0.5;

          this.explosion.freq(explosionFreq);
          this.explosion.amp(explosionAmp);

          this.explosion.start();
          this.explosion.stop(this.duration);

          this.explosionCount += 1;

          console.log(this.explosionCount)

    }

    sirenSound(){

    }


}
