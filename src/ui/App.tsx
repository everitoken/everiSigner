import * as React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import { WINDOW_HEIGHT, WINDOW_WIDTH, padding } from "../style";
import { AppState } from "../store/reducer";

interface PropTypes {}

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

const AccountCount = (props: { count: number }) => (
  <p>Account count: {props.count}</p>
);
const ConnectedAccountCount = connect(({ accounts }: AppState) => ({
  count: accounts.length
}))(AccountCount);

class App extends React.PureComponent<PropTypes, StateProps> {
  state = {
    key: "Waiting for the key"
  };
  async componentDidMount() {
    // const key = await Evt.EvtKey.randomPrivateKey();
    // this.setState({ key: key.toString() });
  }
  render() {
    return (
      <Container>
        <Button variant="contained" color="primary">
          Hello
        </Button>
        <ConnectedAccountCount />
        <p>Key: {this.state.key}</p>
      </Container>
    );
  }
}

export default App;
