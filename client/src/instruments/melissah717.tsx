// 3rd party library imports
import * as Tone from 'tone';
import classNames from 'classnames';
import { List, Range } from 'immutable';
import React, {useState, useEffect} from 'react';

// project imports
import { Instrument, InstrumentProps } from '../Instruments';

/** ------------------------------------------------------------------------ **
 * Contains implementation of components for Piano.
 ** ------------------------------------------------------------------------ */
//  const fluteSampler = new Tone.Sampler({
//   urls: {
//     // C: "https://cdn.kapwing.com/final_626b191372f44800a54d83b9_949968.mp3",
//     // Cs: "https://cdn.kapwing.com/final_626b19e0fa90150120680af7_620289.mp3",
//     // D: "https://cdn.kapwing.com/final_626b1a42bc219500a3ed4d97_227515.mp3",
//     // Ds: "https://cdn.kapwing.com/final_626b238ff44945009e450e1b_814443.mp3",
//     // E: "https://cdn.kapwing.com/final_626b23ba3691d00065d54bd3_626170.mp3",
//     // F: "https://cdn.kapwing.com/final_626b23ef5e6fca0119e78a78_653207.mp3",
//     // Fs: "https://cdn.kapwing.com/final_626b242d8a443d0101063091_6516.mp3",
//     // G: "https://cdn.kapwing.com/final_626b24771fad34009bd7d504_609376.mp3",
//     // Gs: "https://cdn.kapwing.com/final_626b24a495210600f7b7c64a_23147.mp3",
//     // A: "https://cdn.kapwing.com/final_626b24dab0c47c0087ed08ef_117400.mp3",
//     // B1: "https://cdn.kapwing.com/final_626b250db61d82005f0730dc_421521.mp3"
//     C3: "https://cdn.kapwing.com/final_626b28264e259800a36dbf54_808371.mp3" //middle C note
    
//   },

// }).toDestination();
// type NewType = Tone.Sampler;


interface FluteNotesProps {
  note: string; // C, Db, D, Eb, E, F, Gb, G, Ab, A, Bb, B
  duration?: string;
  fluteSynth: Tone.Sampler// Contains library code for making sound
  minor?: boolean; // True if minor key, false if major key
  octave: number;
  index: number; // octave + index together give a location for the piano key
}

export function FluteNotes({
  note,
  fluteSynth,
  minor,
  index,
}: FluteNotesProps): JSX.Element {
  /**
   * This React component corresponds to either a major or minor key in the piano.
   * See `BassNotesWithoutJSX` for the React component without JSX.
   */
  return (
    <div 
    className="mt6 ph2-ns bg-moon-gray w-80 center-ns br4 relative">
      <div 
        className="fl-w-60 inline-flex br ml0-ns absolute">
        <div
          onMouseDown={() => fluteSynth?.triggerAttackRelease(`${note}`, "4n")}
          className={classNames('pa pt4 pointer absolute dim', {
            'bg-gray br2': minor, // minor keys
            'bg-black h2-ns br4': !minor, // major keys
      })}
      style={{
        // CSS
        // top: 0,
        // borderColor: minor? 'moon-gray' : 'moon-gray',
        left: `${index * 4}rem`,
        width: minor ? '1rem' : '2rem',
        marginLeft: minor ? '0.6rem' : '0.1rem',
        // paddingBottom: minor ? '1.5rem' : '2rem',
        // borderRadius: '40%'
      }}
    ></div>
    </div>
    </div>
  );
}

// eslint-disable-next-line
function FluteNotesWithoutJSX({
  note,
  fluteSynth,
  minor,
  index,
}: FluteNotesProps): JSX.Element {

  return React.createElement(
    'div',
    {
      onMouseDown: () => fluteSynth?.triggerAttack(`${note}`),
      onMouseUp: () => fluteSynth?.triggerRelease('+0.25'),
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

function FluteType({ title, onClick, active }: any): JSX.Element {
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

function Flute({ fluteSynth, setSynth }: InstrumentProps): JSX.Element {
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
    { note: 'A', idx: 5 },
    { note: 'Bb', idx: 5.5 },
    { note: 'B', idx: 6 },
  ]);

  // const setOscillator = (newType: Tone.Synth) => {
  //   setSynth(oldSynth => {
  //     oldSynth.disconnect();

    //   useEffect(() => {
    //     setOscillator('flute');
    //     return () => {};
    // }, []);

  //     return new Tone.Synth({
  //       oscillator: { FluteInstrument } as unknown as Tone.OmniOscillatorOptions,
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
  //   'flute'
  // ]) as List<OscillatorType>;

  return (
    <div className="ph3-ns bg-moon-gray w-50 center-ns br4 h2 relative">
        {Range(2, 3).map(octave =>
          keys.map(key => {
            const isMinor = key.note.indexOf('b') !== -1;
            const note = `${key.note}${octave}`;
            return (
              <FluteNotes
                key={note} //react key
                note={note}
                fluteSynth={fluteSynth}
                minor={isMinor}
                octave={octave}
                index={(octave - 2) * 3 + key.idx}
              />
            );
          }),
        )}
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

export const FluteInstrument = new Instrument('Flute', Flute);
