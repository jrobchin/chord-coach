import React from "react";

import Sample from "./Sample";

const SAMPLES_PATH = process.env.PUBLIC_URL + "/samples/";
const SAMPLES: {[key: string]: string} = {
  "a3": "a3.mp3",
  "a#3": "a-3.mp3",
  "a4": "a4.mp3",
  "a#4": "a-4.mp3",
  "a5": "a5.mp3",
  "a#5": "a-5.mp3",
  "b3": "b3.mp3",
  "b4": "b4.mp3",
  "b5": "b5.mp3",
  "c3": "c3.mp3",
  "c#3": "c-3.mp3",
  "c4": "c4.mp3",
  "c#4": "c-4.mp3",
  "c5": "c5.mp3",
  "c#5": "c-5.mp3",
  "d3": "d3.mp3",
  "d#3": "d-3.mp3",
  "d4": "d4.mp3",
  "d#4": "d-4.mp3",
  "d5": "d5.mp3",
  "d#5": "d-5.mp3",
  "e3": "e3.mp3",
  "e4": "e4.mp3",
  "e5": "e5.mp3",
  "f3": "f3.mp3",
  "f#3": "f-3.mp3",
  "f4": "f4.mp3",
  "f#4": "f-4.mp3",
  "f5": "f5.mp3",
  "f#5": "f-5.mp3",
  "g3": "g3.mp3",
  "g#3": "g-3.mp3",
  "g4": "g4.mp3",
  "g#4": "g-4.mp3",
  "g5": "g5.mp3",
  "g#5": "g-5.mp3",
};

function AudioSamples() {
  return (
    <div id="AudioSamples">
      {Object.keys(SAMPLES).map((note, index) => <Sample key={index} sampleName={note} samplePath={SAMPLES_PATH + SAMPLES[note]} />)}
    </div>
  );
}

export default AudioSamples;
