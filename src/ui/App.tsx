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
            </ul>
          </div>
          <Footer />
        </Router>
      </FlexContainer>
    );
  }
}

export default App;
