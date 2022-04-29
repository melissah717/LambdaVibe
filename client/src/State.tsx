// 3rd party
import { List, Map } from 'immutable';

// project dependencies
import { PianoInstrument } from './instruments/Piano';
import { FluteInstrument } from './instruments/melissah717';
import { DrumInstrument } from './instruments/Frogger-Software';
import { VaporwaveInstrument } from './instruments/jimmynguyen651';
import { SaxophoneInstrument } from './instruments/saxgetty';
import { WaveformVisualizer } from './visualizers/Waveform';
import { FroggerSoftwareVisualizer } from './visualizers/Frogger-Software';
import { saxgettyVisualizer } from './visualizers/saxgetty';
import { jimmynguyen651Visualizer } from './visualizers/jimmynguyen651';
import { melissah717Visualizer } from './visualizers/melissah717';


/** ------------------------------------------------------------------------ **
 * The entire application state is stored in AppState.
 ** ------------------------------------------------------------------------ */
export type AppState = Map<string, any>;           // similar to { [id: string]: any }

/**
 * Start with the default piano instrument.
 * Add your instruments to this list.
 */
const instruments = List([PianoInstrument, FluteInstrument, DrumInstrument, SaxophoneInstrument, VaporwaveInstrument]);  
// const instruments = List([PianoInstrument , BassInstrument, VaporwaveInstrument, DrumsInstrument]);      // similar to Instrument[]
/**
 * Start with the default waveform visualizer.
 * Add your visualizers to this list.
 */
const visualizers = List([WaveformVisualizer, FroggerSoftwareVisualizer, saxgettyVisualizer, jimmynguyen651Visualizer, melissah717Visualizer]);    // similar to Visualizer[]



/**
 * The default application state contains a list of instruments and a list of visualizers.
 *
 * 'instrument': List<Instrument>
 * 'visualizer': List<Visualizer>
 */
export const defaultState: AppState = Map<string, any>({
  'instruments': instruments,
  'visualizers': visualizers,
});