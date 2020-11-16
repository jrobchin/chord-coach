import { Chord } from "./types";

import { AppThunk } from "../index";
import { setChord, clearChords } from "./slice";
import { NoteAction } from "../notes/types";

const CHORD_DOWN_TIMEOUT = 50;
const CHORD_PROGRESSION_TIMEOUT = 3000;

// Currently timeouts are global, as I don't see the need to have multiple
// timeouts or intervals, but this can be changed by encapsulating this module
// inside a class.
var chordDownTimeoutId: NodeJS.Timeout | null = null;
var startChordProgressionResetTimeoutId: NodeJS.Timeout | null = null;

/**
 * Delay the chords.setChord action and check if the last action
 * was a noteOn. This prevents delays between keys being pressed
 * to be registered as a separate chord in the progression.
 * @param chord Chord to submit to store.
 */
export const chordDownDelay = (chord: Chord): AppThunk => async (
  dispatch,
  getState
) => {
  if (chordDownTimeoutId !== null) {
    clearTimeout(chordDownTimeoutId);
  }
  chordDownTimeoutId = setTimeout(() => {
    if (getState().notes.lastAction === NoteAction.ON) {
      dispatch(setChord(chord));
    }
  }, CHORD_DOWN_TIMEOUT);
};

/**
 * Start the chord progression reset timeout.
 * @param options
 * @param options.timeout Timeout in ms for the chord progression to timeout.
 * @param options.clear    If true, clear the chord progression timeout.
 */
export const startChordProgressionResetTimeout = ({
  timeout = CHORD_PROGRESSION_TIMEOUT,
} = {}): AppThunk => async (dispatch) => {
  console.info("Clear");
  // We always want to clear any previous timeout
  if (startChordProgressionResetTimeoutId !== null) {
    clearTimeout(startChordProgressionResetTimeoutId);
  }
  startChordProgressionResetTimeoutId = setTimeout(() => {
    dispatch(clearChords());
  }, timeout);
};
