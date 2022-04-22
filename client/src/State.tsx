// 3rd party
import { List, Map } from 'immutable';

// project dependencies
import { PianoInstrument } from './instruments/Piano';
import { BassInstrument } from './instruments/melissah717';
import { DrumInstrument } from './instruments/Frogger-Software';
import { GuitarInstrument } from './instruments/jimmynguyen651';
import { SaxophoneInstrument } from './instruments/saxgetty';
import { WaveformVisualizer } from './visualizers/Waveform';
import { FroggerSoftwareVisualizer } from './visualizers/Frogger-Software';
import { saxgettyVisualizer } from './visualizers/saxgetty';
import { jimmynguyen651Visualizer } from './visualizers/jimmynguyen651';

/** ------------------------------------------------------------------------ **
 * The entire application state is stored in AppState.
 ** ------------------------------------------------------------------------ */
export type AppState = Map<string, any>;           // similar to { [id: string]: any }

/**
 * Start with the default piano instrument.
 * Add your instruments to this list.
 */
const instruments = List([PianoInstrument, BassInstrument, DrumInstrument, SaxophoneInstrument, GuitarInstrument]);  
// const instruments = List([PianoInstrument , BassInstrument, GuitarInstrument, DrumsInstrument]);      // similar to Instrument[]
/**
 * Start with the default waveform visualizer.
 * Add your visualizers to this list.
 */
const visualizers = List([WaveformVisualizer, FroggerSoftwareVisualizer, saxgettyVisualizer, jimmynguyen651Visualizer]);    // similar to Visualizer[]


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