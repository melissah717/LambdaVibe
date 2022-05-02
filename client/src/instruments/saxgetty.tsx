// 3rd party library imports
import * as Tone from 'tone';
import classNames from 'classnames';
import { List, Range } from 'immutable';
import React from 'react';

// project imports
import { Instrument, InstrumentProps } from '../Instruments';

/** ------------------------------------------------------------------------ **
 * Contains implementation of components for Saxophone.
 ** ------------------------------------------------------------------------ */

interface SaxophoneNotesProps {
  note: string; // C, Db, D, Eb, E, F, Gb, G, Ab, A, Bb, B
  duration?: string;
  saxSynth?: Tone.Sampler; // Contains library code for making sound
  minor?: boolean; // True if minor key, false if major key
  octave: number;
  index: number; // octave + index together give a location for the saxophone key
}

// const sampler = new Tone.Sampler({
//   urls: {
//     C3: "https://cdn.kapwing.com/final_6267741712065600d647a32c_197210.mp3",
//     D3: "https://cdn.kapwing.com/final_626773fa5d9ef4009b32663d_477988.mp3",
//     E3: "https://cdn.kapwing.com/final_626773daa09021009a86b6b7_838830.mp3",
//     F3: "https://cdn.kapwing.com/final_626770312acf5f0077cc8299_69218.mp3",
//     A3: "https://cdn.kapwing.com/final_62677492a09021009a86b6fd_480823.mp3",
//     B3: "https://cdn.kapwing.com/final_62677470b053ee009b768539_726517.mp3"
//   },
// }).toDestination();

export function SaxophoneNotes({
  note,
  saxSynth,
  minor,
  index,
}: SaxophoneNotesProps): JSX.Element {
  /**
   * This React component corresponds to either a major or minor key in the saxophone.
   * See `SaxophoneNotesWithoutJSX` for the React component without JSX.
   */
  return (
    // Observations:
    // 1. The JSX refers to the HTML-looking syntax within TypeScript.
    // 2. The JSX will be **transpiled** into the corresponding `React.createElement` library call.
    // 3. The curly braces `{` and `}` should remind you of string interpolation.
    <div
      onMouseDown={() => saxSynth?.triggerAttackRelease(`${note}`, "3n")}  // Question: what is `onMouseDown`?
      onMouseUp={() => saxSynth?.triggerRelease('+0.25')} // Question: what is `onMouseUp`?
      className={classNames('ba pointer absolute dim', {
        'bg-black black h3': minor, // minor keys are black
        // 'black bg-white h4': !minor, // major keys are white
      })}
      style={{
        // CSS
        top: 0,
        left: `${index * 2}rem`,
        zIndex: minor ? 1 : 0,
        // width: minor ? '1.5rem' : '2rem',
        marginLeft: minor ? '0.25rem' : 0,
        padding:10,
        margin:20,
        display:"inline-block",
        // position:'absolute',
        backgroundColor: "#393E41",
        borderRadius: "50%",
        width:100,
        height:100,
      }}
    ></div>
  );
}

// eslint-disable-next-line
function SaxophoneNotesWithoutJSX({
  note,
  saxSynth,
  minor,
  index,
}: SaxophoneNotesProps): JSX.Element {
  /**
   * This React component for pedagogical purposes.
   * See `SaxophoneNotes` for the React component with JSX (JavaScript XML).
   */
  return React.createElement(
    'div',
    {
      onMouseDown: () => saxSynth?.triggerAttack(`${note}`),
      onMouseUp: () => saxSynth?.triggerRelease('+0.25'),
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

function SaxophoneType({ title, onClick, active }: any): JSX.Element {
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

function Saxophone({ saxSynth, setSynth }: InstrumentProps): JSX.Element {
  const keys = List([
    { note: 'C', idx: 0 },
     { note: 'Db', idx: 0.5 },
    { note: 'D', idx: 1 },
    { note: 'Eb', idx: 1.5 },
    { note: 'E', idx: 2 },
    { note: 'F', idx: 3 },
    { note: 'Gb', idx: 3.5 },
    { note: 'G', idx: 4 },
    { note: 'Ab', idx: 4.5 },
    { note: 'A', idx: 4 },
    { note: 'B', idx: 5 },
    { note: 'Bb', idx: 5.5 },
    { note: 'B', idx: 6 },
  ]);

  // const setOscillator = (newType: Tone.ToneOscillatorType) => {
  //   setSynth(oldSynth => {
  //     oldSynth.disconnect();

  //     return new Tone.Synth({
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
              <SaxophoneNotes
                key={note} //react key
                note={note}
                saxSynth={saxSynth}
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
              <FluteType
                key={o}
                title={o}
                onClick={() => setOscillator(fluteSynth)}
                active={fluteSynth?.oscillator.type === o}
              /> */}
            {/* ))} */}
          </div>
        // </div>
      );
    }

export const SaxophoneInstrument = new Instrument('Saxophone', Saxophone);