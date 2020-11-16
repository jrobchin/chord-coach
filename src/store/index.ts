import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";

import systemSlice from "./system/slice";
import notesSlice from "./notes/slice";
import chordsSlice from "./chords/slice";

const store = configureStore({
  reducer: {
    system: systemSlice.reducer,
    notes: notesSlice.reducer,
    chords: chordsSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
