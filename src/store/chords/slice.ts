import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Chord, ChordState } from "./types";

const initialState: ChordState = {
  currentChord: null,
  chordHistory: [],
  autoClear: false,
};

const chordSlice = createSlice({
  name: "chord",
  initialState,
  reducers: {
    setChord: function (state, action: PayloadAction<Chord | null>) {
      if (
        action.payload !== null &&
        action.payload.name !== state.currentChord?.name
      ) {
        state.currentChord = action.payload;
        state.chordHistory.push(action.payload);
      }
    },
    clearChordHistory: function (state) {
      state.chordHistory = [];
    },
    clearChords: function (state) {
      state.currentChord = null;
      state.chordHistory = [];
    },
    setAutoClear: function (state, action: PayloadAction<boolean>) {
      state.autoClear = action.payload;
    },
  },
});

export const {
  setChord,
  clearChordHistory,
  clearChords,
  setAutoClear,
} = chordSlice.actions;
export default chordSlice;
