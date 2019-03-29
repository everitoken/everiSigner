import * as React from "react";
import Dom from "react-dom";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import Evt from "evtjs";
import "./main.css";
import { WINDOW_HEIGHT, WINDOW_WIDTH, padding } from "./style";

interface PropTypes {
  msg: string;
}
interface StateProps {
  key: string;
}

const Container = styled.div`
  overflow: hidden;
  width: ${WINDOW_WIDTH}px;
  height: ${WINDOW_HEIGHT}px;
  padding: ${padding.standard}px;
  box-sizing: border-box;
`;

class App extends React.PureComponent<PropTypes, StateProps> {
  state = {
    key: "Waiting for the key"
  };
  async componentDidMount() {
    const key = await Evt.EvtKey.randomPrivateKey();
    this.setState({ key: key.toString() });
  }
  render() {
    return (
      <Container>
        <Button variant="contained" color="primary">
          Hello
        </Button>
        <p>Parcel browser extension in typescript {this.props.msg}</p>
        <p>Key: {this.state.key}</p>
      </Container>
    );
  }
}

export default (): void => {
  Dom.render(<App msg="should work" />, document.getElementById("app"));
};
