import React, { useEffect, useState } from "react";
import { connect, ConnectedProps } from "react-redux";

import { RootState } from "../store";

const mapState = (state: RootState) => ({
  notesOn: state.notes.notesOn
});
const connector = connect(mapState);

type Props = ConnectedProps<typeof connector>;

function Piano({ notesOn }: Props) {
  const [notesDown, setNotesDown] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    for (const note in notesOn) {
      if (notesDown[note] !== true) {
        const sampleId = `sample-${note}`;
        const sample: HTMLAudioElement = document.getElementById(sampleId) as HTMLAudioElement;

        if (sample !== null) {
          sample.pause();
          sample.currentTime = 0;
          sample.play();
          console.info(`play sample: ${sampleId}, ${sample}`);
        }

        setNotesDown({
          ...notesDown,
          [note]: true
        });

      }
    }

    for (const note in notesDown) {
      if (notesOn[note] !== true) {
        delete notesDown[note];
      }
    }
  }, [notesOn, notesDown]);

  return (
    <></>
  );
}

export default connector(Piano);
