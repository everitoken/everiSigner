import * as React from 'react'
import { connect } from 'react-redux'
import { withRouter, BrowserRouter as Router, Route } from 'react-router-dom'

import Start from './layout/Start'
import { getSnackbarMessage } from '../store/getter'
import SnackbarMessage from './presentational/SnackbarMessage'
import WalletScreen from './layout/WalletScreen'
import SettingsScreen from './layout/SettingsScreen'
import AccountScreen from './layout/AccountScreen'
import Home from './layout/Home'
import { snackbarMessageDismiss } from '../store/action'

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

function App() {
  return (
    <Router>
      <HackRedirectWithRouter />
      <React.Fragment>
        <Route exact path="/" component={Start} />
        <Route path="/home" component={Home} />
        <Route path="/wallet" component={WalletScreen} />
        <Route path="/account" component={AccountScreen} />
        <Route path="/settings" component={SettingsScreen} />
        <ConnectedMessage />
      </React.Fragment>
    </Router>
  )
}

export default App
