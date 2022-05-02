// 3rd party library imports
import * as Tone from 'tone';
import classNames from 'classnames';
import { List, Range } from 'immutable';
import React from 'react';

// project imports
import { Instrument, InstrumentProps } from '../Instruments';

/** ------------------------------------------------------------------------ **
 * Contains implementation of components for Piano.
 ** ------------------------------------------------------------------------ */

interface DrumNotesProps {
  note: string; // C, Db, D, Eb, E, F, Gb, G, Ab, A, Bb, B
  duration?: string;
  drumSynth?: Tone.Sampler; // Contains library code for making sound
  minor?: boolean; // True if minor key, false if major key
  octave: number;
  index: number; // octave + index together give a location for the piano key
}

// const kickDrum = new Tone.MembraneSynth({
//   volume: 6
// });

// const lowPass = new Tone.Filter({
//   frequency: 8000,
// });

// const snareDrum = new Tone.NoiseSynth({
//   volume: 5,
//   noise: {
//     type: 'white',
//     playbackRate: 3,
//   },
//   envelope: {
//     attack: 0.001,
//     decay: 0.20,
//     sustain: 0.15,
//     release: 0.03,
//   },
// }).connect(lowPass);

export function DrumNotes({
  note,
  drumSynth,
  minor,
  index,
}: DrumNotesProps): JSX.Element {
  /**
   * This React component corresponds to either a major or minor key in the piano.
   * See `DrumNotesWithoutJSX` for the React component without JSX.
   */
  return (
    // Observations:
    // 1. The JSX refers to the HTML-looking syntax within TypeScript.
    // 2. The JSX will be **transpiled** into the corresponding `React.createElement` library call.
    // 3. The curly braces `{` and `}` should remind you of string interpolation.
    <div
      onMouseDown={() => drumSynth?.triggerAttack(`${note}`)} // Question: what is `onMouseDown`?
      onMouseUp={() => drumSynth?.triggerRelease('+0.25')} // Question: what is `onMouseUp`?
      className={classNames('ba pointer absolute dim', {
        'black bg-white h4': !minor, // major keys are white
        // 'bg-black black h3': minor, // minor keys are black
      })}
      style={{
        // CSS
        top: 0,
        left: `${index * 2}rem`,
        width: '1rem',
        marginLeft: 0,
        height: '2rem',
      }}
    ></div>
  );
}

// eslint-disable-next-line
function DrumNotesWithoutJSX({
  note,
  drumSynth,
  minor,
  index,
}: DrumNotesProps): JSX.Element {
  /**
   * This React component for pedagogical purposes.
   * See `DrumNotes` for the React component with JSX (JavaScript XML).
   */
  return React.createElement(
    'div',
    {
      onMouseDown: () => drumSynth?.triggerAttack(`${note}`),
      onMouseUp: () => drumSynth?.triggerRelease('+0.25'),
      className: classNames('ba pointer absolute dim', {
        'bg-black black h3': minor,
        'black bg-white h4': !minor,
      }),
      style: {
        top: 0,
        left: `${index * 2}rem`,
        zIndex: minor ? 1 : 0,
        width: minor ? '1.5rem' : '2rem',
        marginLeft: minor ? '0.25rem' : 0,
      },
    },
    [],
  );
}

//for sine, triangle etc
function DrumType({ title, onClick, active }: any): JSX.Element {
  return (
    <div
      onClick={onClick}
      className={classNames('dim pointer ph2 pv1 ba mr2 br1 fw7 bw1', {
        'b--black black': active,
        'gray b--light-gray': !active,
      })}
    >
      {title}
    </div>
  );
}

function Drum({ drumSynth, setSynth }: InstrumentProps): JSX.Element {
  const keys = List([
    { note: 'C', idx: 0 },
    { note: 'Db', idx: 0.5 },
    { note: 'D', idx: 1 },
    { note: 'Eb', idx: 1.5 },
    { note: 'E', idx: 2 },
    { note: 'F', idx: 3 },
    { note: 'Gb', idx: 3.5 },
    { note: 'A', idx: 4 },
    { note: 'Ab', idx: 4.5 },
    { note: 'B', idx: 5 },
    { note: 'Bb', idx: 5.5 },
    { note: 'B', idx: 6 },
  ]);

  // const setOscillator = (newType: Tone.ToneOscillatorType) => {
  //   setSynth(oldSynth => {
  //     oldSynth.disconnect();

  //     return new Tone.MembraneSynth({
  //       oscillator: { type: newType } as Tone.OmniOscillatorOptions,
  //     }).toDestination();
  //   });
  // };

  // const oscillators: List<OscillatorType> = List([
  //   'sine',
  //   'sawtooth',
  //   'square',
  //   'triangle',
  //   'fmsine',
  //   'fmsawtooth',
  //   'fmtriangle',
  //   'amsine',
  //   'amsawtooth',
  //   'amtriangle',
  // ]) as List<OscillatorType>;

  return (
    <div className="pv4">
      <div className="relative dib h4 w-100 ml4">
        {Range(2, 7).map(octave =>
          keys.map(key => {
            const isMinor = key.note.indexOf('b') !== -1;
            const note = `${key.note}${octave}`;
            return (
              <DrumNotes
                key={note} //react key
                note={note}
                drumSynth={drumSynth}
                minor={isMinor}
                octave={octave}
                index={(octave - 2) * 7 + key.idx}
              />
            );
          }),
        )}
      </div>
      {/* <div className={'pl4 pt4 flex'}>
        {oscillators.map(o => (
          <DrumType
            key={o}
            title={o}
            onClick={() => setOscillator(fluteSynth)}
            active={drumSynth?.oscillator.type === o}
          /> */}
        {/* ))} */}
        </div>
    // </div>
  );
}

export const DrumInstrument = new Instrument('Drum', Drum);
