import React from "react";
import { connect, ConnectedProps } from "react-redux";
import { Box, VStack, HStack, Text, Button, Switch } from "@chakra-ui/react";

import { RootState } from "../store";
import { clearChordHistory, setAutoClear } from "../store/chords/slice";

const mapState = (state: RootState) => ({
  currentChord: state.chords.currentChord,
  chordHistory: state.chords.chordHistory,
  autoClear: state.chords.autoClear
});
const mapDispatch = { clearChordHistory, setAutoClear };
const connector = connect(mapState, mapDispatch);

type Props = ConnectedProps<typeof connector>;

function ChordDisplay({ currentChord, chordHistory, autoClear, clearChordHistory, setAutoClear }: Props) {
  return (
    <Box p={6} borderWidth="1px" borderRadius="lg">
      <VStack align="flex-start">
        <div>
          <Text fontWeight={900} display="inline-block" mr={2}>
            Chord:
          </Text>
          {currentChord?.symbol || "None"}
        </div>
        <div>
          <Text fontWeight={900} mr={2}>Chord History:</Text>
          <HStack spacing={3}>
            <Button onClick={_ => clearChordHistory()}>Clear</Button>
            <Box borderWidth="1px" borderRadius="lg" p="0.5rem">
              {/* FIXME: Switch does not reflex autoClear value in store */}
              Auto Clear: <Switch onChange={({ target }) => setAutoClear(target.checked)} />
            </Box>
          </HStack>

          {chordHistory.map((chord, index) => <Text key={index}>{chord.symbol}</Text>)}
        </div>
      </VStack>
    </Box>
  );
}

export default connector(ChordDisplay);
