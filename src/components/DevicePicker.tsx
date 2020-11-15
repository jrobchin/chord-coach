import React from "react";
import { Select, Button, HStack } from "@chakra-ui/react";
import { connect, ConnectedProps } from "react-redux";

import { RootState } from "../store";
import { selectMidiDevice, setRefreshMidiDevices } from "../store/system/slice";

const mapState = (state: RootState) => ({
  devices: state.system.connectedMidiDevices,
  selectedMidiDevice: state.system.selectedMidiDevice
});
const mapDispatch = { selectMidiDevice, setRefreshMidiDevices };

const connector = connect(mapState, mapDispatch);

type Props = ConnectedProps<typeof connector>;

function DevicePicker({
  devices,
  selectedMidiDevice,
  selectMidiDevice,
  setRefreshMidiDevices
}: Props) {
  return (
    <HStack spacing={3}>
      <Select
        placeholder="Select MIDI device"
        display="inline-block"
        onChange={({ target }) => {
          selectMidiDevice(target.value);
        }}
        value={selectedMidiDevice?.id}
      >
        {devices.map((device, index) =>
          <option key={index} value={device.id}>{device.name}</option>
        )}
      </Select>
      <Button
        colorScheme="blue"
        onClick={e => setRefreshMidiDevices(true)}
      >Refresh</Button>
    </HStack>
  );
}

export default connector(DevicePicker);
