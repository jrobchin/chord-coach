import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { NoteState } from "./types";

const initialState: NoteState = {
  notesOn: {},
};

const notesSlice = createSlice({
  name: "note",
  initialState,
  reducers: {
    noteOn: (state, action: PayloadAction<string>) => {
      state.notesOn[action.payload] = true;
    },
    noteOff: (state, action: PayloadAction<string>) => {
      delete state.notesOn[action.payload];
    },
  },
});

export const { noteOn, noteOff } = notesSlice.actions;
export default notesSlice;
