import * as React from "react";
import Dom from "react-dom";

interface PropTypes {
  msg: string;
}

const App = (props: PropTypes) => (
  <p>Parcel browser extension in typescript {props.msg}</p>
);

export default (): void => {
  Dom.render(<App msg="should work" />, document.getElementById("app"));
};
