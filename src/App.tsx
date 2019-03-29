import * as React from "react";
import Evt from "evtjs";
import Dom from "react-dom";
import { connect } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import createStore from "./store";
import { Provider } from "react-redux";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import "./main.css";
import { WINDOW_HEIGHT, WINDOW_WIDTH, padding } from "./style";
import { AppState } from "./store/reducer";

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

const { store, persistor } = createStore();
const AccountCount = (props: { count: number }) => <p>{props.count}</p>;
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
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Container>
            <Button variant="contained" color="primary">
              Hello
            </Button>
            <p>Parcel browser extension in typescript {this.props.msg}</p>
            <ConnectedAccountCount />

            {/* <p>Key: {this.state.key}</p> */}
          </Container>
        </PersistGate>
      </Provider>
    );
  }
}

export default (): void => {
  Dom.render(<App msg="should work" />, document.getElementById("app"));
};
