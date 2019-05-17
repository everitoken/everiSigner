import * as React from 'react'
import {
  withRouter,
  BrowserRouter as Router,
  Route,
  Link,
} from 'react-router-dom'
import Start from './layout/Start'
import Footer from './layout/Footer'
import { connect } from 'react-redux'
import { getSnackbarMessage } from '../store/getter'
import SnackbarMessage from './presentational/SnackbarMessage'
import { snackbarMessageDismiss } from '../store/action'
import WalletScreen from './layout/WalletScreen'
import SettingsScreen from './layout/SettingsScreen'
import AccountScreen from './layout/AccountScreen'

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
          <Route path="/wallet" component={WalletScreen} />
          <Route path="/account" component={AccountScreen} />
          <Route path="/settings" component={SettingsScreen} />
          <ConnectedMessage />
        </React.Fragment>
        {/* <hr />
        <div style={{ zIndex: 100 }}>
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
              <Link to="/account/list">A/List</Link>
            </li>
            <li style={{ margin: 5 }}>
              <Link to="/account/create">A/create</Link>
            </li>
            <li style={{ margin: 5 }}>
              <Link to="/wallet/import">W/import</Link>
            </li>
            <li style={{ margin: 5 }}>
              <Link to="/wallet/create">W/create</Link>
            </li>
          </ul>
        </div>
        <Footer /> */}
      </Router>
    )
  }
}

export default App
