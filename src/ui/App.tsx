import * as React from 'react'
import {
  withRouter,
  BrowserRouter as Router,
  Route,
  Link,
} from 'react-router-dom'
import Start from './layout/Start'
import About from './layout/About'
import Footer from './layout/Footer'
import WalletModeDecision from './layout/WalletModeDecision'
import WalletImport from './layout/WalletImport'
import WalletCreate from './layout/WalletCreate'
import { connect } from 'react-redux'
import { getSnackbarMessage } from '../store/getter'
import SnackbarMessage from './presentational/SnackbarMessage'
import { snackbarMessageDismiss } from '../store/action'
import AccountCreate from './layout/AccountCreate'
import WalletLayout from './layout/WalletLayout'

class HackRedirect extends React.PureComponent<any> {
  componentDidMount() {
    this.props.history.push('/')
  }
  render() {
    return <span />
  }
}

// this is need because when browser load extension for the first time, it doesn't give a fully qualified url.
// therefore we need to force redirect to "home"
const HackRedirectWithRouter = withRouter(HackRedirect)

const ConnectedMessage = connect(
  getSnackbarMessage,
  { onClose: snackbarMessageDismiss }
)(SnackbarMessage)

class App extends React.PureComponent {
  render() {
    return (
      <Router>
        <HackRedirectWithRouter />
        <React.Fragment>
          <Route exact path="/" component={Start} />
          <Route path="/about" component={About} />
          <Route path="/wallet-mode-decision" component={WalletModeDecision} />
          <Route path="/wallet-create" component={WalletCreate} />
          <Route path="/wallet-import" component={WalletImport} />
          <Route path="/wallet" component={WalletLayout} />
          <Route path="/account-create" component={AccountCreate} />
          <ConnectedMessage />
        </React.Fragment>
        <hr />
        <div>
          <ul
            style={{
              listStyle: 'none',
              margin: 0,
              padding: 0,
              display: 'flex',
              flexWrap: 'wrap',
            }}
          >
            <li style={{ margin: 5 }}>
              <Link to="/">Home</Link>
            </li>
            <li style={{ margin: 5 }}>
              <Link to="/about">About</Link>
            </li>
            <li style={{ margin: 5 }}>
              <Link to="/account-create">Account-create</Link>
            </li>
            <li style={{ margin: 5 }}>
              <Link to="/wallet-import">Wallet-import</Link>
            </li>
            <li style={{ margin: 5 }}>
              <Link to="/wallet-create">Wallet-create</Link>
            </li>
          </ul>
        </div>
        <Footer />
      </Router>
    )
  }
}

export default App
