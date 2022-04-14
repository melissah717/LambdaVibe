// 3rd party library imports
import P5 from 'p5';
import * as Tone from 'tone';

// project imports
import { VisualizerWebg } from '../VisualizerWebg';

export const saxgettyVisualizer = new VisualizerWebg(
  'saxgetty',
  (p5: P5, analyzer: Tone.Analyser) => {
    const width = window.innerWidth;
    const height = window.innerHeight / 2;
    const dim = Math.min(width, height);
    // let locX = p5.mouseX - height / 2;
    // let locY = p5.mouseY - width / 2;
    // let image = p5.loadImage('../img/smug.png');

    p5.background(0, 0, 0, 255);
    p5.strokeWeight(dim * 0.01);
    p5.stroke(255, 255, 255, 255);
    p5.noFill();

    const values = analyzer.getValue();
    p5.beginShape();
    // p5.ambientLight(60, 60, 60);
    // p5.pointLight(255, 255, 255, locX, locY, 100);

    p5.push();
    p5.rotateZ(p5.frameCount * 0.01);
    p5.rotateX(p5.frameCount * 0.01);
    p5.rotateY(p5.frameCount * 0.01);
    // p5.texture(image);

    let sum = 0;
    for (let x of values) {

      x = x as number;
      sum += x;
    }

    p5.box(100 + sum * 10);
    p5.pop();

    p5.endShape();
  },
);
