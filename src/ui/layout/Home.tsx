import * as React from "react";
import Button from "@material-ui/core/Button";
import logo from "../../assets/logo@2x.png";

type PropTypes = {};

type StateTypes = {
  key: string;
};

class Home extends React.PureComponent<PropTypes, StateTypes> {
  handleClick = () => {
    // chrome.tabs.create({ url: `${window.location.href}/extension/index.html` });
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
export default Home;
