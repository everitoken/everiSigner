import * as React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import { WINDOW_HEIGHT, WINDOW_WIDTH, padding } from "../../style";
import { AppState } from "../../store/reducer";
import logo from "../../assets/logo@2x.png";
import authentication from "../../store/reducer/authentication";
import GetStarted from "./GetStarted";

interface PropTypes {}

interface StateProps {
  key: string;
}
function send(msg: string) {
  // return new Promise((resolve: any, reject: any) => {
  //   chrome.runtime.sendMessage(msg, response => resolve(response));
  // });
}

const Container = styled.div`
  overflow: hidden;
  width: ${WINDOW_WIDTH}px;
  height: ${WINDOW_HEIGHT}px;
  padding: ${padding.standard}px;
  box-sizing: border-box;
`;

const AccountCount = (props: { count: number; status: string }) => (
  <React.Fragment>
    <p>Account count: {props.count}</p>
    <p>Authentication status: {props.status}</p>
  </React.Fragment>
);
const ConnectedAccountCount = connect(
  ({ accounts, authentication }: AppState) => ({
    count: accounts.length,
    status: authentication.status
  })
)(AccountCount);

class Home extends React.PureComponent<PropTypes, StateProps> {
  state = {
    key: "Waiting for the key"
  };
  async componentDidMount() {
    // const key = await Evt.EvtKey.randomPrivateKey();
    // this.setState({ key: key.toString() });
  }
  handleClick = () => {
    // chrome.tabs.create({ url: `${window.location.href}/extension/index.html` });
    send("fei");
  };
  handleResetState = () => {
    window.persistor.purge();
  };
  render() {
    return (
      <React.Fragment>
        <img
          src={logo}
          alt="logo"
          style={{ width: "15rem", alignSelf: "center", padding: 10 }}
        />
        <ConnectedAccountCount />
        <p>Key: {this.state.key}</p>
        <Button variant="contained" color="primary" onClick={this.handleClick}>
          Button
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={this.handleResetState}
        >
          Reset state
        </Button>
      </React.Fragment>
    );
  }
}

type StartPropTypes = {
  isAccountSetup: boolean;
};

class Start extends React.PureComponent<StartPropTypes> {
  render() {
    if (this.props.isAccountSetup) {
      return <Home />;
    }

    return <GetStarted />;
  }
}

const mapStateToProps = ({ authentication }: AppState) => ({
  isAccountSetup: authentication.password !== null
});

export default connect(mapStateToProps)(Start);
