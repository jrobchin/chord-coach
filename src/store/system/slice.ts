import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import WebMidi from "webmidi";
import { MidiDevice, SystemState } from "./types";

const initialState: SystemState = {
  webMidiEnabled: false,
  connectedMidiDevices: [],
  selectedMidiDevice: null,
  refreshMidiDevices: true,
};

const systemSlice = createSlice({
  name: "system",
  initialState,
  reducers: {
    setWebMidiEnabled: function (state, action: PayloadAction<boolean>) {
      state.webMidiEnabled = action.payload;

      // Check if there is a cached Midi device
      const cachedInputId = localStorage.getItem("selectedMidiDeviceId");
      if (cachedInputId !== null) {
        const input = WebMidi.getInputById(cachedInputId);
        if (input !== false) {
          state.selectedMidiDevice = {
            id: input.id,
            name: input.name,
          };
        } else {
          state.selectedMidiDevice = null;
        }
      }
    },
    selectMidiDevice: function (state, action: PayloadAction<string>) {
      const input = WebMidi.getInputById(action.payload);
      if (input !== false) {
        state.selectedMidiDevice = {
          id: input.id,
          name: input.name,
        };
        // Cache selected device
        localStorage.setItem("selectedMidiDeviceId", input.id);
      } else {
        console.warn("Cannot get selected MIDI device input");
        state.selectedMidiDevice = null;
      }
    },
    setConnectedMidiDevice: function (
      state,
      action: PayloadAction<MidiDevice[]>
    ) {
      state.connectedMidiDevices = action.payload;
    },
    setRefreshMidiDevices: function (state, action: PayloadAction<boolean>) {
      state.refreshMidiDevices = action.payload;
    },
  },
});

export const {
  setWebMidiEnabled,
  selectMidiDevice,
  setConnectedMidiDevice,
  setRefreshMidiDevices,
} = systemSlice.actions;
export default systemSlice;
