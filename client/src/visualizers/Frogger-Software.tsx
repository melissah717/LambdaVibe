// 3rd party library imports
import P5 from 'p5';
import * as Tone from 'tone';

// project imports
import { Visualizer } from '../Visualizers';

export const DrumEnvelopVisualizer = new Visualizer(
    'Frogger-Software',
    (p5: P5, analyzer: Tone.Analyser) => {
        const width = window.innerWidth;
        const height = window.innerHeight / 2;
        const dim = Math.min(width, height);

        p5.background(0, 0, 0, 255);

        p5.strokeWeight(dim * 0.01);
        p5.stroke(255, 255, 255, 255);
        p5.noFill();

        const levels = analyzer.getValue();
        p5.beginShape();

        for (const level of levels) {
            let levelHeight = p5.map(level as number, 0, 0.4, 0, height);
            p5.fill(100, 250, 100);
            p5.rect(0, height, width, -levelHeight);
        }
        p5.endShape();
    },
);

