// 3rd party library imports
import P5 from 'p5';
import * as Tone from 'tone';

// project imports
import { Visualizer } from '../Visualizers';

export const jimmynguyen651Visualizer = new Visualizer(
    'jimmynguyen651',
    (p5: P5, analyzer: Tone.Analyser) => {
      const width = window.innerWidth;
      const height = window.innerHeight / 2;
      const dim = Math.min(width, height);
     
      p5.background(0, 0, 128, 255);
  
      p5.strokeWeight(dim * 0.01);
      p5.stroke(255, 255, 255, 255);
      p5.noFill();
  
      const values = analyzer.getValue();
      let myVar = 20;
      p5.beginShape();
      for (let i = 0; i < values.length; i++) {
        const amplitude = values[i] as number;
        const x = p5.map(i, 0, values.length - 1, 0, width);
        const y = height / 4 + amplitude * height;
        // Place vertex
        
        // p5.rect(myVar, y * 2.1, 800, 200)
        // loop may not work, might have to hardcode
        // p5.rect(myVar, height - 200, 200, 200)
        // maybe mountain on right side?
        myVar += 220
        p5.rect(20, y * 4.1, 200, 200)
        
        p5.rect(250, y * 4.1, 200, 200)
        p5.rect(480, y * 4.1, 200, 200)
        p5.rect(710, y * 4.1, 200, 200)
        p5.rect(940, y * 4.1, 200, 200)

        p5.fill(255,204,0)
        p5.rect(20, height - 200, 200, 200)
       
        
        // try rainbow?
       

        
        
        
      }

 


      p5.endShape();
    },
  );