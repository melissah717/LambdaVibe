// 3rd party library imports
import p5 from 'p5';
import P5 from 'p5';
import * as Tone from 'tone';

// project imports
import { Visualizer } from '../Visualizers';

export const FroggerSoftwareVisualizer = new Visualizer(
    'Frogger-Software',
    (p5: P5, analyzer: Tone.Analyser) => {
        const width = window.innerWidth;
        const height = window.innerHeight / 2;
        const dim = Math.min(width, height);

        p5.background(0, 0, 0, 255);

        p5.strokeWeight(dim * 0.01);
        p5.stroke(255, 255, 255, 255);
        p5.noFill();

        // const fftAnalyzer = new Tone.Analyser(analyzer);
        // analyzer.type = "fft";
        const levels = analyzer.getValue();
        // const values = fftAnalyzer.getValue();

        p5.beginShape();
        for (let i = 0; i < levels.length; i++) {
            const amplitude = levels[i] as number * 400;
            let levelHeight = p5.map(amplitude/200, 0, 0.4, 0, height/2);
            const x = p5.map(i, 0, levels.length, 0, width);
            p5.fill(100, 100, 250);
            p5.rect(0, height, x, -levelHeight);

            
            // const frequency = levels[i] as number;
            // p5.fill(frequency, frequency / 10, 0);
            // const x = p5.map(i, 0, levels.length / 16, 0, width);
            // let h = p5.map(frequency, 0, 800, 0, -height/2);
            // p5.rect(x, height, levels.length / 4, -h);


            p5.ellipse(width / 2, height / 4, 10 + amplitude, 10 + amplitude);
        }
        p5.endShape();
    },
);

