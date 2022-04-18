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

        for (let i = 0; i < levels.length; i++) {
            const amplitude = levels[i] as number;
            let levelHeight = p5.map(amplitude, 0, 0.4, 0, height);
            const x = p5.map(i, 0, levels.length - 1, 0, width);
            p5.fill(100, 250, 100);
            p5.rect(0, height, x, -levelHeight);
        }
        p5.endShape();
    },
);

