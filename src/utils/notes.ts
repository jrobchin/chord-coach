import { IEventNote } from "webmidi";

export const noteToID = (note: IEventNote) => {
  return `${note.name}${note.octave}`.toLowerCase();
};
