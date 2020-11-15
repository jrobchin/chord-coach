export interface SystemState {
  // Flag set once WebMidi is enabled
  webMidiEnabled: boolean;

  // List of connected MIDI devices
  connectedMidiDevices: MidiDevice[];

  // Selected MIDI devices
  selectedMidiDevice: null | MidiDevice;

  // Flag to refresh MIDI device list
  refreshMidiDevices: boolean;
}

export type MidiDevice = {
  id: string;
  name: string;
};
