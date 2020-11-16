export interface ChordState {
  currentChord: Chord | null;
  chordHistory: Chord[];
  autoClear: boolean;
}

export type Chord = {
  name: string;
  notes: string[];
  symbol: string;
};
