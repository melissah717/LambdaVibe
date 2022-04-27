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


//  const sampler = new Tone.Sampler({
// 	urls: {
// 		// letter determines actual note 
//     E1: "https://cdn.kapwing.com/final_626576f65407960659cd4aaa_17861.mp3"

// 	},
 
// }).toDestination();

const sampler = new Tone.Sampler({
  urls: {
    C1: "https://cdn.kapwing.com/final_62682213960a8700766ca7de_141750.mp3", // first
    C2: "https://cdn.kapwing.com/final_626822a54a94a30114cae76e_537685.mp3", // second
    C3: "https://cdn.kapwing.com/final_62682611547067008ddbca49_355155.mp3", //third
    C4: "https://cdn.kapwing.com/final_6268298dd540f9006733fd80_779826.mp3", // fourth
  }

}).toDestination();



interface VaporwaveNotesProps {
  note: string; // C, Db, D, Eb, E, F, Gb, G, Ab, A, Bb, B
  duration?: string;
  synth?: Tone.Sampler; // Contains library code for making sound
  minor?: boolean; // True if minor key, false if major key
  octave: number;
  index: number; // octave + index together give a location for the piano key
}

export function VaporwaveNotes({
  note,
  synth,
  minor,
  index,
}: VaporwaveNotesProps): JSX.Element {
 
  return (
    // Observations:
    // 1. The JSX refers to the HTML-looking syntax within TypeScript.
    // 2. The JSX will be **transpiled** into the corresponding `React.createElement` library call.
    // 3. The curly braces `{` and `}` should remind you of string interpolation.
    <div  className={classNames('ba absolute', {
      
      'black bg-white h4': !minor, 
    })}
    
    style = {{
      width: '200px',
      marginRight: '200px'
    }}>
    "container but not clickable box here"
    <div
      onMouseDown={() => synth?.triggerAttack(`${note}`)} // Question: what is `onMouseDown`?
      onMouseUp={() => synth?.triggerRelease('+0.25')} // Question: what is `onMouseUp`?
      className={classNames('ba pointer absolute dim', {
     
        'black bg-white h4': !minor, // major keys are white
      })}
      style={{
        // CSS
        top: 0,
        left: `${index * 4}rem`,
        zIndex: minor ? 2 : 0,
        width: minor ? '1.5rem' : '2rem',
        marginLeft: minor ? '0.25rem' : 0,
        height: '20px'
      }}>
    

    </div>
    </div>
  );
}



function VaporwaveType({ title, onClick, active }: any): JSX.Element {
  return (
    <div
      onClick={onClick}
      className={classNames('dim pointer ph2 pv1 ba mr2 br1 fw7 bw1', {
        // first color means it's selected
        'b--black black': active,
        // second color is default appearance
        'blue': !active,
      })}
    >
      {title}
    </div>
  );
}

function Vaporwave({ synth, setSynth }: InstrumentProps): JSX.Element {
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

  const setOscillator = (newType: Tone.ToneOscillatorType) => {
    setSynth(oldSynth => {
      oldSynth.disconnect();

      return new Tone.Synth({
        oscillator: { type: newType } as Tone.OmniOscillatorOptions,
      }).toDestination();
    });
  };

  const oscillators: List<OscillatorType> = List([
    'sine',
    'sawtooth',
    'square',
    'triangle',
    'fmsine',
    'fmsawtooth',
    'fmtriangle',
    'amsine',
    'amsawtooth',
    'amtriangle',
  ]) as List<OscillatorType>;

  return (
    <div className="pv4">
      <div className="relative dib h4 w-100 ml4">
        {Range(2, 7).map(octave => // increasing range increases literal pitch (second number)
          keys.map(key => {
            const isMinor = key.note.indexOf('b') !== -1;
            const note = `${key.note}${octave}`;
            return (
              <VaporwaveNotes
                key={note} //react key
                note={note}
                synth={sampler} // PUT SAMPLE HERE?
                minor={isMinor}
                octave={octave}
                index={(octave - 2) * 7 + key.idx} // increasing range increases literal pitch here as well
              />
            );
          }),
        )}
      </div>
      <div className={'pl4 pt4 flex'}>
        {oscillators.map(o => (
          <VaporwaveType
            key={o}
            title={o}
            onClick={() => setOscillator(o)}
            active={synth?.oscillator.type === o}
          />
        ))}
      </div>
    </div>
  );
}

export const VaporwaveInstrument = new Instrument('Vaporwave', Vaporwave);
