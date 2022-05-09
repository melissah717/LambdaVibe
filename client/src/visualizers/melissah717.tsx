// 3rd party library imports
import P5 from 'p5';
import * as Tone from 'tone';


// project imports
import { Visualizer } from '../Visualizers';


export const melissah717Visualizer = new Visualizer(
    'melissah717',
    //draw begins
    (p5: P5, analyzer: Tone.Analyser, imgLoader: P5.Image) => {


        // let color = p5.color(10, 0, 255)
        const width = window.innerWidth;
        const height = window.innerHeight / 2;
        const dim = Math.min(width, height);

        p5.background(0)
        p5.strokeWeight(dim * 0.01);
        p5.stroke(255, 255, 255);
        p5.noFill();

        p5.translate(width / 2, height / 2);
        p5.image(imgLoader, 0, 0, width, height)

        const values = analyzer.getValue();


        for (let t = -1; t <= 1; t += 2) {   //create circle object w/loop that runs twice      
            p5.beginShape();
            for (let i = 0; i <= 180; i += 1) {
                let index = p5.floor(p5.map(i, 0, 180, 0, values.length - 1));

                let amplitude = p5.map(
                    p5.abs(values[index] as number),
                    -1,
                    1,
                    150,
                    250
                );

                let x = amplitude * p5.sin(i) * t;
                let y = amplitude * p5.cos(i);
                p5.vertex(x, y);
                }
                p5.endShape();
            }
    },
);

