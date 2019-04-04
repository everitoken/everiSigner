import * as React from "react";
import {
  withRouter,
  BrowserRouter as Router,
  Route,
  Link
} from "react-router-dom";
import Start from "./layout/Start";
import About from "./layout/About";
import Footer from "./layout/Footer";
import WalletModeDecision from "./layout/WalletModeDecision";
import WalletImport from "./layout/WalletImport";
import WalletCreate from "./layout/WalletCreate";
import FlexContainer from "./presentational/FlexContainer";
import { connect } from "react-redux";
import { getSnackbarMessage } from "../store/getter";
import SnackbarMessage from "./presentational/SnackbarMessage";
import { snackbarMessageDismiss } from "../store/action";
import AccountCreate from "./layout/AccountCreate";
import AlertDialog from "./presentational/AlertDialog";

class HackRedirect extends React.PureComponent<any> {
  componentDidMount() {
    this.props.history.push("/");
  }
  render() {
    return <span />;
  }
}

// this is need because when browser load extension for the first time, it doesn't give a fully qualified url.
// therefore we need to force redirect to "home"
const HackRedirectWithRouter = withRouter(HackRedirect);

const ConnectedMessage = connect(
  getSnackbarMessage,
  { onClose: snackbarMessageDismiss }
)(SnackbarMessage);

class App extends React.PureComponent {
  render() {
    return (
      <FlexContainer>
        <Router>
          <HackRedirectWithRouter />
          <FlexContainer withPadding>
            <Route exact path="/" component={Start} />
            <Route path="/about" component={About} />
            <Route
              path="/wallet-mode-decision"
              component={WalletModeDecision}
            />
            <Route path="/account-create" component={AccountCreate} />
            <Route path="/wallet-create" component={WalletCreate} />
            <Route path="/wallet-import" component={WalletImport} />
            <ConnectedMessage />
          </FlexContainer>
          <hr />
          <div>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
              <li>
                <Link to="/account-create">Account-create</Link>
              </li>
              <li>
                <Link to="/wallet-import">Wallet-import</Link>
              </li>
              <li>
                <Link to="/wallet-create">Wallet-create</Link>
              </li>
            </ul>
          </div>
          <Footer />
        </Router>
      </FlexContainer>
    );
  }
}

export default App;
