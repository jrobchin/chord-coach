import React from "react";
import { connect, ConnectedProps } from "react-redux";

import { RootState } from "../store";

const mapState = (state: RootState) => ({});
const connector = connect(mapState);

type Props = ConnectedProps<typeof connector>;

function ChordSuggestions(props: Props) {
  return (
    <></>
  );
}

export default connector(ChordSuggestions);
