// 3rd party library imports
import * as Tone from 'tone';
import classNames from 'classnames';
import { List, Range } from 'immutable';
import React from 'react';

// project imports
import { Instrument, InstrumentProps } from '../Instruments';

/** ------------------------------------------------------------------------ **
 * Contains implementation of components for Vaporwave.
 ** ------------------------------------------------------------------------ */



// const sampler = new Tone.Sampler({
//   urls: {
//     	// letter determines actual note 
//     E1: "https://cdn.kapwing.com/final_62682213960a8700766ca7de_141750.mp3", // first
//     F2: "https://cdn.kapwing.com/final_626822a54a94a30114cae76e_537685.mp3", // second
//     C3: "https://cdn.kapwing.com/final_62682611547067008ddbca49_355155.mp3", //third
//     D4: "https://cdn.kapwing.com/final_6268298dd540f9006733fd80_779826.mp3", // fourth

//     A4: "https://cdn.kapwing.com/final_62682213960a8700766ca7de_141750.mp3", // first repeat
//     B4: "https://cdn.kapwing.com/final_626822a54a94a30114cae76e_537685.mp3", // second repeat
//   }

// }).toDestination();



interface VaporwaveNotesProps {
  note: string; // C, D, E, F, G, A, B
  duration?: string;
  vaporSynth?: Tone.Sampler; // Contains library code for making sound
  minor?: boolean; // True if minor key, false if major key
  octave: number;
  index: number; // octave + index together give a location for the piano key
}

export function VaporwaveNotes({
  note,
  vaporSynth,
  minor,
  index,
}: VaporwaveNotesProps): JSX.Element {
 
  return (
    // Observations:
    // 1. The JSX refers to the HTML-looking syntax within TypeScript.
    // 2. The JSX will be **transpiled** into the corresponding `React.createElement` library call.
    // 3. The curly braces `{` and `}` should remind you of string interpolation.
    <div className = "fl pa4"
      style={{
        width: '275px',
        position: 'relative', 
      }}>
      <div
        onMouseDown={() => vaporSynth?.triggerAttack(`${note}`)} 
        onMouseUp={() => vaporSynth?.triggerRelease('+0.25')} 
        className={classNames('ba pointer absolute dim', {
          'black bg-white h4': !minor, 
        })}
        style={{
          //CSS
          top: 0,
          width: '35px',
          marginLeft: '20px',
          height: '45px',
          borderRadius: '10px',
          borderColor: '#00CAB1 ',
          borderWidth: '3px',
          backgroundColor: '#aaf3ea', 
          marginRight: 'px',
          marginTop: '-10px', // if the margin for top exceeds 0, clickability breaks. no clue why and i hate it 
        }}
      ></div>
    </div>
  );
}


// function VaporwaveType({ title, onClick, active }: any): JSX.Element {
//   return (
//     <div
//       onClick={onClick}
//       className={classNames('dim pointer ph2 pv1 ba mr2 br1 fw7 bw1', {
//         // first color means it's selected
//         'green': active,
//         // second color is default appearance
//         'green dark': !active,
//       })}
//     >
//       {title}
//     </div>
//   );
// }

function Vaporwave({ vaporSynth, setSynth }: InstrumentProps): JSX.Element {
  const keys = List([
    { note: 'C', idx: 0},
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
    
  // ]) as List<OscillatorType>;

  return (
    <div className="pv4">
      <div className="relative dib h4 w-100 ml4">
        {Range(2, 7).map(octave =>
          keys.map(key => {
            const isMinor = key.note.indexOf('b') !== -1;
            const note = `${key.note}${octave}`;
            return (
              <VaporwaveNotes
                key={note} //react key
                note={note}
                vaporSynth={vaporSynth}
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
export const VaporwaveInstrument = new Instrument('Vaporwave - jimmynguyen651', Vaporwave);
