import React, { useEffect, useState } from "react";
import { connect, ConnectedProps } from "react-redux";
import { Box } from "@chakra-ui/react";
import { Note, Chord } from "@tonaljs/tonal";

import { RootState } from "../store";

const mapState = (state: RootState) => ({
  notesOn: Object.keys(state.notes.notesOn).map(note => Note.get(note))
});
const connector = connect(mapState);

type Props = ConnectedProps<typeof connector>;

function ChordDisplay({ notesOn }: Props) {
  const [chord, setChord] = useState<string>("");

  useEffect(() => {
    // Sort by frequency
    const notes = notesOn.slice().sort((a, b) => a.freq! - b.freq!);

    // Detect and set the first chord. No good way of choosing which chord
    // to use at his point.
    setChord(Chord.detect(notes.map(note => note.name))[0]);
  }, [notesOn, chord, setChord]);

  return (
    <Box p={6} borderWidth="1px" borderRadius="lg">
      Chord: {chord}
    </Box>
  );
}

export default connector(ChordDisplay);
