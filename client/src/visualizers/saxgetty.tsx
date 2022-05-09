// 3rd party library imports
import P5 from 'p5';
import * as Tone from 'tone';

// project imports
import { Visualizer } from '../Visualizers';

export const saxgettyVisualizer = new Visualizer(
  'saxgetty',
  (p5: P5, analyzer: Tone.Analyser, imgLoader: P5.Image) => {
    const width = window.innerWidth;
    const height = window.innerHeight / 2;
    const dim = Math.min(width, height);
    const values = analyzer.getValue();

    p5.background(0, 0, 0, 255);
    p5.strokeWeight(dim * 0.01);  
    p5.stroke('rgba(255, 215, 0, 100)');
    p5.noFill();

    p5.beginShape();

    p5.push();
    p5.rotateZ(p5.frameCount * 0.01);
    p5.rotateX(p5.frameCount * 0.01);
    p5.rotateY(p5.frameCount * 0.01);
    p5.color(p5.random(0, 255), p5.random(0, 255), p5.random(0, 255));
    p5.texture(imgLoader);

    let sum = 0;
    for (let x of values) {

      x = x as number;
      sum += x;
    }

    p5.box(200 + sum * 10);
    p5.pop();

    p5.endShape();
  },
);
