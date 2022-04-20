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
      

      // MAIN / VISUALIZER RECTANGLES
      p5.beginShape();
      for (let i = 0; i < values.length; i++) {
        const amplitude = values[i] as number;
        const x = p5.map(i, 0, values.length - 1, 0, width);
        const y = height / 4 + amplitude * height; 
      
        let ampSize = 0;
         for (let note of values) {
            var noteNum = note as number;
            ampSize += noteNum * 5; // multiplied by 4 to increase visual radius
        }

        p5.background(0, 12, 48, 255);
        // maybe add beacons for some smaller building segments

        // BEACONS/SIGNALS FOR BUILDINGS
        // beacon for building 1's top (leftmost)
        p5.rect(100, height + ampSize * 6, 10, 240); 
        p5.rect(100, y * 4.1, 10, 240); // second rectangle w/ diff height value layered on top for visual consistency

        // beacon for building 2's top
        p5.rect(180, height + ampSize * 6, 30, 220); 
        p5.rect(180, y * 4.1, 30, 220); 

        // variable height for 3, 4 and 5 for responsiveness
        var flexHeight3and5 = y * 3;
        var flexHeight4 = y * 3;
        
        if (width < 2200) { // checks screen width to change height accordingly
          flexHeight3and5 = y * 1.5;
          flexHeight4 = y;
        } else {
          flexHeight3and5 = y * 4.1
          flexHeight4 = y * 4.1
        }

        // beacon for building 3
        p5.rect(265, height + ampSize * 8, 50, 355) 
        p5.rect(265, flexHeight3and5, 50, 355) 

        // beacon for building 4 (tallest)
        p5.rect(420, height + ampSize * 10, 10, 420) 
        p5.rect(420, flexHeight4, 10, 420)

        // beacon for building 5
        p5.rect(510, height + ampSize * 10, 15, 370) 
        p5.rect(510, flexHeight3and5, 15, 370) 
        
        // beacon for building 6
        p5.rect(620, height + ampSize * 10, 15, 250) 
        p5.rect(620, y * 4.1, 15, 250)

        // beacon for building 7
        p5.rect(670, height + ampSize * 8, 35, 220) 
        p5.rect(670, y * 4.1, 35, 220)
        
        // beacon for building 8
        p5.rect(760, height + ampSize * 8, 30, 140) 
        p5.rect(760, y * 4.1, 30, 140)

        
        // YELLOW FILL FOR MOUNTAIN LIGHTS
        p5.fill(200,200,0,255)

        // MOUNTAIN LIGHTS
        // lights for big mountain 1
        p5.rect(1047, height + ampSize * 10, 5, 140) 
        p5.rect(1047, y * 4.1, 5, 140)
        
        // lights for big mountain 2 (tallest)
        p5.rect(1197, height + ampSize * 10, 5, 140) 
        p5.rect(1197, y * 4.1, 5, 140)

        // lights for big mountain 3 
        p5.rect(1337, height + ampSize * 10, 5, 140) 
        p5.rect(1337, y * 4.1, 5, 140)

        // RAINBOW FILL FOR BEACONS
        p5.fill((2*p5.frameCount) % 720, 100, 100);   
        

        
        
      }
      p5.endShape();


      p5.beginShape();
      
      
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
        
        


        // MOUNTAINS
        // p1 bottom left, p2 bottom right, p3 top
        p5.triangle(850, height, 1150,  height, 900, height - 150);
        p5.triangle(850, height, 1150,  height, 1010, height - 280);
        p5.triangle(850, height, 1150,  height, 1050, height - 300);
        
        p5.triangle(1000, height, 1300,  height, 1100, height - 240);
        p5.triangle(1000, height, 1300,  height, 1200, height - 350);
        
        p5.triangle(1150, height, 1450,  height, 1290, height - 270);
        p5.triangle(1150, height, 1450,  height, 1340, height - 320);
        p5.triangle(1150, height, 1450,  height, 1440, height - 170);
        p5.triangle(1150, height, 1510,  height, 1470, height - 120);

        // MOUNTAIN SNOWY TOPS
        // order of left to right
        p5.fill(255,255,255,255)
        p5.triangle(885, height - 100, 920,  height - 130, 900, height - 150);
        p5.triangle(985, height - 240, 1030,  height - 260, 1015, height - 280);
        p5.triangle(1015, height - 255, 1065,  height - 260, 1050, height - 300); // big mountain 1
        p5.triangle(1085, height - 200, 1125,  height - 220, 1100, height - 240);
        p5.triangle(1165, height - 290, 1210,  height - 310, 1200, height - 350); // big mountain 2, tallest
        p5.triangle(1270, height - 230, 1300,  height - 250, 1290, height - 270);
        p5.triangle(1300, height - 260, 1357,  height - 270, 1340, height - 320); // big mountain 3, tallest
        p5.triangle(1400, height - 150, 1441,  height - 140, 1440, height - 170);
        p5.triangle(1440, height - 100, 1480,  height - 90, 1470, height - 120);

        
        // SNOW
        for (var i = 0; i < 40; i++ ) { // loop randomly places elipses everywhere to simulate snow
          p5.fill(255,255, 255, 255)
          var locationX = p5.random(p5.width)
          var locationY = p5.random(p5.height)
          var locationSize = p5.random(1, 6);

          p5.ellipse(locationX ,locationY, locationSize, locationSize);
        }
      
      p5.endShape();


      // MOON
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
    
      
    },
  );