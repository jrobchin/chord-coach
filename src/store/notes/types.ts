export interface NoteState {
  notesOn: { [key: string]: boolean };
  lastAction: NoteAction;
}

export enum NoteAction {
  NONE = "NONE",
  ON = "ON",
  OFF = "OFF",
}
