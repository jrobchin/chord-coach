import { configureStore } from "@reduxjs/toolkit";

import systemSlice from "./system/slice";
import notesSlice from "./notes/slice";

const store = configureStore({
  reducer: {
    system: systemSlice.reducer,
    notes: notesSlice.reducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export default store;