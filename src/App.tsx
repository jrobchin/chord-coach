import { Container, Heading, VStack } from "@chakra-ui/react";
import React from "react";

import "./App.css";
import AudioSamples from "./components/AudioSamples";
import ChordDisplay from "./components/ChordDisplay";
import ChordDriver from "./components/ChordDriver";
import DevicePicker from "./components/DevicePicker";
import MidiDriver from "./components/MidiDriver";
import Piano from "./components/Piano";

import * as tonal from "@tonaljs/tonal";
window.tonal = tonal;

function App() {

  return (
    <div className="App">
      <MidiDriver />
      <ChordDriver />
      <AudioSamples />
      <Piano />

      <Container mt={4} maxW="xl">
        <VStack spacing={4} align="stretch">
          <Heading>Chord Coach </Heading>

          <DevicePicker />

          <ChordDisplay />
        </VStack>
      </Container>
    </div>
  );
}

export default App;
