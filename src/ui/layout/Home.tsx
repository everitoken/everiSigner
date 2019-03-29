import * as React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import { WINDOW_HEIGHT, WINDOW_WIDTH, padding } from "../../style";
import { AppState } from "../../store/reducer";
import logo from "../../assets/logo@2x.png";

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

class Home extends React.PureComponent<PropTypes, StateProps> {
  state = {
    key: "Waiting for the key"
  };
  async componentDidMount() {
    // const key = await Evt.EvtKey.randomPrivateKey();
    // this.setState({ key: key.toString() });
  }
  handleClick = () => {
    chrome.tabs.create({ url: `${window.location.href}/extension/index.html` });
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
          Hello
        </Button>
      </React.Fragment>
    );
  }
}

export default Home;
