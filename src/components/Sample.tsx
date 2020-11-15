import React from "react";

type Props = {
  sampleName: string;
  samplePath: string;
}

function Sample(props: Props) {
  return (
    <audio id={"sample-" + props.sampleName} className="Sample" src={props.samplePath} />
  );
}

export default Sample;
