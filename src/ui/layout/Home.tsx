import * as React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import { WINDOW_HEIGHT, WINDOW_WIDTH, padding } from "../../style";
import logo from "../../assets/logo@2x.png";
import GetStarted from "./GetStarted";
import Login from "./LogIn";
import { getStartScreenName } from "../../store/getter";
import { StartScreenNameType } from "../../types";

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

class Home extends React.PureComponent<PropTypes, StateProps> {
  handleClick = () => {
    // chrome.tabs.create({ url: `${window.location.href}/extension/index.html` });
    // send("fei");
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
  name: StartScreenNameType;
};

class Start extends React.PureComponent<StartPropTypes> {
  render() {
    const { name } = this.props;
    if (name === "HOME") {
      return <Home />;
    }

    if (name === "LOGIN") {
      return <Login />;
    }

    return <GetStarted />;
  }
}

export default connect(getStartScreenName)(Start);
