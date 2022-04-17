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
     
      p5.background(0, 0, 0, 255);
  
      p5.strokeWeight(dim * 0.01);
      
      p5.noFill();
  
      const values = analyzer.getValue();
      let myVar = 20;
      p5.beginShape();
      for (let i = 0; i < values.length; i++) {
        const amplitude = values[i] as number;
        const x = p5.map(i, 0, values.length - 1, 0, width);
        const y = height / 8 + amplitude * height;
        // Place vertex
        // figure out better color later
        p5.background(0, 12, 48, 255);
       
        // full-screen visualizer rect
        // p5.rect(0, y * 8.1 , x, x)
        
    
       
        // rainbow, change to beacons later?
        // p5.fill((2*p5.frameCount) % 720, 100, 100);   
        
      }
      p5.endShape();

      p5.beginShape();
      for (let i = 0; i < values.length; i++) {
      
       

        p5.fill(0, 0, 0, 255)
        p5.noStroke()
        // x position, y position, width, height
        // rectangles as buildings
        // main buildings marked with numbered comments
        p5.rect(0, height - 70, 70, 70)
        p5.rect(70, height - 200, 70, 200) // 1
        p5.rect(140, height - 90, 20, 90)
        p5.rect(160, height - 200, 70, 200) // 2
        p5.rect(230, height - 70, 10, 70)
        p5.rect(240, height - 90, 10, 90)
        p5.rect(250, height - 325, 80, 325) // 3
        p5.rect(330, height - 250, 20, 250)
        p5.rect(350, height - 345, 20, 345)
        p5.rect(370, height - 330, 10, 330)
        p5.rect(380, height - 400, 70, 400)
        p5.rect(450, height - 325, 15, 325)
        p5.rect(465, height - 315, 5, 315)
        p5.rect(470, height - 100, 10, 100)
        p5.rect(480, height - 200, 10, 200)
        p5.rect(490, height - 330, 50, 330) // 4
        p5.rect(540, height - 345, 25, 345)
        


        // triangles as mountains 
        // p1 bottom left, p2 bottom right, p3 top
        p5.triangle(600, height, 900,  height, 800, height - 300);
        p5.triangle(600, height, 900,  height, 700, height - 240);
      }
      p5.endShape();

      p5.beginShape();
      let ampSize = 0;
      for (let note of values) {
        var noteNum = note as number;
        ampSize += noteNum * 4; // multiplied by 4 to increase visual radius
      }
      p5.fill(230,230,180);
      p5.noStroke()
      p5.ellipse(50,50, 190 + ampSize, 190 + ampSize);
      
      
      
    },
  );