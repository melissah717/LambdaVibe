// 3rd party library imports
import { randomInt } from 'crypto';
import P5 from 'p5';
import * as Tone from 'tone';
import { fileURLToPath } from 'url';

// project imports
import { Visualizer } from '../Visualizers';

export const melissah717Visualizer = new Visualizer(
    'melissah717',
    (p5: P5, analyzer: Tone.Analyser) => {

        class Particle {
            position: P5.Vector;
            velocity: P5.Vector;
            acceleration: P5.Vector;
            w: number;
            color: number[];
            constructor(){
                this.position = P5.Vector.random2D().mult(250)
                this.velocity = p5.createVector(20,22)
                this.acceleration = this.position.copy().mult(p5.random(0.01, 0.00001))
                this.w = p5.random(1, 10)

                this.color = [p5.random(200, 255), p5.random(200, 255), p5.random(200, 255)]
            }
            show(){
                p5.noStroke()
                p5.fill(this.color)
                p5.ellipse(this.position.x, this.position.y, this.w)
            }

            update(){
                this.velocity.add(this.acceleration)
                this.position.add(this.velocity)
            }

            edges(){
                if (this.position.x < -width /2 || this.position.x > width / 2 ||
                this.position.y < -height / 2 || this.position.y > height / 2 ){
                    return true
                } else {
                    return false
                }
            }
        }
        const width = window.innerWidth;
        const height = window.innerHeight / 2;
        const dim = Math.min(width, height);
        let particles = []

        p5.background(0);

        p5.strokeWeight(dim * 0.01);
        p5.stroke(186, 117, 255);
        p5.noFill();

        const values = analyzer.getValue();

        p5.translate(width / 2, height / 2);

        //waveform object
        for (let t = -1; t <= 1; t +=2){        
            p5.beginShape();
            for (let i = 0; i <= 180; i+= 0.5) {
                let index = p5.floor(p5.map(i, 0, 180, 0, values.length -1));
    
                let r = p5.map(
                    p5.abs(values[index] as number),
                    -1,
                    1,
                    150,
                    250
                );
    
                let x = r * p5.sin(i) * t;
                let y = r * p5.cos(i);
                p5.vertex(x, y);
            }
            p5.endShape();
        }

        var p = new Particle()
        particles.push(p)

        for(let i = particles.length - 1; i >= 0; i--){
            particles[i].show()
            particles[i].update()
    }

        

        // p5.beginShape();
        // for (let i = 0; i <= 180; i++) {
        //     let index = p5.floor(p5.map(i, 0, 180, 0, values.length -1));

        //     let r = p5.map(
        //         p5.abs(values[index] as number),
        //         -1,
        //         1,
        //         150,
        //         200
        //     );

        //     let x = r * -p5.sin(i);
        //     let y = r * p5.cos(i);
        //     p5.vertex(x, y);
        // }
        // p5.endShape();
    },

);
    