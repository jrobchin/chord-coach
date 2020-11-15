import { Container, Heading, VStack } from "@chakra-ui/react";
import React from "react";

import "./App.css";
import AudioSamples from "./components/AudioSamples";
import ChordDisplay from "./components/ChordDisplay";
import DevicePicker from "./components/DevicePicker";
import MidiDriver from "./components/MidiDriver";
import Piano from "./components/Piano";

function App() {

  return (
    <div className="App">
      <MidiDriver />
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
