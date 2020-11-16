import React, { useEffect } from "react";
import { connect, ConnectedProps } from "react-redux";
import { Note, Chord } from "@tonaljs/tonal";

import store, { RootState } from "../store";
import { chordDownDelay, startChordProgressionResetTimeout } from "../store/chords/thunks";

const mapState = (state: RootState) => ({
  notesOn: Object.keys(state.notes.notesOn).map(note => Note.get(note)),
  currentChord: state.chords.currentChord,
  autoClear: state.chords.autoClear
});
const mapDispatch = { chordDownDelay };
const connector = connect(mapState, mapDispatch);

type Props = ConnectedProps<typeof connector>;

function ChordDriver({ notesOn, autoClear, chordDownDelay }: Props) {
  useEffect(() => {
    console.log(Chord.get("Am/E"));

    // Sort by frequency
    const notes = notesOn.slice().sort((a, b) => a.freq! - b.freq!).map(note => note.name);

    // Detect and set the first chord. No good way of choosing which chord
    // to use at his point.
    let chords = Chord.detect(notes);
    if (chords.length > 0) {
      // Currently TonalJS doesn't support the return format of Chord.detect()
      // in Chord.getChord(), so we have to tokenize it
      // (i.e. in C#M/G# a.k.a. C#maj first inversion).
      // C#M/G# should parse to type=M, tonic=C#, root=G#
      // FIXME: tokenize gives [tonic, type] but root notes get captured in type
      // ex. CM/G => ["C", "M/G"]. I need to split the type into typeName and root note to
      // pass them to Chord.getChord().
      let chordString = chords[0];
      console.log(chordString, Chord.tokenize(chordString));
      const chord = Chord.get(Chord.tokenize(chordString));
      console.info("notes", notes, "chord", chord);
      chordDownDelay(chord);
    }
  }, [notesOn, chordDownDelay]);

  useEffect(() => {
    // If this causes issues, check if notesOn.constructor === Object
    // see: https://stackoverflow.com/questions/679915/how-do-i-test-for-an-empty-javascript-object
    if (autoClear === true && Object.keys(notesOn).length === 0) {
      store.dispatch(startChordProgressionResetTimeout());
    }
  }, [notesOn, autoClear]);

  return (<></>);
}

export default connector(ChordDriver);
