import * as React from "react";
import { ReactReduxContext } from "react-redux";

export default class extends React.PureComponent {
  componentDidMount() {
    console.log(window.location);
  }
  render() {
    return <p>About</p>;
  }
}
