// 3rd party library imports
import * as Tone from 'tone';
import Sketch from 'react-p5';
import P5 from 'p5';

import React, { useEffect, useMemo, useCallback } from 'react';

type VisualizerDrawer = (p5: P5, analyzer: Tone.Analyser, imgLoader: P5.Image) => void;


interface VisualizerContainerProps {
  visualizer: Visualizer;
}

export class Visualizer {
  public readonly name: string;
  public readonly draw: VisualizerDrawer;

  constructor(name: string, draw: VisualizerDrawer) {
    this.name = name;
    this.draw = draw;
  }
}

export function VisualizerContainer({ visualizer }: VisualizerContainerProps) {
  const { name, draw} = visualizer;
  const analyzer: Tone.Analyser = useMemo(
    () => new Tone.Analyser('waveform', 256),
    [],
  );

  let imgLoader: P5.Image

  const onResize = useCallback((p5: P5) => {
    const width = window.innerWidth;
    const height = window.innerHeight / 2;

    p5.resizeCanvas(width, height, false);
  }, []);

  useEffect(() => {
    Tone.getDestination().volume.value = -5;
    Tone.getDestination().connect(analyzer);
    return () => {
      Tone.getDestination().disconnect(analyzer);
    };
  }, [analyzer]);

  // Preloads our images to render depending on which visualizer.
  const preload = (p5: P5) => {

    if (name === "melissah717") {

      imgLoader = p5.loadImage('melbg.jpeg');
    }
    else if (name === "saxgetty") {

      imgLoader = p5.loadImage('pepeSax.png');
    }
  }

  const setup = (p5: P5, canvasParentRef: Element) => {
    const width = window.innerWidth;
    const height = window.innerHeight / 2;

    if (name === "melissah717") {

      p5.angleMode('degrees')
      p5.imageMode('center')
      imgLoader.filter('blur', 2)
    }
    
    // Adding an option for webgl for visualizers that require it.
    if (name === "saxgetty") {

      p5.createCanvas(width, height, "webgl").parent(canvasParentRef);
    }
    else {

      p5.createCanvas(width, height).parent(canvasParentRef);
    }
  };

  return (
    <div className={'bg-black absolute bottom-0 right-0 left-0'}>
      <div className={'ml5 top-0 light-green f2 fw9-ns tracked-tight-ns pt4 pl3 justify-center-ns'}>{name}</div>
      <Sketch
        preload={preload}
        setup={setup}
        draw={p5 => draw(p5, analyzer, imgLoader)}
        windowResized={onResize}
      />
    </div>
  );
}

