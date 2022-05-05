// 3rd party library imports
import React, { useState, useEffect } from 'react';
import * as Tone from 'tone';

// project imports
import { DispatchAction } from './Reducer';
import { AppState } from './State';

/** ------------------------------------------------------------------------ **
 * Contains base implementation of an Instrument.
 ** ------------------------------------------------------------------------ */

export interface InstrumentProps {
  state: AppState;
  dispatch: React.Dispatch<DispatchAction>;
  name: string;
  synth: Tone.Synth;
  setSynth: (f: (oldSynth: Tone.Synth) => Tone.Synth) => void;
  fluteSynth: Tone.Sampler;
  drumSynth: Tone.Sampler;
  saxSynth: Tone.Sampler;
  vaporSynth: Tone.Sampler;
}

export class Instrument {
  public readonly name: string;
  public readonly component: React.FC<InstrumentProps>;

  constructor(name: string, component: React.FC<InstrumentProps>) {
    this.name = name;
    this.component = component;
  }
}

function TopNav({ name }: { name: string }) {
  return (
    <div
      className={
        'ml5 top-0 light-green f2 fw9-ns tracked-tight-ns pt4 pl3 justify-center-ns'
      }
    >
      <div>{name}</div>
    </div>
  );
}

interface InstrumentContainerProps {
  state: AppState;
  dispatch: React.Dispatch<DispatchAction>;
  instrument: Instrument;
}


export const InstrumentContainer: React.FC<InstrumentContainerProps> = ({
  instrument,
  state,
  dispatch,
}: InstrumentContainerProps) => {
  const InstrumentComponent = instrument.component;
  const [synth, setSynth] = useState(
    new Tone.Synth({
      oscillator: { type: 'triangle' } as unknown as Tone.OmniOscillatorOptions,
    }).toDestination(),
  );

  const [fluteSynth] = useState(
    new Tone.Sampler({
      urls: {
        C3: "https://cdn.kapwing.com/final_626b28264e259800a36dbf54_808371.mp3" //middle C note 
      },
      onload: () => {
        console.log("Flute sounds activated");
      }

    }).toDestination(),
  );

  const [drumSynth] = useState(
    new Tone.Sampler({
      urls: {
        C3: "tom1.mp3",
        D3: "tom2.mp3",
        E3: "tom3.mp3",
        F3: "snare.mp3",
        G3: "kick.mp3",
        A3: "hihat.mp3"
      }
      ,
      baseUrl: "https://tonejs.github.io/audio/drum-samples/acoustic-kit/",
    }).toDestination(),
  );

  const [saxSynth] = useState(
    new Tone.Sampler({
      urls: {
        C3: "https://cdn.kapwing.com/final_6267741712065600d647a32c_197210.mp3" //middle C note
        // D3: "https://cdn.kapwing.com/final_626773fa5d9ef4009b32663d_477988.mp3",
        // E3: "https://cdn.kapwing.com/final_626773daa09021009a86b6b7_838830.mp3",
        // F3: "https://cdn.kapwing.com/final_626770312acf5f0077cc8299_69218.mp3",
        // A3: "https://cdn.kapwing.com/final_62677492a09021009a86b6fd_480823.mp3",
        // B3: "https://cdn.kapwing.com/final_62677470b053ee009b768539_726517.mp3"
      },
    }).toDestination(),
  );

  const [vaporSynth] = useState(
    new Tone.Sampler({
    urls: {
        // letter determines actual note 
      E1: "https://cdn.kapwing.com/final_62682213960a8700766ca7de_141750.mp3", // first
      // F2: "https://cdn.kapwing.com/final_626822a54a94a30114cae76e_537685.mp3", // second
      C3: "https://cdn.kapwing.com/final_62682611547067008ddbca49_355155.mp3" //third
      // D4: "https://cdn.kapwing.com/final_6268298dd540f9006733fd80_779826.mp3", // fourth

      // A4: "https://cdn.kapwing.com/final_62682213960a8700766ca7de_141750.mp3", // first repeat
      // B4: "https://cdn.kapwing.com/final_626822a54a94a30114cae76e_537685.mp3", // second repeat
    },
  }).toDestination(),
  );

  const notes = state.get('notes');


  useEffect(() => {
    if (instrument.name === 'Flute' && fluteSynth && notes) {
      {
        let eachNote = notes.split(' ');
        let noteObjs = eachNote.map((note: string, idx: number) => ({
          idx,
          time: `+${idx / 2}`,
          note,
          velocity: 1,
        }));

        new Tone.Part((time, value) => {
          // the value is an object which contains both the note and the velocity
          fluteSynth.triggerAttackRelease(value.note, '3n', time, value.velocity);
          if (value.idx === eachNote.length - 1) {
            dispatch(new DispatchAction('STOP_SONG'));
          }
        }, noteObjs).start(0);

        Tone.Transport.start();

        return () => {
          Tone.Transport.cancel();
        };
      }
    }

    else if (instrument.name === 'Drum' && drumSynth && notes) {
      {
        let eachNote = notes.split(' ');
        let noteObjs = eachNote.map((note: string, idx: number) => ({
          idx,
          time: `+${idx / 1.5}`,
          note,
          velocity: 1,
        }));

        new Tone.Part((time, value) => {
          // the value is an object which contains both the note and the velocity
          drumSynth.triggerAttackRelease(value.note, '4n', time, value.velocity);
          if (value.idx === eachNote.length - 1) {
            dispatch(new DispatchAction('STOP_SONG'));
          }
        }, noteObjs).start(0);

        Tone.Transport.start();

        return () => {
          Tone.Transport.cancel();
        };
      }
    }

    else if (instrument.name === 'Saxophone' && saxSynth && notes) {
      {
        let eachNote = notes.split(' ');
        let noteObjs = eachNote.map((note: string, idx: number) => ({
          idx,
          time: `+${idx / 2}`,
          note,
          velocity: 1,
        }));

        new Tone.Part((time, value) => {
          // the value is an object which contains both the note and the velocity
          saxSynth.triggerAttackRelease(value.note, '4n', time, value.velocity);
          if (value.idx === eachNote.length - 1) {
            dispatch(new DispatchAction('STOP_SONG'));
          }
        }, noteObjs).start(0);

        Tone.Transport.start();

        return () => {
          Tone.Transport.cancel();
        };
      }
    }

    else if (instrument.name === 'Vaporwave' && vaporSynth && notes) {
      {
        let eachNote = notes.split(' ');
        let noteObjs = eachNote.map((note: string, idx: number) => ({
          idx,
          time: `+${idx / 2}`,
          note,
          velocity: 1,
        }));

        new Tone.Part((time, value) => {
          // the value is an object which contains both the note and the velocity
          vaporSynth.triggerAttackRelease(value.note, '4n', time, value.velocity);
          if (value.idx === eachNote.length - 1) {
            dispatch(new DispatchAction('STOP_SONG'));
          }
        }, noteObjs).start(0);

        Tone.Transport.start();

        return () => {
          Tone.Transport.cancel();
        };
      }
    }


    else if (notes && synth) {
      let eachNote = notes.split(' ');
      let noteObjs = eachNote.map((note: string, idx: number) => ({
        idx,
        time: `+${idx / 4}`,
        note,
        velocity: 1,
      }));

      new Tone.Part((time, value) => {
        // the value is an object which contains both the note and the velocity
        synth.triggerAttackRelease(value.note, '4n', time, value.velocity);
        if (value.idx === eachNote.length - 1) {
          dispatch(new DispatchAction('STOP_SONG'));
        }
      }, noteObjs).start(0);

      Tone.Transport.start();

      return () => {
        Tone.Transport.cancel();
      };
    }

    return () => { };
  }, [notes, synth, dispatch]);

  return (
    <div>
      <TopNav name={instrument.name} />
      <div
        className={'bg-black relative right-0 left-0 f-6-ns pl0'}
        style={{ 
          top: '1rem'}}
      >
        <InstrumentComponent
          name={instrument.name}
          state={state}
          dispatch={dispatch}
          synth={synth}
          setSynth={setSynth}
          fluteSynth={fluteSynth}
          drumSynth={drumSynth}
          saxSynth={saxSynth}
          vaporSynth = {vaporSynth}
        />
      </div>
    </div>
  );
};

