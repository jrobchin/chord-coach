import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { NoteState, NoteAction } from "./types";

const initialState: NoteState = {
  notesOn: {},
  lastAction: NoteAction.NONE,
};

const notesSlice = createSlice({
  name: "note",
  initialState,
  reducers: {
    noteOn: function (state, action: PayloadAction<string>) {
      state.notesOn[action.payload] = true;
      state.lastAction = NoteAction.ON;
    },
    noteOff: function (state, action: PayloadAction<string>) {
      delete state.notesOn[action.payload];
      state.lastAction = NoteAction.OFF;
    },
  },
});

export const { noteOn, noteOff } = notesSlice.actions;
export default notesSlice;
