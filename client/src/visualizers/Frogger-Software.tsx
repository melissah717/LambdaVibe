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

        // let scaleArray = [60, 62, 64, 65, 67, 69, 71, 72];
        // let note = 0;

        // p5.createCanvas(710, 200);
        // let osc = new Tone.Oscillator();

        // // Instantiate the envelope
        // // set attackTime, decayTime, sustainRatio, releaseTime
        // let envelope = new Tone.Envelope(0.001, 0.5, 0.1, 0.5);

        // osc.start();

        // let fft = new Tone.FFT();
        // p5.noStroke();

        // p5.beginShape();
        // p5.background(20);

        // if (p5.frameCount % 60 === 0 || p5.frameCount === 1) {
        //     let midiValue = scaleArray[note];
        //     let freqValue = Tone.Midi(midiValue).toFrequency();;
        //     osc.frequency.value = freqValue;

        //     envelope.triggerAttack();
        //     note = (note + 1) % scaleArray.length;
        // }

        // // plot FFT.analyze() frequency analysis on the canvas
        // let spectrum = analyzer.getValue();
        // for (let i = 0; i < spectrum.length / 20; i++) {
        //     p5.fill(spectrum[i] as number, spectrum[i] as number / 10, 0);
        //     let x = p5.map(i, 0, spectrum.length / 20, 0, width);
        //     let h = p5.map(spectrum[i] as number, 0, 255, 0, height);
        //     p5.rect(x, height, spectrum.length / 20, -h);
        // }

        for (const level of levels) {
            let levelHeight = p5.map(level as number, 0, 0.4, 0, height);
            p5.fill(100, 250, 100);
            p5.rect(0, height, width, -levelHeight);
        }
        p5.endShape();
    },
);

