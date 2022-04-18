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
        // const y = height / 4 + amplitude * height;
        const y = height / 4 + amplitude * height; // use loop here instead later?
        // Place vertex

        p5.background(0, 12, 48, 255);
        // maybe add beacons for some smaller building segments
        // full-screen visualizer rect
        p5.rect(100, y * 4.1, 10, 240); // beacon for building 1's top
        p5.rect(180, y * 4.1, 30, 220); // beacon for building 2's top
        var flexHeight3 = y * 3;
        var flexHeight4 = y * 3;
        
        if (width < 2200) { // gross loop for the sake of some responsiveness for taller buildins like 3 and 4
          flexHeight3 = y * 1.5
          flexHeight4 = y;
          // change these garbage variable names 
        } else {
          flexHeight3 = y * 4.1
          flexHeight4 = y * 4.1
        }
        p5.rect(265, flexHeight3 , 50, 355) // beacon for building 3
        p5.rect(420, flexHeight4, 10, 420) // beacon for building 4
        p5.rect(510, flexHeight3, 15, 370) // beacon for building 5
        p5.rect(620, y * 4.1, 15, 250) // beacon for building 6
        p5.rect(670, y * 4.1, 35, 220)
        p5.rect(760, y * 4.1, 30, 140) 
       
        // rainbow fill, change color?
        // maybe figure out how to make the actual height less laggy
        p5.fill((2*p5.frameCount) % 720, 100, 100);   
        
        
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
    
        p5.rect(70, height - 200, 70, 200) // building 1
        p5.rect(100, height - 240, 10, 240) //  tower top (long)

        p5.rect(140, height - 90, 20, 90)

        p5.rect(160, height - 190, 70, 190) // building 2
        p5.rect(180, height - 220, 30, 220) // tower top (stubby)

        p5.rect(230, height - 70, 10, 70)
        p5.rect(240, height - 90, 10, 90)

        p5.rect(250, height - 325, 80, 325) // building 3
        p5.rect(265, height - 355, 50, 355) // tower top (stubby)

        p5.rect(330, height - 250, 20, 250)
        p5.rect(350, height - 345, 20, 345)
        p5.rect(370, height - 330, 10, 330)

        p5.rect(380, height - 390, 70, 390) // 4
        p5.rect(420, height - 420, 10, 420) // slender top (off-center)

        p5.rect(450, height - 325, 15, 325)
        p5.rect(465, height - 315, 5, 315)
        p5.rect(470, height - 100, 10, 100)
        p5.rect(480, height - 200, 10, 200)

        p5.rect(490, height - 330, 50, 330) // building 5
        p5.rect(510, height - 370, 15, 370) // top

        p5.rect(540, height - 345, 25, 345)
        p5.rect(565, height - 90, 15, 90)
        p5.rect(580, height - 120, 15, 120)

        p5.rect(595, height - 200, 75, 200) // building 6
        p5.rect(620, height - 250, 15, 250) // top

        p5.rect(670, height - 220, 35, 220) // building 7

        p5.rect(705, height - 100, 35, 100)
        p5.rect(735, height - 60, 25, 60)

        p5.rect(760, height - 140, 30, 140) // building 8, no top 

        p5.rect(790, height - 50, 10, 50)
        
        


        // // triangles as mountains 
        // // p1 bottom left, p2 bottom right, p3 top
        p5.triangle(1000, height, 1300,  height, 1200, height - 300);
        p5.triangle(1000, height, 1300,  height, 1100, height - 240);
      }
      p5.endShape();


      // DA MOON
      p5.beginShape();
      let ampSize = 0;
      for (let note of values) {
        var noteNum = note as number;
        ampSize += noteNum * 5; // multiplied by 4 to increase visual radius
      }
      p5.fill(230,230,180);
      p5.noStroke()
      p5.ellipse(20,20, 190 + ampSize, 190 + ampSize);

      p5.endShape();

      // animation
    var moveX = 0;
    var moveY = 0;
    
    
    
    // p5.fill(255, 255, 255, 255)
    // p5.ellipse(moveX, 200, 200, 200)
    // p5.beginShape();
    // p5.draw()
    //   if (moveX < 400) {
    //     moveX = moveX - 20;
    //   } else {
    //     moveX = 0;
    //   }
    // p5.endShape();
     
      
     
      
      
      
    
      
      
      
    },
  );