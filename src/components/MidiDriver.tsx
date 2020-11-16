import React, { useEffect } from "react";
import { connect, ConnectedProps } from "react-redux";
import WebMidi, { Input } from "webmidi";

import { setWebMidiEnabled, setRefreshMidiDevices, setConnectedMidiDevice } from "../store/system/slice";
import { noteOff, noteOn } from "../store/notes/slice";
import { RootState } from "../store";
import { noteToID } from "../utils/notes";

const mapState = (state: RootState) => ({
  refreshDevices: state.system.refreshMidiDevices,
  webMidiEnabled: state.system.webMidiEnabled,
  selectedMidiDevice: state.system.selectedMidiDevice
});
const mapDispatch = { setWebMidiEnabled, setRefreshMidiDevices, setConnectedMidiDevice, noteOn, noteOff };
const connector = connect(mapState, mapDispatch);

type Props = ConnectedProps<typeof connector>;

function MidiDriver({
  refreshDevices,
  webMidiEnabled,
  selectedMidiDevice,
  setWebMidiEnabled,
  setRefreshMidiDevices,
  setConnectedMidiDevice,
  noteOn,
  noteOff
}: Props) {

  // Initialize WebMidi
  useEffect(() => {
    WebMidi.enable((err) => {
      if (err) {
        console.error("Error initializing WebMidi", err);
        alert("This browser is not supported, try Chrome!");
      } else {
        console.info("Successfully initialized WebMidi");
        setWebMidiEnabled(true);
      }
    });
  }, [setWebMidiEnabled]);

  // Add event listeners
  useEffect(() => {
    if (webMidiEnabled === true && selectedMidiDevice !== null) {
      console.info("Adding event listeners to", selectedMidiDevice);

      let input: false | Input = false;

      try {
        input = WebMidi.getInputById(selectedMidiDevice.id);
      } catch (error) {
        console.warn(error);
      }

      if (input !== false) {
        // Listen for noteon and update state
        input.removeListener("noteon", "all");
        input.addListener("noteon", "all", (event) => {
          noteOn(noteToID(event.note));
        });

        // Listen for noteoff and update state
        input.removeListener("noteoff", "all");
        input.addListener("noteoff", "all", (event) => {
          noteOff(noteToID(event.note));
        });
      }
    }
  }, [webMidiEnabled, selectedMidiDevice, noteOn, noteOff]);

  // Refresh devices if refreshDevices flag is set
  useEffect(() => {
    if (webMidiEnabled === true && refreshDevices === true) {
      console.info("Refreshing MIDI devices");

      // Refresh connected MIDI devices
      const devices = WebMidi.inputs.map((input) => ({
        id: input.id,
        name: input.name,
      }));
      setConnectedMidiDevice(devices);

      // Set refresh flag back to false
      setRefreshMidiDevices(false);
    }
  }, [webMidiEnabled, refreshDevices, setConnectedMidiDevice, setRefreshMidiDevices]);

  return (<></>);
}

export default connector(MidiDriver);
