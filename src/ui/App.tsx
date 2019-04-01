import * as React from "react";
import {
  withRouter,
  BrowserRouter as Router,
  Route,
  Link
} from "react-router-dom";
import Home from "./layout/Home";
import About from "./layout/About";
import Footer from "./layout/Footer";
import WalletModeDecision from "./layout/WalletModeDecision";
import WalletCreate from "./layout/Wallet/create";
import WalletImport from "./layout/WalletImport";
import SetPassword from "./layout/SetPassword";
import FlexContainer from "./presentational/FlexContainer";

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

class App extends React.PureComponent {
  render() {
    return (
      <FlexContainer>
        <Router>
          <HackRedirectWithRouter />
          <FlexContainer withPadding>
            <Route exact path="/" component={Home} />
            <Route path="/about" component={About} />
            <Route
              path="/wallet-mode-decision"
              component={WalletModeDecision}
            />
            <Route path="/wallet-create" component={WalletCreate} />
            <Route path="/wallet-setpassword" component={SetPassword} />
            <Route path="/wallet-import" component={WalletImport} />
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
                <Link to="/wallet-create">Wallet-create</Link>
              </li>
              <li>
                <Link to="/wallet-import">Wallet-import</Link>
              </li>
              <li>
                <Link to="/wallet-setpassword">Wallet-setpassword</Link>
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
