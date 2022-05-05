// 3rd party library imports
import classNames from 'classnames';
import { List } from 'immutable';
import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import {
  RadioButton20,
  RadioButtonChecked20,
  Music20,
} from '@carbon/icons-react';

// project imports
import { DispatchAction } from './Reducer';
import { AppState } from './State';
import { Instrument } from './Instruments';
import { Visualizer } from './Visualizers';


/** ------------------------------------------------------------------------ **
 * SideNav component
 ** ------------------------------------------------------------------------ */

type SideNavProps = {
  state: AppState;
  dispatch: React.Dispatch<DispatchAction>;
};

export function SideNav({ state, dispatch }: SideNavProps): JSX.Element {
  /**
   * 
   * SideNav
   * |-----------------|
   * | Nameless App    |
   * | |-----------|   |
   * | |           |   |
   * | |-----------|   |
   * |                 |
   * | InstrumentsNav  |
   * | |-----------|   |
   * | |           |   |
   * | |-----------|   | 
   * |                 |
   * | VisualizersNav  |
   * | |-----------|   |
   * | |           |   |
   * | |-----------|   |
   * |                 |
   * | SongsNav        |
   * | |-----------|   |
   * | |           |   |
   * | |-----------|   |
   * |                 |
   * |-----------------|
  */

  return (
    <div className="absolute top-0 left-0 bottom-0 w5.5 z-1 shadow-1 bg-black flex flex-column white">
      <div className="left-2 top-0 light-yellow f1 fw9-ns tracked-tight-ns pt4 pl3 ml2 mb0">
        LambdaVibe
      </div>
      <div className="left-2 top-0 light-green f5 fw9-ns tracked-tight-ns pt1 pl3 self-end">
         by JM Residence
      </div>
      <div className="flex-auto fw1 f5-ns mt1 ml2">
        <InstrumentsNav state={state} dispatch={dispatch} />
        <VisualizersNav state={state} dispatch={dispatch} />
        <SongsNav state={state} dispatch={dispatch} />
      </div>
    </div>
  );
}


/** ------------------------------------------------------------------------ **
 * SideNav Sub-Components
 ** ------------------------------------------------------------------------ */

function InstrumentsNav({ state }: SideNavProps): JSX.Element {
  /** 
   *  InstrumentsNav
   *  |-----------------|
   *  | Section         |
   *  | |-------------| |
   *  | | RadioButton | |
   *  | |-------------| | 
   *  | | RadioButton | |
   *  | |-------------| |
   *  |      ...        |
   *  |-----------------|
  */

  const instruments: List<Instrument> = state.get('instruments');
  const activeInstrument = state.get('instrument')?.name;
  const location = useLocation();

  return (
    <Section title="Instruments">
      {instruments.map(i => (
        <RadioButton
          key={i.name}
          to={`/${i.name}${location.search}`}
          text={i.name}
          active={i.name === activeInstrument}
          onClick={() => console.log(i.name)}
        />
      ))}
    </Section>
  );
}

function VisualizersNav({ state }: SideNavProps): JSX.Element {
  /** 
   *  VisualizersNav
   *  |-----------------|
   *  | Section         |
   *  | |-------------| |
   *  | | RadioButton | |
   *  | |-------------| | 
   *  | | RadioButton | |
   *  | |-------------| |
   *  |      ...        |
   *  |-----------------|
  */

  const visualizers: List<Visualizer> = state.get('visualizers');
  const activeVisualizer = state.get('visualizer')?.name;
  const location = useLocation();

  return (
    <Section title="Visualizers">
      {visualizers.map(v => (
        <RadioButton
          key={v.name}
          to={{
            pathname: location.pathname,
            search: `?visualizer=${v.name}`,
          }}
          text={v.name}
          active={v.name === activeVisualizer}
          onClick={() => console.log(v.name)}
        />
      ))}
    </Section>
  );
}

function SongsNav({ state, dispatch }: SideNavProps): JSX.Element {
  /** 
   * 
   *  SongsNav
   *  |-----------------|
   *  | Section         |
   *  | |-------------| |
   *  | | Music20     | |
   *  | |-------------| | 
   *  | | Music20     | |
   *  | |-------------| |
   *  |      ...        |
   *  |-----------------|
  */


  const songs: List<any> = state.get('songs', List());
  const [searchTerm, setSearchTerm] = useState("")
  return (
    <Section title="Playlist">
      <input
        className="bg-black white w-100 pv1"
        type="text"
        placeholder='Search...'
        onChange={(event) => {
          setSearchTerm(event.target.value)
        }}
      />
      {songs.filter((song) => {
        if (searchTerm === "") {
          return song
        } else if (song.get('songTitle').toLowerCase().includes(searchTerm.toLowerCase()) || song.get('author').toLowerCase().includes(searchTerm.toLowerCase())) {
          return song
        } else {
          return null
        }
      }).map(song => (
        <div
          key={song.get('id')}
          className="white fw2-ns tracked-tight-ns f5 pointer underline flex items-center no-underline dim w6-l"
          onClick={() =>
            dispatch(new DispatchAction('PLAY_SONG', { id: song.get('id') }))
          }
        >
          <Music20 className="mr1" />
          {song.get('songTitle')}{" • "}{song.get('author')}
        </div>
      ))}
    </Section>
  );
}


/** ------------------------------------------------------------------------ **
 * Auxilliary components
 ** ------------------------------------------------------------------------ */

/** ------------------------------------- **
 * Radio Button
 ** ------------------------------------- */

type RadioButtonProps = {
  to: any,
  text: string,
  active: boolean,
  onClick: () => void
};

function RadioButton({ to, text, active, onClick }: RadioButtonProps): JSX.Element {
  return (
    <Link to={to} className="no-underline">
      <div
        className={classNames('bg-black f5 flex items-left white', { fw7: active })}
        onClick={onClick}
      >
        {active ? (
          <RadioButtonChecked20 className="mr1" />
        ) : (
          <RadioButton20 className="mr1" />
        )}
        <div className="dim">{text}</div>
      </div>
    </Link>
  );
}


/** ------------------------------------- **
 * Section
 ** ------------------------------------- */

const Section: React.FC<{ title: string }> = ({ title, children }) => {
  return (
    <div className="flex flex-column h-25 bb bw1-ns b--light-gray pa3 bg-black white">
      <div className="left-2 top-0 white f3 bt-m fw9-ns tracked-tight-ns pt4 pink pb1 pl1">{title} </div>
      <div className="flex-auto overflow-auto-ns pl1 pt-ns">{children}</div>
    </div>
  );
};
